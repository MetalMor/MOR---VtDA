/**
 * Controlador mongoDB para operaciones CRUD de partidas
 *
 * Created by mor on 5/05/16.
 */

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var util = require('../resources/both/javascripts/util');
var constants = require('../objects/constants/Constants').server.db;

var dbUrl = constants.url.prod;
var col = constants.collections.games;

console.log("[mongo] db URL: "+dbUrl);

module.exports = {

    /**
     * Lista todas las partidas guardadas en la BD.
     * @param callback Función a la que enviar el resultado.
     */
    listAllGames: function (callback) {
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function (err, client) {
                assert.equal(null, err);
                client.collection(col).find().toArray(function (err, doc) {
                    db.close();
                    assert.equal(null, err);
                    console.log("[mongo] listing all games: " + doc.length);
                    if (callback) callback(doc);
                });
            });
        });
    },

    /**
     * Inserta un nuevo objeto partida en la BD.
     * @param game Objeto a insertar.
     * @param callback Función a la que enviar el resultado.
     */
    insertGame: function (game, callback) {
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function (err, client) {
                assert.equal(null, err);
                client.collection(col).insertOne(game, function (err, result) {
                    db.close();
                    assert.equal(null, err);
                    console.log("[mongo] inserted game: " + game.name);
                    if (callback) callback();
                });
            });
        });
    },

    /**
     * Actualiza un objeto partida en la BD.
     * @param game Objeto a actualizar (con sus datos nuevos)
     * @param callback Función a la que enviar el resultado.
     */
    updateGame: function (game, callback) {
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function (err, client) {
                assert.equal(null, err);
                //if (!util.isUndefined(game._id))
                delete game._id;
                client.collection(col).updateOne({name: game.name}, {$set: game}, function (err, result) {
                    db.close();
                    assert.equal(null, err);
                    console.log("[mongo] updated game: " + game.name);
                    if (callback) callback();
                });
            });
        });
    },

    /**
     * Encuentra una partida a partir de su identificador nombre.
     * @param game Objeto partida a encontrar (requiere propiedad "name").
     * @param callback Función a la que enviar el resultado.
     */
    findGameByName: function (game, callback) {
        console.log("[mongo] looking for game: " + game.name);
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function (err, client) {
                assert.equal(null, err);
                client.collection(col).findOne({name: game.name}, function (err, doc) {
                    db.close();
                    assert.equal(null, err);
                    if (doc) console.log("[mongo] found game: " + doc.name);
                    else console.log("[mongo] game not found: " + game.name);
                    if (callback) callback(doc);
                });
            });
        });
    },

    /**
     * Retorna una lista del objeto partida especificada por parámetro.
     * @param game Objeto partida en el que buscar una lista.
     * @param field Criterio de lista requerida.
     * @param callback Función a la que enviar el resultado.
     */
    findOwnedList: function (game, field, callback) {
        console.log("[mongo] looking for list in: " + game.name);
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function (err, client) {
                assert.equal(null, err);
                client.collection(col).findOne(game, function (err, list) {
                    db.close();
                    assert.equal(null, err);
                    if (list) console.log("[mongo] found game: " + list.name);
                    else console.log("[mongo] game not found: " + game.name);
                    if (callback) callback(list[field]);
                });
            });
        });
    }
};