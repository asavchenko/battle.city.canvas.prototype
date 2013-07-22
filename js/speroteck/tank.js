/**
 * Created with JetBrains PhpStorm.
 * User: george
 * Date: 22.07.13
 * Time: 21:53
 * To change this template use File | Settings | File Templates.
 */

if (typeof window.Speroteck == 'undefined') {
    window.Speroteck = {};
}
Speroteck.Tank = Class.create({
    line : null,
    rectangle: null,
    text: null,
    initialize: function (left, top, direction)
    {
        switch (direction) {
            case 'top':
                this.line = artist.line([left, top - 50, left, top - 25]),
                    this.rectangle = artist.rectangle(left, top, 50, 50),
                    this.text = artist.text(left, top, '5')
                break;
            case 'right':
                break;
            case 'left':
                break;
            default:
                alert("The end");
                break;
        }

    },
    show: function(canvas){
        canvas.add(this.line, this.rectangle, this.text);
    }
})