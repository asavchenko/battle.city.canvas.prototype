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
 * @namespace Speroteck
 * @class Speroteck.Object
 */
Speroteck.Object = Class.create({
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
     */
    config: Speroteck.Game.config,

    /**
     * image id
     */
    imgId: '',

    /**
     * init actions go here
     * @param options {*}
     */
    initialize: function(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.canvas = options.canvas;

        if (typeof options.imageObj === 'undefined') {
            Object.extend(options, {'imageObj': new Speroteck.Image({
                'canvas': options.canvas,
                'imgElement': this.imgId,
                'x': options.hasOwnProperty('x') ? options.x : 0,
                'y': options.hasOwnProperty('y') ? options.y: 0
            })});
        }

        this.imageObj = options.imageObj;
    }
});