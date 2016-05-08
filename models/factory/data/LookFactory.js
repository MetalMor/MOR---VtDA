/**
 * Clase para crear objetos de campo de datos de aspecto del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../object/StringField');
var NumericField = require('./../../object/NumericField');
var FieldsSet = require('./../../object/FieldsSet');

module.exports = function() {
    this.initLook = function() {
        var look = new FieldsSet("Aspecto");
        look.fields.push(new NumericField("Edad real"));
        look.fields.push(new NumericField("Edad aparente"));
        look.fields.push(new StringField("Pelo"));
        look.fields.push(new StringField("Ojos"));
        look.fields.push(new StringField("Nacionalidad"));
        look.fields.push(new StringField("Sexo"));
        look.fields.push(new NumericField("Altura"));
        look.fields.push(new NumericField("Peso"));
        return look;
    };
};