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
        var sub = [], prefs = [], list = $('table#'+which+'-prefs label.number');
        list.each(function() {
            prefs.push(parseInt($(this).text()));
        });
        return prefs;
    },
    /**
     * Define las preferencias de estadísticas para un personaje
     * @param which Nombre del grupo de estadísticas
     * @param prefs Array de preferencias de estadísticas.
     */
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
    },
    /**
     * Controla los botones para establecer las preferencias de estadísticas.
     * @param row Fila del botón que ha sido pulsado
     * @param mode Modo subir o bajar
     */
    modPrefs: function(row, mode) {
        var labelSelector = 'label.number';
        var newRow = row[mode]().find(labelSelector),
            oldRow = row.find(labelSelector),
            newText = newRow.text(), oldText = oldRow.text();
        newRow.fadeOut('fast', function() {
            newRow.fadeIn('fast');
            newRow.text(oldText);
        });
        oldRow.fadeOut('fast', function() {
            oldRow.fadeIn('fast');
            oldRow.text(newText);
        });
    }
};