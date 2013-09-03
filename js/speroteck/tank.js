/**
 * Tank object
 *
 * @category     Speroteck
 * @package      Speroteck_Tank
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * @requires object
 * @namespace Speroteck.Object.Tank
 * @extends Speroteck.Object
 * @class Speroteck.Object.Tank
 */
Speroteck.Object.Tank = Class.create(Speroteck.Object, {
    /**
     *
     */
    speed: 0,

    /**
     *
     */
    armor: 0,

    /**
     *
     */
    fireRate: 0,


    /**
     *
     */
    type: 'tank',

    /**
     * 
     */
    stopped: false,

    /**
     * {@inheritdoc}
     * @param $super
     * @param options
     */
    initialize: function($super, options) {
        options = options || {};
        this.speed = options.speed || this.speed;
        this.armor = options.armor || this.armor;
        this.board = options.board;
        this.stopped = false;

        this.registerEvents();
        Object.extend(options, {'width': this.config.cellWidth -1, 'height': this.config.cellHeight -1});
        $super(options);
    },

    /**
     *
     */
    registerEvents: function() {
        this.board.registerEventsPublisher(['tank_move_up', 'tank_move_down', 'tank_move_left', 'tank_move_right'], this)
    },

    /**
     *
     * @returns {*}
     */
    up: function() {
        if (this.angle !== this.config.upDirection) {
           this.setStopped(false);
           this.setDirection(this.config.upDirection);
        } else {
            this.dispatchEvent('tank_move_up');
        }

        return this;
    },

    /**
     *
     * @returns {*}
     */
    down: function() {
        if (this.angle !== this.config.downDirection) {
            this.setDirection(this.config.downDirection);
            this.setStopped(false);
        } else {
            this.dispatchEvent('tank_move_down');
        }

        return this;
    },

    /**
     *
     * @returns {*}
     */
    left: function() {
        if (this.angle !== this.config.leftDirection) {
            this.setDirection(this.config.leftDirection);
            this.setStopped(false);
        } else {
            this.dispatchEvent('tank_move_left');
        }

        return this;
    },

    /**
     *
     * @returns {*}
     */
    right: function() {
        if (this.angle !== this.config.rightDirection) {
            this.setDirection(this.config.rightDirection);
            this.setStopped(false);
        } else {
            this.dispatchEvent('tank_move_right');
        }

        return this;
    },

    /**
     *
     * @returns {*}
     */
    acceptBullet: function() {
        if (this.armor) {
            this.armor--;
        } else {
            this.destroy();
        }

        return this;
    },

    /**
     *
     * @returns {*}
     */
    destroy: function() {
        this.imageObj.destroy();
        this.dispatchEvent('tank_destroy');

        return this;
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
    },

    /**
     *
     * @returns {{l1: Speroteck.Game.config.math.Line, l2: Speroteck.Game.config.math.Line}}
     */
    getLineTracesUp: function() {
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
    getLineTracesDown: function() {
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
    getLineTracesLeft: function() {
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
    getLineTracesRight: function() {
        var rec = this.getRectangle();
        var t = rec.getTop();
        var b = rec.getBottom();
        var r = rec.getRight();
        var rs = r + this.speed;

        return {l1: rec.getLine(r, t, rs, t), l2: rec.getLine(r, b, rs, b)};
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