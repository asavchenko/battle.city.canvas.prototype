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
     */
    rectangle: undefined,

    /**
     * {@inheritdoc}
     * @param $super {Speroteck.Object}
     * @param options {Object}
     */
    initialize: function($super, options) {
        this.rectangle = undefined;
        $super(options);
    },

    /**
     *
     * @param $super
     * @returns {*}
     */
    getRectangle: function($super) {
        return typeof this.rectangle !== 'undefined'
            ? this.rectangle
            : this.rectangle = $super();
    }
});