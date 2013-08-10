/**
 * Describe me!!!!!!
 *
 * @category     Julep
 * @package      Julep_Module
 * @copyright    Copyright (c) 2013 Julep (www.julep.com)
 * @author       Julep team (dev@julep.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

/**
 *
 * @class Speroteck.Image
 */
Speroteck.Image = Class.create({
    /**
     * @type fabric.Group
     */
    imgData: undefined,

    /**
     * fabric.StaticCanvas
     */
    canvas: undefined,

    x: 0, y: 0, angle: 0,

    config: Speroteck.config,

    /**
     *
     * @param options
     */
    initialize: function (options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.angle = options.angle || 0;
        this.canvas = options.canvas;
        this.setImage(options.hasOwnProperty('imgElement') ? options.imgElement : undefined);
    },

    /**
     * (html)
     * <canvas id="c"></canvas>
     * <img src="my_image.png" id="my-image">
     * (js)
     * imgElement = $('my-img') || 'my-img;
     *
     * @param imgElement
     */
    setImage: function (imgElement) {
        this.imgData = new fabric.Group([typeof imgElement === 'undefined'
            ? fabric.Rect({'x': this.x, 'y': this.y, 'width': this.config.ceilWidth, 'height': this.config.ceilHeight})
            : new fabric.Image($(imgElement), {
            left: this.x,
            top: this.y,
            angle: this.angle,
            opacity: 1
        })], {
            left: this.x,
            top: this.y
        });

        this.canvas.add(this.imgData);
    },

    /**
     *
     * @param fabricObject fabric.Object
     */
    addFabricObject: function (fabricObject) {
        // add group onto canvas
        this.canvas.add(this.imgData.addWithUpdate(fabricObject.set({left: this.imgData.getLeft(), right: this.imgData.getRight()})));
    },

    /**
     *
     */
    destroy: function () {
        this.canvas.remove(this.imgData);
        delete this.imgData;
    },

    /**
     *
     * @param x Number
     * @param y Number
     * @param angle Number
     */
    show: function (x, y, angle) {
        this.imgData.set({'left': x, 'top': y});
        if (typeof angle !== 'undefined') {
            this.imgData.set('angle', angle);
        }
    }
});