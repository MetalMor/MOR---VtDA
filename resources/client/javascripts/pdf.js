/**
 * Objeto convertidor de HTML en PDF.
 * Created by mor on 5/07/16.
 */

var pdf = {
    /**
     * Convierte un elemento imagen en un documento PDF.
     * @param source Elemento imagen a convertir.
     */
    convert: function (source) {
        var doc = new jsPDF('p', 'mm');
         doc.addImage(source, 'PNG', 0, 0);
         doc.save(Date.now()+'.pdf');
    }
};