/**
 * Objeto para controlar el mensaje de bienvenida
 * Created by becari on 23/05/2016.
 */

var welcome = {
    /**
     * Lista de mensajes aleatorios.
     */
    messages: [
        {font: 'Kaushan Script', message: "It is the blood of Caine which makes our fate."},
        {font: 'Papyrus', message: "SPAGHETTI AND PUZZLES!"},
        {font: 'sans', message: "* do you wanna have a bad time?"},
        {font: 'Determination', message: "REAL DRAMA! REAL ACTION! REAL BLOODSHED!"},
        {font: 'Joy', message: "Feel the Joy down in your heart..."},
        {font: 'TerribleFate', message: "You've met with a terrible fate, haven't you?"},
        {font: 'Determination', message: "...but nobody came."}/*,
        {font: 'Wingdings', message: 'ENTRY NUMBER SEVENTEEN DARK DARKER YET DARKER'}*/
    ],
    /**
     * Define el mensaje aleatorio que se mostrará.
     * @param element Elemento en el que mostrar el texto aleatorio.
     */
    setMessage: function(element) {
        var chosen = welcome.getMessage();
        element.text(chosen.message).css('font-family', chosen.font);
    },
    /**
     * Retorna el mensaje aleatorio que se está mostrando.
     * @returns {object}
     */
    getMessage: function() {
        var list = welcome.messages, max = list.length,
            index = Math.floor(Math.random() * max);
        return list[index];
    }
};

($('#welcome')).ready(function () {
    welcome.setMessage($('#welcome'));
});