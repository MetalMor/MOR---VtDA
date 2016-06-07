/**
 * Factoria de objetos de control de tiradas de dados.
 * Created by mor on 6/06/16.
 */

var dice = {
    RollSet: function (dif, stats, wins) {
        var rollSet;
        return rollSet = {
            dif: dif,
            stats: stats,
            rolls: [],
            wins: 0 + wins || 0,
            resolved: false,
            throw: function () {
                var initWins = rollSet.wins; // victorias iniciales (las que vienen dadas antes de tirar y no pueden quitarse)
                if (!rollSet.resolved) {
                    var rolls = rollSet.rolls;
                    rolls.forEach(function (r) {
                        r.throw();
                        if (r.isWin()) rollSet.wins++;
                    });
                }
                // TODO comprobar pifias vs éxitos
                rollSet.resolved = true;
                return rollSet;
            },
            init: function () {
                var stats = rollSet.stats, diceCnt, parentStat,
                    dices = 0, dif = rollSet.dif;
                stats.forEach(function (s) {
                    dices += s.level + (s.mod || 0);
                    parentStat = charFunctions.findParent(char, s);
                    while (!util.is(util.char, parentStat)) {
                        dices += (parentStat.mod || 0);
                        parentStat = charFunctions.findParent(char, s);
                    }
                    for (diceCnt = 0; diceCnt < dices; diceCnt++) {
                        var newDice = dice.Roll(dif);
                    }
                });
                return rollSet;
            }
        };
    },
    Roll: function (dif) {
        var roll;
        return roll = {
            res: 0,
            dif: dif,
            isWin: function () {
                return roll.res >= roll.dif
            },
            isCritical: function () {
                return !(roll.res > 0 || roll.res < 10)
            },
            isCriticalWin: function () {
                return roll.isWin() && roll.isCritical()
            },
            isCriticalLoose: function () {
                return !roll.isWin() && roll.isCritical()
            },
            throw: function () {
                roll.res = Math.floor(Math.rand() * 10) + 1;
                return roll;
            }
        }
    }
};