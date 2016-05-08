/**
 * Estadistica parametrizable susceptible a un máximo
 *
 * Created by mor on 8/05/16.
 */

var Stat = require('./Stat');

var RegularStat = function(n, m) {
    this.prototype = Stat;
    this.name = n;
    this.max = m;
    this.setMod = function(m) {this.max = m};
};