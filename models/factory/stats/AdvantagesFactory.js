/**
 * Clase para crear objetos de ventajas
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../object/RegularStat');
var StatsSet = require('./../../object/StatsSet');

module.exports = function() {
    this.initDisc = function() {return new StatsSet("Disciplinas")};
    this.initTrf = function() {return new StatsSet("Trasfondos")};
    this.initVirt = function() {
        var virt = new StatsSet("Virtudes");
        virt.push(new RegularStat("Conciencia"));
        virt.push(new RegularStat("Autocontrol"));
        virt.push(new RegularStat("Coraje"));
        virt.upgradeAll();
        return virt;
    };
    this.initAdvtges = function(disc, trf, virt) {
        var advtges = new StatsSet("Ventajas");
        advtges.stats.push(disc);
        advtges.stats.push(trf);
        advtges.stats.push(virt);
    };
};