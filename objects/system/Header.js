/**
 * Modelo de un objeto cabecera HTTP de respuesta.
 * Created by becari on 14/07/2016.
 */

var Header = function(n, v) {
    this.nm = n;
    this.val = v;
};

module.exports = Header;