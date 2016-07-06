/**
 * Constantes de las rutas del login.
 * Created by becari on 06/07/2016.
 */

var login = {
    root: '/login',
    new: {
        user: '/new',
        game: '/:user/new'
    },
    access: {
        user: '/:user'
    }
};

module.exports = login;