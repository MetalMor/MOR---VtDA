/**
 * Clase que representa un conjunto de campos de datos del personaje
 *
 * Created by mor on 8/05/16.
 */

var util = require('./../../util');

module.exports = function(n) {
    this.name = util.clean(n);
    this.fields = [];
};