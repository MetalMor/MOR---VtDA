/**
 * Clase para crear objetos de campo de datos generales del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../object/StringField');
var NumericField = require('./../../object/NumericField');
var FieldsSet = require('./../../object/FieldsSet');

module.exports = function() {
    this.initGeneral = function() {
        var general = new FieldsSet("Datos generales");
        general.fields.push(new StringField("Nombre"));
        general.fields.push(new StringField("Naturaleza"));
        general.fields.push(new StringField("Conducta"));
        general.fields.push(new StringField("Clan"));
        general.fields.push(new NumericField("Generación"));
        general.fields.push(new StringField("Refugio"));
        general.fields.push(new StringField("Concepto"));
        return general;
    };
};