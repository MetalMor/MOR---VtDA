/**
 * Controlador mongoDB para operaciones CRUD de usuarios
 * TODO get user games list & chars list
 *
 * Created by mor on 21/04/16.
 */

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');

var dbUrl = 'mongodb://localhost:27017/vtda';
var col = 'users';

//
// MEET THE PYRAMID OF DOOM ò___ó
//

var mongoUsers = {

    listAllUsers: function(callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).find().toArray(function(err, doc) {
                    db.close();
                    assert.equal(null, err);
                    console.log("[mongo] listing all users: "+doc.length);
                    if(callback !== null)
                        callback(doc);
                });
            });
        });
    },

    insertUser: function (user, callback) {
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).insertOne(user, function(err, result) {
                    db.close();
                    assert.equal(null, err);
                    console.log("[mongo] inserted user: " + user.name);
                    if(callback !== null)
                        callback();
                });
            });
        });
    },

    findUserByName: function(user, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).findOne({name: user.name}, function(err, doc) {
                    db.close();
                    assert.equal(null, err);
                    if(doc !== null) console.log("[mongo] found user: "+doc.name);
                    else console.log("[mongo] user not found: "+user.name);
                    if(callback !== null)
                        callback(doc);
                });
            });
        });
    },

    findUserByCreds: function(user, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                client.collection(col).findOne({name: user.name, passwd: user.passwd}, function(err, doc) {
                    db.close();
                    assert.equal(null, err);
                    if(doc !== null) console.log("[mongo] found user: "+doc.name);
                    else console.log("[mongo] user not found: "+user.name);
                    if(callback !== null)
                        callback(doc);
                });
            });
        });
    },
    /**
     * Muestra los 10 jugadores con mayor puntuación
     * @returns {Array} Array de los 10 jugadores con la puntuación más alta

    topTenPlayers: function() {
        MongoClient.connect(dbUrl, function (err, db) {
            mongoUsers.top = [];
            console.log("[mongoUsers] comprobando top");
            db.open(function(err, client){
                assert.equal(null, err);
                var ret = client.collection('snake').find({score: {$exists: true}});
                ret.sort({score: -1, deaths: 1});
                ret.limit(10);
                if(mongoUsers.top.length === 0) {
                    ret.each(function (err, doc) {
                        assert.equal(null, err);
                        if (doc != null && mongoUsers.ten.length < 10) mongoUsers.ten.push(doc);
                        else db.close();
                    });
                }
            });
        });
        //mongoUsers.showTop();
    },
    updatePlayerScore: function (snake) {
        var id = snake.id;
        MongoClient.connect(dbUrl, function (err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                console.log("[mongoUsers] actualizando snake: " + id);
                client.collection('snake').deleteMany({score: {$exists: false}},
                    client.collection('snake').updateOne({name: id, score: {$exists: true}},
                        {$set: {score: snake.score, deaths: snake.deaths}}, db.close())
                );
            });
        });
        mongoUsers.topTenPlayers();
    }*/
    updateUser: function(user, callback) {
        MongoClient.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            db.open(function(err, client) {
                assert.equal(null, err);
                console.log("[mongo] preparing user update");
                client.collection(col).updateOne({name: user.name}, {$set: user}, function(err, result) {
                    assert.equal(null, err);
                    console.log("[mongo] updated user: "+user.name);
                    callback();
                });
            });
        });
    }
};

module.exports = mongoUsers;