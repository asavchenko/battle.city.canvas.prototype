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
        this.listenForEvent(this.board, 'tank_move_up');
        this.listenForEvent(this.board, 'tank_move_left');
        this.listenForEvent(this.board, 'tank_move_down');
        this.listenForEvent(this.board, 'tank_move_right');
    },

    /**
     *
     * @param event
     */
    onTankMoveUp: function(event) {
        var tank = event.eventData.eventTarget;
        if (tank.y - tank.speed < this.config.cellHeight2) {
            tank.y = this.config.cellHeight + tank.speed;
        } else if (!this.checkCollisions(tank.x, tank.y-tank.speed-this.config.cellHeight2)) {
            tank.y = tank.y + tank.speed;
        }
        tank.move(this.config.upDirection);

    },

    /**
     *
     * @param event
     */
    onTankMoveLeft: function(event) {
        var tank = event.eventData.eventTarget;
        if (tank.x - tank.speed < this.config.cellWidth2) {
            tank.x = this.config.cellWidth2 + tank.speed;
        }  else if (!this.checkCollisions(tank.x- tank.speed-this.config.cellWidth2, tank.y)) {
            tank.x = tank.x + tank.speed;
        }
        tank.move(this.config.leftDirection);
    },

    /**
     *
     * @param event
     */
    onTankMoveDown: function(event) {
        var tank = event.eventData.eventTarget;
        if (tank.y + tank.speed > this.board.getHeight()) {
            tank.y = this.board.getHeight() - tank.speed;
        } else if (!this.checkCollisions(tank.x, tank.y + tank.speed+this.config.cellHeight2)) {
            tank.y = tank.y - tank.speed;
        }
        tank.move(this.config.downDirection);

    },

    /**
     *
     * @param event
     */
    onTankMoveRight: function(event) {
        var tank = event.eventData.eventTarget;
        if (tank.x + tank.speed > this.board.getWidth()) {
            tank.x = this.board.getWidth() - tank.speed;
        } else if (!this.checkCollisions(tank.x + tank.speed+this.config.cellWidth2, tank.y)) {
            tank.x = tank.x - tank.speed;
        }

        tank.move(this.config.rightDirection);
    },

    /**
     *
     * @param x
     * @param y
     * @returns {boolean}
     */
    checkCollisions: function(x, y) {
        var cx = parseInt(x/this.config.cellWidth),
            cy =  parseInt(y/this.config.cellHeight);
        return (typeof this.board.imgData[cy] !== 'undefined'
        && typeof this.board.imgData[cy][cx] !== 'undefined'
        && (this.board.imgData[cy][cx] == 0 || this.board.imgData[cy][cx].type === 'grass'));
    }
});