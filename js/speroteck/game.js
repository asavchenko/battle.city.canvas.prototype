/**
 * Game object
 *
 * @category     Speroteck
 * @package      Speroteck_Game
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

/**
 * @module game
 * @class Speroteck.Game
 * @namespace Speroteck.Game
 */
Speroteck.Game = Class.create({

    /**
     *
     */
    gameCycle: 0,

    /**
     * @type {Speroteck.Game.Board}
     */
    board: undefined,

    /**
     * inject global config
     * @type {Speroteck.Game.config}
     */
    config: undefined,

    /**
     * @constructor
     *
     * @param options [{object}]
     */
    initialize: function(options) {
        this.config = Speroteck.Game.config;
        if (typeof options === 'undefined') {
            alert('You need to pass valid init params...');
            return;
        }
        if (!options.hasOwnProperty('dynamicCanvas')) {
            alert('Canvas is not defined...');
            return;
        }
        this.canvas = options.dynamicCanvas;
        this.gameCycle = 0;
        this.board = new Speroteck.Game.Board(options);
        this.enableGameCycle();
    },

    /**
     * @returns {void}
     */
    enableGameCycle: function() {
        if (this.gameCycle) {
            return;
        }
        this.gameCycle = window.setInterval(function() {
            this.canvas.renderAll();
        }.bind(this),  this.config.renderInterval);
    },

    disableGameCycle: function() {
        if (this.gameCycle) {
            window.clearInterval(this.gameCycle);
            this.gameCycle = false;
        }
    }
});
