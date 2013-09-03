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
        this.listenForEvent(this.board, 'bullet_move_up');
        this.listenForEvent(this.board, 'bullet_move_left');
        this.listenForEvent(this.board, 'bullet_move_down');
        this.listenForEvent(this.board, 'bullet_move_right');
        this.listenForEvent(this.board, 'bullet_destroy');
        this.listenForEvent(this.board, 'tank_destroy');
        this.listenForEvent(this.board, 'brick_destroy');
        this.listenForEvent(this.board, 'brick_update_before');
        this.listenForEvent(this.board, 'brick_update_after');
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
        this.objTree.add(obj.getRectangle(), obj);

        return this;
    },

    /**
     *
     * @param obj
     * @returns {Array}
     */
    getTreeNeighbours: function(obj) {
        return this.objTree.getObjects(obj.getRectangle());
    },

    /**
     *
     * @param event
     */
    onTankMoveUp: function(event) {
        var tank = event.eventData.eventTarget, yCollision;
        this.removeFromTree(tank);
        tank.setStopped(true);
        if (yCollision = this.getCollisionsUp(tank)) {
            tank.y = yCollision.y + tank.speed;
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
        var tank = event.eventData.eventTarget, xCollision;
        this.removeFromTree(tank);
        tank.setStopped(true);
        if (xCollision = this.getCollisionsLeft(tank)) {
            tank.x = xCollision.x + tank.speed;
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
        var tank = event.eventData.eventTarget, yCollision;
        this.removeFromTree(tank);
        tank.setStopped(true);
        if (yCollision = this.getCollisionsDown(tank)) {
            tank.y = yCollision.y - tank.speed;
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
        var tank = event.eventData.eventTarget,
            xCollision;
        this.removeFromTree(tank);
        tank.setStopped(true);
        if (xCollision = this.getCollisionsRight(tank)) {
            tank.x = xCollision.x - tank.speed;
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
     * @param event
     */
    onBulletMoveUp: function(event) {
        var bullet = event.eventData.eventTarget,
            yCollision;
        this.removeFromTree(bullet);
        if (yCollision = this.getCollisionsUp(bullet)) {
            bullet.y = yCollision.y + bullet.speed;
            yCollision.object.acceptBullet(this.config.downDirection);
            bullet.destroy();
        } else if (bullet.y - bullet.speed < bullet.height2) {
            bullet.y = bullet.height2 + bullet.speed;
            bullet.destroy();
        } else {
            bullet.move(this.config.upDirection);
            this.addToTree(bullet);
        }
    },

    /**
     *
     * @param event
     */
    onBulletMoveLeft: function(event) {
        var bullet = event.eventData.eventTarget,
            xCollision;
        this.removeFromTree(bullet);
        if (xCollision = this.getCollisionsLeft(bullet)) {
            bullet.x = xCollision.x + bullet.speed;
            xCollision.object.acceptBullet(this.config.rightDirection);
            bullet.destroy();
        } else if (bullet.x - bullet.speed < bullet.width2) {
            bullet.x = bullet.width2 + bullet.speed;
            bullet.destroy();
        } else {
            bullet.move(this.config.leftDirection);
            this.addToTree(bullet);
        }
    },

    /**
     *
     * @param event
     */
    onBulletMoveDown: function(event) {
        var bullet = event.eventData.eventTarget,
            yCollision;
        this.removeFromTree(bullet);

        if (yCollision = this.getCollisionsDown(bullet)) {
            bullet.y = yCollision.y - bullet.speed;
            yCollision.object.acceptBullet(this.config.upDirection);
            bullet.destroy();
        } else if (bullet.y + bullet.speed + bullet.height2 > this.board.getHeight()) {
            bullet.y = this.board.getHeight() - bullet.speed - bullet.height2;
            bullet.destroy();
        } else {
            bullet.move(this.config.downDirection);
            this.addToTree(bullet);
        }
    },

    /**
     *
     * @param event {object}
     */
    onBulletMoveRight: function(event) {
        var bullet = event.eventData.eventTarget, xCollision;
        this.removeFromTree(bullet);
        if (xCollision = this.getCollisionsRight(bullet)) {
            bullet.x = xCollision.x - bullet.speed;
            xCollision.object.acceptBullet(this.config.leftDirection);
            bullet.destroy();
        } else if (bullet.x + bullet.speed + bullet.width2 > this.board.getWidth()) {
            bullet.x = this.board.getWidth() - bullet.speed - bullet.width2;
            bullet.destroy();
        } else {
            bullet.move(this.config.rightDirection);
            this.addToTree(bullet);
        }
    },

    /**
     *
     * @param event {object}
     */
    onBulletDestroy: function(event) {
        var bullet = event.eventData.eventTarget,
            owner = bullet.getOwner();
        this.removeFromTree(bullet);
        owner.removeBullet(bullet);
    },

    /**
     *
     * @param event {object}
     */
    onTankDestroy: function(event) {
        var tank = event.eventData.eventTarget;
        this.removeFromTree(tank);
        this.board.ai.removeFromSquad(tank);
    },

    /**
     *
     * @param event {object}
     */
    onBrickDestroy: function(event) {
        var brick = event.eventData.eventTarget;
        this.removeFromTree(brick);
    },

    /**
     *
     * @param event {object}
     */
    onBrickUpdateBefore: function(event) {
        var brick = event.eventData.eventTarget;
        this.removeFromTree(brick);
    },

    /**
     *
     * @param event {object}
     */
    onBrickUpdateAfter: function(event) {
        var brick = event.eventData.eventTarget;
        this.addToTree(brick);
    },

    /**
     *
     * @param obj Speroteck.Object
     */
    getCollisionsUp: function(obj) {
        var objects = this.getTreeNeighbours(obj), yIntersection, objTraces = undefined, i, l;
        for (i= 0, l = objects.length; i < l; i += 1) {
            if (yIntersection = this.isIntersectionWithObstacleUp(
                    objTraces = (typeof objTraces === 'undefined' ? obj.getLineTracesUp() : objTraces),
                    objects[i][0]
                )) return {y: yIntersection + obj.height2, object: objects[i][1]};
        }

        return false;
    },

    /**
     *
     * @param obj Speroteck.Object
     */
    getCollisionsDown: function(obj) {
        var objects = this.getTreeNeighbours(obj), yIntersection, objTraces = undefined, i, l;
        for (i= 0, l = objects.length; i<l; i += 1) {
            if (yIntersection = this.isIntersectionWithObstacleDown(
                objTraces = (typeof objTraces === 'undefined' ? obj.getLineTracesDown() : objTraces),
                objects[i][0]
            )) return {y: yIntersection-obj.height2, object: objects[i][1]};
        }

        return false;
    },

    /**
     *
     * @param obj Speroteck.Object
     */
    getCollisionsRight: function(obj) {
        var objects = this.getTreeNeighbours(obj), xIntersection, objTraces = undefined, i, l;
        for (i= 0, l = objects.length; i < l; i += 1) {
            if (xIntersection = this.isIntersectionWithObstacleRight(
                objTraces = (typeof objTraces === 'undefined' ? obj.getLineTracesRight() : objTraces),
                objects[i][0]
            )) return {x: xIntersection - obj.width2, object: objects[i][1]};
        }

        return false;
    },

    /**
     *
     * @param obj Speroteck.Object
     */
    getCollisionsLeft: function(obj) {
        var objects = this.getTreeNeighbours(obj), xIntersection, objTraces = undefined, i, l;
        for (i = 0, l = objects.length; i < l; i += 1) {
            if (xIntersection = this.isIntersectionWithObstacleLeft(
                objTraces = (typeof objTraces === 'undefined' ? obj.getLineTracesLeft() : objTraces),
                objects[i][0]
            )) return {x: xIntersection + obj.width2, object: objects[i][1]};
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