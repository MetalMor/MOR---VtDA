/**
 * Objeto para controlar la apertura y cierre de overlays
 * Created by becari on 11/05/2016.
 */

var overlay = {
    /**
     * Cierra un elemento desplegable
     * @param id ID del elemento (string)
     */
    close: function(id, sp, callback) {
        var element = $("#"+id), speed = sp ? sp : 'fast';
        element.fadeOut(speed, function() {
            element.css('width', '0%');
            if(callback) callback();
        });
    },
    /**
     * Abre un elemento desplegable
     * @param id ID del elemento (string)
     */
    open: function(id, sp, callback) {
        var element = $("#"+id), speed = sp ? sp : 'fast';
        element.fadeIn(speed, function() {
            element.css('width', '100%');
            if(callback) callback();
        });
    },

    showAlert: function(id) {
        overlay.open(id, '100', function() {
            setTimeout(function() {
                overlay.close(id, '100', function() {
                    $('#emptyFields').css('width', '100%')
                });
            }, 2000);
        });
    }
};