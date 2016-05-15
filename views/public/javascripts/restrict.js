/**
 * Objeto controlador de restricciones
 * Created by mor on 13/05/16.
 */

var restrict = {
    /**
     * Filtro para modificaciones de apariencia de un personaje del clan Nosferatu
     * @returns {boolean}
     */
    lookRestriction: function(stat) {
        return !(util.clean(charFunctions.findData(char, 'clan').value) === 'nosferatu' && stat.name === 'apariencia');
    },
    levelZeroRestriction: function(stat) {
        var parent = charFunctions.findParent(char, stat.name),
            supParent = charFunctions.findParent(char, parent.name);
        return !(stat.level === 1 && (parent.name === 'virtudes' || supParent.name === 'atributos'));
    },
    notUpdatable: function(stat) {
        if(stat.name === 'sangre') return false;
        var parent = charFunctions.findParent(char, stat.name);
        return !(parent.initPoints === 0 && parent.name === 'otros');
    },
    fullSheet: function(statsObj) {
        return true; // de momento salto esto
        if(util.is(util.stats, statsObj) && statsObj.hasOwnProperty('initPoints')) {

        } else if(util.is(util.char, statsObj)) {
            var stats = statsObj.stats, ret;
            stats.forEach(function(stat) {

            });
        }
    }
};