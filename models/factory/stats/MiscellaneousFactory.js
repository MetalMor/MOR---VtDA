/**
 * Clase para crear objetos de estadisticas varias
 *
 * Created by mor on 8/05/16.
 */

var MaxableStat = require('./../../object/MaxableStat');
var StatsSet = require('./../../object/StatsSet');

module.exports = function() {
    this.initOther = function() {return new StatsSet("Otros rasgos")};
    this.initPath = function() {return new MaxableStat("Fuerza de Voluntad")};
    this.initBlood = function() {return new MaxableStat("Sangre")};
    this.initMisc = function(other, path, blood) {
        var misc = new StatsSet("Otros");
        misc.stats.push(other);
        misc.stats.push(path);
        misc.stats.push(blood);
        return misc;
    };
}