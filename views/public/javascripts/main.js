/**
 * Script para manejar la tabla de la ficha de personaje
 * - TODO Cálculo de sangre máxima, sangre inicial, camino, fuerza de voluntad
 * - TODO Puntos XP
 * - TODO Cálculo de la media de los colores de la pantalla para definir el color de los panels y el texto de los títulos(?)(?)(?)
 * Created by mor on 9/05/16.
 */
var char, user, game;

if (window["WebSocket"]) {
    $('#wrapper').ready(function() {
        var socket = io.connect(/*document.location.href*/);
        function connect() {
            var charElement;
            if((charElement = $("div#char")).length) {
                char = JSON.parse(charElement.text());
                user = JSON.parse($("div#user").text());
                game = JSON.parse($("div#game").text());
                if (!char.ready) {
                    overlay.showAlert('advice');
                    overlay.open('data');
                    button.setPrefsButtons('attr');
                    button.setPrefsButtons('skills');
                    util.disable('#generation');
                    $("input#next").click(button.submitCharData);
                    $("button#submit").click(function () {
                        button.submitSheet(socket, char, user, game)
                    });
                } else {
                    alert('got char');
                }
            }
        }
        connect();
    });
}