/**
 * Controlador del convertidor a canvas.
 * Created by mor on 6/07/16.
 */

var toCanvas = {
    convert: function (target, callback) {
        html2canvas(target, {
            onrendered: function (canvas) {
                var imgCanvas = canvas.toDataURL('image/png'),
                    image = '<img src="'+imgCanvas+'" alt="Caracter stats table"/>';
                if (callback) callback(imgCanvas);
            }
        });
    }
};