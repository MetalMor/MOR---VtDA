/**
 * Objeto de constantes de las cabeceras respuesta HTTP.
 * Created by becari on 14/07/2016.
 */

var Header = require('../../../system/Header');

var headers = {
    list: [
        new Header('X-Frame-Options', 'DENY'),
        new Header('X-XSS-Protection', '1'),
        new Header('X-Content-Type-Options', 'nosniff'),
        new Header('X-Clacks-Overhead', 'GNU Terry Pratchet')
    ]
};

module.exports = headers;