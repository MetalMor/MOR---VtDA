/**
 * Clase para crear objetos de atributos
 *
 * Created by mor on 8/05/16.
 */

var RegularStat = require('./../../models/RegularStat'),
    StatsSet = require('./../../models/StatsSet'),
    constants = require('./../../constants/Constants').char.stats.attributes,
    statList = require('./../scripts/list');

module.exports = function() {
    this.phy = statList(constants.physicals.list, RegularStat);
    this.soc = statList(constants.socials.list, RegularStat);
    this.men = statList(constants.mentals.list, RegularStat);
    this.initPhy = function() {
        var ret = new StatsSet(constants.physicals.name);
        var phy = this.phy;
        phy.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    this.initSoc = function() {
        var ret = new StatsSet(constants.socials.name);
        var soc = this.soc;
        soc.forEach(function(s) {ret.stats.push(s)});
        return ret;
    };
    this.initMen = function() {
        var ret = new StatsSet(constants.mentals.name);
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
        var ret = new StatsSet(constants.name);
        var attr = this.attr, stats;
        attr.forEach(function(stat) {
            stats = stat.stats;
            stats.forEach(function(s) {s.cost = constants.cost});
            ret.stats.push(stat)
        });
        ret.upgradeAll();
        return ret;
    };
};