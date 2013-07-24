/**
 * Encapsulation common operations with canvas
 *
 * @category    Speroteck
 * @package     Speroteck_Artist
 * @copyright   Copyright (c) Speroteck Inc. http://www.speroteck.com
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Put full description here
 *
 * @category    Speroteck
 * @package     Speroteck_Artist
 * @author      Speroteck team (dev@speroteck.com)
 */

if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

/**
 *
 * @type {*}
 */
Speroteck.Artist = Class.create({

    /**
     * @type fabric
     */
    fabric: {},

    /**
     *
     */
    canvas: {},

    /**
     *
     */
    lineWidth: 5,

    /**
     *
     */
    lineColor: '#000',

    /**
     * initialization's operations go here
     */
    initialize: function (options) {
        this.fabric = options.fabric;
        this.canvas = options.canvas;
        this.lineWidth = options.lineWidth || 5;
        this.lineColor = options.lineColor || '#000';
    },

    /**
     *
     * @param coords Array
     * @returns {this.fabric.Line}
     */
    line: function(coords) {
        return new this.fabric.Line(coords, {
            strokeWidth: this.strokeWidth,
            stroke: this.strokeColor,
            selectable: false
        });
    }
});

