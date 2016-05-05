/**
 * Clase que representa un personaje
 *
 * Created by mor on 4/05/16.
 */

module.exports = function(n, d) {
    this.name = n;
    this.data = d;
    this.charList = [];
    this.npcList = [];
    this.mapList = [];
    this.mesgList = [];
    this.diceSet = [];
    this.setDices = function(qty) {
        for(var i = 0; i < qty; i++) {
            this.diceSet.push(new Dice());
        }
    };
    this.throwDices = function(dif) {
        var results;
        this.diceSet.forEach(function(dice) {
            dice.throw(dif);
        });
        results = this.diceSet;
        this.diceSet = [];
        return results;
    };
};