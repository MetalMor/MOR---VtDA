/**
 * Clase para crear objetos de campo de datos de aspecto del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../models/StringField'),
    FieldsSet = require('./../../models/FieldsSet'),
    constants = require('./../../constants/Constants').char.data.look,
    fieldList = require('./../scripts/list');

module.exports = function() {
    /**
     * Lista de campos de datos de aspecto del personaje.
     * @type {Array}
     */
    this.fields = fieldList(constants.list, StringField);
    /**
     * Retorna un nuevo objeto de campos de datos de aspecto del personaje.
     * @returns {object}
     */
    this.initLook = function() {
        var look = new FieldsSet(constants.name);
        var fields = this.fields;
        fields.forEach(function(f) {look.fields.push(f)});
        return look;
    };
};