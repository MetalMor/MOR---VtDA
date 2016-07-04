/**
 * Genera una lista de objetos a partir de una lista de nombres.
 * Created by becari on 04/07/2016.
 */

var list = function(nameList, Type) {
    var ret = [];
    nameList.forEach(function(n) {
        ret.push(new Type(n));
    });
    return ret;
};

module.exports = list;