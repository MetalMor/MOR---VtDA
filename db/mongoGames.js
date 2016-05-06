/**
 * Controlador mongoDB para operaciones CRUD de partidas
 * TODO get game chars list & npcs list & maps list
 *
 * Created by mor on 5/05/16.
 */

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');

var dbUrl = 'mongodb://localhost:27017/vtda';
var col = 'games';

var mongoGames = {

    listAllGames: function(callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).find().toArray(function(err, doc) {
                    db.close();
                    assert.equal(null, err);
                    console.log("[mongo] listing all games: "+doc.length);
                    if(callback !== null)
                        callback(doc);
                });
            });
        });
    },

    insertGame: function (game, callback) {
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).insertOne(game, function(err, result) {
                    db.close();
                    assert.equal(null, err);
                    console.log("[mongo] inserted game: "+game.name);
                    if(callback !== null)
                        callback();
                });
            });
        });
    },

    updateGame: function(game, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).updateOne({name: game.name}, {$set: game/*{
                            charList: game.charList,
                            npcList: game.npcList,
                            mapList: game.mapList,
                            msgList: game.msgList
                        }*/}, function(err, result) {
                        assert.equal(null, err);
                        console.log("[mongo] updated game: "+game.name);
                        if(callback !== null)
                            callback();
                    });
            });
        });
    },

    findGameByName: function(game, callback) {
        console.log("[mongo] looking for game: "+game.name);
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).findOne({name: game.name}, function(err, doc) {
                    db.close();
                    assert.equal(null, err);
                    if(doc !== null) console.log("[mongo] found game: "+doc.name);
                    else console.log("[mong] game not found: "+game.name);
                    if(callback !== null)
                        callback(doc);
                });
            });
        });
    }

};

module.exports = mongoGames;