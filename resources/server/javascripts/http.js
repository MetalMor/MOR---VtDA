/**
 * Propiedades de las cabeceras HTTP predefinidas.
 * Created by becari on 30/06/2016.
 */
var util = require('../../both/javascripts/util'),
    constants = require('../../../objects/constants/Constants').server,
    Header = require('../../../objects/system/Header');

var http = {
    /**
     * Lista de cabeceras que se añadirán a las respuestas HTTP.
     */
    list: [
        new Header('X-Frame-Options', 'DENY'),
        new Header('X-XSS-Protection', '1'),
        new Header('X-Content-Type-Options', 'nosniff'),
        new Header('X-Clacks-Overhead', 'GNU Terry Pratchett')
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
     * Genera una cabecera Content-Length con el valor numérico especificado.
     * @param res Objeto respuesta HTTP.
     * @param length Valor numérico de longitud del contenido del mensaje HTTP.
     */
    contentLength: function(res, length) {
        if(!isNaN(length))
            res.setHeader('Content-Length', length);
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
    },
    goToLogin: function(res) {
        res.redirect(constants.routes.root);
    }
};

module.exports = http;