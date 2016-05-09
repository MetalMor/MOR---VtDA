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
     * Retorna un objeto apto para ser enviado a una query de la base de datos como parámetro de inclusión en el resultado.
     * @param field Campo string a mostrar.
     * @returns {boolean}
     */
    queryField: function(field) {return {}[field] = true},
    /**
     * Comprueba si un objeto es del tipo especificado.
     * @param param Tipo (string)
     * @param obj Objeto a comprobar
     * @returns {boolean}
     */
    is: function(param, obj) {return Object.prototype.toString.call(obj) === '[models '+param+']'},
    /**
     * Retorna el índice en el array del atributo con el nombre y el valor especificados.
     * @param array Array en el que buscar
     * @param attr Nombre del atributo a encontrar
     * @param value Criterio de valor del atributo
     * @returns {number}
     */
    getIndex: function(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) if(array[i][attr] === value) return i;
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
            if (this.is(arr, a)) a.forEach(function (b) {self.showProps(b)}); // si es un array llama a showProps sobre el objeto en la posición actual
            else if (this.is(obj, a)) for (var x in a) this.showProps(a[x]); // si es un objeto, lo mismo q antes
            else if (type != 'undefined' && type != 'object' && a !== "") console.log('[server] prop: ' + a); // si es un tipo primitivo, muestra su valor
        }
    }
};