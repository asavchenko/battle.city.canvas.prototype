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
    cellWidth: 32,
    cellHeight: 32,
    cellWidth2: 16,
    cellHeight2: 16,
    numCellsHor: 20,
    numCellsVer: 20,
    upDirection: 360,
    leftDirection: 270,
    downDirection: 180,
    rightDirection: 90,
    renderInterval: 20
});

isSet = function(x) {
    return typeof x !== 'undefined';
};