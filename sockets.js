/**
 * Controlador de conexiones WebSocket.
 *
 * Created by mor on 25/04/16.
 */

var mongoUsers = require('./db/mongoUsers');
var mongoGames = require('./db/mongoGames');
var util = require('./util');

module.exports = function (io) {
    io.on('connection', function(socket) {
        var user, char, game;
        var charFunctions = require('./charServer');
        var charName, hasChar;
        if(hasChar)
            console.log('[socket] user connected');
        socket.on('setChar', function (sheet) {
            updateChar(sheet);
        });
        socket.on('login', function (sheet) {
            user = sheet.user;
            char = sheet.char;
            game = sheet.game;
            hasChar = !(util.isBoolean(char) || util.isUndefined(char));
            if (!util.isBoolean(char))
                console.log("[socket] character " + charFunctions.findData(char, 'nombre').value + "(" + user.name + ") at game: " + game.name);
        });
        socket.on('update', function(sheet) {
            updateChar(sheet);
            socket.broadcast.emit('update', sheet);
            socket.emit('update', sheet);
        });
        socket.on('disconnect', function() {
            if (hasChar/*!(util.isUndefined(char) || util.isBoolean(char))*/)
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
    });
};