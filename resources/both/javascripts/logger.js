/**
 * Objeto para controlar el log de mensajes por consola.
 * Created by becari on 19/07/2016.
 */

var logger = {
    log: function(source, message) {
        var time = new Date(),
            formattedTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(),
            fullMessage = formattedTime + ": [" + source + "] -> " + message;
        console.log(fullMessage);
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = logger;