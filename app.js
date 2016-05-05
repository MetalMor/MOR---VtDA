var express = require('express'); // express dependencies object
var fs = require('fs'); // file parser
var app = require('express')(); // app object
var server = require('http').Server(app); // server object
var io = require('socket.io')(server); // asyncronous events
var bodyParser = require('body-parser'); // POST parameters
var sha1 = require('sha1'); // pwd encoder

var mongoUsers = require('./db/mongoUsers.js'); // db users controller
var mongoGames = require('./db/mongoGames.js'); // db games controller

var ViewData = require('./models/ViewData.js'); // view data model
var User = require('./models/User.js'); // user model

var PORT = 3000;
var view, user, game;

var games = [], users = []; // users & games list
mongoGames.listAllGames(function(list) {games = list});
mongoUsers.listAllUsers(function(list) {users = list});

// ***** JADE TEMPLATES *****
app.set('view engine', 'jade');

// ***** ROUTING & SERVER *****
app.use('/public', express.static(__dirname + '/views/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
    console.log('[server] redirect to \'/user/\'');
    res.redirect('/login/');
});

app.get('/login/', function (req, res) {
    console.log("[server] user login view");
    view = new ViewData('user.jade', 'MOR - VtDA', 'Login', 0);
    res.render(view.file, view.data);
});
app.post('/login/', function(req, res) {
    console.log("[server] validate user login");
    user = new User(req.body.name, sha1(req.body.passwd));
    mongoUsers.findUserByCreds(user, function(u) {
        if (u !== null && typeof u != 'undefined') {
            console.log("[server] userFromDb: "+ u.name);
            res.redirect('/login/'+u.name+'/');
        } else { // ERROR usuario no encontrado
            view = new ViewData('user.jade', 'MOR - VtDA', 'Login', 1);
            res.render(view.file, view.data);
        }
    });
});

app.get('/login/new', function(req, res) {
    console.log("[server] new user creation view");
    view = new ViewData('user_new.jade', 'MOR - VtDA', 'Nuevo Usuario', 0);
    res.render(view.file, view.data);
});

app.post('/login/new', function(req, res) {
    console.log("[server] validate new user");
    var passwdArray = req.body.passwd;
    user = new User(req.body.name, sha1(req.body.passwd[0]));
    mongoUsers.findUserByName(user, function(u) {
        view = new ViewData('user_new.jade', 'MOR - VtDA', 'Nuevo Usuario', 1);
        if (!passwdArray.hasOwnProperty('length') || passwdArray[0] !== passwdArray[1]) { // ERROR distintos passwd
            view.data.error = 4;
            res.render(view.file, view.data);
        } else if(passwdArray[0] == '' || req.body.user == '') { // ERROR empty passwd
            view.data.error = 3;
            res.render(view.file, view.data);
        } else if(u !== null && typeof u !== 'undefined') { // ERROR user already exists
            view.data.error = 2;
            res.render(view.file, view.data);
        } else { // OK
            mongoUsers.insertUser(user, function() {
                console.log("[server] new user: "+user.name);
                view.data.games = games;
                view.data.user = user;
                res.redirect('/login/'+user.name+'/');
            });
        }
    });
});

app.get('/login/:user/', function(req, res) {
    var userName = req.params.user;
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

app.post('/login/:user/', function(req, res) {
    // TODO validacion partida escogida
    console.log("[server] validate chosen game");
});

app.get('/login/:user/new/', function(req, res) {
    var userName = req.params.user;
    mongoUsers.findUserByName(userName, function(u) {
        user = u;
        console.log("[server] new game creation view");
        view = new ViewData('game_new.jade', userName+' - VtDA', 'Nuevo Usuario', 0);
        view.data.user = user;
        res.render(view.file, view.data);
    });
});

app.post('/login/:user/new/', function(req, res) {
    // TODO validacion nueva partida
    console.log("[server] validate new game");
});

app.get('/game/:user/:game', function(req, res) {
    // TODO vista de la partida
    var userName = req.params.user, gameName = req.params.game;
    console.log("[server] user "+userName+" started playing at "+gameName);
});

server.listen(PORT);
console.log('[server] started at port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
//require('./sockets.js')(io);