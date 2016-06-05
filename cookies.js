/**
 * Objeto controlador de cookies
 * Created by mor on 5/06/16.
 */

var util = require('./util'),
    sha1 = require('sha1');

var cookies = {
    /**
     * Registra una nueva cookie en el objeto respuesta.
     * @param res Objeto respuesta.
     * @param name Nombre (clave) de la cookie en string.
     * @param value Valor de la cookie.
     * @param expires Tiempo de expiración de la cookie (opcional). En su defecto, no habrá tiempo de expiración.
     */
    new: function (res, name, value, expires) {
        var params = [];
        var value = sha1(value);
        params.push(name);
        params.push(value);
        if (!util.isUndefined(expires)) params.push(expires);
        res.cookie.apply(res, params);
        console.log('[cookies] new cookie: ' + name + '(' + value + ')');
        return res;
    },
    /**
     * Limpia de cookies el objeto respuesta.
     * @param res Objeto respuesta.
     * @param cookie Nombre de la cookie (opcional). En caso de ser un objeto se eliminarán todas las cookies de
     * la lista de propiedades.
     * @return {object}
     */
    clear: function (res, cookie) {
        if (util.type(util.obj, cookie)) {
            for (var cName in cookie) {
                cookies.clear(res, cName);
            }
            return res;
        } else {
            res.clearCookie(cookie);
            console.log('[cookies] cleared cookie: ' + cookie);
            return res;
        }
    }
};

module.exports = cookies;