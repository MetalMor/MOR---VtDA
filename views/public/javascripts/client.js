/**
 * Objeto controlador de conexiones websocket
 * Created by mor on 16/05/16.
 */
var sockets = {
    initChar: function(socket, char, user, game) {
        var sheet = {user: user, char: char, game: game};
        socket.emit('initChar', sheet);
    }
};