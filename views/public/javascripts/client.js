/**
 * Objeto controlador de conexiones websocket
 * Created by mor on 16/05/16.
 */
var sockets = {
    server: function (socket, mes, obj) {
        socket.emit(mes, obj);
    },
    update: function (socket) {
        var sheet, mes = 'update' + charFunctions.findData(char, 'nombre').value;
        charFunctions.updateChar(char);
        sheet = {user: user, game: game, char: char};
        sockets.server(socket, mes, sheet);
    },
    player: function (socket, char) {
        var charName = charFunctions.getData(char, 'nombre').value, wsMes = 'update' + charName;
        socket.on(wsMes, function (newChar) {
            char = newChar;
            charFunctions.updateChar(char);
            overlay.gameWindow(char);
        });
    }
};