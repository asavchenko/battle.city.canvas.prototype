/**
 * Object which has visual representation
 *
 * @category     Speroteck
 * @package      Speroteck_Object
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

/**
 * @requires Event.Publisher
 * @extends Event.Publisher
 * @requires image
 * @namespace Speroteck.Object
 * @class Speroteck.Object
 */
Speroteck.Object = Class.create(Event.Publisher, {
    /**
     * @type Speroteck.Image
     */
    imageObj: undefined,

    /**
     * coordinates of object center
     */
    x: 0, y: 0,

    /**
     * inject global config
     * @type {Speroteck.Game.config}
     */
    config: Speroteck.Game.config,

    /**
     * image id
     */
    imgId: '',

    /**
     *
     */
    type: '',

    /**
     *
     */
    canvas: undefined,

    /**
     *
     */
    width: 0,

    /**
     *
     */
    height: 0,

    /**
     *
     */
    width2: 0,

    /**
     *
     */
    height2: 0,

    /**
     * init actions go here
     * @param options {*}
     * @constructor
     */
    initialize: function(options) {
        options = options || {};
        this.width = options.width || this.config.cellWidth;
        this.height = options.height || this.config.cellHeight;
        this.width2 = this.width/2;
        this.height2 = this.height/2;

        this.x = options.x || 0;
        this.y = options.y || 0;
        this.canvas = options.canvas;

        if (typeof options.imageObj === 'undefined') {
            Object.extend(options, {'imageObj': new Speroteck.Image({
                'canvas': options.canvas,
                'imgElement': this.imgId,
                'x': options.hasOwnProperty('x') ? options.x : 0,
                'y': options.hasOwnProperty('y') ? options.y : 0
            })});
        }

        this.imageObj = options.imageObj;
    }
});