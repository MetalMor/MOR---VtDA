/**
 * Objeto para controlar los overlays
 * Created by mor on 11/05/2016.
 */
var overlay = {
    /**
     * Cierra una ventana desplegable
     * @param id ID del elemento (string)
     * @param sp Velocidad de la animación
     * @param callback Función que se llamará al terminar
     */
    close: function(id, sp, callback) {
        var element = $("#"+id), speed = sp ? sp : 'fast';
        element.fadeOut(speed, function() {
            element.css('width', '0%');
            if(callback) callback();
        });
    },
    /**
     * Abre una ventana desplegable
     * @param id ID del elemento (string)
     * @param sp Velocidad de la animación
     * @param callback Función que se llamará al terminar
     */
    open: function(id, sp, callback) {
        var element = $("#"+id), speed = sp ? sp : 'fast';
        element.fadeIn(speed, function() {
            element.css('width', '100%');
            if(callback) callback();
        });
    },
    /**
     * Cierra un panel desplegable
     * @param element Elemento a cerrar
     * @param sp Velocidad de la animación
     * @param callback Función que se llamará al terminar
     */
    hide: function(element, sp, callback) {
        var speed = sp ? sp : 'fast';
        element.fadeOut(speed, function() {
            element.attr('hidden', 'true');
            if(callback) callback();
        });
    },
    /**
     * Abre un panel desplegable
     * @param element Elemento a abrir
     * @param sp Velocidad de la animación
     * @param callback Función que se llamará al terminar
     */
    show: function(element, sp, callback) {
        var speed = sp ? sp : 'fast';
        element.fadeIn(speed, function() {
            element.attr('hidden', 'false');
            if(callback) callback();
        });
    },
    /**
     * Muestra un panel de alerta.
     * @param id Id del panel.
     */
    showAlert: function(id) {
        overlay.open(id, '100', function() {
            setTimeout(function() {
                overlay.close(id, '100', function() {
                    $('#emptyFields').css('width', '100%')
                });
            }, 2000);
        });
    },
    /**
     * Muestra la ventana de creación del personaje
     */
    initCharPanel: function() {
        overlay.showAlert('advice');
        overlay.open('data');
        overlay.setPrefsButtons();
        util.disable('#generation');
        $("input#next").click(button.submitCharData);
        $("button#submit").click(function () {
            button.submitSheet(char, user, game)
        });
    },
    setPanelButtons: function () {
        button.setPanelButton('char-data');
        button.setPanelButton('char-stats');
    },
    setPrefsButtons: function () {
        button.setPrefsButtons('attr');
        button.setPrefsButtons('skills');
    },
    gameWindow: function (char) {
        table.showData(char, 'show-data');
        table.showStats(char, 'show-stats');
    },
    /**
     * Muestra la ventana de información del personaje
     */
    playerPanel: function() {
        var panel = $('#panel'),
            sheet = {user: user, game: game, char: char};
        overlay.open('panel');
        overlay.setPanelButtons();
        overlay.gameWindow(char);
        sockets.player();
        sockets.server('login', sheet);
        //socket.emit('loginChar', sheet);
    },
    masterPanel: function () {
        var panel = $('#panel'),
            sheet = {user: user, game: game, char: false};
        overlay.open('panel');
        overlay.setPanelButtons();
        char = game.charList[0];
        overlay.gameWindow(char);
        list.load();
        button.setXpGiver();
        sockets.player();
    }
};