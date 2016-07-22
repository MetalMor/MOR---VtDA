/**
 * Constantes de las rutas de la partida
 * Created by becari on 06/07/2016.
 */

var game = {
    root: '/game',
    access: {
        gamePanel: '/:user/:game',
        initChar: '/initChar',
        download: '/downloadSheet',
        dataObject: '/dataObject'
    }
};

module.exports = game;