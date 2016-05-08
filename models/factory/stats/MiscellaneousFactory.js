/**
 * Clase para crear objetos de estadisticas varias
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../object/RegularStat');
var MaxableStat = require('./../../object/MaxableStat');
var StatsSet = require('./../../object/StatsSet');

module.exports = function() {
    /**
     * Lista de objetos de estadísticas varias.
     * @type {array}
     */
    this.misc = [
        new MaxableStat("Fuerza de Voluntad"),
        new RegularStat("Camino"),
        new MaxableStat("Sangre")
    ];
    /**
     * Retorna un nuevo objeto de conjunto de estadísticas varias.
     * @returns {object}
     */
    this.initMisc = function() {
        var ret = new StatsSet("Otros");
        var misc = this.misc;
        misc.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
};