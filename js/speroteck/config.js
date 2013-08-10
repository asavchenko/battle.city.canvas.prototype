/**
 * Global config object
 *
 * @category     Speroteck
 * @package      Speroteck_Config
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}

if (typeof Speroteck.config == 'undefined') {
    Speroteck.config = {};
}

Object.extend(Speroteck.config, {
    ceilWidth: 32,
    ceilHeight: 32,
    ceilWidth2: 16,
    ceilHeight2: 16
});