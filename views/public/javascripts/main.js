/**
 * Script para manejar la tabla de la ficha de personaje
 * - TODO Cálculo de sangre máxima, sangre inicial, camino, fuerza de voluntad
 * - TODO Puntos XP
 * - TODO Cálculo de la media de los colores de la pantalla para definir el color de los panels y el texto de los títulos(?)(?)(?)
 * Created by mor on 9/05/16.
 */
var char, user, game;

if (window["WebSocket"]) {
    $('#wrapper-player').ready(function () {
        var socket = io.connect();
        function connect() {
            var charElement;
            if((charElement = $("div#char")).length) {
                char = JSON.parse(charElement.text());
                user = JSON.parse($("div#user").text());
                game = JSON.parse($("div#game").text());
                if (!util.isUndefined(char)) {
                    if (!char.ready)
                        overlay.initCharPanel(socket);
                    else
                        overlay.playerPanel(socket);
                }
            }
        }
        connect();
    });
    $('#wrapper-master').ready(function () {
    });
}