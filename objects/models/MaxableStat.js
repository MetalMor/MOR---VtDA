/**
 * Estadistica parametrizable susceptible a un máximo
 *
 * Created by mor on 8/05/16.
 */
var util = require('./../../util');

module.exports = function(n) {
    this.name = util.clean(n);
    this.level = 0;
    this.limit = n === "Sangre" ? 20 : 10;
    this.max = 0
    this.setMod = function(m) {this.max = m};
    this.addLevel = function() {this.level++};
    this.decLevel = function() {this.level--};
};