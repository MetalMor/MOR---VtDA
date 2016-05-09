/**
 * Clase para crear objetos de campo de datos de aspecto del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../models/StringField');
var NumericField = require('./../../models/NumericField');
var FieldsSet = require('./../../models/FieldsSet');

module.exports = function() {
    /**
     * Lista de campos de datos de aspecto del personaje.
     * @type {Array}
     */
    this.fields = [
        new NumericField("Edad real"),
        new NumericField("Edad aparente"),
        new StringField("Pelo"),
        new StringField("Ojos"),
        new StringField("Nacionalidad"),
        new StringField("Sexo"),
        new NumericField("Altura"),
        new NumericField("Peso")
    ];
    /**
     * Retorna un nuevo objeto de campos de datos de aspecto del personaje.
     * @returns {object}
     */
    this.initLook = function() {
        var look = new FieldsSet("Aspecto");
        var fields = this.fields;
        fields.forEach(function(f) {look.fields.push(f)});
        return look;
    };
};