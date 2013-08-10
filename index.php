<?php
/**
 * Index for some ajaxes
 *
 * @category     Speroteck
 * @package      Speroteck_Ajax
 * @copyright    Copyright (c) 2013 Speroteck Inc. (www.speroteck.com)
 * @author       Speroteck team (dev@speroteck.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
if (isset($_GET['level'])) {
    for($i=0, $level = $_GET['level']; $i<=abs(strlen($_GET['level'])-4) && strlen($level) <4; $i++) {
        $level = '0' . $level;
    }
    echo json_encode(
        array(
            'map' => file_get_contents('data/level-' . $level . '.txt'),
            'zmap' => file_get_contents('data/z-level-' . $level . '.txt')
        )
    );
}