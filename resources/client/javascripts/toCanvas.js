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
                // TODO volver a habilitar la mierda de descarga cutre con winow.open, habria que convertir el MIME del dataUrl type a octet-stream
                if (callback) callback(url);
            }
        });
    }
};