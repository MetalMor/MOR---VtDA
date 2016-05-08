/**
 * Clase para crear objetos de estadísticas
 *
 * Created by mor on 8/05/16.
 */

var AdvantagesFactory = require('./AdvantagesFactory');
var AttributesFactory = require('./AttributesFactory');
var MiscellaneousFactory = require('./MiscellaneousFactory');
var SkillsFactory = require('./SkillsFactory');

module.exports = function() {
    this.initAdvtges = function() {
        var af = new AdvantagesFactory();
        return af.initAdvtges(af.initDisc(), af.initTrf(), af.initVirt());
    };
    this.initAttr = function() {
        var af = new AttributesFactory();
        return af.initAttr(af.initPhy(), af.initSoc(), af.initMen());
    };
    this.initMisc = function() {
        var mf = new MiscellaneousFactory();
        return mf.initMisc(mf.initOther(), mf.initPath(), mf.initBlood());
    };
    this.initSkills = function() {
        var sf = new SkillsFactory();
        return sf.initSkills(sf.initTal(), sf.initTech(), sf.initKnl());
    };
    this.initStats = function() {
        var stats = [];
        stats.push(this.initAttr());
        stats.push(this.initSkills());
        stats.push(this.initAdvtges());
        stats.push(this.initMisc());
        return stats;
    };
};