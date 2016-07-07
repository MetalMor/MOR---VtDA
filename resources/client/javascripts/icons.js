/**
 * Cargador de iconos.
 * Created by mor on 5/07/16.
 */

var icons = {
    /**
     * Conjunto de paths para las imágenes.
     */
    sources: {
        set: '/img/icon/set_level_icon.png',
        unset: '/img/icon/unset_level_icon.png',
        max: '/img/icon/max_level_icon.png'
    },
    /**
     * Lista vacía de objetos HTML image, se rellena en init.
     */
    list: {},
    /**
     * Inicializa la lista de imágenes
     */
    init: function () {
        var source, current,
            sources = icons.sources,
            list = icons.list;
        for (source in sources) {
            current = list[source] = new Image();
            current.src = sources[source];
            current.className = source + " levelbutton";
        }
    }
};