/**
 * Estadistica regular susceptible a modificadores
 *
 * Created by mor on 8/05/16.
 */

var Stat = require('./Stat');

var RegularStat = function(n) {
    this.prototype = Stat;
    this.name = n;
    this.mod = 0;
    this.setMod = function(m) {this.max = m};
};