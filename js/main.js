/**
 * Created with JetBrains PhpStorm.
 * User: george
 * Date: 19.07.13
 * Time: 17:09
 * To change this template use File | Settings | File Templates.
 */
document.observe('dom:loaded', function(){
    var context1 = $('layer1').getContext('2d');
    var context2 = $('layer1').getContext('2d');
    var context3 = $('layer1').getContext('2d');

    //line
    context1.beginPath();
    context1.moveTo(50, 50);
    context1.lineTo(100, 100);
    context1.lineWidth = 15;
    context1.lineCap = 'round';
    context1.strokeStyle = '#ff0000';
    context1.stroke();

    //circle
    context1.beginPath();
    context1.arc(100, 100, 10, 0, 2 * Math.PI, false);
    context1.fillStyle = 'green';
    context1.fill();
    context1.lineWidth = 5;
    context1.strokeStyle = '#003300';
    context1.globalAlpha = 0.5; //transparensy
    context1.stroke();
    context1.globalAlpha=1;

    //arc
    context2.beginPath();
    context2.arc(100, 120, 75, 1.1 * Math.PI, 1.9 * Math.PI, false);
    context2.lineWidth = 15;
    context2.strokeStyle = '#000000';
    context2.stroke();

    //Semicircle
    context2.beginPath();
    context2.arc(210, 30, 12, 0, Math.PI, true);
    context2.closePath();
    context2.lineWidth = 1;
    context2.fillStyle = 'yellow';
    context2.fill();
    context2.strokeStyle = '#550000';
    context2.stroke();

    //rectangle
    context3.beginPath();
    context3.rect(200, 40, 20, 100);
    context3.fillStyle = 'yellow';
    context3.fill();
    context3.lineWidth = 1;
    context3.strokeStyle = 'black';
    context3.stroke();

    //text
    context2.font = 'italic 40pt Calibri';
    context2.fillStyle = 'black';
    context2.fillText('Hello World!', 300, 100);
    context2.strokeStyle = 'blue';
    context2.strokeText('Hello World!', 300, 200);

})

//alexey's code
/**
 * Base JavaScript classes of checkitout
 */

if (typeof window.Speroteck == 'undefined') {
    // Initiliaze namespace if it isn't defined yet
    window.Speroteck = {};
}

Speroteck.TestClass = Class.create({
    name: '',

    initialize: function(msg) {
        this.name = msg;
    },

    showName: function() {
        console.log(this.name);
    }
});