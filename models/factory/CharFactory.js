/**
 * Clase para inicializar personajes
 *
 * Created by mor on 8/05/16.
 */

var Character = require('./../object/Character');
var DataFactory = require('./../stats/DataFactory');
var StatsFactory = require('./stats/StatsFactory');

module.exports = function() {
    this.initChar = function() {
        var sf = new StatsFactory();
        var df = new DataFactory();
        return new Character(sf.initStats(), df.initData());
    };
};