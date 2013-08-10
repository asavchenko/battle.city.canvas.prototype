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
    levelUrl: '',
    level: '',
    data: [],
    zdata: [],
    imgData: [],
    config: Speroteck.config,

    /**
     * @type Array
     */
    canvases: undefined,

    initialize: function(options) {
        this.canvases = options.canvases;
        this.levelUrl = options.levelUrl || 'http://battle-city.dev/index.php';
        this.level = options.level || '0';
        this.loadLevel();
    },

    loadLevel: function() {
        new Ajax.Request(this.levelUrl, {
            method: 'get',
            parameters: {'level': this.level},
            onComplete: this.onComplete.bind(this)
        });
    },

    onComplete: function(response) {
        try {
            var result = response.responseText.evalJSON()
        } catch (e) {
            console.log(response);
        }

        if (result.map) {
            this.data = result.map.split('\n');
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
