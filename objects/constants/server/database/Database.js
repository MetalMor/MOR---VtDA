/**
 * Constantes de la conexión con la base de datos.
 * Created by becari on 12/07/2016.
 */

var database = {
    url: {
        dev: 'mongodb://localhost:27017/vtda',
        prod: 'mongodb://mor:m3t4Lm0R@olympia.modulusmongo.net:27017/vtm'
    },
    collections: {
        games: 'games',
        users: 'users'
    }
};

module.exports = database;