/**
 * Clase para crear objetos de campo de datos generales del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../models/StringField'),
    FieldsSet = require('./../../models/FieldsSet'),
    constants = require('./../../constants/Constants').char.data.general,
    fieldList = require('./../scripts/list');

module.exports = function() {
    /**
     * Lista de campos de datos generales del personaje.
     * @type {array}
     */
    this.fields = fieldList(constants.list, StringField);
    /**
     * Retorna un nuevo objeto de campos de datos generales del personaje.
     * @returns {object}
     */
    this.initGeneral = function() {
        var general = new FieldsSet(constants.name);
        var fields = this.fields;
        fields.forEach(function(f) {general.fields.push(f)});
        return general;
    };
};