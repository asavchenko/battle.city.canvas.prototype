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
            selectable: false
        });
    },
    rectangle: function(left, top, width, height){
        return new fabric.Rect({
            left: left,
            top: top,
            fill: '#000',
            width: width,
            height: height
        });
    },
    setColor: function(obj, color, fs){
        if(fs=='fill'){
            obj.fill = color;
        } else {
            obj.stroke = color
        }
        return obj;
    }

})
