/**
 * Constantes del servidor
 * Created by becari on 05/07/2016.
 */

var server = {
    routes: require('./routes/Routes'),
    db: require('./database/Database'),
    headers: require('./headers/Headers'),
    session: require('./session/Session')
};

module.exports = server;