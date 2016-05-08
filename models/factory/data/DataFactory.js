/**
 * Clase para crear objetos de datos del personaje
 *
 * Created by mor on 8/05/16.
 */

var GeneralFactory = require('./GeneralFactory');
var BackgroundFactory = require('./BackgroundFactory');
var LookFactory = require('./LookFactory');

module.exports = function() {
    this.initGeneral = function() {
        var gf = new GeneralFactory();
        return gf.initGeneral();
    };
    this.initBckg = function() {
        var bf = new BackgroundFactory();
        return bf.initBckg();
    };
    this.initLook = function() {
        var lf = new LookFactory();
        return lf.initLook();
    };
    this.initData = function() {
        var fields = [];
        fields.push(this.initGeneral());
        fields.push(this.initBckg());
        fields.push(this.initLook());
        return fields;
    };
};