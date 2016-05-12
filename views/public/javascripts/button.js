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
            this.modStats(clanName); // realiza las modificaciones pertinentes a la ficha según el clan
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
            table.build(char.stats, "stats");
            table.build(discs, 'disciplinas'); // carga las disciplinas del charUtils escogido
            charFunctions.setDiscs(discs);
            button.setTableButtons('stats');
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
     * Realiza las modificaciones necesarias a las estadísticas del personaje a partir del nombre del clan.
     * @param clanName Nombre del clan del personaje.
     */
    modStats: function(clanName) {
        if(clanName === 'Nosferatu') { // si eres nosferatu no tienes apariencia
            charFunctions.setStat(char, 'apariencia', 0);
        }
    },
    /**
     * Establece los eventos de botones de la tabla del personaje.
     * @param id Tabla o fila de la que establecer el evento.
     */
    setTableButtons: function(id) {
        var levelButtons = $('#'+id+' img[class]'), self;
        levelButtons.each(function() {
            self = $(this);
            if(util.isUndefined($(this).attr('onclick')))
                $(this).click(function() {
                    button.statButtonClick($(this).closest('td[id]').attr('id'), $(this).attr('class'))
                });
        });
    },
    /**
     * Función destinada a llamarse al hacer clic en uno de los iconos de nivel de la ficha del personaje.
     * @param id String identificador del elemento padre del icpno (correspondiente a la estadistica a la que pertenece)
     * @param cls Clase del icono: set, unset o max
     */
    statButtonClick: function(id, cls) {
        if(cls === table.icons.unset.class) {
            mode = true
        } else if(cls === table.icons.set.class) {
            mode = false;
        }
        table.modStat(id, mode);
    }
};