/**
 * Objeto con funciones de utilidad
 *
 * Created by mor on 6/05/16.
 */
var mongoGames = require('./db/mongoGames');

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
     * Valida si un objeto es un numero
     * @param o Objet a validar
     * @returns {boolean}
     */
    isNumber: function(o) {return !isNaN(parseFloat(o)) },
    /**
     * Valida si un objeto es un string
     * @param o Objeto a validar
     * @returns {boolean}
     */
    isString: function(o) {return typeof o === 'string' || o instanceof String},
    /**
     * Valida si un objeto es indefinido
     * @param o Objeto a validar
     * @returns {boolean}
     */
    isUndefined: function (o) {
        return typeof o === 'undefined'
    },
    /**
     * Valida si un objeto es nulo
     * @param o Objeto a validar
     * @returns {boolean}
     */
    isNull: function(o) {
        return o === null;
    },
    /**
     * Valida si un objeto es un valor booleano
     * @param o Objeto a validar
     * @returns {boolean}
     */
    isBoolean: function (o) {
        return typeof o === 'boolean'
    },
    /**
     * Retorna si el objeto es del tipo especificado en base a las propiedades que posee.
     * @param crit Tipo requerido
     * @param obj Objeto a comprobar
     * @returns {boolean}
     */
    is: function (crit, obj) {
        return obj.hasOwnProperty(crit)
    },
    /**
     * Retorna si el objeto es del tipo especificado en base a su prototipo.
     * @param crit Tipo requerido
     * @param obj Objeto a comprobar
     * @returns {boolean}
     */
    type: function (crit, obj) {
        return Object.prototype.toString.call(obj) === '[object ' + crit + ']'
    },
    /**
     * Retorna un string sin caracteres mierdosos y maliciosos. Malditos hackers hijos de puta, moriréis.
     * @param s String a limpiar.
     * @returns {string}
     */
    paramClean: function (s) {
        return s.replaceAll(/\W/g, "");
    },
    /**
     * En una cadena de caracteres enviada por parámetro: elimina todas las tildes, convierte los espacios en guiones
     * bajos y cambia las mayúsculas por minúsculas.
     * @param s String a transformar
     * @returns {string}
     */
    clean: function (s) {
        var chars = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];
        var diacritics = [
            /[\300-\306]/g, /[\340-\346]/g,  // A, a
            /[\310-\313]/g, /[\350-\353]/g,  // E, e
            /[\314-\317]/g, /[\354-\357]/g,  // I, i
            /[\322-\330]/g, /[\362-\370]/g,  // O, o
            /[\331-\334]/g, /[\371-\374]/g,  // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g // C, c
        ];

        s = s.replace("ñ", "ny");
        for (var i = 0; i < diacritics.length; i++)
            s = s.replace(diacritics[i], chars[i]);
        while (s.indexOf(' ') > 0) {
            s = s.replace(" ", "_")
        } // mientras haya espacios en el string, sigue llamando a replace para sustituirlos uno a uno
        return s.toLowerCase();
    },
    /**
     * Revierte el proceso de la función "clean", a excepción de las tildes: restaura los espacios y convierte la
     * primera letra en mayúscula.
     * @param s String a transformar.
     * @returns {string}
     */
    fancy: function (s) {
        s = s.replace("ny", "ñ");
        while (s.indexOf('_') > 0) {
            s = s.replace("_", " ")
        } // mientras haya espacios en el string, sigue llamando a replace para sustituirlos uno a uno
        var first = s.substring(0, 1).toUpperCase(), other = s.substring(1, s.length);
        return first + other;
    },
    /**
     * Retorna un objeto apto para ser enviado a una query de la base de datos como parámetro de inclusión en el resultado.
     * @param field Campo string a mostrar.
     * @returns {boolean}
     */
    queryField: function(field) {return {}[field] = true},
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
    printJson: function (obj) {
        console.log("[server] obj: " + JSON.stringify(obj, null, 4))
    },
    /**
     * Valida si un usuario es el propietario de una partida.
     * @param user Objeto usuario.
     * @param game Objeto partida.
     * @returns {boolean}
     */
    isMaster: function (user, game) {
        return util.getIndex(user.gameList, 'name', game.name) >= 0;
    },
    /**
     * Elimina un elemento especificado en un array.
     * @param obj Objeto a eliminar
     * @param array Array del que eliminar el objeto.
     * @returns {array}
     */
    deleteFromArray: function (obj, array) {
        var index = array.indexOf(obj);
        if (index > -1) array.splice(index, 1);
        return array;
    },
    /**
     * Busca, en un objeto partida, el personaje perteneciente a un usuario
     * @param user Usuario a validar
     * @param game Partida en la que buscar
     * @returns {*}
     */
    findChar: function(user, game) {
        var userName = user.name, charList = game.charList, ret = false;
        charList.forEach(function(c) {
            if(!ret && c.owner === userName) ret = c;
        });
        return ret;
    },
    /**
     * Retorna el índice del elemento con mayor valor.
     * @param list Lista en la que buscar.
     */
    getIndexOfMax: function(list) {
        return list.indexOf(Math.max(list))
    },
    /**
     * Retorna el índice del elemento con menor valor.
     * @param list Lista en la que buscar.
     */
    getIndexOfMin: function(list) {
        return list.indexOf(Math.min(list))
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
            else if (this.type(obj, a)) for (var x in a) self.showProps(a[x]); // si es un objeto, lo mismo q antes
            else if (type != 'undefined' && type != 'object' && a !== "") console.log('[server] prop: ' + a); // si es un tipo primitivo, muestra su valor
        }
    },
    /**
     * Convierte un número entero a números romanos
     * @param num Número a convertir
     * @returns {string}
     */
    romanize: function (num) {
        if (!+num)
            return false;
        var digits = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    },
    /**
     * Convierte un número romano a entero.
     * @param str Número romano a convertir
     * @returns {number}
     */
    deromanize: function (str) {
        var str = str.toUpperCase(),
            validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
            token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
            key = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1},
            num = 0, m;
        if (!(str && validator.test(str)))
            return false;
        while (m = token.exec(str))
            num += key[m[0]];
        return num;
    }
    /*updateNames: function () {
        var statsGroupList, statsSetList, statList,
            game = {name: 'Blood Money'},
            nameEqv = {
                actuar: 'consciencia',
                esquivar: 'expresion',
                armas_mele: 'pelea_con_armas',
                equitacion: 'conducir',
                pericias: 'artesania',
                herbolaria: 'latrocinio',
                musica: 'interpretacion',
                linguistica: 'finanzas',
                sabiduria_popular: 'tecnologia',
                senescal: 'informatica',
                tiro_con_arco: 'armas_de_fuego'
            };
        mongoGames.findOwnedList(game, 'npcList', function (npcList) {
            npcList.forEach(function (npc) {
                statsGroupList = npc.stats;
                statsGroupList.forEach(function (statsGroup) {
                    console.log("[stats] name: " + statsGroup.name);
                    statsSetList = statsGroup.stats;
                    statsSetList.forEach(function (statsSet) {
                        console.log("[stats] name: " + statsSet.name);
                        statList = statsSet.stats;
                        if (!util.isUndefined(statList))
                            statList.forEach(function (stat) {
                                console.log("[stats] name (bf): " + stat.name);
                                if (nameEqv.hasOwnProperty(stat.name))
                                    stat.name = nameEqv[stat.name];
                                console.log("[stats] name (at): " + stat.name);
                            });
                    });
                });
            });
            game.npcList = npcList;
            mongoGames.updateGame(game, function () {
                console.log("[stats] update ok");
            });
        });
    }*/
};

module.exports = util;