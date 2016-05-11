/**
 * Script para manejar la tabla de la ficha de personaje
 * - TODO funciones de interactividad con el usuario (subir las estadísticas de nivel clicando en las bolas grises, o bajarlas clicando en las rojas)
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
                util.disable('#generation');
                $("input#next").on('click', function(){button.submitCharData()});
                //openNav('sheet');
            }
            util.printChar();
            /*socket.emit('id', id);
            socket.on('top', function(ten) {
                var element = $("ol#top");
                console.log("server top: " + ten);
                if(!top.compare(ten)) {
                    element.empty();
                    for(var counter = 0; counter < 10; counter++)
                        element.append(topEntry(ten[counter]));
                }
            });
            socket.on('snakes', function(data) {
                drawMap(data);
            });*/
        }
        connect();
    });
}