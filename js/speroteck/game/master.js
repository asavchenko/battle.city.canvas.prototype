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
        var yCollision = this.getCollisionsUp(tank);
        tank.setStopped(true);
        if (yCollision) {
            tank.y = yCollision + tank.speed;
        } else if (tank.y - tank.speed < tank.height2) {
            tank.y = tank.height2 + tank.speed;
        } else {
            tank.setStopped(false);
        }

        tank.move(this.config.upDirection);

    },

    /**
     *
     * @param event
     */
    onTankMoveLeft: function(event) {
        var tank = event.eventData.eventTarget;
        var xCollision;
        tank.setStopped(true);
        if (xCollision = this.getCollisionsLeft(tank)) {
            tank.x = xCollision + tank.speed;
        } else if (tank.x - tank.speed < tank.width2) {
            tank.x = tank.width2 + tank.speed;
        } else {
            tank.setStopped(false);
        }

        tank.move(this.config.leftDirection);
    },

    /**
     *
     * @param event
     */
    onTankMoveDown: function(event) {
        var tank = event.eventData.eventTarget;
        var yCollision;
        tank.setStopped(true);
        if (yCollision = this.getCollisionsDown(tank)) {
            tank.y = yCollision - tank.speed;
        } else if (tank.y + tank.speed + tank.height2 > this.board.getHeight()) {
            tank.y = this.board.getHeight() - tank.speed - tank.height2;
        } else {
            tank.setStopped(false);
        }

        tank.move(this.config.downDirection);
    },

    /**
     *
     * @param event
     */
    onTankMoveRight: function(event) {
        var tank = event.eventData.eventTarget;
        var xCollision = this.getCollisionsRight(tank);
        tank.setStopped(true);
        if (xCollision) {
            tank.x = xCollision - tank.speed;
        } else if (tank.x + tank.speed + tank.width2 > this.board.getWidth()) {
            tank.x = this.board.getWidth() - tank.speed - tank.width2;
        } else {
            tank.setStopped(false);
        }

        tank.move(this.config.rightDirection);
    },

    /**
     *
     * @param tank Speroteck.Object.Tank
     */
    getCollisionsUp: function(tank) {
        var x = parseInt(tank.x/this.config.cellWidth),
            y1 = parseInt((tank.y + this.config.cellHeight2)/this.config.cellHeight),
            y2 = parseInt((tank.y - this.config.cellHeight2- tank.speed)/this.config.cellHeight),
            yIntersection,
            tankTraces = undefined;
        for (var j = y1; j>= y2; --j)
            for (var i = x-1; i <= x+1; ++i)
                if (this.isCellForbidden(j, i) && this.isCellObject(j, i)
                    && (yIntersection = this.isIntersectionWithObstacleUp(
                    tankTraces = (typeof tankTraces === 'undefined' ? tank.getLineTracesUp() : tankTraces),
                    this.board.imgData[j][i])
                    )
                    )   return yIntersection;

        return false;
    },

    /**
     *
     * @param tank Speroteck.Object.Tank
     */
    getCollisionsDown: function(tank) {
        var x = parseInt(tank.x/this.config.cellWidth),
            y1 = parseInt((tank.y)/this.config.cellHeight),
            y2 = parseInt((tank.y + this.config.cellHeight2 + tank.speed)/this.config.cellHeight),
            yIntersection,
            tankTraces = undefined;
        for (var j = y1; j <= y2; ++j)
            for(var i = x-1; i <= x+1; ++i)
                if (this.isCellForbidden(j, i) && this.isCellObject(j, i)
                    && (yIntersection = this.isIntersectionWithObstacleDown(tankTraces = (tankTraces || tank.getLineTracesDown()),
                    this.board.imgData[j][i])
                    )
                    ) return yIntersection;

        return false;
    },

    /**
     *
     * @param tank Speroteck.Object.Tank
     */
    getCollisionsRight: function(tank) {
        var y = parseInt(tank.y/this.config.cellHeight),
            x1 = parseInt(tank.x/this.config.cellWidth),
            x2 = parseInt((tank.x + tank.width2 + tank.speed)/this.config.cellWidth),
            xIntersection,
            tankTraces = undefined;
        for (var j = x1; j <= x2; ++j)
            for (var i = y-1; i <= y+1; ++i)
                if (this.isCellForbidden(i, j) && this.isCellObject(i, j)
                    && (xIntersection = this.isIntersectionWithObstacleRight(tankTraces = (tankTraces || tank.getLineTracesRight()),
                    this.board.imgData[i][j])
                    )
                    ) return xIntersection;

        return false;
    },

    /**
     *
     * @param tank Speroteck.Object.Tank
     */
    getCollisionsLeft: function(tank) {
        var y = parseInt(tank.y/this.config.cellHeight),
            x1 = parseInt(tank.x/this.config.cellWidth),
            x2 = parseInt((tank.x - this.config.cellWidth2 - tank.speed)/this.config.cellWidth),
            xIntersection,
            tankTraces = undefined;
        for (var j = x1; j>= x2; --j)
            for (var i = y - 1; i <= y + 1; ++i)
                if (this.isCellForbidden(i, j) && this.isCellObject(i, j)
                    && (xIntersection = this.isIntersectionWithObstacleLeft(tankTraces = (tankTraces ||  tank.getLineTracesLeft()),
                    this.board.imgData[i][j])
                    )
                    ) return xIntersection;

        return false;
    },

    /**
     *
     * @param i {Number}
     * @param j {Number}
     * @returns {boolean}
     */
    isCellForbidden: function(i, j) {
        var isObject = this.isCellObject(i, j);
        return !(isObject && this.board.imgData[i][j].type === 'grass') || !isObject;
    },

    /**
     *
     * @param i {Number}
     * @param j {Number}
     */
    isCellObject: function(i, j) {
        return typeof this.board.imgData[i] !== 'undefined' && typeof this.board.imgData[i][j] !== 'undefined'
            && this.board.imgData[i][j] !== 0;
    },

    /**
     *
     * @param lines {object}
     * @param o Speroteck.Object.Obstacle
     * @returns {*}
     */
    isIntersectionWithObstacleUp: function(lines, o) {
        var bottomObstacleLine = o.getBottomLine();
        if (this.config.math.isIntersection(lines.l1, bottomObstacleLine)
            || this.config.math.isIntersection(lines.l2, bottomObstacleLine)) return o.y + o.height;

        return false;
    },

    /**
     *
     * @param lines {object}
     * @param o Speroteck.Object.Obstacle
     * @returns {*}
     */
    isIntersectionWithObstacleDown: function(lines, o) {
        var topObstacleLine = o.getTopLine();
        if (this.config.math.isIntersection(lines.l1, topObstacleLine)
            || this.config.math.isIntersection(lines.l2, topObstacleLine)) return o.y - o.height;

        return false;
    },

    /**
     *
     * @param lines {object}
     * @param o Speroteck.Object.Obstacle
     * @returns {*}
     */
    isIntersectionWithObstacleRight: function(lines, o) {
        var leftObstacleLine = o.getLeftLine();
        if (this.config.math.isIntersection(lines.l1, leftObstacleLine)
            || this.config.math.isIntersection(lines.l2, leftObstacleLine)) return o.x - o.width;

        return false;
    },

    /**
     *
     * @param lines {Object}
     * @param o Speroteck.Object.Obstacle
     * @returns {*}
     */
    isIntersectionWithObstacleLeft: function(lines, o) {
        var rightObstacleLine = o.getRightLine();
        if (this.config.math.isIntersection(lines.l1, rightObstacleLine)
            || this.config.math.isIntersection(lines.l2, rightObstacleLine)) return o.x + o.width;

        return false;
    }
});