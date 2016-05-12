/**
 * Objeto con funciones de utilidad
 *
 * Created by mor on 6/05/16.
 */

module.exports = {
    obj: 'Object',
    arr: 'Array',
    func: 'Function',
    stats: "stats",
    data: "fields",
    stat: "level",
    field: "value",
    char: "xp",
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
     * Retorna un objeto apto para ser enviado a una query de la base de datos como parámetro de inclusión en el resultado.
     * @param field Campo string a mostrar.
     * @returns {boolean}
     */
    queryField: function(field) {return {}[field] = true},
    /**
     * Retorna si el objeto es del tipo especificado en base a las propiedades que posee.
     * @param crit Tipo requerido
     * @param obj Objeto a comprobar
     * @returns {boolean}
     */
    is: function(crit, obj) {return obj.hasOwnProperty(crit)},
    /**
     * Comprueba si un objeto es del tipo especificado.
     * @param param Tipo (string)
     * @param obj Objeto a comprobar
     * @returns {boolean}
     */
    type: function(param, obj) {return Object.prototype.toString.call(obj) === '[models '+param+']'},
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
     * Busca, en dos listas diferentes, el primer elemento en común
     * @param one
     * @param other
     * @returns {number}
     */
    findCommon: function(one, other) {
        one.forEach(function(a) {
            console.log("[util] checking user char list: "+ a.name);
            other.forEach(function(b) {
                console.log("[util] checking game char list: "+ b.name);
                if(a.name === b.name) {
                    console.log("[util] found character: " + b.name);
                    return b;
                }
            });
        });
        console.log("[util] no char in game");
        return 0;
    },
    /**
     * Printa por la consola mediante recursividad las propiedades de un objeto (para testing)
     * @param a Objeto a mostrar
     */
    showProps: function(a) {
        var func = this.func;
        if(!this.type(func, a)) {
            var obj = this.obj, arr = this.arr;
            var type = typeof a, self = this;
            if (this.type(arr, a)) a.forEach(function (b) {self.showProps(b)}); // si es un array llama a showProps sobre el objeto en la posición actual
            else if (this.type(obj, a)) for (var x in a) this.showProps(a[x]); // si es un objeto, lo mismo q antes
            else if (type != 'undefined' && type != 'object' && a !== "") console.log('[server] prop: ' + a); // si es un tipo primitivo, muestra su valor
        }
    }
};