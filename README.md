battle.city.canvas.prototype
============================

The game battle city written with canvas and prototype.js


to run a game you need to have nodejs installed:
>node server-node.js

go in browser http://127.0.0.1:8124/index.html

============================
to update combined file run next command
java -jar js/compiler.jar --js js/libs/prototype.js js/libs/fabric.js js/libs/events.js js/libs/loose.quad.tree.js js/speroteck/game.js js/speroteck/game/config.js js/speroteck/game/math.js js/speroteck/image.js js/speroteck/object.js js/speroteck/obstacle.js js/speroteck/obstacle/brick.js js/speroteck/obstacle/grass.js js/speroteck/obstacle/water.js js/speroteck/obstacle/concrete.js js/speroteck/obstacle/concrete/right.js js/speroteck/obstacle/concrete/left.js js/speroteck/obstacle/concrete/up.js js/speroteck/obstacle/concrete/down.js js/speroteck/obstacle/home.js js/speroteck/tank.js js/speroteck/tank/m1.js js/speroteck/tank/m2.js js/speroteck/tank/m3.js js/speroteck/tank/m4.js js/speroteck/tank/m5.js js/speroteck/bullet.js js/speroteck/game/board.js js/speroteck/game/player.js js/speroteck/game/ai.js js/speroteck/game/master.js --js_output_file=js/battle.city.js