/**
 * Obstacle concrete object
 *
 * @category     Speroteck
 * @package      Speroteck_Obstacle
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
/**
 * @extends Speroteck.Object.Obstacle.Concrete
 * @class Speroteck.Obstacle.Concrete.Up
 */
Speroteck.Object.Obstacle.Concrete.Up = Class.create(Speroteck.Object.Obstacle.Concrete, {
    /**
     *
     */
    imgId: 'speroteck-image-concrete-up',

    /**
     *
     * @param $super
     * @param options
     */
    initialize: function($super, options){
        options = options || {};
        options.width = this.config.cellWidth;
        options.height = this.config.cellHeight2;
        options.y = options.y - (this.config.cellHeight2 / 2);
        $super(options);
    }
});