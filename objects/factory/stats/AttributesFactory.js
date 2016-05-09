/**
 * Clase para crear objetos de atributos
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../models/RegularStat');
var StatsSet = require('./../../models/StatsSet');

module.exports = function() {
    this.phy = [
        new RegularStat("Fuerza"),
        new RegularStat("Destreza"),
        new RegularStat("Resistencia")
    ];
    this.soc = [
        new RegularStat("Carisma"),
        new RegularStat("Manipulación"),
        new RegularStat("Apariencia")
    ];
    this.men = [
        new RegularStat("Percepción"),
        new RegularStat("Inteligencia"),
        new RegularStat("Astucia")
    ];
    this.initPhy = function() {
        var ret = new StatsSet("Físicos");
        var phy = this.phy;
        phy.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    this.initSoc = function() {
        var ret = new StatsSet("Sociales");
        var soc = this.soc;
        soc.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    this.initMen = function() {
        var ret = new StatsSet("Mentales");
        var men = this.men;
        men.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    this.attr = [
        this.initPhy(),
        this.initSoc(),
        this.initMen()
    ];
    this.initAttr = function() {
        var ret = new StatsSet("Atributos");
        var attr = this.attr;
        attr.forEach(function(s) {ret.stats.push(s)});
        ret.upgradeAll();
        return ret;
    };
};