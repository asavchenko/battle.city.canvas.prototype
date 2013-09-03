/**
 * Image object
 *
 * @category     Speroteck
 * @package      Speroteck_Image
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 */

if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

/**
 * @requires fabric
 * @namespace Speroteck.Image
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

    /**
     * coordinates
     */
    x: 0, y: 0, angle: 0,

    /**
     * global config injection
     */
    config: Speroteck.Game.config,

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
     * <img src="my_image.png" id="my-image">
     * (js)
     * imgElement = $('my-img') || 'my-img;
     *
     * @param imgElement
     */
    setImage: function (imgElement) {
        this.imgData = new fabric.Group([typeof imgElement === 'undefined'
            ? fabric.Rect({'x': this.x, 'y': this.y, 'width': this.config.cellWidth, 'height': this.config.cellHeight})
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
        this.canvas.add(this.imgData.addWithUpdate(fabricObject.set({left: this.imgData.getLeft(), top: this.imgData.getTop()})));
    },

    /**
     * destroy current image
     * remove it from canvas and from the memory
     */
    destroy: function () {
        this.canvas.remove(this.imgData);
        delete this.imgData;
    },

    /**
     * show image object at (x, y)
     * angle is optional
     *
     * @param x Number
     * @param y Number
     * @param angle Number
     */
    move: function (x, y, angle) {
        if (!this.imgData) {
            return;
        }
        if (this.imgData.get('left') !== x) {
            this.imgData.set('left', x);
        }

        if (this.imgData.get('top') !== y) {
            this.imgData.set('top', y);
        }

        if (typeof angle !== 'undefined' && this.imgData.get('angle') !== angle) {
            this.imgData.set('angle', angle);
        }
    }
});