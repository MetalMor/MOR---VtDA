/**
 * Objeto controlador de conexiones websocket
 * Created by mor on 16/05/16.
 */
var sockets = {
    /**
     * Envía un mensaje con WS al servidor.
     * @param mes Identificador del mensaje
     * @param obj Datos del mensaje
     */
    server: function (mes, obj) {
        var link = sockets.link;
        link.emit(mes, obj);
    },
    /**
     * Envía al servidor los datos del cliente para actualizar la base de datos.
     */
    update: function () {
        var sheet, mes = 'update';
        charFunctions.updateChar(char);
        sheet = {user: user, game: game, char: char};
        sockets.server(mes, sheet);
    },
    /**
     * Define los listeners de mensajes WS para la lógica del jugador.
     */
    player: function () {
        var link = sockets.link, wsMes = 'update';
        link.on(wsMes, function (sheet) {
            console.log('[socket] recieved update');
            var curCharName, newCharName;
            curCharName = charFunctions.findData(char, 'nombre').value;
            newCharName = charFunctions.findData(sheet.char, 'nombre').value;
            if (!util.isUndefined(sheet.game))
                game = sheet.game;
            if (curCharName === newCharName) {
                char = sheet.char;
                charFunctions.updateChar(char);
                overlay.gameWindow(char);
            }
            overlay.gameWindow(char);
            if (util.isMaster(user, game)) list.loadCharSelection();
        });
    },
    /**
     * Guarda el enlace WS con el servidor enviado por parámetro en una propiedad.
     * @param link Conector WS con el servidor.
     */
    setLink: function(link) {
        sockets.link = link;
    }
};