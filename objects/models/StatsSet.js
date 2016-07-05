/**
 * Clase que representa un tipo de estadisticas (fisicos, sociales,
 *
 * Created by mor on 8/05/16.
 */

var util = require('./../../custom_modules/util');

module.exports = function(n) {
    this.name = util.clean(n);
    this.stats = [];
    this.initPoints = 0;
    this.upgradeAll = function() {
        this.stats.forEach(function(stat) {
            if(stat.hasOwnProperty("upgradeAll")) stat.upgradeAll();
            else if(stat.hasOwnProperty("addLevel")) stat.addLevel();
        });
    }
};