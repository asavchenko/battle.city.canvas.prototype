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
    armor: 0,

    /**
     *
     */
    fireRate: 500,

    /**
     *
     */
    fireRateInterval: 0,


    /**
     *
     */
    type: 'tank',

    /**
     *
     */
    config: undefined,

    /**
     * 
     */
    stopped: false,

    /**
     *
     */
    bullets: [],

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
        this.config = this.board.config;
        this.stopped = false;
        this.fireRateInterval = 0;
        this.bullets = [];
        this.registerEvents();
        Object.extend(options, {'width': this.config.cellWidth -1, 'height': this.config.cellHeight -1});
        $super(options);
    },

    /**
     *
     */
    registerEvents: function() {
        this.board.registerEventsPublisher([
            'tank_move_up', 'tank_move_down', 'tank_move_left', 'tank_move_right', 'tank_destroy'
        ], this)
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
    },

    /**
     *
     * @returns {*}
     */
    fire: function() {
        var bullet;
        if (this.fireRateInterval) {
            return;
        }
        switch (this.angle) {
            case this.config.downDirection:
                bullet = new Speroteck.Object.Bullet({
                    canvas: this.canvas,
                    board: this.board,
                    x: this.x,
                    y: this.y + this.height2 - 10,
                    angle: this.angle,
                    owner: this
                });
                break;
            case this.config.upDirection:
                bullet = new Speroteck.Object.Bullet({
                    canvas: this.canvas,
                    board: this.board,
                    x: this.x,
                    y: this.y - this.height2 + 10,
                    angle: this.angle,
                    owner: this
                });
                break;
            case this.config.leftDirection:
                bullet = new Speroteck.Object.Bullet({
                    canvas: this.canvas,
                    board: this.board,
                    x: this.x - this.width2 + 10,
                    y: this.y,
                    angle: this.angle,
                    owner: this
                });
                break;
            case this.config.rightDirection:
                bullet = new Speroteck.Object.Bullet({
                    canvas: this.canvas,
                    board: this.board,
                    x: this.x + this.width2 - 10,
                    y: this.y,
                    angle: this.angle,
                    owner: this
                });
                break;
        }
        if (bullet) {
            this.addBullet(bullet);
            this.board.objTree.add(bullet.getRectangle(), bullet);
        }
        this.fireRateInterval = window.setTimeout(function() {
           this.fireRateInterval = 0;
        }.bind(this), this.fireRate);

        return this;
    },

    /**
     *
     * @param bullet {Speroteck.Object.Bullet}
     * @returns {*}
     */
    addBullet: function(bullet) {
        this.bullets.push(bullet);

        return this;
    },

    /**
     *
     * @param bullet {Speroteck.Object.Bullet}
     * @returns {*}
     */
    removeBullet: function(bullet) {
        var i;
        bullet = bullet || {};
        for (i = 0; i < this.bullets.length; i += 1) {
            if (this.bullets[i].x === bullet.x && this.bullets[i].y === bullet.y) {
                this.bullets.splice(i, 1);

                return this;
            }
        }

        return this;
    }
});