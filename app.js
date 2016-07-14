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

var urlCleaner = require('./resources/server/javascripts/url_cleaner'),
    http = require('./resources/server/javascripts/http'),
    dbFix = require('./db/dbFix');

var login = require('./routes/login'),
    game = require('./routes/game');
var cookies = require('./resources/server/javascripts/cookies');

var PORT = process.env.PORT || 3000;
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
app.use(cookieParser(constants.server.session.secret));
app.use(urlCleaner.inspect);
var statics = constants.server.routes.statics.list;
statics.forEach(function(st) {
    console.log('[statics] loading path '+st.path+' at '+st.source);
    app.use(st.path, express.static(__dirname + st.source));
});
console.log('[server] middleware set');

app.use(constants.server.routes.login.root, login);
app.use(constants.server.routes.game.root, game);

// ROOT redirecciona al login
app.get(constants.server.routes.root, function(req, res) {
    console.log('[server] redirect to login');
    cookies.clear(res, req.cookies);
    res.redirect(constants.server.routes.login.root);
});
console.log('[server] root route set');

app.get(constants.server.routes.test, function (req, res) {
    console.log("[server] fix updateNames");
    var game = {name: 'Blood Money'},
        equiv = {reserva_de_sangre: 'sangre'};
    dbFix.updateNames(game, equiv);
    res.send(200);
});

server.listen(PORT);
console.log('[server] started at port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
require('./resources/server/javascripts/sockets.js')(io);