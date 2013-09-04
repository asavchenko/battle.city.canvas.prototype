/**
 * Implements board logic
 *
 * @category    Speroteck
 * @package     Speroteck_Grid
 * @copyright   Copyright (c) Speroteck Inc. http://www.speroteck.com
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Put full description here
 *
 * @category    Speroteck
 * @package     Speroteck_Game
 * @author      Speroteck team (dev@speroteck.com)
 */

Object.extend(Speroteck.Game.config, {
    objMap: [0,
        Speroteck.Object.Obstacle.Brick,
        Speroteck.Object.Obstacle.Grass,
        Speroteck.Object.Obstacle.Water,
        Speroteck.Object.Obstacle.Concrete,
        Speroteck.Object.Obstacle.Concrete.Up,
        Speroteck.Object.Obstacle.Concrete.Down,
        Speroteck.Object.Obstacle.Concrete.Left,
        Speroteck.Object.Obstacle.Concrete.Right,
        Speroteck.Object.Obstacle.Home]
});
/**
 * @requires Speroteck.Game
 * @namespace Speroteck.Game.Board
 * @class Speroteck.Game.Board
 */
Speroteck.Game.Board = Class.create(Event.Broker, {
    /**
     * url for ajax action
     * @type String
     */
    levelUrl: '',

    /**
     * current level #
     * @type Number
     */
    level: 0,

    /**
     * array representation of data/level-#####.txt or map in ajax response
     * @type Array
     */
    data: [],

    /**
     * array representation of data/z-level-0000.txt zmap in ajax response
     * @type Array
     */
    zdata: [],

    /**
     * array representation of data/level-####.txt but if data contains just a 'Char' type
     * as array cell, imgData contains obstacle objects
     * @type Array
     */
    imgData: [],

    /**
     *
     */
    objTree: undefined,

    /**
     * global config object, wrapped in Speroteck Namespace
     * @type Object
     */
    config: Speroteck.Game.config,

    /**
     * array of canvases on the page
     * @type Array
     */
    canvases: undefined,

    /**
     *
     */
    player: undefined,

    /**
     *
     */
    gameMaster: undefined,

    /**
     *
     */
    width: undefined,

    /**
     *
     */
    height: undefined,

    /**
     *
     */
    ai: undefined,

    /**
     * init actions go here
     *
     * @param options
     */
    initialize: function(options) {
        this.canvases = options.canvases;
        this.levelUrl = options.levelUrl;
        this.level = options.level || 0;
        this.loadLevel();
    },

    /**
     * Sends ajax request to the levelUrl
     */
    loadLevel: function() {
        new Ajax.Request(this.levelUrl, {
            method: 'get',
            parameters: {'level': this.level},
            onComplete: this.onComplete.bind(this)
        });
    },

    /**
     * Result should contain map and zmap data
     * these are json encoded txt files:
     * 010101
     * 012301
     * ...
     * 133011
     * where 1 is object code, so instead of 1 we will place js obstacle object
     * the relations between code and js object are in this.config
     *
     * this is for map, for zmap is being used the similar idea, but now code it's a z-index
     * We have 3 canvases on the page. canvas0 canvas1, canvas2
     *
     * @param response Object
     */
    onComplete: function(response) {
        try {
            var result = response.responseText.evalJSON()
        } catch (e) {
            console.log(response);
        }

        if (result.map) {
            this.data = result.map.split('\n');
        } else {
            alert('Can\'t load level. Check levelUrl in the config params, check that file data/level-0000.txt exists...');
            return;
        }
        if (result.zmap) {
            this.zdata = result.zmap.split('\n');
        }
        this.imgData = [];
        for (var i= 0, vl = this.data.length; i< vl; ++i) {
            this.imgData[i] = [];
            for (var j= 0, hl = this.data[i].length; j < hl; ++j) {
                if (parseInt(this.data[i][j])) {
                    this.imgData[i][j] = (typeof this.config.objMap[parseInt(this.data[i][j])] !== 'undefined')
                        ? (new this.config.objMap[parseInt(this.data[i][j])]({
                            'x': this.config.cellWidth2 + j * this.config.cellWidth,
                            'y': this.config.cellHeight2 + i * this.config.cellHeight,
                            'canvas': (typeof this.canvases[parseInt(this.zdata[i][j])] !== 'undefined'
                                ? this.canvases[parseInt(this.zdata[i][j])]
                                : this.canvases[0]),
                            board: this
                        }))
                        : this.data[i][j];
                } else {
                    this.imgData[i][j] = 0;
                }
            }
        }
        this.player = new Speroteck.Game.Player({
            'tank': new Speroteck.Object.Tank.M5({
                'canvas': this.canvases[1],
                'board': this,
                'x': this.config.cellWidth2 + (hl/2 - 3) * this.config.cellWidth,
                'y': this.config.cellHeight2 +(vl -1) * this.config.cellHeight})
        });
        this.initObjectTree();
        this.ai = new Speroteck.Game.AI({'board': this});

        this.gameMaster = new Speroteck.Game.Master({
            'board': this
        });
    },

    /**
     *
     * @returns {*}
     */
    getWidth: function() {
        if (typeof this.width === 'undefined') {
            this.width = this.config.numCellsHor * this.config.cellWidth;
        }

        return this.width;
    },

    /**
     *
     * @returns {*}
     */
    getHeight: function() {
        if (typeof this.height === 'undefined') {
            this.height = this.config.numCellsVer * this.config.cellHeight;
        }

        return this.height;
    },

    /**
     *
     */
    initObjectTree: function() {
        var i, j;
        this.objTree = new Speroteck.QuadNode({
            left: -2, right: this.getWidth()+2, top: -2, bottom: this.getHeight()+2, canvas: this.canvases[this.canvases.length - 1]
        });
        for (i = 0; i < this.config.numCellsVer; ++i) {
            for (j = 0; j < this.config.numCellsHor; ++j) {
                if (typeof this.imgData[i][j] === 'object' && this.imgData[i][j].type !== 'grass') {
                    this.objTree.add(this.imgData[i][j].getRectangle());
                }
            }
        }

        this.objTree.add(this.player.tank.getRectangle());
    }
});
