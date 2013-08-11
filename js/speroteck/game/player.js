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
     * @type Speroteck.Tank.M5
     */
    tank: undefined,

    /**
     *
     * @param options
     */
    initialize: function(options) {
        options = options || {};
        this.tank = options.tank;
        this.enableControl();
    },

    /**
     *
     */
    enableControl: function() {
        $(document).observe('keydown', function(event) {
            switch (event.keyCode) {
                case Event.KEY_UP:
                    this.tank.up();
                    break;
                case Event.KEY_LEFT:
                    this.tank.left();
                    break;
                case Event.KEY_DOWN:
                    this.tank.down();
                    break;
                case Event.KEY_RIGHT:
                    this.tank.right();
                    break;
                case Event.KEY_ESC:
                    window.location.reload();
                    break;
            }
        }.bind(this));
    }
});