/**
 * Functiones de utilidad para el cliente.
 * Created by mor on 9/05/16.
 */

var util = {
    obj: 'Object',
    arr: 'Array',
    func: 'Function',
    table: "stats",
    stat: "level",
    is: function(crit, obj) {return obj.hasOwnProperty(crit)},
    type: function(param, obj) {return Object.prototype.toString.call(obj) === '[object '+param+']'}
};
