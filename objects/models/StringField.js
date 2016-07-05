/**
 * Clase que representa un campo cadena de caracteres de datos del personaje
 *
 * Created by mor on 8/05/16.
 */
var util = require('./../../custom_modules/util');

module.exports = function(n) {
    this.name = util.clean(n);
    this.value = "";
    this.setValue = function(v) {this.value = v};
};