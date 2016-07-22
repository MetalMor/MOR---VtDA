/**
 * Controlador de conexiones a la BD.
 * Created by becari on 22/07/2016.
 */

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    util = require('../resources/both/javascripts/util'),
    logger = require('../resources/both/javascripts/logger'),
    constants = require('../objects/constants/Constants').server.db;

var url = constants.url.dev;

var connector = {
    connect: function(callback) {
        MongoClient.connect(url, {poolSize: 10}, function(err, db) {
            assert.equal(null, err);
            if(callback) callback(err, db);
        });
    }
};

module.exports = connector;