/**
 * Bullet object
 *
 * @category     Speroteck
 * @package      Speroteck_Bullet
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * @requires object
 * @namespace Speroteck.Object.Bullet
 * @extends Speroteck.Object
 * @class Speroteck.Object.Bullet
 */
Speroteck.Object.Bullet = Class.create(Speroteck.Object, {
    /**
     *
     */
    speed: 5,

    /**
     *
     */
    type: 'bullet',

    /**
     *
     */
    stopped: false,

    /**
     *
     */
    imgId: 'speroteck-image-bullet',

    /**
     *
     */
    interval: 0,

    /**
     *
     */
    owner: undefined,

    /**
     * {@inheritdoc}
     * @param $super
     * @param options
     */
    initialize: function($super, options) {
        options = options || {};
        options.width = 10;
        options.height = 20;
        this.speed = options.speed || this.speed;
        this.board = options.board;
        this.angle = options.angle;
        this.registerEvents();
        this.owner = options.owner;
        $super(options);
        this.run();
    },

    /**
     *
     */
    run: function() {
        this.interval = window.setInterval(function() {
            switch (this.angle) {
                case this.config.upDirection:
                    this.up();
                    break;
                case this.config.downDirection:
                    this.down();
                    break;
                case this.config.leftDirection:
                    this.left();
                    break;
                case this.config.rightDirection:
                    this.right();
                    break;
            }
        }.bind(this), 20)
    },

    /**
     *
     */
    registerEvents: function() {
        this.board.registerEventsPublisher([
            'bullet_move_up', 'bullet_move_down', 'bullet_move_left', 'bullet_move_right', 'bullet_destroy'
        ], this)
    },

    /**
     *
     * @returns {*}
     */
    up: function() {
        this.dispatchEvent('bullet_move_up');

        return this;
    },

    /**
     *
     * @returns {*}
     */
    down: function() {
        this.dispatchEvent('bullet_move_down');

        return this;
    },

    /**
     *
     * @returns {*}
     */
    left: function() {
        this.dispatchEvent('bullet_move_left');

        return this;
    },

    /**
     *
     * @returns {*}
     */
    right: function() {
        this.dispatchEvent('bullet_move_right');

        return this;
    },

    /**
     *
     * @returns {*}
     */
    acceptBullet: function() {
        this.destroy();

        return this;
    },

    /**
     */
    destroy: function() {
        this.imageObj.destroy();
        window.clearInterval(this.interval);
        this.interval = 0;
        this.dispatchEvent('bullet_destroy');
    },

    /**
     *
     * @returns {Speroteck.Object.Tank}
     */
    getOwner: function() {
        return this.owner;
    }
});