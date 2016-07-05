/**
 * Clase que representa un campo numérico de datos del personaje
 *
 * Created by mor on 8/05/16.
 */
var util = require('./.././util');

module.exports = function(n) {
    this.name = util.clean(n);
    this.value = 0;
};