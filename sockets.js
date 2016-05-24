/**
 * SOLO PARA COPIAR no pertenece a este proyecto
 *
 * Created by mor on 25/04/16.
 */
/**
 * Control de la comunicación cliente-servidor vía websockets
 * @type {Snake} Modelo de objeto snake
 */
var mongoUsers = require('./db/mongoUsers');
var mongoGames = require('./db/mongoGames');
var util = require('./util');

module.exports = function (io) {
    io.on('connection', function(socket) {
        var user, char, game;
        var charFunctions = require('./charServer');
        console.log('[socket] user connected');
        socket.on('setChar', function (sheet) {
            updateChar(sheet);
        });
        socket.on('login', function (sheet) {
            user = sheet.user;
            char = sheet.char;
            game = sheet.game;
            if (!util.isBoolean(char))
                console.log("[socket] character " + charFunctions.findData(char, 'nombre').value + "(" + user.name + ") at game: " + game.name);
        });
        socket.on('disconnect', function() {
            if (!(util.isUndefined(char) || util.isBoolean(char)))
                console.log('[socket] goodbye '+charFunctions.findData(char, 'nombre').value + "(" + user.name + ")");
        });
        function updateChar(sheet) {
            user = sheet.user;
            char = sheet.char;
            game = sheet.game;
            mongoGames.updateGame(game, function () {
                console.log("[socket] updated character: " + charFunctions.findData(char, 'nombre').value + "(" + user.name + ") at game: " + game.name); // recibe el personaje :D
            });
        }

        function sendChar() {
            var charName = charFunctions.getData(char, 'nombre');
            socket.broadcast.emit('update' + charName, char);
        }
    });
};