/**
 * Implements grid logic
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
 * @package     Speroteck_Grid
 * @author      Speroteck team (dev@speroteck.com)
 */

if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

Object.extend(Speroteck.config, {
    objMap: [0, Speroteck.Brick, Speroteck.Grass]
});
/**
 * @namespace Speroteck
 * @class Speroteck.Grid
 */
Speroteck.Grid = Class.create({
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
     * as array ceil, imgData contains obstacle objects
     * @type Array
     */
    imgData: [],

    /**
     * global config object, wrapped in Speroteck Namespace
     * @type Object
     */
    config: Speroteck.config,

    /**
     * array of canvases on the page
     * @type Array
     */
    canvases: undefined,

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
                            'x': this.config.ceilWidth2 + j * this.config.ceilWidth,
                            'y': this.config.ceilHeight2 + i * this.config.ceilHeight,
                            'canvas': (typeof this.canvases[parseInt(this.zdata[i][j])] !== 'undefined'
                                ? this.canvases[parseInt(this.zdata[i][j])]
                                : this.canvases[0])
                        }))
                        : this.data[i][j];
                } else {
                    this.imgData[i][j] = 0;
                }
            }
        }
    }
});
