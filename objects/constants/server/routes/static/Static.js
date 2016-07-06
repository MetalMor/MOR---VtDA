/**
 * Constantes de rutas estáticas
 * Created by becari on 06/07/2016.
 */

var staticDirName = '/client/',
    statics = {
    list: [
        {path: '/public/', source: staticDirName},
        {path: '/css/', source: staticDirName+'stylesheets/'},
        {path: '/js/', source: staticDirName+'javascripts/'},
        {path: '/img/', source: staticDirName+'images/'},
        {path: '/lib/', source: staticDirName+'libraries/'}
    ]
};

module.exports = statics;