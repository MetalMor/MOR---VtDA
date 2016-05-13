/**
 * Objeto para controlar los botones de la interfaz
 * Created by becari on 11/05/2016.
 */
var button = {
    /**
     * Guarda los datos del formulario y procede a construir la tabla. Según el clan, printará sus correspondientes disciplinas.
     * Si alguno de los campos está vacío, simplemente se muestra un alert encima del formulario que informará de que quedan
     * campos sin rellenar.
     */
    submitCharData: function() {
        if(util.allInputsSet()) {
            overlay.close('data');
            var charData = char.data;
            var clanName = $("select#clan").val();
            clanName = typeof clanName === 'undefined' ? 'Assamita guerrero' : clanName;
            charFunctions.modStats(clanName); // realiza las modificaciones pertinentes a la ficha según el clan
            // Guarda los valores de los inputs en un array para ser insertados
            //var len = charData.length;
            var inputs = [];
            inputs.push(this.getInputs(0));
            inputs.push(this.getInputs(1));
            inputs.push(this.getInputs(2));
            var inputsGroup, counter = 0;
            while(inputs.length > 0) {
                inputsGroup = inputs.shift();
                charData[counter].fields.forEach(function(f) {
                    f.value = inputsGroup.shift();
                });
                counter++;
            }
            var discs = charFunctions.getDiscs(clanName);
            prefs.setPrefs('atributos', prefs.getPrefs('attr'));
            prefs.setPrefs('habilidades', prefs.getPrefs('skills'));
            table.build(char.stats, "stats");
            table.build(discs, 'disciplinas');
            charFunctions.setDiscs(discs);
            button.setTableButtons('stats');
            util.printChar();
            overlay.open('sheet');
        } else {
            overlay.showAlert('emptyFields');
        }
    },
    /**
     * Guarda los datos de los inputs del formulario en un array bidimensional. Lo he hecho un poco con el ojete, pero bueno,
     * no tenía ganas de más recursividades por el momento.
     * @param crit
     * @returns {Array}
     */
    getInputs: function(crit) {
        var temp = [], ret = [];
        //<editor-fold desc="Coge los inputs del formulario en la variable temp..." default="collapsed">
        if(crit === 0) {
            temp.push($("input#name").val());
            temp.push($("input#nature").val());
            temp.push($("input#demeanor").val());
            temp.push($("select#clan").val());
            temp.push($("input#generation").val());
            temp.push($("input#haven").val());
            temp.push($("input#concept").val());
        } else if(crit === 1) {
            temp.push($("input#real-age").val());
            temp.push($("input#supposed-age").val());
            temp.push($("input#hair").val());
            temp.push($("input#eyes").val());
            temp.push($("input#nationality").val());
            temp.push($("select#sex").val());
            temp.push($("input#height").val());
            temp.push($("input#weight").val());
        } else if(crit === 2) {
            temp.push($("textarea#domain").val());
            temp.push($("textarea#contacts").val());
            temp.push($("textarea#herd").val());
            temp.push($("textarea#influence").val());
            temp.push($("textarea#mentor").val());
            temp.push($("textarea#allies").val());
            temp.push($("textarea#resources").val());
            temp.push($("textarea#servants").val());
        }
        //</editor-fold>
        temp.forEach(function(s) {ret.push(util.fancy(s))});
        return ret;
    },
    /**
     * Establece los eventos de botones de la tabla del personaje.
     * @param id Tabla o fila de la que establecer el evento.
     */
    setTableButtons: function(id) {
        var levelButtons = $('#'+id+' img[class]');
        levelButtons.each(function() {
            var attrName = $(this).closest('td[id]').attr('id');
            if(restrict.lookRestriction(attrName) && util.isUndefined($(this).attr('onclick')))
                $(this).click(function() {
                    button.statButtonClick(attrName, $(this).attr('class'))
                });
        });
    },
    setPrefsButtons: function(id) {
        var rowList = $('table#'+id+'-prefs tr'),
            row, spanList, spanBtn, spanClass, btn;
        rowList.each(function() {
            row = $(this);
            spanList = row.find('span');
            spanList.each(function() {
                spanBtn = $(this);
                spanBtn.click(function() {
                    btn = $(this);
                    row = btn.parent().parent();
                    var spanClassList = btn.attr('class').split(/\s+/);
                    spanClassList.forEach(function(c) {
                        if(c === 'prev' || c === 'next')
                            spanClass = c;
                    });
                    prefs.modPrefs(row, spanClass);
                })
            });
        });
    },
    /**
     * Función destinada a llamarse al hacer clic en uno de los iconos de nivel de la ficha del personaje.
     * // TODO controlar initPoints
     * @param id String identificador del elemento padre del icpno (correspondiente a la estadistica a la que pertenece)
     * @param cls Clase del icono: set, unset o max
     */
    statButtonClick: function(id, cls) {
        if(cls === table.icons.unset.class) {
            mode = true
        } else if(cls === table.icons.set.class) {
            mode = false;
        }
        var stat = charFunctions.findStat(char, id),
            parent = charFunctions.findParent(char, id);
        if(mode) {
            if(parent.initPoints > 0) {
                parent.initPoints--;
                table.modStat(stat, mode);
                table.updateInitPoints(parent);
            }
        } else if(restrict.levelZeroRestriction(stat)) {
            parent.initPoints++;
            table.modStat(stat, mode);
            table.updateInitPoints(parent);
        }
    }
};