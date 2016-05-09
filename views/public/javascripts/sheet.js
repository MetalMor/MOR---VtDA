/**
 * Script para manejar la tabla de la ficha de personaje
 * Created by mor on 9/05/16.
 */
//var util = util();

var char;

function openNav(selectorId) {
    var element = $("#"+selectorId);
    element.css('width', '100%');
}
function closeNav(selectorId) {
    var element = $("#"+selectorId);
    element.css('width', '0%');
}

function table(statsObj) {
    var name;
    if(statsObj.hasOwnProperty('name')) name = statsObj.name;
    if(util.is(util.stat, statsObj)) {
        return "<tr><td>"+statsObj.name+"</td><td id='"+statsObj.name+"'>"+statsObj.level+"</td></tr>";
    }
    if(util.is(util.table, statsObj)) {
        var subTable = "", stats = statsObj.stats;
        var tableAdd = function(a) {subTable += a}, len = stats.length;
        tableAdd("<td><table id='"+name+"'><thead><th>"+name+"</th></thead><tbody><tr>");
        for(var i = 0; i<len; i++) {
            var cur = stats[i];
            tableAdd("<td>"+table(cur)+"</td>");
        }
        tableAdd("</tr></tbody></table></td>");
        return subTable;
    }
    if(util.type(util.arr, statsObj)) {
        var mainTable = $("table#stats>tbody");
        var content = "";
        var contentAdd = function(a) {content += a};
        statsObj.forEach(function(s){contentAdd("<tr>"+table(s)+"</tr>")});
        mainTable.append(content);
    }
}

$("table#stats").ready(function() {
    var charJSON = $("div#char").text();
    char = JSON.parse(charJSON);
    table(char.stats);
});

if (window["WebSocket"]) {
    $(document).ready(function() {
        var socket = io.connect(document.location.href);
        function connect() {
            openNav('sheet');
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
};