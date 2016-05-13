/**
 * Objeto controlador de las listas de preferencias
 * Created by mor on 12/05/16.
 */

var prefs = {
    /**
     * Retorna un array bidimensional con los valores de texto de ambas listas de preferencias de estadísticas
     * @returns {Array}
     */
    getPrefs: function(which) {
        var sub = [], prefs = [], list = $('table#'+which+'-prefs tr>td:nth-child(3) label');
        list.each(function() {
            prefs.push(parseInt($(this).text()));
        });
        return prefs;
    },
    setPrefs: function(which, prefs) {
        var stats = char.stats, group, prefsSet = false,
            superCounter = 0, subCounter = 0;
        while(!prefsSet) {
            group = stats[superCounter];
            if(group.name === which) {
                while(prefs.length > 0) {
                    group.stats[subCounter].initPoints = prefs.shift();
                    subCounter++;
                    if(prefs.length == 0) prefsSet = true;
                }
            }
            superCounter++
        }
        /*stats.forEach(function(sg) {
            if(sg.name === which) {
                group = sg.stats;
                group.forEach(function(s) {
                    s.initPoints = prefs.shift();
                });
            } else if(sg.name === 'otros') {
                group = sg.stats;
            }
        });*/
    }
};