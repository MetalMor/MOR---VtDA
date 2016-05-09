/**
 * Clase para crear objetos de ventajas
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../models/RegularStat');
var StatsSet = require('./../../models/StatsSet');

module.exports = function() {

    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de disciplinas.
     * @returns {object}
     */
    this.initDisc = function() {return new StatsSet("Disciplinas")};
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de trasfondos.
     * @returns {object}
     */
    this.initBckg = function() {return new StatsSet("Trasfondos")};
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de virtudes.
     * @returns {object}
     */
    this.initVirt = function() {
        var ret = new StatsSet("Virtudes");
        var virt = this.virt;
        virt.forEach(function(v) {ret.stats.push(v)});
        ret.upgradeAll();
        return ret;
    };
    /**
     * Lista de objetos de estadisticas de virtudes.
     * @type {array}
     */
    this.virt = [
        new RegularStat("Conciencia"),
        new RegularStat("Autocontrol"),
        new RegularStat("Coraje")
    ];
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
        var advtges = new StatsSet("Ventajas");
        var stats = this.stats;
        stats.forEach(function(s) {advtges.stats.push(s)});
        return advtges;
    };
};