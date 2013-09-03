/**
 * Obstacle brick object
 *
 * @category     Speroteck
 * @package      Speroteck_Obstacle
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
/**
 * @extends Speroteck.Object.Obstacle
 * @class Speroteck.Obstacle.Brick
 */
Speroteck.Object.Obstacle.Brick = Class.create(Speroteck.Object.Obstacle, {
    /**
     *
     */
    armor: 0,

    /**
     *
     */
    imgId: 'speroteck-image-brick',

    /**
     *
     */
    type: 'brick',

    /**
     *
     */
    destructionTypes: ['speroteck-image-brick-left',
        'speroteck-image-brick-right',
        'speroteck-image-brick-up',
        'speroteck-image-brick-down'],

    /**
     * {@inheritdoc}
     * @param $super {Speroteck.Object}
     * @param options {Object}
     */
    initialize: function($super, options) {
        this.armor = 2;
        $super(options);
        this.board.registerEventsPublisher(['brick_destroy', 'brick_update_before', 'brick_update_after'], this)
    },

    /**
     *
     * @returns {*}
     */
    acceptBullet: function(direction) {
        var x, y;
        this.armor -= 1;
        if (this.armor > 0) {
            this.dispatchEvent('brick_update_before');
            switch (direction) {
                case this.config.upDirection:
                    this.imageObj.destroy();
                    this.width = this.config.cellWidth;
                    this.height = this.config.cellHeight2;
                    this.y += this.config.cellHeight2 / 2;
                    this.imgId = this.destructionTypes[3];//down
                    break;
                case this.config.downDirection:
                    this.imageObj.destroy();
                    this.width = this.config.cellWidth;
                    this.height = this.config.cellHeight2;
                    this.y -= this.config.cellHeight2 / 2;
                    this.imgId = this.destructionTypes[2];//up
                    break;
                case this.config.leftDirection:
                    this.imageObj.destroy();
                    this.height = this.config.cellHeight;
                    this.width = this.config.cellWidth2;
                    this.x += this.config.cellWidth2 / 2;
                    this.imgId = this.destructionTypes[1];//right
                    break;
                case this.config.rightDirection:
                    this.imageObj.destroy();
                    this.height = this.config.cellHeight;
                    this.width = this.config.cellWidth2;
                    this.x -= this.config.cellWidth2 / 2;
                    this.imgId = this.destructionTypes[0];//left
                    break;
            }
            this.width2 = this.width/2;
            this.height2 = this.height/2;

            this.imageObj = new Speroteck.Image({
                canvas: this.canvas,
                imgElement: this.imgId,
                x: this.x,
                y: this.y
            });
            this.rectangle = undefined;
            this.dispatchEvent('brick_update_after');
        } else if (this.armor === 0) {
            this.imageObj.destroy();
            this.dispatchEvent('brick_destroy');
        }
    }
});