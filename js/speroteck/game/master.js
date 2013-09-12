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
     *
     */
    objTree: undefined,

    /**
     * @constructor
     * @param options
     */
    initialize: function (options) {
        options = options || {};
        this.board = options.board;
        this.objTree = this.board.objTree;
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
     * param obj
     * @returns {*}
     */
    removeFromTree: function(obj) {
        this.objTree.remove(obj.getRectangle());
        return this;
    },

    /**
     *
     * @param obj
     * @returns {*}
     */
    addToTree: function(obj) {
        this.objTree.add(obj.getRectangle());
        return this;
    },

    /**
     *
     * @param obj
     * @returns {Array}
     */
    getTreeNeighbours: function(obj) {
        return this.objTree.getObjects(obj.getRectangle())
    },

    /**
     *
     * @param event
     */
    onTankMoveUp: function(event) {
        var tank = event.eventData.eventTarget;
        this.removeFromTree(tank);
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
        this.addToTree(tank);
    },

    /**
     *
     * @param event
     */
    onTankMoveLeft: function(event) {
        var tank = event.eventData.eventTarget;
        this.removeFromTree(tank);
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
        this.addToTree(tank);
    },

    /**
     *
     * @param event
     */
    onTankMoveDown: function(event) {
        var tank = event.eventData.eventTarget;
        this.removeFromTree(tank);
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
        this.addToTree(tank);
    },

    /**
     *
     * @param event
     */
    onTankMoveRight: function(event) {
        var tank = event.eventData.eventTarget;
        this.removeFromTree(tank);
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
        this.addToTree(tank);
    },

    /**
     *
     * @param tank Speroteck.Object.Tank
     */
    getCollisionsUp: function(tank) {
        var objects = this.getTreeNeighbours(tank), yIntersection, tankTraces = undefined;
        for (var i= 0, l = objects.length; i<l; ++i) {
            if (yIntersection = this.isIntersectionWithObstacleUp(
                    tankTraces = (typeof tankTraces === 'undefined' ? tank.getLineTracesUp() : tankTraces),
                    objects[i]
                )) return yIntersection + tank.height2;
        }

        return false;
    },

    /**
     *
     * @param tank Speroteck.Object.Tank
     */
    getCollisionsDown: function(tank) {
        var objects = this.getTreeNeighbours(tank), yIntersection, tankTraces = undefined;
        for (var i= 0, l = objects.length; i<l; ++i) {
            if (yIntersection = this.isIntersectionWithObstacleDown(
                tankTraces = (typeof tankTraces === 'undefined' ? tank.getLineTracesDown() : tankTraces),
                objects[i]
            )) return yIntersection-tank.height2;
        }

        return false;
    },

    /**
     *
     * @param tank Speroteck.Object.Tank
     */
    getCollisionsRight: function(tank) {
        var objects = this.getTreeNeighbours(tank), xIntersection, tankTraces = undefined;
        for (var i= 0, l = objects.length; i<l; ++i) {
            if (xIntersection = this.isIntersectionWithObstacleRight(
                tankTraces = (typeof tankTraces === 'undefined' ? tank.getLineTracesRight() : tankTraces),
                objects[i]
            )) return xIntersection-tank.width2;
        }

        return false;
    },

    /**
     *
     * @param tank Speroteck.Object.Tank
     */
    getCollisionsLeft: function(tank) {
        var objects = this.getTreeNeighbours(tank), xIntersection, tankTraces = undefined;
        for (var i= 0, l = objects.length; i<l; ++i) {
            if (xIntersection = this.isIntersectionWithObstacleLeft(
                tankTraces = (typeof tankTraces === 'undefined' ? tank.getLineTracesLeft() : tankTraces),
                objects[i]
            )) return xIntersection + tank.width2;
        }

        return false;
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
            || this.config.math.isIntersection(lines.l2, bottomObstacleLine)) return o.getBottom()+0.5;

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
            || this.config.math.isIntersection(lines.l2, topObstacleLine)) return o.getTop()-0.5;

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
            || this.config.math.isIntersection(lines.l2, leftObstacleLine)) return o.getLeft()-0.5;

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
            || this.config.math.isIntersection(lines.l2, rightObstacleLine)) return o.getRight()+0.5;

        return false;
    }
});