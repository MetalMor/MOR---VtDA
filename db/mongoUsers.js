/**
 * Controlador mongoDB para operaciones CRUD de usuarios
 *
 * Created by mor on 21/04/16.
 */

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var util = require('../resources/both/javascripts/util');
var logger = require('../resources/both/javascripts/logger');
var constants = require('../objects/constants/Constants').server.db;

var dbUrl = constants.url.dev;
var col = constants.collections.users;

//
// MEET THE PYRAMID OF DOOM ò___ó
//

var mongoUsers = {

    /**
     * Lista todos los usuarios guardados en la BD.
     * @param callback Función a la que enviar el resultado.
     */
    listAllUsers: function(callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).find().toArray(function(err, doc) {
                    db.close();
                    assert.equal(null, err);
                    logger.log("mongo", "listing all users: "+doc.length);
                    if(callback) callback(doc);
                });
            });
        });
    },

    /**
     * Inserta un nuevo usuario en la BD.
     * @param user Objeto usuario a insertar.
     * @param callback Función a la que enviar el resultado.
     */
    insertUser: function (user, callback) {
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).insertOne(user, function(err, result) {
                    db.close();
                    assert.equal(null, err);
                    logger.log("mongo", "inserted user: " + user.name);
                    if(callback) callback();
                });
            });
        });
    },

    /**
     * Encuentra un usuario en la BD a partir de su identificador nomrbe.
     * @param user Objeto usuario a encontrar (requiere propiedad "name").
     * @param callback Función a la que enviar el resultado.
     */
    findUserByName: function(user, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                var regExpOptions = 'i', regExpName;
                try {
                    regExpName = util.toRegExp(util.clean(user.name), regExpOptions);
                } catch(err) {
                    logger.log('mongo', err.toString());
                    regExpName = 'nobody';
                }
                client.collection(col).findOne({name: regExpName}, function (err, doc) {
                    db.close();
                    assert.equal(null, err);
                    if(doc) logger.log("mongo", "found user: "+doc.name);
                    else logger.log("mongo", "user not found: "+user.name);
                    if(callback) callback(doc);
                });
            });
        });
    },

    /**
     * Encuentra un usuario en la BD a partir de su nombre y contraseña.
     * @param user Objeto usuario a encontrar (requiere propiedades "name" y "passwd").
     * @param callback Función a la que enviar el resultado.
     */
    findUserByCreds: function(user, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).findOne({name: user.name, passwd: user.passwd}, function(err, doc) {
                    db.close();
                    assert.equal(null, err);
                    if(doc) logger.log("mongo" ,"found user: "+doc.name);
                    else logger.log("mongo", "user not found: "+user.name);
                    if(callback) callback(doc);
                });
            });
        });
    },

    /**
     * Lista todas las partidas de las que el usuario especificado por parámetro es el master.
     * @param user Objeto usuario del que obtener la lista de partidas.
     * @param callback Función a la que enviar el resultado.
     */
    listOwnedGames: function(user, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).findOne({name: user.name}, {gameList: true}).toArray(function(err, list) {
                    db.close();
                    assert.equal(null, err);
                    if(list) logger.log("mongo", "found "+user.name+"'s games list: "+list.length);
                    else logger.log("mongo", "gameList not found: "+user.name);
                    if(callback) callback(list);
                });
            });
        });
    },

    /**
     * Actualiza un objeto usuario en la BD.
     * @param user Objeto usuario a actualizar (con sus datos nuevos).
     * @param callback Función a la que enviar el resultado.
     */
    updateUser: function(user, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                if(!util.isUndefined(user._id))
                    delete user._id;
                logger.log("mongo", "preparing user update");
                client.collection(col).updateOne({name: user.name}, {$set: user}, function(err, result) {
                    db.close();
                    assert.equal(null, err);
                    logger.log("mongo", "updated user: "+user.name);
                    callback();
                });
            });
        });
    }
};

module.exports = mongoUsers;