/**
 * It's a raining somewhere else... ^^¡
 */

var constFilePath = './objects/constants/Constants',
    constants = require(constFilePath);

var express = require('express'), // express dependencies models
    fs = require('fs'), // file parser
    app = require('express')(), // app models
    server = require('http').Server(app), // server models
    io = require('socket.io')(server), // asyncronous client-server communication
    bodyParser = require('body-parser'), // POST parameters
    cookieParser = require('cookie-parser'), // cookie parser&controller
    helmet = require('helmet'); // HTTP security extension

var urlCleaner = require('./server/url_cleaner'),
    http = require('./server/http');

var login = require('./routes/login'),
    game = require('./routes/game');
var cookies = require('./server/cookies');

var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
console.log('[server] init server vars');

/**
 * TODO validar usuarios sin importar mayusculas o minusculas
 * TODO limpiar las entradas de parametros en la query (evitar caracteres maliciosos)
 * TODO fichero de constantes!!!
 */

// ***** JADE TEMPLATES *****
app.set('view engine', 'jade');
console.log('[server] view engine set');

// ***** ENV VARS *****
app.set('port', PORT);
console.log('[server] env vars set');

// ***** MIDDLEWARE *****
app.use(helmet());
app.use(http.addHeaders);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(constants.server.cookieKey));
app.use(urlCleaner.inspect);
app.use('/public', express.static(__dirname + '/client/'));
app.use('/css', express.static(__dirname + '/client/stylesheets/'));
app.use('/js', express.static(__dirname + '/client/javascripts/'));
app.use('/img', express.static(__dirname + '/client/images/'));
app.use('/lib', express.static(__dirname + '/client/libraries/'));
console.log('[server] middleware set');

app.use('/login', login);
app.use('/game', game);

// ROOT redirecciona al login
app.get('/', function(req, res) {
    console.log('[server] redirect to login');
    cookies.clear(res, req.cookies);
    res.redirect('/login/');
});
console.log('[server] root route set');

app.get('/test/', function (req, res) {
    console.log("[server] test util.updateNames");
    util.updateNames();
    res.send(200);
});

server.listen(PORT);
console.log('[server] started at port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
require('./server/sockets.js')(io);