/**
 * Estadistica regular susceptible a modificadores
 *
 * Created by mor on 8/05/16.
 */

module.exports = function(n) {
    this.name = n;
    this.level = 0;
    this.mod = 0;
    this.setMod = function(m) {this.max = m};
    this.addLevel = function() {this.level++};
};