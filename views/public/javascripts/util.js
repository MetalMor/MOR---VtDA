/**
 * Functiones de utilidad para el cliente.
 * Created by mor on 9/05/16.
 */

var util = {
    obj: 'Object',
    arr: 'Array',
    func: 'Function',
    table: "stats",
    stat: "level",
    disable: function(id) {
        $("#"+id).keypress(function (evt) {
            evt.preventDefault();
        });
    },
    is: function(crit, obj) {return obj.hasOwnProperty(crit)},
    type: function(param, obj) {return Object.prototype.toString.call(obj) === '[object '+param+']'},
    clean: function(s) {
        var chars = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c', "_"];
        var diacritics =[
            /[\300-\306]/g, /[\340-\346]/g,  // A, a
            /[\310-\313]/g, /[\350-\353]/g,  // E, e
            /[\314-\317]/g, /[\354-\357]/g,  // I, i
            /[\322-\330]/g, /[\362-\370]/g,  // O, o
            /[\331-\334]/g, /[\371-\374]/g,  // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
            " "
        ];

        for (var i = 0; i < diacritics.length; i++)
            s = s.replace(diacritics[i],chars[i]);
        return s.toLowerCase();
    },
    fancy: function(s) {
        s = s.replace('_', ' ');
        var first = s.substring(0, 1).toUpperCase(), rest = s.substring(1, s.length);
        return first+rest;
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
    printChar: function() {console.log("[client] char: "+JSON.stringify(char, null, 4))}
};
