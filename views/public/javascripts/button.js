/**
 * Script para controlar los botones de la interfaz
 * Created by becari on 11/05/2016.
 */

var button = {
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
            inputs.forEach(function(i) { // NO RULA
                charData.forEach(function(d) {
                    d.fields.forEach(function(f) {
                        f.value = i.shift();
                    });
                });
            });
            util.printChar();
            table.build(char.stats, "stats");
            table.build(clan.getDiscs(clanName), 'disciplinas'); // carga las disciplinas del clan escogido
            overlay.open('sheet');
        } else {
            overlay.showAlert('emptyFields');
        }
    },
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
    modStats: function(clanName) {
        var charStats = char.stats;
        if(clanName === 'Nosferatu') { // si eres nosferatu no tienes apariencia
            var attrIndex = util.getIndex(charStats, 'name', 'Atributos');
            var socIndex = util.getIndex(charStats[attrIndex].stats, 'name', 'Sociales');
            var lookIndex = util.getIndex(charStats[attrIndex].stats[socIndex].stats, 'name', 'Apariencia');
            charStats[attrIndex].stats[socIndex].stats[lookIndex].level = 0;
        }
    }
};