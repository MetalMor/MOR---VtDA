/**
 * Objeto controlador de conexiones websocket
 * Created by mor on 16/05/16.
 */
var sockets = {
    server: function (mes, obj) {
        var link = sockets.link;
        link.emit(mes, obj);
    },
    update: function () {
        var sheet, mes = 'update'/* + charFunctions.findData(char, 'nombre').value*/;
        charFunctions.updateChar(char);
        sheet = {user: user, game: game, char: char};
        sockets.server(mes, sheet);
    },
    player: function () {
        var link = sockets.link, wsMes = 'update';
        link.on(wsMes, function (sheet) {
            console.log('[socket] recieved update');
            var curCharName, newCharName;
            curCharName = charFunctions.findData(char, 'nombre').value;
            newCharName = charFunctions.findData(sheet.char, 'nombre').value;
            /*if (curCharName === newCharName) {
                char = sheet.char;
                game = sheet.game;
                charFunctions.updateChar(char);
                overlay.gameWindow(char);
            }*/
            overlay.gameWindow(char);
        });
    },
    setLink: function(link) {
        sockets.link = link;
    }
};