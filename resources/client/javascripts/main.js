/**
 * Script para manejar la tabla de la ficha de personaje
 * - TODO Cálculo de la media de los colores de la pantalla para definir el color de los panels y el texto de los títulos(?)(?)(?)
 * Created by mor on 9/05/16.
 */
var char, user, game;

if (window["WebSocket"]) {
    icons.init();
    logger.activate();
    $('#wrapper-player').ready(function () {
        function connectPlayer() {
            var charElement;
            if ((charElement = $("div#char")).length) {
                sockets.setLink(io.connect());
                char = JSON.parse(charElement.text());
                user = JSON.parse($("div#user").text());
                game = JSON.parse($("div#game").text());
                if (!util.isUndefined(char)) {
                    if (char.ready) overlay.playerPanel();
                    else overlay.initCharPanel();
                }
            }
        }
        connectPlayer();
    });
    $('#wrapper-master').ready(function () {
        function connectMaster() {
            sockets.setLink(io.connect());
            user = JSON.parse($("div#user").text());
            game = JSON.parse($("div#game").text());
            if (util.isUndefined(char))
                overlay.masterPanel();
        }
        connectMaster();
    });
}