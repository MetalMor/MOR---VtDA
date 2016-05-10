/**
 * Script para manejar la tabla de la ficha de personaje
 * - TODO funciones de interactividad con el usuario (subir las estadísticas de nivel clicando en las bolas grises, o bajarlas clicando en las rojas)
 * Created by mor on 9/05/16.
 */
var char;
/**
 * Abre un elemento desplegable
 * @param selectorId ID del elemento (string)
 */
function openNav(selectorId) {
    var element = $("#"+selectorId);
    element.fadeIn('fast', function() {element.css('width', '100%')});
}
/**
 * Cierra un elemento desplegable
 * @param selectorId ID del elemento (string)
 */
function closeNav(selectorId) {
    var element = $("#"+selectorId);
    element.fadeOut('fast', function() {element.css('width', '0%')});
}

if (window["WebSocket"]) {
    $('#wrapper').ready(function() {
        var socket = io.connect(document.location.href);
        function connect() {
            var charJSON;
            if((charJSON = $("div#char")).length) {
                char = JSON.parse(charJSON.text());
                char.stats[3].stats[2].max = 7; // testing para ver si pone bien las "bolitas rellenables" de sangre
                util.disable('generation');
                table.build(char.stats, "stats");
                table.build(clan.getDiscs('Malkavian'), 'disciplinas');
                openNav('create');
                //openNav('sheet');
            }
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