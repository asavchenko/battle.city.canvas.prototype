/**
 * Some math stuffs
 *
 * @category     Speroteck
 * @package      Speroteck_Math
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */


Object.extend(Speroteck.Game.config, {
math: {
    /**
     *
     * @param n
     * @returns {number}
     */
    random: function(n) {
        return Math.floor((Math.random()*n + 1));
    },

    /**
     * see http://devmag.org.za/2009/04/17/basic-collision-detection-in-2d-part-2/ for reference
     * @param l1 {Speroteck.Game.config.math.Line}
     * @param l2 {Speroteck.Game.config.math.Line}
     * @returns {boolean}
     */
    isIntersection: function(l1, l2) {
        var dl1x = l1.B.x - l1.A.x;
        var dl2x = l2.B.x - l2.A.x;
        var dl1y = l1.B.y - l1.A.y;
        var dl2y = l2.B.y - l2.A.y;
        var d = dl2y * dl1x - dl2x * dl1y;
        if (d == 0) return false;
        var dl12x = l1.A.x - l2.A.x;
        var dl12y = l1.A.y - l2.A.y;
        var ua = (dl2x * dl12y - dl2y * dl12x) / d;
        var ub = (dl1x * dl12y - dl1y * dl12x) / d;

        return !(ua < 0 || ua > 1 || ub < 0 || ub > 1);
    },

    /**
     *
     *  (A) .... (B)
     */
    Line: Class.create({
        /**
         *
         */
        A: {x: 0, y: 0},

        /**
         *
         */
        B: {x: 0, y: 0},

        /**
         *
         * @param coords
         */
        initialize: function(coords) {
            coords = coords || [0, 0, 0, 0];
            this.A = {x: coords[0], y: coords[1]};
            this.B = {x: coords[2], y: coords[3]};
        }
    }),

    /**
     * (A) ..... (B)
     *     .   .
     *     .   .
     * (D) ..... (C)
     */
    Rectangle: Class.create({
        /**
         *
         */
        A: {x: 0, y: 0},

        /**
         *
         */
        B: {x: 0, y: 0},

        /**
         *
         */
        C: {x: 0, y: 0},

        /**
         *
         */
        D: {x: 0, y: 0},
        x: 0, y: 0,
        width: 0, height: 0,
        top:0, left:0, right:0, bottom:0,
        topLine: undefined, bottomLine: undefined, leftLine: undefined, rightLine: undefined,

        /**
         *
         * @param coords
         */
        initialize: function(coords) {
            coords = coords || [0, 0, 0, 0, 0, 0, 0, 0];
            this.A = {x: coords[0], y: coords[1]};
            this.B = {x: coords[2], y: coords[3]};
            this.C = {x: coords[4], y: coords[5]};
            this.D = {x: coords[6], y: coords[7]};
            this.top = undefined;
            this.bottom = undefined;
            this.left = undefined;
            this.right = undefined;
            this.topLine = undefined; this.getTopLine();
            this.bottomLine = undefined; this.getBottomLine();
            this.leftLine = undefined; this.getLeftLine();
            this.rightLine = undefined; this.getRightLine();
            this.width = this.right-this.left;
            this.height = this.bottom-this.top;
            this.x = (this.getRight() + this.getLeft())/2;
            this.y = (this.getBottom() + this.getTop())/2;
        },

        /**
         *
         * @returns {number}
         */
        getLeft: function() {
            return typeof this.left !== 'undefined'
                ? this.left
                : (this.left = Math.min(this.A.x, this.B.x, this.C.x, this.D.x));
        },

        /**
         *
         * @returns {number}
         */
        getRight: function() {
            return typeof this.right !== 'undefined'
                ? this.right
                : (this.right = Math.max(this.A.x, this.B.x, this.C.x, this.D.x));
        },

        /**
         *
         * @returns {number}
         */
        getTop: function() {
            return typeof this.top !== 'undefined'
                ? this.top
                : (this.top = Math.min(this.A.y, this.B.y, this.C.y, this.D.y));
        },

        /**
         *
         * @returns {number}
         */
        getBottom: function() {
            return typeof this.bottom !== 'undefined'
                ? this.bottom
                : (this.bottom = Math.max(this.A.y, this.B.y, this.C.y, this.D.y));
        },

        /**
         *
         * @returns {Speroteck.Game.config.math.Line}
         */
        getBottomLine: function() {
            return typeof this.bottomLine !== 'undefined'
                ? this.bottomLine
                : (this.bottomLine = this.getLine(this.getLeft(), this.getBottom(), this.getRight(), this.getBottom()));
        },

        /**
         *
         * @returns {Speroteck.Game.config.math.Line}
         */
        getTopLine: function() {
            return typeof this.topLine !== 'undefined'
                ? this.topLine
                : this.topLine = this.getLine(this.getLeft(), this.getTop(), this.getRight(), this.getTop())
        },

        /**
         *
         * @returns {Speroteck.Game.config.math.Line}
         */
        getRightLine: function() {
            return typeof this.rightLine !== 'undefined'
                ? this.rightLine
                : (this.rightLine = this.getLine(this.getRight(), this.getTop(), this.getRight(), this.getBottom()))
        },

        /**
         *
         * @returns {Speroteck.Game.config.math.Line}
         */
        getLeftLine: function() {
            return typeof this.leftLine !== 'undefined'
                ? this.leftLine
                : (this.leftLine = this.getLine(this.getLeft(), this.getTop(), this.getLeft(), this.getBottom()))
        },

        /**
         *
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         * @returns {Speroteck.Game.config.math.Line}
         */
        getLine: function(x1, y1, x2, y2) {
            return new Speroteck.Game.config.math.Line([x1, y1, x2, y2]);
        }
    })
}});