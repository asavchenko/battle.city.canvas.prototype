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
    speed: 0,

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
     *
     */
    angle: 0,

    /**
     *
     */
    board: undefined,

    /**
     * init actions go here
     * @param options {*}
     * @constructor
     */
    initialize: function (options) {
        options = options || {};
        this.width = options.width || this.config.cellWidth;
        this.height = options.height || this.config.cellHeight;
        this.width2 = this.width / 2;
        this.height2 = this.height / 2;

        this.x = options.x || 0;
        this.y = options.y || 0;
        this.canvas = options.canvas;

        if (typeof options.imageObj === 'undefined') {
            Object.extend(options, {'imageObj': new Speroteck.Image({
                canvas: options.canvas,
                imgElement: this.imgId,
                x: options.hasOwnProperty('x') ? options.x : 0,
                y: options.hasOwnProperty('y') ? options.y : 0
            })});
        }
        this.rectangle = undefined;
        this.imageObj = options.imageObj;

        this.board = options.board;
    },

    /**
     *
     * @returns {Speroteck.Game.config.math.Rectangle}
     */
    getRectangle: function () {
        return new Speroteck.Game.config.math.Rectangle([
            this.x - this.width2, this.y - this.height2,
            this.x + this.width2, this.y - this.height2,
            this.x - this.width2, this.y + this.height2,
            this.x + this.width2, this.y + this.height2]);
    },

    /**
     *
     * @returns {{l1: Speroteck.Game.config.math.Line, l2: Speroteck.Game.config.math.Line}}
     */
    getLineTracesUp: function () {
        var rec = this.getRectangle();
        var l = rec.getLeft();
        var t = rec.getTop();
        var ts = t - this.speed;
        var r = rec.getRight();

        return {l1: rec.getLine(l, t, l, ts), l2: rec.getLine(r, t, r, ts)};
    },

    /**
     *
     * @returns {{l1: Speroteck.Game.config.math.Line, l2: Speroteck.Game.config.math.Line}}
     */
    getLineTracesDown: function () {
        var rec = this.getRectangle();
        var l = rec.getLeft();
        var b = rec.getBottom();
        var bs = b + this.speed;
        var r = rec.getRight();

        return {l1: rec.getLine(l, b, l, bs), l2: rec.getLine(r, b, r, bs)};
    },

    /**
     *
     * @returns {{l1: Speroteck.Game.config.math.Line, l2: Speroteck.Game.config.math.Line}}
     */
    getLineTracesLeft: function () {
        var rec = this.getRectangle();
        var l = rec.getLeft();
        var ls = l - this.speed;
        var b = rec.getBottom();
        var t = rec.getTop();

        return {l1: rec.getLine(l, t, ls, t), l2: rec.getLine(l, b, ls, b)};
    },

    /**
     *
     * @returns {{l1: Speroteck.Game.config.math.Line, l2: Speroteck.Game.config.math.Line}}
     */
    getLineTracesRight: function () {
        var rec = this.getRectangle();
        var t = rec.getTop();
        var b = rec.getBottom();
        var r = rec.getRight();
        var rs = r + this.speed;

        return {l1: rec.getLine(r, t, rs, t), l2: rec.getLine(r, b, rs, b)};
    },

    /**
     *
     * @param direction
     * @returns {*}
     */
    move: function(direction) {
        switch (direction) {
            case this.config.upDirection:
                this.y -= this.speed;
                break;
            case this.config.leftDirection:
                this.x -= this.speed;
                break;
            case this.config.downDirection:
                this.y += this.speed;
                break;
            case this.config.rightDirection:
                this.x += this.speed;
                break;
        }

        this.reDraw();

        return this;
    },

    /**
     *
     * @returns {*}
     */
    reDraw: function() {
        this.imageObj.move(this.x, this.y, this.angle);

        return this;
    },

    /**
     *
     * @param direction
     */
    setDirection: function(direction) {
        this.angle = direction || this.angle;
        this.imageObj.move(this.x, this.y, this.angle);

        return this;
    },

    /**
     *
     * @param value {boolean}
     * @returns {*}
     */
    setStopped: function(value) {
        this.stopped = value;

        return this;
    },

    /**
     *
     * @returns {boolean}
     */
    isStopped: function() {
        return this.stopped;
    }
});