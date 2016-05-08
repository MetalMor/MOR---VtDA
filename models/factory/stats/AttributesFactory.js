/**
 * Clase para crear objetos de atributos
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../object/RegularStat');
var StatsSet = require('./../../object/StatsSet');

module.exports = function() {
    this.initPhy = function() {
        var phy = new StatsSet("Físicos");
        phy.stats.push(new RegularStat("Fuerza"));
        phy.stats.push(new RegularStat("Destreza"));
        phy.stats.push(new RegularStat("Resistencia"));
        return phy;
    };
    this.initSoc = function() {
        var soc = new StatsSet("Sociales");
        soc.stats.push(new RegularStat("Carisma"));
        soc.stats.push(new RegularStat("Manipulación"));
        soc.stats.push(new RegularStat("Apariencia"));
        return soc;
    };
    this.initMen = function() {
        var men = new StatsSet("Mentales");
        men.stats.push(new RegularStat("Percepción"));
        men.stats.push(new RegularStat("Inteligencia"));
        men.stats.push(new RegularStat("Astucia"));
        return men;
    };
    this.initAttr = function(phy, soc, men) {
        var attr = new StatsSet("Atributos");
        attr.stats.push(phy);
        attr.stats.push(soc);
        attr.stats.push(men);
        attr.upgradeAll();
        return attr;
    };
};