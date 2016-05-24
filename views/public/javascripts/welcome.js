/**
 * Objeto para controlar el mensaje de bienvenida
 * Created by becari on 23/05/2016.
 */

var welcome = {
    messages: [
        {font: 'Kaushan Script', message: "It is the blood of Caine which makes our fate."},
        {font: 'Papyrus', message: "SPAGHETTI AND PUZZLES!"},
        {font: 'sans', message: "* do you wanna have a bad time?"},
        {font: 'MTT', message: "REAL DRAMA! REAL ACTION! REAL BLOODSHED!"},
        {font: 'Joy', message: "Feel the Joy down in your heart..."},
        {font: 'TerribleFate', message: "You've met with a terrible fate, haven't you?"},
        {font: 'NobodyCame', message: "...but nobody came."}/*,
        {font: 'Wingdings', message: 'ENTRY NUMBER SEVENTEEN DARK DARKER YET DARKER'}*/
    ],
    setMessage: function(element) {
        var list = welcome.messages, max = list.length,
            index = Math.floor(Math.random() * max),
            chosen = list[index];
        element.text(chosen.message).css('font-family', chosen.font);
    }
};

var wcm;
(wcm = $('#welcome')).ready(function() {
    welcome.setMessage(wcm);
});