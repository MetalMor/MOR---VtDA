/**
 * Objeto para controlar los overlays
 * Created by mor on 11/05/2016.
 */
var overlay = {
    /**
     * Cierra un elemento desplegable
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
     * Abre un elemento desplegable
     * @param id ID del elemento (string)
     */
    open: function(id, sp, callback) {
        var element = $("#"+id), speed = sp ? sp : 'fast';
        element.fadeIn(speed, function() {
            element.css('width', '100%');
            if(callback) callback();
        });
    },
    hide: function(element, sp, callback) {
        var speed = sp ? sp : 'fast';
        element.fadeOut(speed, function() {
            element.attr('hidden', 'true');
            if(callback) callback();
        });
    },
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
    playerPanel: function(socket) {
        var panel = $('#panel');
        panel.attr('hidden', 'false');
        overlay.open('panel');
        button.setPanelButton('char-data');
        panel.fadeIn('slow');
        table.showData(char, 'show-data');
    }
};