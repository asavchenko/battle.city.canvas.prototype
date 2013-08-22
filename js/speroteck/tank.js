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
    board: undefined,

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
     * @returns {{l1: math.Line, l2: math.Line}}
     */
    getLineTracesUp: function() {
        var line1 = new this.config.math.Line([
            this.x - this.width2, this.y - this.height2,
            this.x - this.width2, this.y - this.height2 - this.speed]);
        var line2 = new this.config.math.Line([
            this.x + this.width2, this.y - this.height2,
            this.x + this.width2, this.y - this.height2 - this.speed]);

        return {l1: line1, l2: line2};
    },

    /**
     *
     * @returns {{l1: Speroteck.Game.config.math.Line, l2: Speroteck.Game.config.math.Line}}
     */
    getLineTracesDown: function() {
        var line1 = new this.config.math.Line([
            this.x - this.width2, this.y + this.height2,
            this.x - this.width2, this.y + this.height2 + this.speed]);
        var line2 = new this.config.math.Line([
            this.x + this.width2, this.y + this.height2,
            this.x + this.width2, this.y + this.height2 + this.speed]);

        return {l1: line1, l2: line2};
    },

    /**
     *
     * @returns {{l1: Speroteck.Game.config.math.Line, l2: Speroteck.Game.config.math.Line}}
     */
    getLineTracesLeft: function() {
        var line1 = new this.config.math.Line([
            this.x - this.width2,            this.y - this.height2,
            this.x - this.width2-this.speed, this.y - this.height2]);
        var line2 = new this.config.math.Line([
            this.x - this.width2,            this.y + this.height2,
            this.x - this.width2-this.speed, this.y + this.height2]);

        return {l1: line1, l2: line2};
    },

    /**
     *
     * @returns {{l1: Speroteck.Game.config.math.Line, l2: Speroteck.Game.config.math.Line}}
     */
    getLineTracesRight: function() {
        var line1 = new this.config.math.Line([
            this.x + this.width2,              this.y - this.height2,
            this.x + this.width2 + this.speed, this.y - this.height2]);
        var line2 = new this.config.math.Line([
            this.x + this.width2,              this.y + this.height2,
            this.x + this.width2 + this.speed, this.y + this.height2]);

        return {l1: line1, l2: line2};
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