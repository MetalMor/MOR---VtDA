var express = require('express');
var fs = require('fs');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var mongo = require('./mongo.js');
var dbUrl = 'mongodb://localhost:27017/vtda';

var ViewData = require('./models/ViewData.js');
var User = require('./models/User.js');

var PORT = 3000;
var view;

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
    // TODO validar usuario
    console.log("[server] validate user login");
    var user = new User(req.body.name, req.body.passwd);
    var userFromDb = mongo.findUserByCreds(user);
    if(typeof userFromDb !== 'undefined') {
        view = new ViewData('game.jade', user.name+' - VtDA', 'Selección de partida', 0);
    } else {
        view = new ViewData('login.jade', 'MOR - VtDA', 'Login', 1);
    }
    console.log('userFromDb: ' + userFromDb);
    res.render(view.file, view.data);
});

app.get('/new', function(req, res) {
    // TODO login usuario (mongo fix)
    console.log("[server] new user creation view");
    view = new ViewData('new_user.jade', 'MOR - VtDA', 'Nuevo Usuario', 0);
    res.render(view.file, view.data);
});

app.post('/new', function(req, res) {
    // TODO inserta nuevo usuario (mongo fix)
    console.log("[server] validate new user");
    var passwdArray = req.body.passwd;
    var newUser = new User(req.body.name, req.body.passwd[0]);
    var userFromDb = mongo.findUserByName(newUser);
    view = new ViewData('new_user.jade', 'MOR - VtDA', 'Nuevo Usuario', 1);
    console.log('passwd: ' + passwdArray);
    if (!passwdArray.hasOwnProperty('length') || passwdArray[0] !== passwdArray[1]) {
        view.data.error = 4;
    } else if(passwdArray[0] == '' || req.body.user == '') {
        view.data.error = 3;
    } else if(userFromDb !== null && typeof userFromDb !== 'undefined') {
        view.data.error = 2;
    } else {
        console.log("[server] new user: "+newUser.name);
        mongo.insertUser(newUser);
        view = new ViewData('game.jade', newUser.name+' - VtDA', 'Selección de partida', 0);
    }
    res.render(view.file, view.data);
});

app.get('/:user/', function(req, res) {
    // TODO vista elegir partida
    console.log("[server] game choice view");
    view = new ViewData('game.jade', 'MOR - VtDA', 'Selección de partida', 0);
    res.render(view.file, view.data);
});

//app.post('/:user');

app.get('/:user/new', function(req, res) {
    // TODO vista crear partida
    console.log("[server] new game creation view");
    res.render(view.file, view.data);
});

server.listen(PORT);
console.log('escoltant pel port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
//require('./sockets.js')(io);