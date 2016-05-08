/**
 * Clase para crear objetos de campo de datos de trasfondo del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../object/StringField');
var FieldsSet = require('./../../object/FieldsSet');

module.exports = function() {
    this.name = "Datos del trasfondo";
    this.fields = [
        new StringField("Dominio"),
        new StringField("Contactos"),
        new StringField("Rebaño"),
        new StringField("Influencia"),
        new StringField("Mentor"),
        new StringField("Aliados"),
        new StringField("Recursos"),
        new StringField("Criados")
    ];
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