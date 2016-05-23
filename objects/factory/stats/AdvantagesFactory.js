/**
 * Clase para crear objetos de ventajas
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../models/RegularStat');
var StatsSet = require('./../../models/StatsSet');

module.exports = function() {

    /**
     * Lista de objetos de estadisticas de virtudes.
     * @type {array}
     */
    this.virt = [
        new RegularStat("Conciencia"),
        new RegularStat("Autocontrol"),
        new RegularStat("Coraje")
    ];
    this.bckg = [
        new RegularStat("Dominio"),
        new RegularStat("Aliados"),
        new RegularStat("Arsenal"),
        new RegularStat("Contactos"),
        new RegularStat("Rebaño"),
        new RegularStat("Influencia"),
        new RegularStat("Mentor"),
        new RegularStat("Recursos"),
        new RegularStat("Estatus")
    ];
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de disciplinas.
     * @returns {object}
     */
    this.initDisc = function() {
        var ret = new StatsSet("Disciplinas");
        ret.initPoints = 3;
        return ret;
    };
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de trasfondos.
     * @returns {object}
     */
    this.initBckg = function() {
        var ret = new StatsSet("Trasfondos");
        var bckg = this.bckg;
        bckg.forEach(function(b) {ret.stats.push(b)});
        ret.initPoints = 5;
        return ret;
    };
    /**
     * Retorna un nuevo objeto de conjunto de estadisticas de virtudes.
     * @returns {object}
     */
    this.initVirt = function() {
        var ret = new StatsSet("Virtudes");
        var virt = this.virt;
        virt.forEach(function(v) {
            v.cost = 2;
            ret.stats.push(v)
        });
        ret.upgradeAll();
        ret.initPoints = 7;
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
        var advtges = new StatsSet("Ventajas");
        var stats = this.stats;
        stats.forEach(function(s) {advtges.stats.push(s)});
        return advtges;
    };
};