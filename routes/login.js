/**
 * Enrutador del login.
 * Created by mor on 5/07/16.
 */

var sha1 = require('sha1');

var mongoUsers = require('../db/mongoUsers'), // db users controller
    mongoGames = require('../db/mongoGames'); // db games controller

var util = require('../resources/both/javascripts/util'), // utils
    cookies = require('../resources/server/javascripts/cookies'), // cookies
    ViewData = require('../objects/system/ViewData'), // view data model
    views = require('../objects/system/views'),
    User = require('../objects/models/User'), // user model
    Game = require('../objects/models/Game'), // game model
    constants = require('../objects/constants/Constants'); // constants object

var sessionDuration = 5 * Math.pow(60, 2) * 1000; // session duration: 5h
var view, user, game, games, users; // users & games list
var routes = constants.server.routes;
var setGames = function (list) {
        games = list
    },
    setUsers = function (list) {
        users = list
    },
    goToLogin = function (res) {
        res.redirect(routes.root)
    };

var express = require('express'),
    router = express.Router({caseSensitive: true});

mongoGames.listAllGames(setGames);


// LOGIN
router.get(routes.root, function (req, res) {
    console.log("[server] user login view");
    view = new ViewData(views.user, 'MOR - VtDA', 'Login', 0);
    res.render(view.file, view.data);
});

console.log('[server] login route set');
// VALIDACION LOGIN
router.post(routes.root, function (req, res) {
    console.log("[server] validate user login");
    user = new User(req.body.name, sha1(req.body.passwd));
    mongoUsers.findUserByCreds(user, function (u) {
        if (!util.isNull(u) && !util.isUndefined(u)) {
            cookies.new(res, 'key', user.name, sessionDuration);
            res.redirect('/login/' + u.name + '/');
        } else { // ERROR usuario no encontrado
            view = new ViewData(views.user, 'MOR - VtDA', 'Login', 1);
            res.render(view.file, view.data);
        }
    });
});
console.log('[server] login validation set');

// NUEVO USUARIO
router.get(routes.login.new.user, function (req, res) {
    console.log("[server] new user creation view");
    view = new ViewData(views.newUser, 'MOR - VtDA', 'Nuevo Usuario', 0);
    res.render(view.file, view.data);
});
console.log('[server] new user route set');

// VALIDACION NUEVO USUARIO
router.post(routes.login.new.user, function (req, res) {
    console.log("[server] validate new user");
    var passwdArray = req.body.passwd;
    user = new User(req.body.name, sha1(req.body.passwd[0]));
    mongoUsers.findUserByName(user, function (u) {
        view = new ViewData(views.newUser, 'MOR - VtDA', 'Nuevo Usuario', 1);
        if (!util.type(util.arr, passwdArray) || passwdArray[0] !== passwdArray[1]) { // ERROR distintos passwd
            view.data.error = 4;
            res.render(view.file, view.data);
        } else if (passwdArray[0] == '' || req.body.user == '') { // ERROR empty fields
            view.data.error = 3;
            res.render(view.file, view.data);
        } else if (!util.isNull(u) && !util.isUndefined(u)) { // ERROR user already exists
            view.data.error = 2;
            res.render(view.file, view.data);
        } else { // OK
            mongoUsers.insertUser(user, function () {
                mongoUsers.listAllUsers(setUsers);
                console.log("[server] new user: " + user.name);
                view.data.games = games;
                view.data.user = user;
                cookies.new(res, 'key', user.name, sessionDuration);
                res.redirect('/login/' + user.name + '/');
            });
        }
    });
});
console.log('[server] new user validation set');

// ESCOGER PARTIDA
router.get(routes.login.access.user, function (req, res) {
    var userName = req.params.user, key = req.cookies.key;
    mongoGames.listAllGames(setGames);
    if (typeof userName != 'undefined') {
        if (key !== sha1(userName)) {
            view.data.error = 1;
            goToLogin(res);
        } else {
            console.log("[server] game choice view");
            view = new ViewData(views.game, userName + ' - VtDA', 'Selección de partida: ' + userName, 0);
            view.data.user = {name: userName};
            view.data.games = games;
            cookies.new(res, 'key', userName, sessionDuration);
            res.render(view.file, view.data);
        }
    }
});
console.log('[server] game choice route set');

// VALIDACION PARTIDA ESCOGIDA
router.post(routes.login.access.user, function (req, res) {
    console.log("[server] validate chosen game");
    var key = req.cookies.key;
    game = {name: req.body.name};
    view = new ViewData(views.game, req.params.user + ' - VtDA', 'Selección de partida: ' + req.params.user, 0);
    if (game.name === '') {
        view.data.error = 2;
        res.render(view.file, view.data);
    }
    if (key === sha1(req.params.user)) {
        mongoGames.findGameByName(game, function (g) {
            if (util.isNull(g)) {
                view.data.error = 1;
                res.render(view.file, view.data);
            } else {
                cookies.new(res, 'key', user.name, sessionDuration);
                res.redirect('/game/' + req.params.user + '/' + game.name);
            }
        });
    } else {
        goToLogin(res);
    }
});
console.log('[server] game choice validation set');

// NUEVA PARTIDA
router.get(routes.login.new.game, function (req, res) {
    var user = {name: req.params.user}, key = req.cookies.key;
    if (key === sha1(user.name)) {
        mongoUsers.findUserByName(user, function (u) {
            if (util.isNull(u)) {
                goToLogin(res);
            } else {
                user = u;
                console.log("[server] new game creation view");
                view = new ViewData(views.newGame, user.name + ' - VtDA', 'Nueva partida: ' + req.params.user, 0);
                view.data.user = user;
                res.render(view.file, view.data);
            }
        });
    } else {
        goToLogin(res);
    }
});
console.log('[server] new game route set');

// VALIDACION NUEVA PARTIDA
router.post(routes.login.new.game, function (req, res) {
    console.log("[server] validate new game");
    var key = req.cookies.key;
    game = {name: req.body.name};
    if (sha1(req.params.user) === key) {
        mongoGames.findGameByName(game, function (g) {
            if (!util.isNull(g)) {
                console.log("[server] game already exists: " + g.name);
                view = new ViewData(views.newGame, req.params.user + ' - VtDA', 'Nueva Partida: ' + req.params.user, 2);
                view.data.user = {name: req.params.user};
                res.render(view.file, view.data);
            } else {
                game = new Game(req.body.name);
                mongoGames.insertGame(game, function () {
                    mongoGames.listAllGames(function (list) {
                        if (!util.isNull(list)) {
                            games = list;
                            mongoUsers.findUserByName({name: req.params.user}, function (u) {
                                if (!util.isNull(u)) {
                                    user = u;
                                    user.gameList.push(game);
                                    mongoUsers.updateUser(user, function () {
                                        mongoUsers.listAllUsers(setUsers);
                                        cookies.new(res, 'key', user.name, sessionDuration);
                                        res.redirect('/game/' + user.name + '/' + game.name); // DAFUQIN CALLBACK HELL D:
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    } else {
        goToLogin(res);
    }
});
console.log('[server] new game validation set');

module.exports = router;