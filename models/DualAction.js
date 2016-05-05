/**
 * Clase que hereda de Action y representa una accion enfrentada entre dos personajes
 *
 * Created by mor on 5/05/16.
 */

var Action = require('./Action.js');

var DualAction = function(ag) {
    this.against = ag;
};

DualAction.prototype = Action;