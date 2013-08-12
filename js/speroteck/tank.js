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

    board: undefined,

    /**
     * {@inheritdoc}
     * @param $super
     * @param options
     */
    initialize: function($super, options) {
        this.speed = options.speed || 5;
        this.armor = options.armor || 1;
        this.board = options.board;
        this.registerEvents();
        $super(options);
    },

    /**
     *
     */
    registerEvents: function() {
        if (typeof this.board === 'object') {
            this.board.registerEventsPublisher(['tank_move_up', 'tank_move_down', 'tank_move_left', 'tank_move_right'], this)
        }
    },

    /**
     *
     * @returns {*}
     */
    up: function() {
        if (this.angle !== this.config.upDirection) {
           this.setDirection(this.config.upDirection);
        } else {
            this.dispatchEvent('tank_move_up');
            this.move(this.config.upDirection);
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
        } else {
            this.dispatchEvent('tank_move_down');
            this.move(this.config.downDirection);
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
        } else {
            this.dispatchEvent('tank_move_left');
            this.move(this.config.leftDirection);
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
        } else {
            this.dispatchEvent('tank_move_right');
            this.move(this.config.rightDirection);
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
    }
});