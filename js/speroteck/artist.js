/**
 * Created with JetBrains PhpStorm.
 * User: george
 * Date: 22.07.13
 * Time: 18:48
 * To change this template use File | Settings | File Templates.
 */

if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}
Speroteck.Artist = Class.create({

    initialize: function ()
    {
        console.log('lets start');
    },
    line: function(coords){
        return new fabric.Line(coords, {
            strokeWidth: 5,
            stroke: '#000',
            selectable: false
        });
    },
    rectangle: function(left, top, width, height){
        return new fabric.Rect({
            left: left,
            top: top,
            fill: '#000',
            stroke: '#red',
            width: width,
            height: height
        });
    },
    setColorStroke: function(obj, color){
        obj.stroke = color
        return obj;
    },
    setColorFill: function(obj, color){
        obj.fill = color;
        return obj;
    },
    text: function(left, top, msg){
        return new fabric.Text(msg, {
            fontFamily: 'Arial',
            fontSize: 20,
            left: left,
            top: top,
            fill: 'black',
            originY: 'center'
        });
    }

})
