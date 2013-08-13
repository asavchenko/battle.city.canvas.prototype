/**
 * Global config object
 *
 * @category     Speroteck
 * @package      Speroteck_Game
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

if (typeof Speroteck.Game.config === 'undefined') {
    /**
     * @global
     * @type {{}}
     */
    Speroteck.Game.config = {};
}

Object.extend(Speroteck.Game.config, {
    numCellHor: 20,
    numCellVer: 20,
    ceilWidth: 32,
    ceilHeight: 32,
    ceilWidth2: 16,
    ceilHeight2: 16,
    upDirection: 360,
    leftDirection: 270,
    downDirection: 180,
    rightDirection: 90
});