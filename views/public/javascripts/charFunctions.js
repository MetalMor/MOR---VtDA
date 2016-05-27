/**
 * Objeto que contiene diversas utilidades para el objeto personaje..
 * Created by mor on 10/05/16.
 */

var charFunctions = {
    /**
     * Define un personaje como inicializado y preparado para jugar
     * @param char Personaje a preparar
     * @param ready Parametro de preparacion
     */
    setReady: function(char, ready) {char.ready = ready},
    /**
     * Da a un personaje un valor de experiencia
     * @param mode Tipo de puntos que otorgar
     * @param points Experiencia a definir
     */
    setCharPoints: function(mode, points) {
        if (mode === 'xp' || mode === 'fp') {
            char[mode] = points;
        }
    },
    /**
     * Retorna los puntos de aprendizaje del personaje.
     * @returns {number}
     */
    getCharPoints: function () {
        return char.fp > 0 ? char.fp : char.xp;
    },
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
     * Actualiza un objeto personaje en la lista de personajes del objeto partida.
     * @param char
     */
    updateChar: function (char) {
        var charList = game.charList, charName = charFunctions.findData(char, 'nombre').value, newList = [];
        charList.forEach(function (ch) {
            if (charName === charFunctions.findData(ch, 'nombre').value)
                ch = char;
            newList.push(ch);
        });
        game.charList = newList;
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
     * Incrementa el nivel de una estadística y actualiza los datos en el display de la ficha del personaje
     * @param stat Estadística a incrementar
     */
    growStat: function(stat) {
        console.log('[client] clicked on ' + stat.name + '(' + stat.level + ')');
        var cost = charFunctions.xpCost(stat);
        stat.level++;
        if(util.is(util.maxStat, stat)) stat.max++;
        charFunctions.setStat(char, stat, stat);
        charFunctions.withdrawXp(cost);
        table.updateXp(char);
        table.update(stat.name); // CAMBIAR ESTA LINEA POR UNA FUNCION ESPECIALIZADA PARA ESTO
        button.setXpButtons();
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
        var ret = [], self = this, list = charFunctions.clans[util.clean(n)];
        list.forEach(function(disc) {ret.push(self.createDisc(util.clean(disc)))});
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
     * Determina si un personaje tiene al menos nivel 1 en una estadística
     * @param stat Estadística a validar (objeto o string)
     * @returns {boolean}
     */
    hasStat: function(stat) {
        var s;
        return !util.isUndefined(s = charFunctions.findStat(char, stat)) && s.level > 0;
    },
    /**
     * Crea un objeto de disciplina a partir del nombre
     * @param n Nombre de la disciplina
     * @returns {object}
     */
    createDisc: function(n) {
        return {name: n, level: 0, limit: 10, mod: 0, cost: 5};
    },
    /**
     * Retorna el padre de la estadística especificada
     * @param obj Objeto global en el que buscar
     * @param stat Estadistica de la que se requiere el padre (o string nombre de la estadistica)
     * @param parent Objeto padre del que se está iterando en la recursividad
     */
    findParent: function(obj, stat, parent) {
        if(!util.isUndefined(parent)) {
            if(charFunctions.found(obj, stat))
                return parent;
        } if(util.is(util.stats, obj) || util.is(util.char, obj)) {
            var ret, self = this;
            obj.stats.forEach(function(o) {
                if(util.isUndefined(ret)) ret = self.findParent(o, stat, obj)
            });
            return ret;
        }
    },
    /**
     * Quita puntos de experiencia o gratuitos al personaje (según si ha aplicado ya los gratuitos o aún no)
     * @param qty Cantidad de puntos a retirar
     */
    withdrawXp: function(qty) {
        var source, freePts = false;
        if(char.fp > 0) {
            freePts = true;
            source = 'fp';
        }
        else if(char.xp > 0) source = 'xp';
        char[source] -= qty;
        if (char.fp <= 0 && freePts) {
            char.xp += 15;
            sockets.update();
        }
    },
    /**
     * Calcula el coste de la estadística especificada por parámetro
     * @param stat Estadística (objeto o nombre)
     * @returns {number}
     */
    xpCost: function(stat) {
        var subParent = charFunctions.findParent(char, stat),
            supParent = charFunctions.findParent(char, subParent),
            clan = charFunctions.findData(char, 'clan'),
            regularCost = function(a) {return stat.level * (stat.cost+a)},
            initialCost = function() {return stat.cost};
        if(char.fp > 0) {
            return initialCost();
        } else {
            if (subParent.name === 'disciplinas') {
                var discs = charFunctions.getDiscs(clan.value);
                if (discs.indexOf(clan.value)>0) return regularCost(0);
                else if (charFunctions.hasStat(stat)) return regularCost(2);
                else return 10;
            } else if (supParent.name === 'habilidades') {
                if (charFunctions.hasStat(stat)) return regularCost(0);
                else return stat.cost + 1;
            } else return regularCost(0);
        }
    },
    /**
     * Obtiene mediante recursividad la estadística requerida de un personaje especificado por parámetro.
     * @param obj Objeto en el que buscar la estadística
     * @param stat Nombre de la estadística a encontrar
     * @returns {*}
     */
    findStat: function(obj, stat) {
        var found = charFunctions.found(obj, stat);
        if(util.is(util.stat, obj)) {
            if(found) return obj;
        } else if(util.is(util.stats, obj) || util.is(util.char, obj)) {
            var self = this, ret;
            if(found) ret = obj;
            obj.stats.forEach(function(o) {
                if(util.isUndefined(ret)) ret = self.findStat(o, stat);
                //if(!util.isUndefined(tmpRet)) ret = tmpRet;
            });
            return ret;
        }
    },
    /**
     * Obtiene mediante recursividad el campo de datos requerido de un personaje especificado por parámetro.
     * @param obj Objeto en el que buscar el campo de datos
     * @param data Nombre del campo de datos a encontrar
     * @returns {*}
     */
    findData: function(obj, data) {
        if(util.is(util.field, obj)) {
            if(charFunctions.found(obj, data)) {return obj}
        } else {
            var prop, ret, self = this;
            if(util.is(util.data, obj)) prop = 'fields';
            else if(util.is(util.char, obj)) prop = 'data';
            obj[prop].forEach(function(o) {
                if(util.isUndefined(ret)) ret = self.findData(o, data);
            });
            return ret;
        }
    },
    /**
     * Determina si dos objetos de estadísticas corresponden al mismo (es decir, tienen el mismo nombre)
     * @param obj Objeto A a comparar
     * @param stat Objeto B a comparar
     * @returns {boolean}
     */
    found: function(obj, stat) {
        return !util.isUndefined(obj.name) && (obj.name === stat || (!util.isUndefined(stat.name) && obj.name == stat.name));
    },
    /**
     * Define mediante recursividad el nivel de una estadística del personaje especificados por parámetro.
     * @param obj Objeto en el que definir el nivel de la estadística
     * @param stat Nombre de la estadística a redefinir.
     * @param value Nuevo valor de la estadística. Si es boolean, true incrementa el valor y false lo decrementa.
     */
    setStat: function(obj, stat, value) {
        if(util.is(util.stat, obj)) {
            if(charFunctions.found(obj, stat)) {
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
        if(util.is(util.field, obj) && charFunctions.found(obj, field)) {
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