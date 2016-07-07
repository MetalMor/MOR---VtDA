/**
 * Constantes de rutas estáticas
 * Created by becari on 06/07/2016.
 */

var dirNames = {
    statics: {
        root: '/resources/',
        client: {
            root: 'client/',
            js: 'javascripts/',
            css: 'stylesheets/',
            img: 'images/',
            lib: 'libraries/'
        },
        hybrid: {
            root: 'both/',
            hjs: 'javascripts/'
        }
    }
}, routes = {
    statics: '/public/',
    css: '/css/',
    js: '/js/',
    img: '/img/',
    lib: '/lib/',
    hybr: '/hybrid/',
    hjs: '/hjs/'
},
    statics = {
    list: [
        {path: routes.statics, source: dirNames.statics.root+dirNames.statics.client.root},
        {path: routes.css, source: dirNames.statics.root+dirNames.statics.client.root+dirNames.statics.client.css},
        {path: routes.js, source: dirNames.statics.root+dirNames.statics.client.root+dirNames.statics.client.js},
        {path: routes.img, source: dirNames.statics.root+dirNames.statics.client.root+dirNames.statics.client.img},
        {path: routes.lib, source: dirNames.statics.root+dirNames.statics.client.root+dirNames.statics.client.lib},
        {path: routes.hybr, source: dirNames.statics.root+dirNames.statics.hybrid.root},
        {path: routes.hjs, source: dirNames.statics.root+dirNames.statics.hybrid.root+dirNames.statics.hybrid.hjs}
    ]
};

module.exports = statics;