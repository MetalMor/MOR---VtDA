/**
 * Clase para crear objetos de estadisticas varias
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../models/RegularStat'),
    MaxableStat = require('./../../models/MaxableStat'),
    StatsSet = require('./../../models/StatsSet'),
    constants = require('./../../constants/Constants').char.stats.miscellaneous;

module.exports = function() {
    /**
     * Lista de objetos de estadísticas varias.
     * @type {array}
     */
    this.misc = [
        new MaxableStat(constants.list[0], 1),
        new RegularStat(constants.list[1], 2),
        new MaxableStat(constants.list[2])
    ];
    /**
     * Retorna un nuevo objeto de conjunto de estadísticas varias.
     * @returns {object}
     */
    this.initMisc = function() {
        var ret = new StatsSet(constants.name);
        var misc = this.misc;
        misc.forEach(function(s) {ret.stats.push(s)});
        ret.initPoints = constants.initPoints;
        return ret;
    };
};