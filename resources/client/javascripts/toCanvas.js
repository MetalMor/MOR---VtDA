/**
 * Controlador del convertidor a canvas.
 * Created by mor on 6/07/16.
 */

var toCanvas = {
    /**
     * Convierte un elemento en una imagen y llama al callback.
     * @param target Elemento a convertir.
     * @param callback Función a llamar una vez renderizada la imagen.
     */
    convert: function (target, callback) {
        html2canvas(target, {
            onrendered: function (canvas) {
                var getImgCanvas = function() {return canvas.toDataURL('image/png')},
                    image = new Image();
                image.src = getImgCanvas();
                //var url = image.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
                //var url = image.src.replace(/^data:image\/[^;]/, 'data:base64');
                if (callback) callback(image.src);
            }
        });
    }
};