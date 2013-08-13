Speroteck.Game.Master = Class.create(Event.Listener, {
    /**
     *
     */
    board: undefined,

    /**
     *
     */
    config: Speroteck.Game.config,

    /**
     * @constructor
     * @param options
     */
    initialize: function (options) {
        options = options || {};
        this.board = options.board;
        this.subscribeOnTankEvents();
    },

    /**
     *
     */
    subscribeOnTankEvents: function() {
        if (typeof this.board === 'object') {
            this.listenForEvent(this.board, 'tank_move_up');

            this.listenForEvent(this.board, 'tank_move_left');

            this.listenForEvent(this.board, 'tank_move_down');

            this.listenForEvent(this.board, 'tank_move_right');
        }
    },

    /**
     *
     * @param event
     */
    onTankMoveUp: function(event) {
        var tank = event.eventData.eventTarget;
        if ((tank.y - this.config.ceilHeight2) - tank.speed < 0) {
            tank.move(this.config.upDirection, tank.y - this.config.ceilHeight2);
        } else {
            tank.move(this.config.upDirection);
        }
    },

    /**
     *
     * @param event
     */
    onTankMoveLeft: function(event) {
        var tank = event.eventData.eventTarget;
        if ((tank.x - this.config.ceilWidth2) - tank.speed < 0) {
            tank.move(this.config.leftDirection, tank.x - this.config.ceilWidth2);
        } else {
            tank.move(this.config.leftDirection);
        }
    },

    /**
     *
     * @param event
     */
    onTankMoveDown: function(event) {
        var tank = event.eventData.eventTarget;
        if ((tank.y + this.config.ceilHeight2) + tank.speed > this.board.getBoardHeight()) {
            tank.move(this.config.downDirection, this.board.getBoardHeight() - (tank.y + this.config.ceilHeight2));
        } else {
            tank.move(this.config.downDirection);
        }
    },

    /**
     *
     * @param event
     */
    onTankMoveRight: function(event) {
        var tank = event.eventData.eventTarget;
        if ((tank.x + this.config.ceilWidth2) + tank.speed > this.board.getBoardWidth()) {
            tank.move(this.config.rightDirection,this.board.getBoardWidth() - (tank.x + this.config.ceilWidth2));
        } else {
            tank.move(this.config.rightDirection);
        }
    }
});