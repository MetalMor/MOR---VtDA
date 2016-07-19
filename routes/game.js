/**
 * Enrutador de la partida.
 * Created by mor on 5/07/16.
 */

var sha1 = require('sha1');

var mongoUsers = require('../db/mongoUsers'), // db users controller
    mongoGames = require('../db/mongoGames'); // db games controller

var util = require('../resources/both/javascripts/util'), // utils
    cookies = require('../resources/server/javascripts/cookies'), // cookies
    http = require('../resources/server/javascripts/http'),
    ViewData = require('../objects/system/ViewData'), // view data model
    views = require('../objects/system/views'),
    Game = require('../objects/models/Game'), // game model
    CharFactory = require('../objects/factory/CharFactory'),
    constants = require('../objects/constants/Constants'), // constants object
    clans = require('../objects/models/Clans'),
    generations = require('../objects/models/Generations'),
    charFunctions = require('../resources/both/javascripts/charFunctions'),
    logger = require('../resources/both/javascripts/logger');

var cf = new CharFactory();

var view, user, game, char = cf.initChar();

var express = require('express'),
    router = express.Router({caseSensitive: true});

// PANTALLA DE JUEGO
router.get(constants.server.routes.game.access.gamePanel, function (req, res) {
    var userName = req.params.user, gameName = req.params.game;
    var tmpUser = {name: userName}, tmpGame = {name: gameName},
        key = req.cookies.key;
    if (sha1(userName) === key) {
        mongoUsers.findUserByName(tmpUser, function (u) {
            if (!util.isNull(u)) {
                user = u;
                mongoGames.findGameByName(tmpGame, function (g) {
                    if (!util.isNull(g)) {
                        game = g;
                        view = new ViewData(views.master, userName + ' - ' + gameName, gameName + ': ' + userName, 0);
                        view.data.userJSON = JSON.stringify(user);
                        view.data.gameJSON = JSON.stringify(game);
                        view.data.user = user;
                        view.data.game = game;
                        view.data.constants = constants.char;
                        view.data.clans = clans;
                        view.data.gens = generations;
                        view.data.playerFlag = true;
                        if (!util.isMaster(user, game)) { // player
                            logger.log("server", "logging player in: " + game.name);
                            view.file = views.player;
                            char = charFunctions.findChar(user, game);
                            if (!char) {
                                var cf = new CharFactory();
                                char = cf.initChar();
                            }
                            view.data.charJSON = JSON.stringify(char);
                            view.data.char = char;
                            res.render(view.file, view.data);
                        } else { // master
                            view.data.playerFlag = false;
                            logger.log("server", "logging master " + user.name + " in: " + game.name);
                            res.render(view.file, view.data);
                        }
                    } else {
                        http.goToLogin(res);
                    }
                });
            }
        });
    } else {
        http.goToLogin(res);
    }
});
logger.log('server', 'game panel route set');

router.get(constants.server.routes.game.access.initChar, function (req, res) {
    logger.log('server', 'sending initialized character');
    var ret = cf.initChar();
    ret.npc = true;
    http.contentType(res, 'application/json');
    res.send(JSON.stringify(ret));
});
logger.log('server', 'init char request route set');

router.get(constants.server.routes.game.access.dataObject, function (req, res) {
    var ret = require('../objects/constants/Constants');
    res.send(JSON.stringify(ret));
});

module.exports = router;