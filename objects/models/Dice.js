/**
 * Clase que representa la tirada de un dado
 *
 * Created by mor on 5/05/16.
 */

module.exports = function() {
    this.score = 0;
    this.throw = function(dif) {
        var score = Math.floor(Math.random()*10);
        this.success = score >= dif;
        return this.score = score;
    };
};