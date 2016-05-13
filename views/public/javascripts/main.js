/**
 * Script para manejar la tabla de la ficha de personaje
 * - TODO Cálculo de sangre máxima, sangre inicial, camino, fuerza de voluntad
 * - TODO Guardado de personajes via websockets, validar
 * - TODO Cálculo de la media de los colores de la pantalla para definir el color de los panels y el texto de los títulos(?)(?)(?)
 * Created by mor on 9/05/16.
 */
var char;

if (window["WebSocket"]) {
    $('#wrapper').ready(function() {
        var socket = io.connect(document.location.href);
        function connect() {
            var charElement;
            if((charElement = $("div#char")).length) {
                char = JSON.parse(charElement.text());
                overlay.showAlert('advice');
                overlay.open('data');
                button.setPrefsButtons('attr');
                button.setPrefsButtons('skills');
                util.disable('#generation');
                $("input#next").on('click', function(){button.submitCharData()});
                //openNav('sheet');
            }
        }
        connect();
    });
}