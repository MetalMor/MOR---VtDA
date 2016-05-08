/**
 * Clase que representa una estadística de juego
 *
 * Created by mor on 5/05/16.
 */

module.exports = function(n) {
    this.name = n;
    this.level = 0;
    this.addLevel = function() {this.level++};
};