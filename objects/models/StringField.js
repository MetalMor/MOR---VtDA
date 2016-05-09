/**
 * Clase que representa un campo cadena de caracteres de datos del personaje
 *
 * Created by mor on 8/05/16.
 */


module.exports = function(n) {
    this.name = n;
    this.value = "";
    this.setValue = function(v) {this.value = v};
};