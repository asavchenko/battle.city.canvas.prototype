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

    lineObject: false,

    /**
     * initialization's operations go here
     */
    initialize: function(options) {
        this.fabric = options.fabric;
        this.canvas = options.canvas;
        this.lineWidth = options.lineWidth || 5;
        this.lineColor = options.lineColor || '#000000';
    },

    /**
     *
     * @param points Array
     * @returns {this.fabric.Line}
     */
    line: function(points) {
        if (!this.lineObject) {
            this.lineObject = new this.fabric.Line(points, {
                strokeWidth: this.lineWidth,
                stroke: this.lineColor,
                selectable: false
            });
        }
        this.lineObject.set('x1', points[0]);
        this.lineObject.set('y1', points[1]);
        this.lineObject.set('x2', points[2]);
        this.lineObject.set('y2', points[3]);

        this.canvas.add(this.lineObject);
    },

    /**
     * not working!
     * @param width Number
     */
    setLineWidth: function(width) {
        this.lineWidth = width;
    },

    /**
     * not working!
     * format should be like:
     * #000000
     *
     * @param color String
     */
    setLineColor: function(color) {
       this.lineColor = color;
    }
});

