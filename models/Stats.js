/**
 * Clase que representa el conjunto de estadísticas de un personaje que intervienen en la mecánica del juego
 *
 * Created by mor on 5/05/16.
 */

module.exports = function(at, sk, ad, ms) {
    this.attrs = at;
    this.skills = sk;
    this.advtges = ad;
    this.misc = ms;
};