/**
 * Functiones de utilidad para el cliente.
 * Created by mor on 9/05/16.
 */

var util = {
    obj: 'Object',
    arr: 'Array',
    func: 'Function',
    stats: "initPoints",
    data: "fields",
    stat: "level",
    field: "value",
    char: "xp",
    /**
     * Deshabilita la funcionalidad de escribir en un input especificado.
     * @param selector Selector del/los elemento/s
     */
    disable: function(selector) {
        $(selector).keypress(function (evt) {
            evt.preventDefault();
        });
    },
    isUndefined: function(o) {return typeof o === 'undefined'},
    isBoolean: function(o) {return typeof o === 'boolean'},
    /**
     * Retorna si el objeto es del tipo especificado en base a las propiedades que posee.
     * @param crit Tipo requerido
     * @param obj Objeto a comprobar
     * @returns {boolean}
     */
    is: function(crit, obj) {return obj.hasOwnProperty(crit)},
    /**
     * Retorna si el objeto es del tipo especificado en base a su prototipo.
     * @param crit Tipo requerido
     * @param obj Objeto a comprobar
     * @returns {boolean}
     */
    type: function(crit, obj) {return Object.prototype.toString.call(obj) === '[object '+crit+']'},
    /**
     * En una cadena de caracteres enviada por parámetro: elimina todas las tildes, convierte los espacios en guiones
     * bajos y cambia las mayúsculas por minúsculas.
     * @param s String a transformar
     * @returns {string}
     */
    clean: function(s) {
        var chars = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
        var diacritics =[
            /[\300-\306]/g, /[\340-\346]/g,  // A, a
            /[\310-\313]/g, /[\350-\353]/g,  // E, e
            /[\314-\317]/g, /[\354-\357]/g,  // I, i
            /[\322-\330]/g, /[\362-\370]/g,  // O, o
            /[\331-\334]/g, /[\371-\374]/g,  // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g // C, c
        ];

        for (var i = 0; i < diacritics.length; i++)
            s = s.replace(diacritics[i],chars[i]);
        while(s.indexOf(' ')>0) {s = s.replace(" ", "_")} // mientras haya espacios en el string, sigue llamando a replace para sustituirlos uno a uno
        return s.toLowerCase();
    },
    /**
     * Revierte el proceso de la función "clean", a excepción de las tildes: restaura los espacios y convierte la
     * primera letra en mayúscula.
     * @param s String a transformar.
     * @returns {string}
     */
    fancy: function(s) {
        while(s.indexOf('_')>0) {s = s.replace("_", " ")} // mientras haya espacios en el string, sigue llamando a replace para sustituirlos uno a uno
        var first = s.substring(0, 1).toUpperCase(), other = s.substring(1, s.length);
        return first+other;
    },
    /**
     * Retorna el índice en el array del atributo con el nombre y el valor especificados.
     * @param array Array en el que buscar
     * @param attr Nombre del atributo a encontrar
     * @param value Criterio de valor del atributo
     * @returns {number}
     */
    getIndex: function(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) if(array[i][attr] === value) return i;
        return -1;
    },
    /**
     * Muestra por consola los datos del objeto personaje alojado en el cliente, para debugar.
     */
    printChar: function() {console.log("[client] char: "+JSON.stringify(char, null, 4))},
    /**
     * Valida si ninguno de los inputs dentro de un elemento especificado por parámetro está vacío.
     * @param id Elemento del que validar los inputs
     * @returns {boolean}
     */
    allInputsSet: function(id) {
        return !($('#'+id+' .mandatory').filter(function(){
            return $.trim(this.value).length === 0;
        }).length > 0);
    }
};
