var express = require('express');
var fs = require('fs');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var MongoClient = require('mongodb').MongoClient;

var mongo = require('./mongo.js');
var dbUrl = 'mongodb://localhost:27017/vtda';

var ViewData = require('./models/ViewData.js');
var User = require('./models/User.js');

var PORT = 3000;
var view;
var user;

var games = [];

games.push("game1");
games.push("game3");
games.push("game2");

// ***** IMPORTA EL MOTOR JADE *****
app.set('view engine', 'jade');

// ***** RUTAS Y ARRANQUE DEL SERVIDOR *****
app.use('/public', express.static(__dirname + '/views/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
    console.log("[server] user login view");
    view = new ViewData('login.jade', 'MOR - VtDA', 'Login', 0);
    res.render(view.file, view.data);
});
app.post('/', function(req, res) {
    console.log("[server] validate user login");
    user = new User(req.body.name, sha1(req.body.passwd));
    mongo.findUserByCreds(user, function(u) {
        if (typeof u != 'undefined' && u !== null) {
            console.log("[server] userFromDb: "+ u.name);
            res.redirect('/'+u.name+'/');
        } else { // ERROR usuario no encontrado
            view = new ViewData('login.jade', 'MOR - VtDA', 'Login', 1);
            res.render(view.file, view.data);
        }
    });
});

app.get('/new', function(req, res) {
    console.log("[server] new user creation view");
    view = new ViewData('new_user.jade', 'MOR - VtDA', 'Nuevo Usuario', 0);
    res.render(view.file, view.data);
});

app.post('/new', function(req, res) {
    console.log("[server] validate new user");
    var passwdArray = req.body.passwd;
    user = new User(req.body.name, sha1(req.body.passwd[0]));
    mongo.findUserByName(user, function(u) {
        view = new ViewData('new_user.jade', 'MOR - VtDA', 'Nuevo Usuario', 1);
        if (!passwdArray.hasOwnProperty('length') || passwdArray[0] !== passwdArray[1]) { // ERROR distintos passwd
            view.data.error = 4;
            res.render(view.file, view.data);
        } else if(passwdArray[0] == '' || req.body.user == '') { // ERROR empty passwd
            view.data.error = 3;
            res.render(view.file, view.data);
        } else if(u !== null && typeof u !== 'undefined') { // ERROR usuario ya existe
            view.data.error = 2;
            res.render(view.file, view.data);
        } else { // OK
            mongo.insertUser(user, function() {
                console.log("[server] new user: "+user.name);
                view.data.games = games;
                view.data.user = user;
                res.redirect('/'+user.name+'/');
            });
        }
    });
});

app.get('/:user/', function(req, res) {
    // TODO vista elegir partida
    var userName = req.params.user;
    if(typeof userName != 'undefined') {
        console.log("[server] game choice view");
        if (user.name !== userName) {
            view.data.error = 1;
            res.redirect('/');
        } else {
            view = new ViewData('game.jade', userName + ' - VtDA', 'Selección de partida: '+userName, 0);
            view.data.user = user;
            view.data.games = games;
            res.render(view.file, view.data);
        }
    }
});

app.get('/:user/new', function(req, res) {
    // TODO vista crear partida
    console.log("[server] new game creation view");
    res.render(view.file, view.data);
});

server.listen(PORT);
console.log('escoltant pel port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
//require('./sockets.js')(io);