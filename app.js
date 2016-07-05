/**
 * It's a raining somewhere else... ^^¡
 */

var express = require('express'), // express dependencies models
    fs = require('fs'), // file parser
    app = require('express')(), // app models
    server = require('http').Server(app), // server models
    io = require('socket.io')(server), // asyncronous client-server communication
    bodyParser = require('body-parser'), // POST parameters
    cookieParser = require('cookie-parser'), // cookie parser&controller
    helmet = require('helmet'), // HTTP security extension
    sha1 = require('sha1'); // pwd encoder
console.log('[server] init dependencies');

var mongoUsers = require('./db/mongoUsers'), // db users controller
    mongoGames = require('./db/mongoGames'); // db games controller
console.log('[server] init db objects');

var util = require('./custom_modules/util'), // utils
    headers = require('./custom_modules/headers'), // additional HTTP headers
    cookies = require('./custom_modules/cookies'), // cookies
    ViewData = require('./objects/system/ViewData'), // view data model
    views = require('./objects/system/views'),
    User = require('./objects/models/User'), // user model
    Game = require('./objects/models/Game'), // game model
    CharFactory = require('./objects/factory/CharFactory'),
    clans = require('./objects/models/Clans'),
    generations = require('./objects/models/Generations'),
    constants = require('./objects/constants/Constants');
console.log('[server] init models');

var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
console.log('[server] init env vars');

var cf = new CharFactory(),
    sessionDuration = 5 * Math.pow(60, 2) * 1000; // session duration: 5h
var view, user, game, char = cf.initChar(),
    games, users; // users & games list
var setGames = function(list) {games = list},
    setUsers = function(list) {users = list},
    setGame = function(g) {game = g},
    setUser = function (u) {user = u},
    goToLogin = function (res) {res.redirect('/')};
console.log('[server] init server vars');

/**
 * TODO validar usuarios sin importar mayusculas o minusculas
 * TODO limpiar las entradas de parametros en la query (evitar caracteres maliciosos)
 * TODO fichero de constantes!!!
 */

mongoGames.listAllGames(setGames);
mongoUsers.listAllUsers(setUsers);

// ***** JADE TEMPLATES *****
app.set('view engine', 'jade');
console.log('[server] view engine set');

// ***** ENV VARS *****
app.set('port', PORT);
console.log('[server] env vars set');

// ***** MIDDLEWARE *****
app.use(helmet());
app.use(headers.add);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('m3t4Lm0R'));
app.use('/public', express.static(__dirname + '/views/public/'));
app.use('/css', express.static(__dirname + '/views/public/stylesheets/'));
app.use('/js', express.static(__dirname + '/views/public/javascripts/'));
app.use('/img', express.static(__dirname + '/views/public/images/'));
app.use('/lib', express.static(__dirname + '/views/public/libraries/'));
console.log('[server] middleware set');

// ROOT redirecciona al login
app.get('/', function(req, res) {
    console.log('[server] redirect to login');
    cookies.clear(res, req.cookies);
    res.redirect('/login/');
});
console.log('[server] root route set');

// LOGIN
app.get('/login/', function (req, res) {
    console.log("[server] user login view");
    view = new ViewData(views.user, 'MOR - VtDA', 'Login', 0);
    res.render(view.file, view.data);
});

/*app.get('/test/', function(req, res) {
 console.log("[server] test util.updateNames");
 util.updateNames();
 res.send(200);
 });*/

console.log('[server] login route set');
// VALIDACION LOGIN
app.post('/login/', function(req, res) {
    console.log("[server] validate user login");
    user = new User(req.body.name, sha1(req.body.passwd));
    mongoUsers.findUserByCreds(user, function(u) {
        if (!util.isNull(u) && !util.isUndefined(u)) {
            cookies.new(res, 'key', user.name, sessionDuration);
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
        if (!util.type(util.arr, passwdArray) || passwdArray[0] !== passwdArray[1]) { // ERROR distintos passwd
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
                cookies.new(res, 'key', user.name, sessionDuration);
                res.redirect('/login/'+user.name+'/');
            });
        }
    });
});
console.log('[server] new user validation set');

// ESCOGER PARTIDA
app.get('/login/:user/', function(req, res) {
    var userName = req.params.user, key = req.cookies.key;
    mongoGames.listAllGames(setGames);
    if(typeof userName != 'undefined') {
        if (key !== sha1(userName)) {
            view.data.error = 1;
            goToLogin(res);
        } else {
            console.log("[server] game choice view");
            view = new ViewData(views.game, userName+' - VtDA', 'Selección de partida: '+userName, 0);
            view.data.user = {name: userName};
            view.data.games = games;
            cookies.new(res, 'key', userName, sessionDuration);
            res.render(view.file, view.data);
        }
    }
});
console.log('[server] game choice route set');

// VALIDACION PARTIDA ESCOGIDA
app.post('/login/:user/', function(req, res) {
    console.log("[server] validate chosen game");
    var key = req.cookies.key;
    game = {name: req.body.name};
    view = new ViewData(views.game, req.params.user+' - VtDA', 'Selección de partida: '+req.params.user, 0);
    if(game.name === '') {
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
app.get('/login/:user/new/', function(req, res) {
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
app.post('/login/:user/new/', function(req, res) {
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

// PANTALLA DE JUEGO
app.get('/game/:user/:game', function(req, res) {
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
                            console.log("[server] logging player in: " + game.name);
                            view.file = views.player;
                            char = util.findChar(user, game);
                            if (!char) {
                                var cf = new CharFactory();
                                char = cf.initChar();
                            }
                            view.data.charJSON = JSON.stringify(char);
                            view.data.char = char;
                            res.render(view.file, view.data);
                        } else { // master
                            view.data.playerFlag = false;
                            console.log("[server] logging master " + user.name + " in: " + game.name);
                            res.render(view.file, view.data);
                        }
                    } else {
                        goToLogin(res);
                    }
                });
            }
        });
    } else {
        goToLogin(res);
    }
});
console.log('[server] game panel route set');

app.get('/game/initChar', function (req, res) {
    var ret = cf.initChar();
    ret.npc = true;
    headers.contentType(res, 'application/json');
    res.send(JSON.stringify(ret));
});
console.log('[server] init char request route set');

server.listen(PORT);
console.log('[server] started at port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
require('./custom_modules/sockets.js')(io);