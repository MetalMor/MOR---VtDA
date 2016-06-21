/**
 * Factoria de objetos de control de tiradas de dados.
 * Created by mor on 6/06/16.
 */

var dice = {
    /**
     * Retorna un conjunto de tiradas de dados a partir de unas estadísticas.
     * @param stats Lista de estadísticas a partir de las que se generarán las tiradas.
     * @param dif Umbral de éxito de las tiradas (dificultad).
     * @param wins Victorias iniciales por fuerza de voluntad.
     * @returns {RollSet}
     * @constructor
     */
    RollSet: function (stats, dif, wins) {
        var rollSet;
        return rollSet = {
            /**
             * Umbral de éxito de las tiradas (dificultad).
             */
            dif: dif || 1,
            /**
             * Lista de estadísticas a partir  de las que se generarán las tiradas.
             */
            stats: stats || [],
            /**
             * Lista de tiradas de la reserva de dados.
             */
            rolls: [],
            /**
             * Total victorias antes de realizar la tirada.
             */
            initWins: wins || 0,
            /**
             * Contador de victorias.
             */
            wins: wins || 0,
            /**
             * Contador de pifias.
             */
            fails: 0,
            /**
             * Flag de tirada resuelta.
             */
            resolved: false,
            deleteRoll: function(roll) {
                // TODO elimina el objeto enviado x parámetro y actualiza el número de éxitos [DONE]
                util.deleteFromArray(roll, rollSet.rolls);
                rollSet.wins--;
            },
            /**
             * Calcula los resultados de las tiradas de la reserva de dados. Se tendrán en cuenta las pifias,
             * siempre y cuando no resten las victorias iniciales.
             * @returns {RollSet}
             */
            throw: function () {
                if (!rollSet.resolved) {
                    var rolls = rollSet.rolls,
                        initWins = rollSet.initWins, // victorias iniciales (las que vienen dadas antes de tirar y no pueden quitarse)
                        wins = (rollSet.wins = initWins),
                        fails = (rollSet.fails = 0);
                    rolls.forEach(function (r) {
                        if (r.throw().isWin()) wins++;
                        else if (r.isCriticalLoose()) fails++;
                    });
                } else {
                    console.log('[roll] actually resolved');
                }
                return rollSet;
            },
            /**
             * Valida que la tirada entera se ha realizado correctamente.
             * @returns {RollSet|boolean}
             */
            validate: function () {
                var rolls = rollSet.rolls, maxRoll, minRoll,
                    wins = rollSet.wins, initWins = rollSet.initWins,
                    resolved = !rolls.some(function (r) {
                        return !r.isResolved(); // retorna solo los objetos 'r' que validan true con isResolved
                    });
                for (var cnt = rollSet.fails; cnt > 0; cnt--) {
                    if (wins > initWins) {
                        maxRoll = diceFunctions.getMaxRoll(rollSet);
                        minRoll = diceFunctions.getMinRoll(rollSet);
                        rollSet.deleteRoll(maxRoll);
                        rollSet.deleteRoll(minRoll);
                    }
                }
                rollSet.resolved = resolved;
                return rollSet;
            },
            /**
             * Inicializa la reserva de dados a partir de la lista de estadísticas. Esta función tiene en cuenta
             * los modificadores correspondientes a las tiradas (de la estadistica, y de los conjuntos de estadísticas
             * que la engloban hasta llegar a la raíz, el objeto personaje).
             * @returns {RollSet}
             */
            init: function () {
                var diceQty = 0,
                    stats = rollSet.stats, rolls = rollSet.rolls, dif = rollSet.dif;
                stats.forEach(function(s) {diceQty += charFunctions.getStatForce(s, char)});
                for (diceCnt = 0; diceCnt < diceQty; diceCnt++) {
                    var newDice = dice.Roll(dif);
                    rolls.push(newDice);
                }
                return rollSet;
            },
            /**
             * Retorna el objeto de tiradas resuelto (inicialización, tirada y validación)..
             * @returns {RollSet|boolean}
             */
            resolve: function () {
                return rollSet.init().throw().validate();
            }
        };
    },
    /**
     * Retorna un objeto tirada de dados
     * @param dif Dificultad de la tirada
     * @returns {Roll}
     * @constructor
     */
    Roll: function (dif) {
        var roll;
        return roll = {
            /**
             * Resultado de la tirada.
             */
            res: 0,
            /**
             * Umbral de éxito de la tirada (dificultad).
             */
            dif: dif || 1,
            /**
             * Máxima puntuación posible en una tirada.
             */
            max: 10,
            /**
             * Valida si la tirada se ha resuelto. El valor del resultado de la tirada ha de ser mayor que 0.
             * @returns {boolean}
             */
            isResolved: function () {
                return diceFunctions.isResolved(roll)
            },
            /**
             * Valida si la tirada es un éxito, es decir, si iguala o supera a la dificultad.
             * @returns {boolean}
             */
            isWin: function () {
                return diceFunctions.isWin(roll)
            },
            /**
             * Valida si la tirada es un crítico, ya sea por pifia (1) o por éxito (10).
             * @returns {boolean}
             */
            isCritical: function () {
                return diceFunctions.isCritical(roll)
            },
            /**
             * Valida si la tirada es un éxito crítico.
             * @returns {boolean}
             */
            isCriticalWin: function () {
                return diceFunctions.isCriticalWin(roll)
            },
            /**
             * Valida si la tirada es una pifia.
             * @returns {boolean}
             */
            isCriticalLoose: function () {
                return diceFunctions.isCriticalLoose(roll)
            },
            /**
             * Calcula aleatoriamente el resultado de una tirada.
             * @returns {Roll}
             */
            throw: function () {
                roll.res = Math.floor(Math.random() * roll.max) + 1;
                return roll;
            }
        }
    }
};