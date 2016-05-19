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
    /**
     * Filtro para estadísticas que no pueden bajar de nivel 1.
     * @param stat Estadística a validar
     * @returns {boolean}
     */
    levelZeroRestriction: function(stat) {
        var parent = charFunctions.findParent(char, stat.name),
            supParent = charFunctions.findParent(char, parent.name);
        return !(stat.level === 1 && (parent.name === 'virtudes' || supParent.name === 'atributos'));
    },
    /**
     * Filtro para controlar el nivel máximo que se puede alcanzar durante la etapa de inicialización del personaje
     * según los grupos de estadísticas.
     * @param stat Estadística a validar
     * @returns {boolean}
     */
    maxLevelRestriction: function(stat) {
        var parent = charFunctions.findParent(char, stat.name),
            supParent = charFunctions.findParent(char, parent.name);
        if(supParent.name === 'habilidades')
            maxLvl = 3;
        else if(supParent.name === 'atributos')
            maxLvl = 5;
        else
            maxLvl = 50; // unreachable level!! ^^
        return !(stat.level >= maxLvl && parent.initPoints > 0);
    },
    /**
     * Filtro para estadísticas que no pueden aumentarse durante la etapa de inicialización del personaje
     * @param stat
     * @returns {boolean}
     */
    notUpdatable: function(stat) {
        if(stat.name === 'sangre') return false;
        var parent = charFunctions.findParent(char, stat.name);
        return !(parent.initPoints === 0 && parent.name === 'otros');
    },
    /**
     * Filtro para comprobar que se han gastado todos los puntos de inicialización del personaje.
     * @param statsObj Objeto de estadísticas
     * @returns {boolean}
     */
    fullSheet: function(statsObj) {
        if(statsObj.hasOwnProperty('initPoints'))
            if(statsObj.initPoints > 0) return false;
        if(util.is(util.char, statsObj)) {
            var stats = statsObj.stats, ret = true, tmpRet;
            if(ret)
                stats.forEach(function(stat) {
                    if(util.is(util.stats, stat))
                        tmpRet = restrict.fullSheet(stat);
                        if(!util.isUndefined(tmpRet)) ret = tmpRet
                });
            return ret;
        }
    }
};