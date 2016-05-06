/**
 * Objeto con funciones de utilidad
 *
 * Created by mor on 6/05/16.
 */

module.exports = {
    queryField: function(field) {return {}[field] = true},
    getIndex: function(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
};