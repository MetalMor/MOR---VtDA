/**
 * Factoria de objetos de control de tiradas de dados.
 * Created by mor on 6/06/16.
 */

var dice = {
    /**
     * Identificador numérico que se usará para el siguiente objeto tirada.
     */
    nextId: 0,
    /**
     * Máxima puntuación posible en una tirada.
     */
    max: 10,
    /**
     * Retorna un conjunto de tiradas de dados a partir de unas estadísticas.
     * @param stats Lista de estadísticas a partir de las que se generarán las tiradas.
     * @param dif Umbral de éxito de las tiradas (dificultad).
     * @param mod Número modificador de la reserva de dados (se añade al total de las estadísticas).
     * @param wins Victorias iniciales por fuerza de voluntad.
     * @returns {RollSet}
     * @constructor
     */
    RollSet: function (stats, dif, mod, wins) {
        var rollSet, initWins = wins || 0, fails = 0, nextRollId = 0, rollSetId = dice.nextId++, mod = mod || 0;
        return rollSet = {
            /**
             * Identificador numérico del conjunto de tiradas.
             */
            id: rollSetId,
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
             * Contador de victorias.
             */
            wins: wins || 0,
            /**
             * Flag indicador de pifia total;
             */
            fail: false,
            /**
             * Flag de tirada inicializada.
             */
            initialized: false,
            /**
             * Flag de tirada resuelta.
             */
            resolved: false,
            /**
             * Contador de pifias.
             */
            fails: 0,
            /**
             * Elimina una tirada especificada por parámetro del conjunto de tiradas.
             * @param roll Tirada a eliminar.
             */
            deleteRoll: function(roll) {
                var counter = -1, condition;
                do
                    if(condition = roll.id == rollSet.rolls[++counter].id)
                        rollSet.rolls.splice(counter, 1);
                while(!condition);
            },
            /**
             * Calcula los resultados de las tiradas de la reserva de dados. Se tendrán en cuenta las pifias,
             * siempre y cuando no resten las victorias iniciales.
             * @returns {RollSet}
             */
            throw: function () {
                if (!rollSet.resolved && rollSet.initialized) {
                    fails = 0;
                    rollSet.wins = initWins;
                    rollSet.rolls.forEach(function (r) {
                        if (r.throw().isWin()) rollSet.wins++;
                        else if (r.isCriticalLoose()) fails++;
                    });
                }
                return rollSet;
            },
            /**
             * Valida que la tirada entera se ha realizado correctamente.
             * @returns {RollSet|boolean}
             */
            validate: function () {
                var rolls = rollSet.rolls, wins = rollSet.wins,
                    maxRoll, minRoll,
                    resolved = !rolls.some(function (r) {
                        return !r.isResolved(); // retorna solo los objetos 'r' que validan true con isResolved
                        }) && rollSet.initialized;
                for (var cnt = fails; cnt > 0; cnt--) {
                    if (wins > initWins) {
                        maxRoll = diceFunctions.getMaxRoll(rollSet);
                        if(maxRoll.isWin()) {
                            minRoll = diceFunctions.getMinRoll(rollSet);
                            rollSet.deleteRoll(maxRoll);
                            rollSet.deleteRoll(minRoll);
                            rollSet.wins--;
                            rollSet.fails++;
                        } else rollSet.fail = true; // si el más alto no es una victoria, no borra nada y marca el conjunto como pifia total
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
                    stats = rollSet.stats, rolls = rollSet.rolls = [], dif = rollSet.dif;
                stats.forEach(function(s) {diceQty += (rollSet.mod = charFunctions.getStatForce(s, char) + mod)});
                for (diceCnt = 0; diceCnt < diceQty; diceCnt++) {
                    var newDice = dice.Roll(nextRollId++, dif);
                    rolls.push(newDice);
                }
                rollSet.initialized = true;
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
    Roll: function (id, dif) {
        var roll;
        return roll = {
            /**
             * Identificador numérico de la tirada.
             */
            id: id,
            /**
             * Resultado de la tirada.
             */
            res: 0,
            /**
             * Umbral de éxito de la tirada (dificultad).
             */
            dif: dif || 1,
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
                roll.res = Math.floor(Math.random() * dice.max) + 1;
                //logger.log("dice", "Threw dice: "+roll.res);
                return roll;
            }
        }
    }
};