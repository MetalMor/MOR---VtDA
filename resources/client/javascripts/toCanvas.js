/**
 * Controlador del convertidor a canvas.
 * Created by mor on 6/07/16.
 */

var toCanvas = {
    convert: function (target, callback) {
        html2canvas(target, {
            onrendered: function (canvas) {
                var getImgCanvas = function() {return canvas.toDataURL('image/png')},
                    image = new Image();
                image.src = getImgCanvas();
                var url = image.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
                if (callback) callback(url);
            }
        });
    }
};