/**
 * Clase para crear objetos de habilidades
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../models/RegularStat'),
    StatsSet = require('./../../models/StatsSet'),
    constants = require('./../../constants/Constants').char.stats.skills,
    statList = require('./../scripts/list');

module.exports = function() {
    /**
     * Lista de objetos de estadísticas de talentos.
     * @type {array}
     */
    this.tal = statList(constants.talents.list, RegularStat);
    /**
     * Lista de objetos de estadísticas de técnicas.
     * @type {array}
     */
    this.tech = statList(constants.techniques.list, RegularStat);
    /**
     * Lista de objetos de estadísticas de conocimientos.
     * @type {array}
     */
    this.knl = statList(constants.knowledges.list, RegularStat);
    /**
     * Retorna un nuevo objeto de conjunto de estadísticas de talentos.
     * @returns {object}
     */
    this.initTal = function() {
        var ret = new StatsSet(constants.talents.name);
        var tal = this.tal;
        tal.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    /**
     * Retorna un nuevo objeto de conjunto de estadísticas de técnicas.
     * @returns {object}
     */
    this.initTech = function() {
        var ret = new StatsSet(constants.techniques.name);
        var tech = this.tech;
        tech.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    /**
     * Retorna un nuevo objeto de conjunto de estadísticas de conocimientos.
     * @returns {object}
     */
    this.initKnl = function() {
        var ret = new StatsSet(constants.knowledges.name);
        var knl = this.knl;
        knl.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    /**
     * Lista de objetos de conjunto de estadísticas de habilidades.
     * @type {array}
     */
    this.skills = [
        this.initTal(),
        this.initTech(),
        this.initKnl()
    ];
    /**
     * Retorna el objeto de conjunto de estadísticas de habilidades.
     * @returns {object}
     */
    this.initSkills = function() {
        var ret = new StatsSet(constants.name);
        var skills = this.skills, stats;
        skills.forEach(function(stat) {
            stats = stat.stats;
            stats.forEach(function(s) {s.cost = constants.cost});
            ret.stats.push(stat)
        });
        return ret;
    };
};