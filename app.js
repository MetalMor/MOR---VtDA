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
    view = new ViewData('login.jade', 'MOR - VtDA', 'Login', 0);
    res.render(view.file, view.data);
});
app.post('/', function(req, res) {
    // TODO validar usuario
    var newUser = new User(req.body.name, req.body.passwd);
    var userFromDb = mongo.findUser(newUser);
    if(userFromDb !== undefined) {
        view = new ViewData('game.jade', 'MOR - VtDA', 'Partida', 0);
    } else {
        view = new ViewData('login.jade', 'MOR - VtDA', 'Login', 1);
    }
    console.log('userFromDb: ' + userFromDb);
    res.render(view.file, view.data);
});

app.get('/new', function(req, res) {
    // TODO nuevo usuario
    view = new ViewData('new_user.jade', 'MOR - VtDA', 'Nuevo Usuario', 0);
    res.render(view.file, view.data);
});

app.post('/new', function(req, res) {
    // TODO inserta nuevo usuario
    var newUser = new User(req.body.name, req.body.passwd[0]);
    var userFromDb = mongo.findUser(newUser);
    if(req.body.passwd[0] !== req.body.passwd[1]) {
        view = new ViewData('new_user.jade', 'MOR - VtDA', 'Nuevo Usuario', 3);
    } else if(userFromDb !== undefined) {
        view = new ViewData('new_user.jade', 'MOR - VtDA', 'Nuevo Usuario', 2);
    } else {
        mongo.insertUser(newUser);
    }
    res.render(view.file, view.data);
});

app.get('/:user/', function(req, res) {
    // TODO vista elegir partida
    res.render(view.file, view.data);
});

app.post('/:user')

app.get('/:user/new', function(req, res) {
    // TODO vista crear partida
    res.render(view.file, view.data);
});

server.listen(PORT);
console.log('escoltant pel port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
//require('./sockets.js')(io);