/**
 * Funciones de utilidad para tiradas de dados.
 * Created by mor on 7/06/16.
 */

var diceFunctions = {
    /**
     * Valida si una tirada se ha resuelto. El valor del resultado de la tirada ha de ser mayor que 0.
     * @param roll Tirada a validar.
     * @returns {boolean}
     */
    isResolved: function (roll) {
        return roll.res > 0
    },
    /**
     * Valida si una tirada es un éxito, es decir, si iguala o supera a la dificultad.
     * @param roll Tirada a validar.
     * @returns {boolean}
     */
    isWin: function (roll) {
        return roll.res >= roll.dif
    },
    /**
     * Valida si una tirada es un crítico, ya sea por pifia (1) o por éxito (10).
     * @param roll Tirada a validar.
     * @returns {boolean}
     */
    isCritical: function (roll) {
        return roll.res == 1 || roll.res == 10
    },
    /**
     * Valida si una tirada es un éxito crítico.
     * @param roll Tirada a validar.
     * @returns {boolean}
     */
    isCriticalWin: function (roll) {
        return roll.isWin() && roll.isCritical()
    },
    /**
     * Valida si una tirada es una pifia.
     * @param roll Tirada a validar.
     * @returns {boolean}
     */
    isCriticalLoose: function (roll) {
        return !roll.isWin() && roll.isCritical()
    },
    /**
     * Retorna el objeto tirada con el resultado más alto de un conjunto de tiradas.
     * @param rollSet
     * @returns {*}
     */
    getMaxRoll: function(rollSet) {
        var rolls = rollSet.rolls, results = rolls.map(function(r) {return r.res});
        return rolls[util.getIndexOfMax(results)];
    },
    /**
     * Retorna el objeto tirada con el resultado más bajo de un conjunto de tiradas.
     * @param rollSet
     * @returns {*}
     */
    getMinRoll: function(rollSet) {
        var rolls = rollSet.rolls, results = rolls.map(function(r) {return r.res});
        return rolls[util.getIndexOfMin(results)];
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = diceFunctions;