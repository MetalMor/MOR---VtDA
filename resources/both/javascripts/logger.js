/**
 * Objeto para controlar el log de mensajes por consola.
 * Created by becari on 19/07/2016.
 */

var logger = {
    /**
     * Flag para determinar si el objeto ha de printar cosas por terminal.
     */
    debug: false,
    /**
     * Activa el modo debug del objeto logger y lo retorna.
     * @returns {logger}
     */
    activate: function() {
        if(!this.debug) {
            this.debug = true;
            this.log('logger', 'logger activated :D');
        }
        return this;
    },
    /**
     * Desactiva el modo debug del objeto logger y lo retorna.
     * @returns {logger}
     */
    deactivate: function() {
        if(this.debug) {
            this.log('logger', 'logger deactivated D:');
            this.debug = false;
        }
        return this;
    },
    /**
     * Deja un mensaje en la consola si el modo debug está activado. Si no lo está, deja constancia de ello.
     * @param source String nombre del ámbito de procedencia del mensaje.
     * @param message String cuerpo del mensaje.
     */
    log: function(source, message) {
        if(logger.debug) {
            var time = new Date(),
                formatTime = function (t) {
                    return t.toString().length > 1 ? t : '0' + t;
                },
                formattedTime = formatTime(time.getHours()) + ":" + formatTime(time.getMinutes()) + ":" + formatTime(time.getSeconds()),
                fullMessage = formattedTime + " [" + source + "]\t-> " + message;
            console.log(fullMessage);
        } else console.log('[logger] debug mode is off, please turn on');
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = logger;