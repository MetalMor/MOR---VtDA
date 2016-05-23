/**
 * Objeto controlador de conexiones websocket
 * Created by mor on 16/05/16.
 */
var sockets = {
    server: function (socket, mes, obj) {
        socket.emit(mes, obj);
    }
};