/**
 * Player object
 *
 * @category     Speroteck
 * @package      Speroteck_Game
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * @namespace Speroteck.Game
 * @extends Speroteck.Game
 * @class Speroteck.Game.Player
 */
Speroteck.Game.Player = Class.create(Speroteck.Game, {
    /**
     * @type {Speroteck.Tank.M5}
     */
    tank: undefined,

    /**
     *
     */
    keyInterval: 50,

    /**
     *
     */
    keyDownInterval: 0,

    /**
     *
     */
    keyUpOccurred: false,


    /**
     *
     * @param options {object}
     *
     * @returns {void}
     */
    initialize: function(options) {
        options = options || {};
        this.tank = options.tank;
        this.enableControl();
    },

    /**
     * @returns {void}
     */
    enableControl: function() {
        $(document).observe('keydown', function(event) {
            var direction = false;
            if (this.keyDownInterval) {
                return;
            }
            switch (event.keyCode) {
                case Event.KEY_UP:
                    direction = 'up';
                    break;
                case Event.KEY_LEFT:
                    direction = 'left';
                    break;
                case Event.KEY_DOWN:
                    direction = 'down';
                    break;
                case Event.KEY_RIGHT:
                    direction = 'right';
                    break;
                case 32:
                    this.tank.fire();
                    break;
                case Event.KEY_ESC:
                    window.location.reload();
                    break;
            }

            if (direction) {
                this.keyDownInterval = window.setInterval(function() {
                    if (this.keyUpOccurred) {
                        this.keyUpOccurred = false;
                        window.clearInterval(this.keyDownInterval);
                        this.keyDownInterval = 0;
                    }
                    this.tank[direction]();
                }.bind(this), this.keyInterval);
            }
        }.bind(this));
        $(document).observe('keyup', function(event) {
            this.keyUpOccurred = true;
        }.bind(this));
    }
});