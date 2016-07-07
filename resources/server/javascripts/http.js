/**
 * Propiedades de las cabeceras HTTP predefinidas.
 * Created by becari on 30/06/2016.
 */
var util = require('../../both/javascripts/util');

var http = {
    /**
     * Lista de cabeceras que se añadirán a las respuestas HTTP.
     */
    list: [
        {
            nm: 'X-Frame-Options',
            val: 'DENY'
        },{
            nm: 'X-XSS-Protection',
            val: '1'
        },{
            nm: 'X-Content-Type-Options',
            val: 'nosniff'
        },{
            nm: 'X-Clacks-Overhead',
            val: 'GNU Terry Pratchet'
        }
    ],
    /**
     * Genera una cabecera Content-Type del tipo especificado.
     * @param res Objeto respuesta HTTP.
     * @param type Tipo de contenido del mensaje HTTP.
     */
    contentType: function(res, type) {
        res.setHeader('Content-Type', type);
    },
    /**
     * Añade las cabeceras de la lista al objeto respuesta HTTP.
     * @param req Objeto petición HTTP.
     * @param res Objeto respuesta HTTP.
     * @param next Callback, pasa al siguiente middleware.
     */
    addHeaders: function (req, res, next) {
        var list = http.list, h, cur;
        for (h in list) {
            cur = list[h];
            res.setHeader(cur.nm, cur.val);
        }
        next();
    }
};

module.exports = http;