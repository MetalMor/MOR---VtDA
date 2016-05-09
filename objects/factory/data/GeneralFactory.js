/**
 * Clase para crear objetos de campo de datos generales del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../models/StringField');
var NumericField = require('./../../models/NumericField');
var FieldsSet = require('./../../models/FieldsSet');

module.exports = function() {
    /**
     * Lista de campos de datos generales del personaje.
     * @type {array}
     */
    this.fields = [
        new StringField("Nombre"),
        new StringField("Naturaleza"),
        new StringField("Conducta"),
        new StringField("Clan"),
        new NumericField("Generación"),
        new StringField("Refugio"),
        new StringField("Concepto")
    ];
    /**
     * Retorna un nuevo objeto de campos de datos generales del personaje.
     * @returns {object}
     */
    this.initGeneral = function() {
        var general = new FieldsSet("Datos generales");
        var fields = this.fields;
        fields.forEach(function(f) {general.fields.push(f)});
        return general;
    };
};