/**
 * Objeto convertidor de HTML en PDF.
 * Created by mor on 5/07/16.
 */

var pdf = {
    convert: function () {
        var source = $('table#show-stats')[0];
        var pdf = new jsPDF('p', 'pt', 'letter'),
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            },
            options = {
                width: margins.width
            }

        pdf.fromHTML(source, margins.left, margins.top, options,
            function (dispose) {
                pdf.save(Date.now() + '.pdf');
            }, margins);
    }
};