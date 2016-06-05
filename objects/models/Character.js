/**
 * Clase que representa un personaje
 *
 * Created by mor on 4/05/16.
 */

module.exports = function(d, s) {
    this.data = d;
    this.stats = s;
    this.inv = [];
    this.xp = 0;
    this.fp = 0;
    this.hp = 7;
    this.npc = false;
    this.story;
    this.diceSet = [];
    this.ready = false;
    this.gain = function(prop, gain) {this[prop] += gain};
    this.loose = function(prop, loose) {this[prop] -= loose};
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