/**
 * Clase para inicializar personajes
 *
 * Created by mor on 8/05/16.
 */

var Character = require('./../models/Character');
var DataFactory = require('./data/DataFactory');
var StatsFactory = require('./stats/StatsFactory');

module.exports = function() {
    /**
     * Retorna un nuevo objeto inicializado de personaje.
     * @returns {object}
     */
    this.initChar = function() {
        var sf = new StatsFactory();
        var df = new DataFactory();
        return new Character(df.initData(), sf.initStats());
    };
};