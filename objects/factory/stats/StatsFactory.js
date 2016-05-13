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
    /**
     * Retorna el objeto de conjunto de estadisticas de ventajas generado por la factoría.
     * @returns {object}
     */
    this.initAdvtges = function() {
        var af = new AdvantagesFactory();
        return af.initAdvtges();
    };
    /**
     * Retorna el objeto de conjunto de estadísticas de atributos generado por la factoría.
     * @returns {object}
     */
    this.initAttr = function() {
        var af = new AttributesFactory();
        return af.initAttr();
    };
    /**
     * Retorna el objeto de conjunto de estadísticas varias generado por la factoría.
     * @returns {object}
     */
    this.initMisc = function() {
        var mf = new MiscellaneousFactory();
        return mf.initMisc();
    };
    /**
     * Retorna el objeto de conjunto de estadísticas de habilidades generado por la factoría.
     * @returns {object}
     */
    this.initSkills = function() {
        var ret, sf = new SkillsFactory();
        return sf.initSkills();
    };
    /**
     * Lista de objetos de conjunto de estadísticas.
     * @type {array}
     */
    this.stats = [
        this.initAttr(),
        this.initSkills(),
        this.initAdvtges(),
        this.initMisc()
    ];
    /**
     * Retorna una nueva lista de objetos de conjunto de estadísticas.
     * @returns {Array}
     */
    this.initStats = function() {
        var ret = [];
        var stats = this.stats;
        stats.forEach(function(s) {ret.push(s)});
        return ret;
    };
};