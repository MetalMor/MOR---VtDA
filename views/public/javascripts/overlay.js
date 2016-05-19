/**
 * Objeto para controlar los overlays
 * Created by mor on 11/05/2016.
 */
var overlay = {
    /**
     * Cierra una ventana desplegable
     * @param id ID del elemento (string)
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
     * @param socket Conector WS del cliente
     */
    initCharPanel: function(socket) {
        overlay.showAlert('advice');
        overlay.open('data');
        button.setPrefsButtons('attr');
        button.setPrefsButtons('skills');
        util.disable('#generation');
        $("input#next").click(button.submitCharData);
        $("button#submit").click(function () {
            button.submitSheet(socket, char, user, game)
        });
    },
    /**
     * Muestra la ventana de información del personaje
     * @param socket Conector WS del cliente
     */
    playerPanel: function(socket) {
        var panel = $('#panel'),
            sheet = {user: user, game: game, char: char};
        panel.attr('hidden', 'false');
        overlay.open('panel');
        button.setPanelButton('char-data');
        button.setPanelButton('char-stats');
        panel.fadeIn('slow');
        table.showData(char, 'show-data');
        table.showStats(char, 'show-stats');
        button.setXpButtons();
        socket.emit('loginChar', sheet);
    }
};