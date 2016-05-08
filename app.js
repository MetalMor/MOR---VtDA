var express = require('express'); // express dependencies object
var fs = require('fs'); // file parser
var app = require('express')(); // app object
var server = require('http').Server(app); // server object
var io = require('socket.io')(server); // asyncronous events
var bodyParser = require('body-parser'); // POST parameters
var sha1 = require('sha1'); // pwd encoder

var mongoUsers = require('./db/mongoUsers'); // db users controller
var mongoGames = require('./db/mongoGames'); // db games controller

var util = require('./util'); // utils
var ViewData = require('./models/object/ViewData'); // view data model
var User = require('./models/object/User'); // user model
var Game = require('./models/object/Game'); // game model
var CharFactory = require('./models/factory/CharFactory');

var PORT = 3000;
var view, user, game, char;

var cf = new CharFactory();
char = cf.initChar();
util.showProps(char);

/**
 * TODO VERY MUCH IMPORTANT!!! controlar de algún modo que no se pueda entrar a la interfaz de un usuario poniéndolo en la URL
 * TODO ficha!!! operaciones CRUD del personaje en la BD
 *
 *
 */

var games, users; // users & games list
var setGames = function(list) {games = list};
var setUsers = function(list) {users = list};
mongoGames.listAllGames(setGames);
mongoUsers.listAllUsers(setUsers);

// ***** JADE TEMPLATES *****
app.set('view engine', 'jade');

// ***** ROUTING & SERVER *****
app.use('/public', express.static(__dirname + '/views/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// ROOT redirecciona al login
app.get('/', function(req, res) {
    console.log('[server] redirect to login');
    res.redirect('/login/');
});

// LOGIN
app.get('/login/', function (req, res) {
    console.log("[server] user login view");
    view = new ViewData('user.jade', 'MOR - VtDA', 'Login', 0);
    res.render(view.file, view.data);
});
// VALIDACION LOGIN
app.post('/login/', function(req, res) {
    console.log("[server] validate user login");
    user = new User(req.body.name, sha1(req.body.passwd));
    mongoUsers.findUserByCreds(user, function(u) {
        if (u !== null && typeof u != 'undefined') {
            res.redirect('/login/'+u.name+'/');
        } else { // ERROR usuario no encontrado
            view = new ViewData('user.jade', 'MOR - VtDA', 'Login', 1);
            res.render(view.file, view.data);
        }
    });
});

// NUEVO USUARIO
app.get('/login/new', function(req, res) {
    console.log("[server] new user creation view");
    view = new ViewData('user_new.jade', 'MOR - VtDA', 'Nuevo Usuario', 0);
    res.render(view.file, view.data);
});
// VALIDACION NUEVO USUARIO
app.post('/login/new', function(req, res) {
    console.log("[server] validate new user");
    var passwdArray = req.body.passwd;
    user = new User(req.body.name, sha1(req.body.passwd[0]));
    mongoUsers.findUserByName(user, function(u) {
        view = new ViewData('user_new.jade', 'MOR - VtDA', 'Nuevo Usuario', 1);
        if (!passwdArray.hasOwnProperty('length') || passwdArray[0] !== passwdArray[1]) { // ERROR distintos passwd
            view.data.error = 4;
            res.render(view.file, view.data);
        } else if(passwdArray[0] == '' || req.body.user == '') { // ERROR empty fields
            view.data.error = 3;
            res.render(view.file, view.data);
        } else if(u !== null && typeof u !== 'undefined') { // ERROR user already exists
            view.data.error = 2;
            res.render(view.file, view.data);
        } else { // OK
            mongoUsers.insertUser(user, function() {
                mongoUsers.listAllUsers(function(list) {
                    users = list;
                    console.log("[server] new user: "+user.name);
                    view.data.games = games;
                    view.data.user = user;
                    res.redirect('/login/'+user.name+'/');
                });
            });
        }
    });
});

// ESCOGER PARTIDA
app.get('/login/:user/', function(req, res) {
    var userName = req.params.user;
    mongoGames.listAllGames(setGames);
    if(typeof userName != 'undefined') {
        console.log("[server] game choice view");
        if (user.name !== userName) {
            view.data.error = 1;
            res.redirect('/');
        } else {
            view = new ViewData('game.jade', userName+' - VtDA', 'Selección de partida: '+userName, 0);
            view.data.user = user;
            view.data.games = games;
            res.render(view.file, view.data);
        }
    }
});
// VALIDACION PARTIDA ESCOGIDA
app.post('/login/:user/', function(req, res) {
    // TODO validacion partida escogida
    console.log("[server] validate chosen game");
    game = {name: req.body.name};
    view = new ViewData('game.jade', req.params.user+' - VtDA', 'Selección de partida: '+req.params.user, 0);
    if(game.name === '') {
        view.data.error = 2;
        res.render(view.file, view.data);
    }
    mongoGames.findGameByName(game, function(g) {
        if(g === null) {
            view.data.error = 1;
            res.render(view.file, view.data);
        } else {
            res.redirect('/game/'+req.params.user+'/'+game.name);
        }
    });
});

// NUEVA PARTIDA
app.get('/login/:user/new/', function(req, res) {
    var user = {name: req.params.user};
    mongoUsers.findUserByName(user, function(u) {
        if(u === null) {
            res.redirect('/');
        } else {
            user = u;
            console.log("[server] new game creation view");
            view = new ViewData('game_new.jade', user.name + ' - VtDA', 'Nueva partida: '+req.params.user, 0);
            view.data.user = user;
            res.render(view.file, view.data);
        }
    });
});
// VALIDACION NUEVA PARTIDA
app.post('/login/:user/new/', function(req, res) {
    console.log("[server] validate new game");
    game = {name: req.body.name};
    mongoGames.findGameByName(game, function(g) {
        if(g !== null) {
            console.log("[server] game already exists: "+g.name);
            view = new ViewData('game_new.jade', req.params.user+' - VtDA', 'Nueva Partida: '+req.params.user, 2);
            view.data.user = {name: req.params.user};
            res.render(view.file, view.data);
        } else {
            game = new Game(req.body.name);
            mongoGames.insertGame(game, function(){
                mongoGames.listAllGames(function(list) {
                    games = list;
                    mongoUsers.findUserByName({name: req.params.user}, function(u) {
                        user = u;
                        user.gameList.push(game);
                        mongoUsers.updateUser(user, function() {
                            mongoUsers.listAllUsers(setUsers);
                            res.redirect('/game/'+user.name+'/'+game.name); // DAFUQIN CALLBACK HELL D:
                        })
                    });
                });
            });
        }
    });
});

// PANTALLA DE JUEGO
app.get('/game/:user/:game', function(req, res) {
    // TODO vista de la partida (validar si ha entrado el master o un player, y en este ultimo caso si tiene una ficha)
    var userName = req.params.user, gameName = req.params.game;
    var tmpUser = {name: userName}, tmpGame = {name: gameName};
    mongoUsers.findUserByName(tmpUser, function(u) {
        user = u;
        mongoGames.findGameByName(tmpGame, function(g) {
            game = g;
            view = new ViewData('panel_master.jade', userName+' - '+gameName, gameName+': '+userName, 0);
            view.data.user = user;
            view.data.game = game;
            var index = util.getIndex(user.gameList, 'name', gameName);
            console.log("[server] game index: "+index);
            // TODO falla al unirse a una partida (envia al master a panel_player.jade D: )
            if (index<0) { // no existe: entra como jugador
                console.log("[server] logging player in: "+game.name);
                view.file = 'panel_player.jade';
                res.render(view.file, view.data);
            } else { // existe: es el master
                console.log("[server] logging master in: "+game.name);
                res.render(view.file, view.data);
            }
        });
    });
});

server.listen(PORT);
console.log('[server] started at port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
//require('./sockets.js')(io);