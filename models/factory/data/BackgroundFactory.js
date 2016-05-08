/**
 * Clase para crear objetos de campo de datos de trasfondo del personaje
 *
 * Created by mor on 8/05/16.
 */

var StringField = require('./../../object/StringField');
var FieldsSet = require('./../../object/FieldsSet');

module.exports = function() {
    this.initBckg = function() {
        var bckg = new FIeldsSet("Datos del trasfondo");
        bckg.fields.push(new StringField("Dominio"));
        bckg.fields.push(new StringField("Contactos"));
        bckg.fields.push(new StringField("Rebaño"));
        bckg.fields.push(new StringField("Influencia"));
        bckg.fields.push(new StringField("Mentor"));
        bckg.fields.push(new StringField("Aliados"));
        bckg.fields.push(new StringField("Recursos"));
        bckg.fields.push(new StringField("Criados"));
        return bckg;
    };
};