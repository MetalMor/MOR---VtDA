/**
 * Clase para crear objetos de habilidades
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../object/RegularStat');
var StatsSet = require('./../../object/StatsSet');

module.exports = function() {
    this.initTal = function() {
        var tal = new StatsSet("Talentos");
        tal.stats.push(new RegularStat("Actuar"));
        tal.stats.push(new RegularStat("Alerta"));
        tal.stats.push(new RegularStat("Atletismo"));
        tal.stats.push(new RegularStat("Callejeo"));
        tal.stats.push(new RegularStat("Esquivar"));
        tal.stats.push(new RegularStat("Empatía"));
        tal.stats.push(new RegularStat("Intimidación"));
        tal.stats.push(new RegularStat("Liderazgo"));
        tal.stats.push(new RegularStat("Pelea"));
        tal.stats.push(new RegularStat("Subterfugio"));
        return tal;
    };
    this.initTech = function() {
        var tech = new StatsSet("Técnicas");
        tech.stats.push(new RegularStat("Arma c/c"));
        tech.stats.push(new RegularStat("Equitación"));
        tech.stats.push(new RegularStat("Etiqueta"));
        tech.stats.push(new RegularStat("Herbolaria"));
        tech.stats.push(new RegularStat("Música"));
        tech.stats.push(new RegularStat("Pericias"));
        tech.stats.push(new RegularStat("Sigilo"));
        tech.stats.push(new RegularStat("Supervivencia"));
        tech.stats.push(new RegularStat("Tiro con arco"));
        tech.stats.push(new RegularStat("Trato con animales"));
        return tech;
    };
    this.initKnl = function() {
        var knl = new StatsSet("Conocimientos");
        knl.stats.push(new RegularStat("Academicismo"));
        knl.stats.push(new RegularStat("Ciencias"));
        knl.stats.push(new RegularStat("Investigación"));
        knl.stats.push(new RegularStat("Leyes"));
        knl.stats.push(new RegularStat("Lingüística"));
        knl.stats.push(new RegularStat("Medicina"));
        knl.stats.push(new RegularStat("Ocultismo"));
        knl.stats.push(new RegularStat("Política"));
        knl.stats.push(new RegularStat("Sabiduría popular"));
        knl.stats.push(new RegularStat("Senescal"));
        return knl;
    };
    this.initSkills = function(tal, tech, knl) {
        var skills = new StatsSet("Habilidades");
        skills.stats.push(tal);
        skills.stats.push(tech);
        skills.stats.push(knl);
        return skills;
    };
};