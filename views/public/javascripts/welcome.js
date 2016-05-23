/**
 * Objeto para controlar el mensaje de bienvenida
 * Created by becari on 23/05/2016.
 */

var welcome = {
    messages: [
        {font: 'Kaushan Script', message: 'It is the blood of Caine which makes our fate.'},
        {font: 'Papyrus', message: 'SPAGHETTI AND PUZZLES!'},
        {font: 'Comic Sans MS', message: "do you wanna have a bad time?"},
        {font: 'Wingdings', message: 'DARKER YET DARKER ENTRY NUMBER SEVENTEEN'},
        {font: 'MTT', message: 'MORE ACTION! MORE DRAMA! MORE BLOODSHED'},
        {font: 'Brain Flower', message: 'Bradley!'}
    ],
    setMessage: function(element) {
        var max = welcome.messages.length, index = Math.floor(Math.random()*max),
            chosen = this.messages[index];
        element.text(chosen.message).css('font-family', chosen.font);
    }
};

var wcm;
(wcm = $('#welcome')).ready(function() {
    welcome.setMessage(wcm);
});

/*font-family: 'Kaushan Script', cursive;*/ /* Caine */
/*font-family: 'Papyrus', cursive;*/ /* PAPYRUS */
/*font-family: 'Comic Sans MS', cursive;*/ /* sans */
/*font-family: 'Wingdings', cursive;*/ /* W.D. Gaster */