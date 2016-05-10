/**
 * Objeto que controla la asignación de disciplinas segun el clan.
 * Created by mor on 10/05/16.
 */

var clan = {
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
        toreaor: ['Auspex', 'Celeridad', 'Presencia'],
        tzimisce: ['Animalismo', 'Auspex', 'Vicisitud'],
        ventrue: ['Dominación', 'Fortaleza', 'Presencia']
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
                    function(disc) {ret.push(self.createDisc(disc))}
                );
        return ret;
    },
    /**
     * Crea un objeto de disciplina a partir del nombre
     * @param n Nombre de la disciplina
     * @returns {object}
     */
    createDisc: function(n) {
        return {name: n, level: 0, limit: 10, mod: 0,
            setMod: function(m) {this.mod = m}, addLevel: function() {this.level++}};
    }
};

/*
this.name = n;
this.level = 0;
this.limit = 10;
this.mod = 0;
this.setMod = function(m) {this.max = m};
this.addLevel = function() {this.level++};
*/
