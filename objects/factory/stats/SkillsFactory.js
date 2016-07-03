/**
 * Clase para crear objetos de habilidades
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../models/RegularStat');
var StatsSet = require('./../../models/StatsSet');

module.exports = function() {
    /**
     * Lista de objetos de estadísticas de talentos.
     * @type {array}
     */
    this.tal = [
        new RegularStat("Consciencia"),
        new RegularStat("Alerta"),
        new RegularStat("Atletismo"),
        new RegularStat("Callejeo"),
        new RegularStat("Expresión"),
        new RegularStat("Empatía"),
        new RegularStat("Intimidación"),
        new RegularStat("Liderazgo"),
        new RegularStat("Pelea"),
        new RegularStat("Subterfugio")
    ];
    /**
     * Lista de objetos de estadísticas de técnicas.
     * @type {array}
     */
    this.tech = [
        new RegularStat("Pelea con armas"),
        new RegularStat("Conducir"),
        new RegularStat("Etiqueta"),
        new RegularStat("Latrocinio"),
        new RegularStat("Interpretación"),
        new RegularStat("Artesanía"),
        new RegularStat("Sigilo"),
        new RegularStat("Supervivencia"),
        new RegularStat("Armas de fuego"),
        new RegularStat("Trato con animales")
    ];
    /**
     * Lista de objetos de estadísticas de conocimientos.
     * @type {array}
     */
    this.knl = [
        new RegularStat("Academicismo"),
        new RegularStat("Ciencias"),
        new RegularStat("Investigación"),
        new RegularStat("Leyes"),
        new RegularStat("Finanzas"),
        new RegularStat("Medicina"),
        new RegularStat("Ocultismo"),
        new RegularStat("Política"),
        new RegularStat("Tecnología"),
        new RegularStat("Informática")
    ];
    /**
     * Retorna un nuevo objeto de conjunto de estadísticas de talentos.
     * @returns {object}
     */
    this.initTal = function() {
        var ret = new StatsSet("Talentos");
        var tal = this.tal;
        tal.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    /**
     * Retorna un nuevo objeto de conjunto de estadísticas de técnicas.
     * @returns {object}
     */
    this.initTech = function() {
        var ret = new StatsSet("Técnicas");
        var tech = this.tech;
        tech.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    /**
     * Retorna un nuevo objeto de conjunto de estadísticas de conocimientos.
     * @returns {object}
     */
    this.initKnl = function() {
        var ret = new StatsSet("Conocimientos");
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
        var ret = new StatsSet("Habilidades");
        var skills = this.skills, stats;
        skills.forEach(function(stat) {
            stats = stat.stats;
            stats.forEach(function(s) {s.cost = 2});
            ret.stats.push(stat)
        });
        return ret;
    };
};