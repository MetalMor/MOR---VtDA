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
    helmet = require('helmet'), // HTTP security extension
    favicon = require('serve-favicon'); // application icon

var urlCleaner = require('./resources/server/javascripts/url_cleaner'),
    http = require('./resources/server/javascripts/http'),
    dbFix = require('./db/dbFix'),
    logger = require('./resources/both/javascripts/logger').activate();

var login = require('./routes/login'),
    game = require('./routes/game');
var cookies = require('./resources/server/javascripts/cookies');

var PORT = process.env.PORT || 3000;
logger.log('server', 'init server vars');

/**
 * TODO limpiar las entradas de parametros en la query (evitar caracteres chungos)
 * TODO fichero de constantes!!! [WORKIN ON IT]
 */

// ***** JADE TEMPLATES *****
app.set('view engine', 'pug');
logger.log('server', 'view engine set');

// ***** ENV VARS *****
app.set('port', PORT);
logger.log('server', 'env vars set');

// ***** MIDDLEWARE *****
app.use(helmet());
app.use(http.addHeaders);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser(constants.server.session.secrets.cookies));
app.use(urlCleaner.inspect);
app.use(favicon(__dirname + '/resources/client/images/icon/favicon.ico'));
var statics = constants.server.routes.statics.list;
statics.forEach(function(st) {
    logger.log('statics', 'loading path '+st.path+' at '+st.source);
    app.use(st.path, express.static(__dirname + st.source));
});
logger.log('server', 'middleware set');

app.use(constants.server.routes.login.root, login);
app.use(constants.server.routes.game.root, game);

// ROOT redirecciona al login
app.get(constants.server.routes.root, function(req, res) {
    logger.log('server', 'redirect to login');
    cookies.clear(res, req.cookies);
    res.redirect(constants.server.routes.login.root);
});
logger.log('server', 'root route set');

app.get(constants.server.routes.test, function (req, res) {
    logger.log('server', 'fix updateNames');
    var game = {name: 'Blood Money'},
        equiv = {reserva_de_sangre: 'sangre'};
    dbFix.updateNames(game, equiv);
    res.send(200);
});

server.listen(PORT);
logger.log('server', 'started at port ' + PORT);

// ***** EJECUTA LOS SOCKETS! *****
require('./resources/server/javascripts/sockets.js')(io);
