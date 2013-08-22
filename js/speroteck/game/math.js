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
     * @param l1 {math.Line}
     * @param l2 {math.Line}
     * @returns {boolean}
     */
    isIntersection: function(l1, l2) {
        var d = (l2.B.y - l2.A.y) * (l1.B.x - l1.A.x) - (l2.B.x - l2.A.x) * (l1.B.y - l1.A.y);
        if (d == 0) return false;
        var ua = ((l2.B.x - l2.A.x) * (l1.A.y - l2.A.y) - (l2.B.y - l2.A.y) * (l1.A.x - l2.A.x)) / d;
        var ub = ((l1.B.x - l1.A.x) * (l1.A.y - l2.A.y) - (l1.B.y - l1.A.y) * (l1.A.x - l2.A.x)) / d;

        return !(ua < 0 || ua > 1 || ub < 0 || ub > 1);
    },

    /**
     *
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
    })
}});