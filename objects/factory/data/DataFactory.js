/**
 * Clase para crear objetos de datos del personaje
 *
 * Created by mor on 8/05/16.
 */

var GeneralFactory = require('./GeneralFactory');
var BackgroundFactory = require('./BackgroundFactory');
var LookFactory = require('./LookFactory');

module.exports = function() {

    /**
     * Retorna un nuevo objeto de campos de datos generales del personaje generados por la factoría.
     * @returns {object}
     */
    this.initGeneral = function() {
        var gf = new GeneralFactory();
        return gf.initGeneral();
    };

    /**
     * Retorna un nuevo objeto de campos de datos de trasfondo del personaje generados por la factoría.
     * @returns {object}
     */
    this.initBckg = function() {
        var bf = new BackgroundFactory();
        return bf.initBckg();
    };

    /**
     * Retorna un nuevo objeto de campos de datos de aspecto del personaje generados por la factoría
     * @returns {object}
     */
    this.initLook = function() {
        var lf = new LookFactory();
        return lf.initLook();
    };

    /**
     * Lista de campos de datos del personaje.
     * @type {array}
     */
    this.fields = [
        this.initGeneral(),
        this.initLook(),
        this.initBckg()
    ];
    /**
     * Retorna un nuevo array de objetos de datos del personaje.
     * @returns {Array}
     */
    this.initData = function() {
        var ret = [];
        var fields = this.fields;
        fields.forEach(function(f) {ret.push(f)});
        return fields;
    };
};