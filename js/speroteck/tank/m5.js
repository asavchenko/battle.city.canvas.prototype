/**
 * Tank object
 *
 * @category     Speroteck
 * @package      Speroteck_Tank
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * @extends Speroteck.Object.Tank
 * @class Speroteck.Object.Tank.M5
 */
Speroteck.Object.Tank.M5 = Class.create(Speroteck.Object.Tank, {
    imgId: 'speroteck-image-player',
    speed: 4,
    type: 'player'
});