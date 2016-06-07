/**
 * Objeto controlador de formularios
 * Created by mor on 20/05/16.
 */

var form = {
    /**
     * Guarda los datos de los inputs del formulario en un array bidimensional. Lo he hecho un poco con el ojete, pero bueno,
     * no tenía ganas de más recursividades por el momento.
     * @returns {Array}
     */
    getDataInputs: function () {
        var temp = [], ret = [],
            save = function () {
                temp.forEach(function(s) {
                    s = util.fancy(s);
                });
                ret.push(temp);
                temp = [];
            };
        //<editor-fold desc="Coge los inputs del formulario" default="collapsed">
        temp.push($("input#name").val());
        temp.push($("input#nature").val());
        temp.push($("input#demeanor").val());
        temp.push($("select#clan").val());
        temp.push(util.deromanize($("select#generation").val()).toString());
        temp.push($("input#haven").val());
        temp.push($("input#concept").val());
        save();
        temp.push($("input#real-age").val());
        temp.push($("input#supposed-age").val());
        temp.push($("input#hair").val());
        temp.push($("input#eyes").val());
        temp.push($("input#nationality").val());
        temp.push($("select#sex").val());
        temp.push($("input#height").val());
        temp.push($("input#weight").val());
        save();
        temp.push($("textarea#domain").val());
        temp.push($("textarea#contacts").val());
        temp.push($("textarea#herd").val());
        temp.push($("textarea#influence").val());
        temp.push($("textarea#mentor").val());
        temp.push($("textarea#allies").val());
        temp.push($("textarea#resources").val());
        temp.push($("textarea#servants").val());
        save();
        char.story = $("textarea#story").val();
        //</editor-fold>
        return ret;
    }
};