/**
 * Clase que representa un tipo de estadisticas (fisicos, sociales,
 *
 * Created by mor on 8/05/16.
 */

module.exports = function(n) {
    this.name = n;
    this.stats = [];
    this.upgradeAll = function() {
        this.stats.forEach(function(stat) {
            if(stat.hasOwnProperty("upgradeAll")) stat.upgradeAll();
            else if(stat.hasOwnProperty("addLevel")) stat.addLevel();
        });
    }
};