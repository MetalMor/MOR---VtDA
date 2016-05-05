/**
 * Clase que representa el conjunto de datos ajenos a la mecánica del juego de un personaje
 *
 * Created by mor on 5/05/16.
 */

module.exports = function(n, nt, cn, cl, g, h, cp, st) {
    this.name = n;
    this.nature = nt;
    this.conduct = cn;
    this.clan = cl;
    this.gen = g;
    this.home = h;
    this.concept = cp;
    this.story = st;
    this.inv = [];
};