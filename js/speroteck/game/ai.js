/**
 * Artificial Intelligence logic
 *
 * @category     Speroteck
 * @package      Speroteck_Game
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

Speroteck.Game.AI = Class.create(Speroteck.Game, {
    /**
     *
     */
    numTanks: 20,

    /**
     *
     */
    numInSquad: 4,

    /**
     *
     */
    squad: [],

    /**
     *
     */
    board: undefined,

    /**
     *
     */
    config: Speroteck.Game.config,

    /**
     *
     */
    gameCycle: 0,

    /**
     * @constructor
     * @param options
     */
    initialize: function(options) {
        options = options || {};
        this.numTanks = options.all || this.numTanks;
        this.numInSquad = options.squad || this.numInSquad;
        this.board = options.board;
        this.squad = [];
        this.initSquad(options);
        this.enableControl();
    },

    /**
     *
     * @param options
     */
    initSquad: function(options) {
        var type;
        for (var i=0; i<this.numInSquad; ++i) {
            switch (this.config.math.random(4)) {
                case 1: type = Speroteck.Object.Tank.M1; break;
                case 2: type = Speroteck.Object.Tank.M2; break;
                case 3: type = Speroteck.Object.Tank.M3; break;
                case 4: type = Speroteck.Object.Tank.M4; break;
                default: type = Speroteck.Object.Tank.M1; break;
            }
            this.squad[i] = new type({
                'canvas': this.board.canvases[1],
                'board': this.board,
                'x': this.config.cellWidth2 + i*this.config.cellWidth,
                'y': this.config.cellHeight2});
        }
    },

    /**
     *
     */
    enableControl: function() {
        this.gameCycle = window.setInterval(function() {this.commandSquad();}.bind(this), 50);
    },

    /**
     *
     */
    commandSquad: function() {
        this.squad.each(function(tank) {
            if (tank.isStopped()) {
                this.randomChangeDirection(tank)
            } else {
                switch (tank.angle) {
                    case this.config.upDirection:
                        if (this.config.math.random(100) != 1) tank.up();
                        else this.randomChangeDirection(tank);
                        break;
                    case this.config.downDirection:
                        if (this.config.math.random(100) != 1) tank.down();
                        else this.randomChangeDirection(tank);
                        break;
                    case this.config.leftDirection:
                        if (this.config.math.random(100) != 1) tank.left();
                        else this.randomChangeDirection(tank);
                        break;
                    case this.config.rightDirection:
                        if (this.config.math.random(100) != 1) tank.right();
                        else this.randomChangeDirection(tank);
                        break;
                    default: this.randomChangeDirection(tank);
                }
            }
        }.bind(this));
    },

    /**
     *
     * @param tank
     */
    randomChangeDirection: function(tank) {
        switch (this.config.math.random(10)) {
            case 1: tank.down();
                break;
            case 2: tank.right();
                break;
            case 3: tank.up();
                break;
            case 4: tank.left();
                break;
            default: tank.down();
        }
    }
});