/**
 * Objeto que contiene scripts para modificar ciertos aspectos de la base de datos.
 * Created by becari on 06/07/2016.
 */
var logger = require('../resources/both/javascripts/logger');

var fix = {
    /**
     * Función para "reparar" campos de la base de datos. Busca un campo con el nombre especificado en el objeto
     * nameEqv y le da el valor que se le da en dicho objeto.
     */
    updateNames: function (game, nameEqv) {
        var statsGroupList, statsSetList, statList,
            replaceName = function (stat) {
                if (nameEqv.hasOwnProperty(stat.name)) {
                    logger.log("stats", "name (bf): " + stat.name);
                    stat.name = nameEqv[stat.name];
                    logger.log("stats", "name (at): " + stat.name);
                }
            };
        mongoGames.findOwnedList(game, 'npcList', function (npcList) {
            npcList.forEach(function (npc) {
                statsGroupList = npc.stats;
                statsGroupList.forEach(function (statsGroup) {
                    replaceName(statsSet);
                    statsSetList = statsGroup.stats;
                    statsSetList.forEach(function (statsSet) {
                        replaceName(statsSet);
                        statList = statsSet.stats;
                        if (!util.isUndefined(statList))
                            statList.forEach(function (stat) {
                                replaceName(stat);
                            });
                    });
                });
            });
            game.npcList = npcList;
            mongoGames.updateGame(game, function () {
                logger.log("stats", "update ok");
            });
        });
    }
};

module.exports = fix;
