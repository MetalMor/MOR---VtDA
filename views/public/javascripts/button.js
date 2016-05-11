/**
 * Script para controlar los botones de la interfaz
 * Created by becari on 11/05/2016.
 */

var button = {
    submitCharData: function() {
        if(this.allInputsSet()) {
            overlay.close('data');
            var dataValues = [], charData = char.data[0].fields;
            var clanName = $("select#clan").val();
            clanName = typeof clanName === 'undefined' ? 'Assamita guerrero' : clanName;
            this.modStats(clanName); // realiza las modificaciones pertinentes a la ficha según el clan
            // Guarda los valores de los inputs en un array para ser insertados
            dataValues.push($("input#name").val());
            dataValues.push($("input#nature").val());
            dataValues.push($("input#demeanor").val());
            dataValues.push(clanName);
            dataValues.push($("input#generation").val());
            dataValues.push($("input#haven").val());
            dataValues.push($("input#concept").val());
            var len = charData.length;
            for (var i = 0; i < len; i++)
                charData[i].value = dataValues[i];
            util.printChar();
            table.build(char.stats, "stats");
            table.build(clan.getDiscs(clanName), 'disciplinas'); // carga las disciplinas del clan escogido
            overlay.open('sheet');
        } else {
            overlay.showAlert('emptyFields');
        }
    },
    modStats: function(clanName) {
        var charStats = char.stats;
        if(clanName === 'Nosferatu') { // si eres nosferatu no tienes apariencia
            var attrIndex = util.getIndex(charStats, 'name', 'Atributos');
            var socIndex = util.getIndex(charStats[attrIndex].stats, 'name', 'Sociales');
            var lookIndex = util.getIndex(charStats[attrIndex].stats[socIndex].stats, 'name', 'Apariencia');
            charStats[attrIndex].stats[socIndex].stats[lookIndex].level = 0;
        }
    },
    allInputsSet: function() {
        return !($('#data input').filter(function(){
                return $.trim(this.value).length === 0;
            }).length > 0);
    }
};