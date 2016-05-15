/**
 * Controla las funciones de construcción y manipulación de la tabla.
 * Created by mor on 10/05/16.
 */
var table = {
    /**
     * Contenedor de objetos para insertar adecuadamente los iconos de nivel.
     */
    icons: {
        set: {class:"set", file: "set_level_icon.png"},
        unset: {class: "unset", file: "unset_level_icon.png"},
        maxable: {class: "max", file: "max_level_icon.png"}
    },
    /**
     * Mediante recursividad, construye una tabla a partir de un objeto de estadísticas. Si el objeto es un array, dibujará
     * una tabla de una fila para cada posición. Si es un objeto de estadísticas
     * @param statsObj
     * @returns {string}
     */
    build: function(statsObj, tableId) {
        if(util.is(util.stat, statsObj)) { // es un objeto de estadística singular
            return "<tr><td>"+util.fancy(statsObj.name)+"</td><td id='"+statsObj.name+"'>"+this.level(statsObj)+"</td></tr>"; // <-- ACABA RECURSIVIDAD
        } else if(util.is(util.stats, statsObj)) { // es un objeto de conjunto de estadísticas
            var subTable = "", stats = statsObj.stats, self = this;
            var tableAdd = function(a) {subTable += a}, len = stats.length;
            tableAdd("<td><div class='table-responsive'><table id='"+statsObj.name+"' class='table'>");
            tableAdd("<thead><th>"+util.fancy(statsObj.name)+ "</th>");
            if(!util.isUndefined(statsObj.initPoints) && statsObj.initPoints > 0)
                tableAdd("<th>"+statsObj.initPoints+"</th>");
            tableAdd("</thead><tbody><tr>");
            stats.forEach(function(s) {tableAdd(self.build(s, tableId))}); // <-- RECURSIVIDAD HERE
            tableAdd("</tr></tbody></table></div></td>");
            return subTable;
        } else if(util.type(util.arr, statsObj)) { // es un array
            var mainTable = $("table#"+tableId+">tbody");
            var content = "", self = this;
            var contentAdd = function(a) {content += a};
            statsObj.forEach(function(s){contentAdd("<tr>"+self.build(s, tableId)+"</tr>")}); // <-- RECURSIVIDAD HERE
            mainTable.append(content);
        }
    },
    /**
     * Actualiza el display de los puntos iniciales de una estadística
     * @param stat
     */
    updateInitPoints: function(stat) {
        $("table#"+stat.name+" th:nth-child(2)").text(stat.initPoints);
    },
    /**
     * Actualiza el display de todas las estadísticas de la tabla del personaje (aún hay que probarlo).
     */
    updateAll: function() {
        var elements = $('td[id]'), self = this, id;
        elements.forEach(function(e) {
            id = e.attr('id');
            self.update(id);
        });
    },
    /**
     * Actualiza el display de una estadística de la tabla del personaje especificada por parámetro
     * @param name Nombre (id) de la estadística
     */
    update: function(name) {
        var statElement = $('#'+name), stat = charFunctions.findStat(char, name);
        if (!util.isUndefined(stat)) {
            statElement.empty();
            statElement.append(this.level(stat));
            button.setTableButtons(name);
        }
    },
    updateOther: function() {
        var stats = charFunctions.findStat(char, 'otros').stats,
            autctrlLvl = charFunctions.findStat(char, 'autocontrol').level,
            conscLvl = charFunctions.findStat(char, 'conciencia').level,
            corLvl = charFunctions.findStat(char, 'coraje').level;
        stats.forEach(function(s) {
            switch(s.name) {
                case 'fuerza_de_voluntad':
                    table.modStat(s, corLvl);
                    break;
                case 'camino':
                    table.modStat(s, autctrlLvl+conscLvl);
                    break;
                default:
                    if(s.max === 0) {
                        s.max = parseInt(charFunctions.findData(char, 'generacion').value);
                        table.update(s.name);
                    }
                    break;
            }
        });
    },
    /**
     * Retorna el nivel de una estadística convertida en una cadena de elementos img que lo representan
     * @param stat
     * @returns {string}
     */
    level: function(stat) {
        var ret = "", level = stat.level, icons = this.icons;
        var icon, max = stat.max, lim = stat.limit;
        var iconsDir = "/public/images/icon/";
        // bucle que inserta la imagen de una esfera de nivel. Si el personaje posee ese nivel aprendido, sera roja, y sino, gris
        for(var i = 1; i<=lim; i++) {
            if(stat.hasOwnProperty('max'))  icon = i<=max ? icons.maxable : icons.unset;
            else if(i>level) icon = icons.unset;
            else icon = icons.set;
            ret += "<img class='"+icon.class+"' src='" +iconsDir+icon.file + "'>";
        }
        return ret;
    },
    /**
     * Modifica una estadística (tanto en la tabla como en el objeto modelo).
     * @param stat Objeto de la estadística
     * @param mode Especifica el tipo de cambio: boolean true incrementa, false decrementa. Si es un número, redefine
     * la estadística con ese valor.
     */
    modStat: function(stat, mode) {
        if(restrict.lookRestriction(stat)) {
            charFunctions.setStat(char, stat, mode);
            table.update(stat.name);
        }
    }
};