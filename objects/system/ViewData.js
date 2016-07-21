/**
 * Clase que contiene datos para construir una vista.
 *
 * Created by mor on 4/05/16.
 */
module.exports = function(f, wt, dt, e) {
    this.file = f;
    this.data = {
        w_title: wt,
        d_title: dt,
        stylesheets: require('./view_data/stylesheets'),
        scripts: require('./view_data/scripts'),
        error: e
    };
};