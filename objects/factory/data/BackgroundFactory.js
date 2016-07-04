/**
 * Clase para crear objetos de campo de datos de trasfondo del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../models/StringField'),
    FieldsSet = require('./../../models/FieldsSet'),
    constants = require('./../../constants/Constants').char.data.backgrounds,
    fieldList = require('./../scripts/list');

module.exports = function() {
    this.name = constants.name;
    this.fields = fieldList(constants.list, StringField);
    /**
     * Retorna un objeto de campos de datos de trasfondo del personaje.
     * @returns {object}
     */
    this.initBckg = function() {
        var bckg = new FieldsSet(this.name);
        var fields = this.fields;
        fields.forEach(function(f) {bckg.fields.push(f)});
        return bckg;
    };
};