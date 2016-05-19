/**
 * It's a raining somewhere else... ^^¡
 */

var express = require('express'), // express dependencies models
    fs = require('fs'), // file parser
    app = require('express')(), // app models
    server = require('http').Server(app), // server models
    io = require('socket.io')(server), // asyncronous client-server communication
    bodyParser = require('body-parser'), // POST parameters
    sha1 = require('sha1'); // pwd encoder
console.log('[server] init dependencies');

var mongoUsers = require('./db/mongoUsers'), // db users controller
    mongoGames = require('./db/mongoGames'); // db games controller
console.log('[server] init db objects');

var util = require('./util'), // utils
    ViewData = require('./objects/system/ViewData'), // view data model
    views = require('./objects/system/views'),
    User = require('./objects/models/User'), // user model
    Game = require('./objects/models/Game'), // game model
    CharFactory = require('./objects/factory/CharFactory'),
    clans = require('./objects/models/Clans'),
    generations = require('./objects/models/Generations');
console.log('[server] init models');

var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000,
    IP = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
console.log('[server] init env vars');

var cf = new CharFactory();
var view, user, game, char = cf.initChar(),
    games, users; // users & games list
var setGames = function(list) {games = list},
    setUsers = function(list) {users = list},
    setGame = function(g) {game = g},
    setUser = function(u) {user = u};
console.log('[server] init server vars');

/**
 * TODO VERY MUCH IMPORTANT!!! controlar de algún modo que no se pueda entrar a la interfaz de un usuario poniéndolo en la URL
 * TODO validar usuarios sin importar mayusculas o minusculas
 * TODO ficha!!! operaciones CRUD del personaje en la BD
 */

mongoGames.listAllGames(setGames);
mongoUsers.listAllUsers(setUsers);

// ***** JADE TEMPLATES *****
app.set('view engine', 'jade');
console.log('[server] view engine set');

// ***** ENV VARS *****
app.set('port', PORT);
app.set('ipaddr', IP);
console.log('[server] env vars set');

// ***** ROUTING & SERVER *****
app.use('/public', express.static(__dirname + '/views/public/'));
app.use('/css', express.static(__dirname + '/views/public/stylesheets/'));
app.use('/js', express.static(__dirname + '/views/public/javascripts/'));
app.use('/img', express.static(__dirname + '/views/public/images/'));
app.use('/lib', express.static(__dirname + '/views/public/libraries/'));
console.log('[server] static files\' routes set');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
console.log('[server] body-parser set');

// ROOT redirecciona al login
app.get('/', function(req, res) {
    console.log('[server] redirect to login');
    res.redirect('/login/');
});
console.log('[server] root route set');

// LOGIN
app.get('/login/', function (req, res) {
    console.log("[server] user login view");
    view = new ViewData(views.user, 'MOR - VtDA', 'Login', 0);
    res.render(view.file, view.data);
});
console.log('[server] login route set');
// VALIDACION LOGIN
app.post('/login/', function(req, res) {
    console.log("[server] validate user login");
    user = new User(req.body.name, sha1(req.body.passwd));
    mongoUsers.findUserByCreds(user, function(u) {
        if (!util.isNull(u) && !util.isUndefined(u)) {
            res.redirect('/login/'+u.name+'/');
        } else { // ERROR usuario no encontrado
            view = new ViewData(views.user, 'MOR - VtDA', 'Login', 1);
            res.render(view.file, view.data);
        }
    });
});
console.log('[server] login validation set');

// NUEVO USUARIO
app.get('/login/new', function(req, res) {
    console.log("[server] new user creation view");
    view = new ViewData(views.newUser, 'MOR - VtDA', 'Nuevo Usuario', 0);
    res.render(view.file, view.data);
});
console.log('[server] new user route set');

// VALIDACION NUEVO USUARIO
app.post('/login/new', function(req, res) {
    console.log("[server] validate new user");
    var passwdArray = req.body.passwd;
    user = new User(req.body.name, sha1(req.body.passwd[0]));
    mongoUsers.findUserByName(user, function(u) {
        view = new ViewData(views.newUser, 'MOR - VtDA', 'Nuevo Usuario', 1);
        if (!passwdArray.hasOwnProperty('length') || passwdArray[0] !== passwdArray[1]) { // ERROR distintos passwd
            view.data.error = 4;
            res.render(view.file, view.data);
        } else if(passwdArray[0] == '' || req.body.user == '') { // ERROR empty fields
            view.data.error = 3;
            res.render(view.file, view.data);
        } else if(!util.isNull(u) && !util.isUndefined(u)) { // ERROR user already exists
            view.data.error = 2;
            res.render(view.file, view.data);
        } else { // OK
            mongoUsers.insertUser(user, function() {
                mongoUsers.listAllUsers(setUsers);
                console.log("[server] new user: "+user.name);
                view.data.games = games;
                view.data.user = user;
                res.redirect('/login/'+user.name+'/');
            });
        }
    });
});
console.log('[server] new user validation set');

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
            view = new ViewData(views.game, userName+' - VtDA', 'Selección de partida: '+userName, 0);
            view.data.user = user;
            view.data.games = games;
            res.render(view.file, view.data);
        }
    }
});
console.log('[server] game choice route set');

// VALIDACION PARTIDA ESCOGIDA
app.post('/login/:user/', function(req, res) {
    // TODO validacion partida escogida
    console.log("[server] validate chosen game");
    game = {name: req.body.name};
    view = new ViewData(views.game, req.params.user+' - VtDA', 'Selección de partida: '+req.params.user, 0);
    if(game.name === '') {
        view.data.error = 2;
        res.render(view.file, view.data);
    }
    mongoGames.findGameByName(game, function(g) {
        if(util.isNull(g)) {
            view.data.error = 1;
            res.render(view.file, view.data);
        } else {
            res.redirect('/game/'+req.params.user+'/'+game.name);
        }
    });
});
console.log('[server] game choice validation set');

// NUEVA PARTIDA
app.get('/login/:user/new/', function(req, res) {
    var user = {name: req.params.user};
    mongoUsers.findUserByName(user, function(u) {
        if(util.isNull(u)) {
            res.redirect('/');
        } else {
            user = u;
            console.log("[server] new game creation view");
            view = new ViewData(views.newGame, user.name + ' - VtDA', 'Nueva partida: '+req.params.user, 0);
            view.data.user = user;
            res.render(view.file, view.data);
        }
    });
});
console.log('[server] new game route set');

// VALIDACION NUEVA PARTIDA
app.post('/login/:user/new/', function(req, res) {
    console.log("[server] validate new game");
    game = {name: req.body.name};
    mongoGames.findGameByName(game, function(g) {
        if(!util.isNull(g)) {
            console.log("[server] game already exists: "+g.name);
            view = new ViewData(views.newGame, req.params.user+' - VtDA', 'Nueva Partida: '+req.params.user, 2);
            view.data.user = {name: req.params.user};
            res.render(view.file, view.data);
        } else {
            game = new Game(req.body.name);
            mongoGames.insertGame(game, function(){
                mongoGames.listAllGames(function(list) {
                    if(!util.isNull(list)) {
                        games = list;
                        mongoUsers.findUserByName({name: req.params.user}, function (u) {
                            if(!util.isNull(u)) {
                                user = u;
                                user.gameList.push(game);
                                mongoUsers.updateUser(user, function () {
                                    mongoUsers.listAllUsers(setUsers);
                                    res.redirect('/game/' + user.name + '/' + game.name); // DAFUQIN CALLBACK HELL D:
                                });
                            }
                        });
                    }
                });
            });
        }
    });
});
console.log('[server] new game validation set');

// PANTALLA DE JUEGO
app.get('/game/:user/:game', function(req, res) {
    var userName = req.params.user, gameName = req.params.game;
    var tmpUser = {name: userName}, tmpGame = {name: gameName};
    mongoUsers.findUserByName(tmpUser, function(u) {
        if(!util.isNull(u)) {
            user = u;
            mongoGames.findGameByName(tmpGame, function (g) {
                if (!util.isNull(g)) {
                    game = g;
                    view = new ViewData(views.master, userName + ' - ' + gameName, gameName + ': ' + userName, 0);
                    view.data.userJSON = JSON.stringify(user);
                    view.data.gameJSON = JSON.stringify(game);
                    view.data.user = user;
                    view.data.game = game;
                    view.data.clans = clans;
                    view.data.gens = generations;
                    var index = util.getIndex(user.gameList, 'name', gameName);
                    if (index < 0) { // no existe: entra como jugador
                        console.log("[server] logging player in: " + game.name);
                        view.file = views.player;
                        char = util.findChar(user, game);
                        if (char === 0) {
                            var cf = new CharFactory();
                            char = cf.initChar();
                        }
                        view.data.charJSON = JSON.stringify(char);
                        view.data.char = char;
                        res.render(view.file, view.data);
                    } else { // existe: es el master
                        console.log("[server] logging master in: " + game.name);
                        res.render(view.file, view.data);
                    }
                } else {
                    res.redirect('/');
                }
            });
        }
    });
});
console.log('[server] game panel route set');

server.listen(PORT, IP, function() {console.log('[server] started at port ' + PORT)});

// ***** EJECUTA LOS SOCKETS! *****
require('./sockets.js')(io);