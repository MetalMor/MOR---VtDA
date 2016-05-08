/**
 * Estadistica parametrizable susceptible a un máximo
 *
 * Created by mor on 8/05/16.
 */

module.exports = function(n, m) {
    this.name = n;
    this.level = 0;
    this.max = m;
    this.setMod = function(m) {this.max = m};
    this.addLevel = function() {this.level++};
};