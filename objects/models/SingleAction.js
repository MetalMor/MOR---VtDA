/**
 * Clase que hereda de Action y representa una acción de un personaje contra el entorno
 *
 * Created by mor on 5/05/16.
 */

var Action = require('./Action.js');

var SingleAction = function(s, d, m) {
    this.prototype = Action;
    this.source = s;
    this.dif = ag;
    this.mod = m;
};
