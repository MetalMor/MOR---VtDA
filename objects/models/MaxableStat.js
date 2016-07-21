/**
 * Estadistica parametrizable susceptible a un máximo
 *
 * Created by mor on 8/05/16.
 */
var util = require('../../resources/both/javascripts/util'),
    constants = require('../constants/Constants').char;

module.exports = function(n, c) {
    this.name = util.clean(n);
    this.level = 0;
    this.limit = n === constants.stats.miscellaneous.list[2] ? 20 : 10;
    this.max = 0;
    if(util.isUndefined(c)) this.cost = c;
    this.setMod = function(m) {this.max = m};
    this.addLevel = function() {this.level++};
    this.decLevel = function() {this.level--};
};