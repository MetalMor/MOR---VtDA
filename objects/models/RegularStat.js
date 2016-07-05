/**
 * Estadistica regular susceptible a modificadores
 *
 * Created by mor on 8/05/16.
 */
var util = require('../../server/util');

module.exports = function(n, c) {
    this.name = util.clean(n);
    this.level = 0;
    this.limit = 10;
    this.mod = 0;
    if(typeof c !== 'undefined')
        this.cost = c;
    this.setMod = function(m) {this.mod = m};
    this.addLevel = function() {this.level++};
};