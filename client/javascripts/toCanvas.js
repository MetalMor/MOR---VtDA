/**
 * Controlador del convertidor a canvas.
 * Created by mor on 6/07/16.
 */

var toCanvas = {
    convert: function (target, callback) {
        html2canvas(target, {
            onrendered: function (canvas) {
                var imgCanvas = canvas.toDataURL('image/png');
                if (callback) callback(imgCanvas);
            }
        });
    }
};