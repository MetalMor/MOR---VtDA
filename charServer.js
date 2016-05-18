/**
 * Funciones para el personaje en el lado servidor
 * Created by mor on 18/05/2016.
 */

var util = require('./util');

module.exports = {
    /**
     * Define un personaje como inicializado y preparado para jugar
     * @param char Personaje a preparar
     * @param ready Parametro de preparacion
     */
    setReady: function(char, ready) {char.ready = ready},
    /**
     * Da a un personaje un valor de experiencia
     * @param char Personaje
     * @param xp Experiencia a definir
     */
    setXP: function(char, xp) {char.xp = xp},
    /**
     * Define el nombre del usuario propietario del personaje
     * @param char Personaje
     * @param user Usuario propietario
     */
    setOwner: function(char, user) {char.owner = user.name},
    /**
     * Añade un personaje a la lista de personajes o npcs de una partida
     * @param char Personaje
     * @param list Lista a la que añadirlo ('npc' o 'char')
     * @param game Partida a la que añadirlo
     */
    addCharacter: function(char, list,  game) {game[list+'List'].push(char)},
    /**
     * Calcula la reserva de sangre inicial de un vampiro
     * @param char Personaje
     */
    initBlood: function(char) {
        var blood = charFunctions.findStat(char, 'sangre');
        blood.level = Math.floor(Math.random()*blood.max+1);
        charFunctions.setStat(char, 'sangre', blood);
        table.updateOther();
    },
    /**
     * Calcula la reserva de sangre máxima de un vampiro en base a su generación
     * @param char Personaje
     * @returns {number}
     */
    maxBlood: function(char) {
        var gen = parseInt(charFunctions.findData(char, 'generacion').value);
        var bloodEqv = [0, 300, 200, 100, 50, 40, 30, 20, 15, 14, 13, 12, 11, 10];
        return bloodEqv[gen];
    },
    /**
     * Lista de disciplinas de cada clan
     */
    clans: {
        assamita_guerrero: ['Celeridad', 'Extinción', 'Ofuscación'],
        assamita_hechicero: ['Auspex', 'Extinción', 'Hechicería assamita'],
        assamita_visir: ['Auspex', 'Celeridad', 'Extinción'],
        brujah: ['Celeridad', 'Potencia', 'Presencia'],
        capadocio: ['Auspex', 'Fortaleza', 'Mortis'],
        seguidor_de_set: ['Ofuscación', 'Presencia', 'Serpentis'],
        gangrel: ['Animalismo', 'Fortaleza', 'Protean'],
        lasombra: ['Dominación', 'Obtenebración', 'Potencia'],
        malkavian: ['Auspex', 'Dementación', 'Ofuscación'],
        nosferatu: ['Animalismo', 'Ofuscación', 'Potencia'],
        ravnos: ['Animalismo', 'Fortaleza', 'Quimerismo'],
        tremere: ['Auspex', 'Dominación', 'Taumaturgia'],
        toreador: ['Auspex', 'Celeridad', 'Presencia'],
        tzimisce: ['Animalismo', 'Auspex', 'Vicisitud'],
        ventrue: ['Dominación', 'Fortaleza', 'Presencia']
    },
    /**
     * Realiza las modificaciones necesarias a las estadísticas del personaje a partir del nombre del clan.
     * @param clanName Nombre del clan del personaje.
     */
    modStats: function(clanName) {
        if(clanName === 'Nosferatu') { // si eres nosferatu no tienes apariencia
            charFunctions.setStat(char, 'apariencia', 0);
        }
    },
    /**
     * Retorna la lista de disciplinas del clan especificado
     * @param n Nombre del clan
     * @returns {Array}
     */
    getDiscs: function(n) {
        var ret = [], clanName = util.clean(n);
        var self = this, clans = this.clans;
        for(var clan in clans)
            if(clanName === clan && (util.type(util.arr, clans[clan]) && clans[clan].length == 3))
                clans[clan].forEach(
                    function(disc) {ret.push(self.createDisc(util.clean(disc)))}
                );

        return ret;
    },
    /**
     * Guarda la lista de disciplinas en el objeto modelo.
     * @param list
     */
    setDiscs: function(list) {
        //var discs = char.stats[2].stats[0].stats;
        var discs = charFunctions.findStat(char, 'disciplinas');
        if(discs.stats.length == 0) {
            discs.stats = list;
            charFunctions.setStat(char, 'disciplinas', discs);
        }
        //if(discs.length <= 0) char.stats[2].stats[0].stats = list;
    },
    /**
     * Crea un objeto de disciplina a partir del nombre
     * @param n Nombre de la disciplina
     * @returns {object}
     */
    createDisc: function(n) {
        return {name: n, level: 0, limit: 10, mod: 0,
            setMod: function(m) {this.mod = m}, addLevel: function() {this.level++}};
    },
    /**
     * Retorna el padre de la estadística especificada en string
     * @param obj Objeto en el que buscar
     * @param name Estadistica de la que se requiere el padre
     */
    findParent: function(obj, name, parent) {
        if(!util.isUndefined(parent)) {
            if(obj.name === name) return parent;
        } if(util.is(util.stats, obj) || util.is(util.char, obj)) {
            var ret, self = this;
            obj.stats.forEach(function(o) {
                if(util.isUndefined(ret)) ret = self.findParent(o, name, obj)
            });
            return ret;
        }
    },
    /**
     * Obtiene mediante recursividad la estadística requerida de un personaje especificado por parámetro.
     * @param obj Objeto en el que buscar la estadística
     * @param name Nombre de la estadística a encontrar
     * @returns {*}
     */
    findStat: function(obj, name) {
        if(util.is(util.stat, obj)) {
            if(obj.name === name) return obj;
        } else if(util.is(util.stats, obj) || util.is(util.char, obj)) {
            var self = this, ret;
            if(obj.name === name) ret = obj;
            obj.stats.forEach(function(o) {
                if(util.isUndefined(ret)) ret = self.findStat(o, name);
                //if(!util.isUndefined(tmpRet)) ret = tmpRet;
            });
            return ret;
        }
    },
    /**
     * Obtiene mediante recursividad el campo de datos requerido de un personaje especificado por parámetro.
     * @param obj Objeto en el que buscar el campo de datos
     * @param name Nombre del campo de datos a encontrar
     * @returns {*}
     */
    findData: function(obj, name) {
        if(util.is(util.field, obj)) {
            if(obj.name === name) {return obj}
        } else {
            var prop, ret, self = this;
            if(util.is(util.data, obj)) prop = 'fields';
            else if(util.is(util.char, obj)) prop = 'data';
            obj[prop].forEach(function(o) {
                if(util.isUndefined(ret)) ret = self.findData(o, name);
            });
            return ret;
        }
    },
    /**
     * Define mediante recursividad el nivel de una estadística del personaje especificados por parámetro.
     * @param obj Objeto en el que definir el nivel de la estadística
     * @param stat Nombre de la estadística a redefinir.
     * @param value Nuevo valor de la estadística. Si es boolean, true incrementa el valor y false lo decrementa.
     */
    setStat: function(obj, stat, value) {
        if(util.is(util.stat, obj)) {
            if(obj.name === stat || obj.name === stat.name) {
                if(util.isBoolean(value)) {
                    if (value) obj.level++;
                    else obj.level--;
                } else if (util.isNumber(value) && value >= 0)
                    obj.level = value;
                else if (util.is(util.stat, value) || util.is(util.stats, value))
                    obj = value;
            }
        } else if(util.is(util.stats, obj) || util.is(util.char, obj)) {
            var self = this;
            obj.stats.forEach(function(o) {self.setStat(o, stat, value)});
        }
    },
    /**
     * Define mediante recursividad el valor de un campo de datos del personaje especificado por parámetro.
     * @param obj Objeto en el que definir el valor de un campo de datos.
     * @param field Nombre del campo de datos a redefinir.
     * @param value Nuevo valor del campo de datos.
     */
    setData: function(obj, field, value) {
        if(util.is(util.field, obj) && (obj.name === field || obj.name === field.name)) {
            if(util.isString(value) || util.isNumber(value)) obj.value = value;
            else if (util.is(util.field, value)) obj = value;
        } else {
            var prop, self = this;
            if(util.is(util.data, obj)) prop = 'fields';
            else if(util.is(util.char, obj)) prop = 'data';
            obj[prop].forEach(function(o) {self.setData(o, field, value)});
        }
    }
};