/**
 * Clase que representa una estadística de juego
 *
 * Created by mor on 5/05/16.
 */

module.exports = function(n, l) {
    this.name = n;
    this.level = l;
    this.mod = 0;
    this.setMod = function(m) {this.mod = m};
};