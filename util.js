/**
 * Objeto con funciones de utilidad
 *
 * Created by mor on 6/05/16.
 */

module.exports = {
    obj: 'Object',
    arr: 'Array',
    func: 'Function',
    /**
     * Ni p*** idea, colega
     * @param field Algo será
     * @returns {boolean}
     */
    queryField: function(field) {return {}[field] = true},
    is: function(param, obj) {return Object.prototype.toString.call(obj) === '[object '+param+']'},
    /**
     * Retorna el índice en el array del atributo con el nombre y el valor especificados.
     * @param array Array en el que buscar
     * @param attr Nombre del atributo a encontrar
     * @param value Criterio de valor del atributo
     * @returns {number}
     */
    getIndex: function(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    },
    /**
     * Printa por la consola mediante recursividad las propiedades de un objeto (para testing)
     * @param a Objeto a mostrar
     */
    showProps: function(a) {
        var func = this.func;
        if(!this.is(func, a)) {
            var obj = this.obj, arr = this.arr;
            var type = typeof a, self = this;
            if (this.is(arr, a)) {
                a.forEach(function (b) {
                    self.showProps(b);
                });
            } else if (this.is(obj, a)) for (var x in a) this.showProps(a[x]);
            else if (type != 'undefined' && type != 'object' && a !== "") console.log('[server] prop: ' + a);
        }
    }
};