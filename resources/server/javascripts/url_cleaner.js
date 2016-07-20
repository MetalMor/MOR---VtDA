/**
 * Para disuadir a los malechores de inyectar shit en la URL.
 * TODO: debugar y ver si de verdad funciona
 * Created by becari on 05/07/2016.
 */

var urlClean = {
    inspect: function(req, res, next) {
        var param, params = req.params, illegal = false;
        for (param in params) {
            if(!illegal && param.search(/[^\w\.\/\-]/gi) >= 0) // ojito acordarse que esta mierda hace q la partida del roger sea inaccesible, hacer una funcion q sustituya los espacios por guiones bajos en vez de porcentaje-noseque
                illegal = true;
        }
        if(illegal)
            res.render(view.file, view.data);
        else
            next();
    }
};

module.exports = urlClean;