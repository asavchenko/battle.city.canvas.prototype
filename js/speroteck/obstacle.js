/**
 * Obstacle object
 *
 * @category     Speroteck
 * @package      Speroteck_Obstacle
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * @requires object
 * @namespace Speroteck.Object.Obstacle
 * @extends Speroteck.Object
 * @class Speroteck.Object.Obstacle
 */
Speroteck.Object.Obstacle = Class.create(Speroteck.Object, {
    /**
     *
     * @returns {math.Line}
     */
    getBottomLine: function() {
        return new this.config.math.Line([
            this.x - this.width2, this.y + this.height2,
            this.x + this.width2, this.y + this.height2
        ]);
    },

    /**
     *
     * @returns {math.Line}
     */
    getTopLine: function() {
        return new this.config.math.Line([
            this.x - this.width2, this.y - this.height2,
            this.x + this.width2, this.y - this.height2
        ]);
    },
    /**
     *
     * @returns {math.Line}
     */
    getRightLine: function() {
        return new this.config.math.Line([
            this.x + this.width2, this.y - this.height2,
            this.x + this.width2, this.y + this.height2
        ]);
    },

    /**
     *
     * @returns {math.Line}
     */
    getLeftLine: function() {
        return new this.config.math.Line([
            this.x - this.width2, this.y - this.height2,
            this.x - this.width2, this.y + this.height2
        ]);
    }
});