/**
 * Controlador de llamadas AJAX.
 * Created by mor on 16/06/16.
 */

var ajax = {
    /**
     * Contenedor de las diferentes rutas usadas en peticiones AJAX.
     */
    paths: {
        initChar: '/game/initChar',
        download: '/game/downloadSheet'
    },
    /**
     * Llamada AJAX genérica.
     * @param url String URL del path del servidor.
     * @param callback Función llamada al recibir una respuesta con éxito.
     */
    ajaxCall: function (url, data, callback) {
        var options = {
            url: url,
            cache: false,
            data: "data="+data,
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                logger.log("ajax", "request sent to " + url + ", success");
                if (util.type(util.func, callback))
                    callback(data, textStatus, jqXHR);
            }
        };
        $.ajax(options);
    },
    request: function (requested, data, callback) {
        ajax.ajaxCall(ajax.paths[requested], data,
            function (ch, textStatus, jqXHR) {
                if (util.type(util.func, callback))
                    callback(ch, textStatus, jqXHR);
            });
    }
};