/**
 * Clase para crear objetos de ventajas
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../models/RegularStat'),
    StatsSet = require('./../../models/StatsSet'),
    constants = require('./../../constants/Constants').char.stats.advantages,
    statsList = require('./../scripts/list');

module.exports = function() {

    /**
     * Lista de objetos de estadisticas de virtudes.
     * @type {array}
     */
    this.virt = statsList(constants.virtues.list, RegularStat);
    /**
     * Lista de objetos de estadísticas de trasfondos.
     */
    this.bckg = statsList(constants.backgrounds.list, RegularStat);
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de disciplinas.
     * @returns {object}
     */
    this.initDisc = function() {
        var ret = new StatsSet(constants.disciplines.name);
        ret.initPoints = constants.disciplines.initPoints;
        return ret;
    };
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de trasfondos.
     * @returns {object}
     */
    this.initBckg = function() {
        var ret = new StatsSet(constants.backgrounds.name);
        var bckg = this.bckg;
        bckg.forEach(function(b) {ret.stats.push(b)});
        ret.initPoints = constants.backgrounds.initPoints;
        return ret;
    };
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de virtudes.
     * @returns {object}
     */
    this.initVirt = function() {
        var ret = new StatsSet(constants.virtues.name);
        var virt = this.virt;
        virt.forEach(function(v) {
            v.cost = constants.virtues.cost;
            ret.stats.push(v)
        });
        ret.upgradeAll();
        ret.initPoints = constants.virtues.initPoints;
        return ret;
    };
    /**
     * Lista de objetos de conjunto de estadísticas de ventajas.
     * @type {*[]}
     */
    this.stats = [
        this.initDisc(),
        this.initBckg(),
        this.initVirt()
    ];
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de ventajas.
     * @returns {object}
     */
    this.initAdvtges = function() {
        var advtges = new StatsSet(constants.name);
        var stats = this.stats;
        stats.forEach(function(s) {advtges.stats.push(s)});
        return advtges;
    };
};