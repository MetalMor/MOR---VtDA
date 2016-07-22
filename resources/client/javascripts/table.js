/**
 * Controla las funciones de construcción y manipulación de la tabla.
 * Created by mor on 10/05/16.
 */
var table = {
    /**
     * Mediante recursividad, construye una tabla a partir de un objeto de estadísticas. La tabla está pensada para la
     * inicialización de personajes con puntos iniciales.
     * @param statsObj Objeto de estadísticas (personaje)
     * @returns {string}
     */
    build: function(statsObj, tableId) {
        if(util.is(util.stat, statsObj)) { // es un objeto de estadística singular
            return "<tr><td>"+util.fancy(statsObj.name)+"</td><td id='"+statsObj.name+"'>"+this.level(statsObj)+"</td></tr>"; // <-- ACABA RECURSIVIDAD
        } else if(util.is(util.stats, statsObj)) { // es un objeto de conjunto de estadísticas
            var subTable = "", stats = statsObj.stats, self = this;
            var tableAdd = function(a) {subTable += a};
            tableAdd("<td><div class='table-responsive'><table id='"+statsObj.name+"' class='table'>");
            tableAdd("<thead><th>"+util.fancy(statsObj.name)+ "</th>");
            if(!util.isUndefined(statsObj.initPoints) && statsObj.initPoints > 0 && util.isPlayer(user, game))
                tableAdd("<th>"+statsObj.initPoints+"</th>");
            tableAdd("</thead><tbody><tr>");
            stats.forEach(function(s) {tableAdd(self.build(s, tableId))}); // <-- RECURSIVIDAD HERE
            tableAdd("</tr></tbody></table></div></td>");
            return subTable;
        } else if (util.is(util.char, statsObj) || util.type(util.arr, statsObj)) { // es un array
            var mainTable = $("table#"+tableId+">tbody"), isChar = util.is(util.char, statsObj);
            var content = "", self = this, stats = statsObj.stats || statsObj;
            var trPre = isChar ? "<tr>" : "", trPost = isChar ? "</tr>" : "";
            var contentAdd = function(a) {content += a};
            mainTable.empty();
            stats.forEach(function (s) {contentAdd(trPre+self.build(s, tableId)+trPost)}); // <-- RECURSIVIDAD HERE
            mainTable.append(content);
        }
    },
    /**
     * Muestra el resultado de un conjunto de dados en la pantalla, formatado correctamente.
     * @param rollSet
     */
    showRollSet: function(rollSet) {
        if(rollSet.resolved) {
            var rolls = rollSet.rolls, mainTable = $('div#roll-result>table>tbody').empty(), tableBody = "", count = 0,
                result, mainTableHead = $('div#roll-result>table>thead').empty(), tableHead = "",
                counters = {success: 0, failure: 0};
            mainTable.empty();
            mainTableHead.empty();
            rolls.forEach(function(r) {
                result = r.isWin() ? "success" : "failure";
                counters[result]++;
                tableBody += "<tr class='" + (result === "success" ? result : "danger") + "'>" +
                    "<td>" + ++count + "</td>" +
                    "<td>Resultado: " + r.res + "</td>" +
                    "<td>" + util.fancy(result) + "!</td>" +
                    "</tr>";
            });
            var header = rollSet.fail ?
                "<th colspan='2'>FALLO</th>" :
                ("<th>Éxitos: " + counters.success + "</th><th>Fallos: " + counters.failure + "</th>");
            tableHead = "<tr><th>Tabla de resultados</th>" + header + "</tr>";
            mainTableHead.append(tableHead);
            mainTable.append(tableBody);
            overlay.gameWindow(char);
        }
    },
    /**
     * Genera una tabla que muestra el contenido de los campos de datos del personaje.
     * @param dataObj Objeto personaje/conjunto de campos/campo de datos
     * @param tableId Identificador de la tabla.
     * @returns {*}
     */
    showData: function(dataObj, tableId) {
        if(util.is(util.field, dataObj)) {
            var value = dataObj.name === 'generacion' ? util.romanize(dataObj.value) : dataObj.value;
            return "<tr><td>"+util.fancy(dataObj.name)+"</td><td id='"+dataObj.name+"'>"+util.fancy(value)+"</td></tr>"; // <-- ACABA RECURSIVIDAD
        } else if(util.is(util.data, dataObj)) {
            var subTable = "", fields = dataObj.fields, self = this;
            var tableAdd = function(a) {subTable += a};
            tableAdd("<td><div class='table-responsive'><table id='"+dataObj.name+"' class='table'>");
            tableAdd("<thead><th>"+util.fancy(dataObj.name)+"</th></thead><tbody><tr>");
            fields.forEach(function(d) {tableAdd(self.showData(d, tableId))});
            tableAdd("</tr></tbody></table></div></td>");
            return subTable;
        } else if(util.is(util.char, dataObj)) {
            var mainTable = $("table#"+tableId+">tbody");
            var content = "", self = this, data = dataObj.data;
            var contentAdd = function(a) {content+=a};
            mainTable.empty();
            data.forEach(function(d) {contentAdd("<tr class='col-sm-4'>"+self.showData(d, tableId)+"</tr>")});
            mainTable.append(content);
            $('p#story').text(char.story);
        }
    },
    /**
     * Genera una tabla que muestra las estadsíticas que posee un personaje y que permite modificarlas gastando
     * puntos de experiencia o puntos gratuitos (XP o FP)
     * @param statsObj Objeto personaje/conjunto de estadísticas/estadística
     * @param tableId Identificador de la tabla
     * @returns {*}
     */
    showStats: function(statsObj, tableId) {
        if(util.is(util.stat, statsObj)) {
            var name = util.fancy(statsObj.name), level = statsObj.level,
                classAttr = level > 0 ? " class='learned'" : "";
            return "<tr"+classAttr+"><td><span></span></td>" +
                "<td class='name'>"+name+"</td><td id='"+statsObj.name+"'>"+table.level(statsObj)+"</td></tr>"
        } else if(util.is(util.stats, statsObj)) {
            var subTable = "", stats = statsObj.stats, self = this;
            var tableAdd = function(a) {subTable += a};
            tableAdd("<td><div class='table-responsive'><table id='"+statsObj.name+"' class='table'>");
            tableAdd("<thead><th></th><th>"+util.fancy(statsObj.name)+"</th></thead><tbody><tr>");
            stats.forEach(function(s) {tableAdd(self.showStats(s, tableId))});
            tableAdd("</tr></tbody></table></div></td>");
            return subTable;
        } else if(util.is(util.char, statsObj)) {
            var mainTable = $("table#"+tableId+">tbody");
            var content = "", self = this, stats = statsObj.stats;
            var contentAdd = function(a) {content+=a};
            mainTable.empty();
            stats.forEach(function(s) {contentAdd("<tr>"+self.showStats(s, tableId)+"</tr>")});
            mainTable.append(content);
            table.updateXp(statsObj);
            button.setXpButtons();
            if(util.isMaster(user, game))
                button.setMaxableStatButton();
        }
    },
    /**
     * Elimina el texto de un elemento, pero no sus elementos descendientes
     * @param element Elemento a limpiar
     */
    removeText: function(element) {
        element.contents().filter(function(){
            return (this.nodeType == 3);
        }).remove();
    },
    /**
     * Función para actualizar el display de los puntos de experiencia del personaje
     * @param char Personaje del que obtener los puntos de experiencia.
     */
    updateXp: function (char) {
        var panel = $('div#char-stats'),
            xpDisplay = panel.find('.panel-heading>span#char-xp');
        if (char.fp > 0)
            xpDisplay.text('FP: '+char.fp);
        else if(char.xp >= 0)
            xpDisplay.text('XP: '+char.xp);
        else
            xpDisplay.empty();
    },
    /**
     * Actualiza el display de los puntos iniciales de una estadística
     * @param stat
     */
    updateInitPoints: function(stat) {
        var element = $("table#"+stat.name+" th:nth-child(2)");
        if(util.isPlayer(user, game)) {
            element.text(stat.initPoints);
        } else {
            overlay.hide(element);
        }
    },
    /**
     * Actualiza el display de todas las estadísticas de la tabla del personaje (me parece que caerá en el olvido...).
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
        var element = $('table[id*=stats] td#'+name), stat = charFunctions.findStat(char, name), ap;
        if (!util.isUndefined(stat)) {
            element.empty();
            ap = table.level(stat);
            element.append(ap);
            button.setTableButtons(name);
        }
    },
    /**
     * Actualiza el display de las estadísticas excluidas de la puntuacion inicial
     */
    updateOther: function() {
        var stats = charFunctions.findStat(char, 'otros').stats,
            autctrlLvl = charFunctions.findStat(char, 'autocontrol').level,
            conscLvl = charFunctions.findStat(char, 'conciencia').level,
            corLvl = charFunctions.findStat(char, 'coraje').level;
        stats.forEach(function(s) {
            switch(s.name) {
                case 'fuerza_de_voluntad':
                    s.max = corLvl;
                    table.modStat(s, corLvl);
                    break;
                case 'camino':
                    table.modStat(s, autctrlLvl+conscLvl);
                    break;
                default:
                    if(s.max === 0)
                        s.max = charFunctions.maxBlood(char);
                    table.update(s.name);
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
        var ret = "", level = stat.level;
        var icon, max = stat.max, lim = stat.limit;
        // bucle que inserta la imagen de una esfera de nivel. Si el personaje posee ese nivel aprendido, sera roja, y sino, gris
        for(var i = 1; i<=lim; i++) {
            if (util.is(util.maxStat, stat))  icon = i <= max ? icons.list.max : icons.list.unset;
            else if (i > level) icon = icons.list.unset;
            if (i <= level) icon = icons.list.set;
            ret += icon.outerHTML;
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
        charFunctions.setStat(char, stat, mode);
        table.update(stat.name);
    },
    exportImg: function (table, callback) {
        toCanvas.convert(table, function(tableDataUrl) {
            if(callback) callback(tableDataUrl);
            else window.open(tableDataUrl);
        });
    }
};