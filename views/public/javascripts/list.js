/**
 * Objeto para controlar la lista de jugadores
 * Created by mor on 24/05/16.
 */

var list = {
    load: function () {
        var element = $('select#char-list'), charList = game.charList, npcList = game.npcList;
        //if(list.exists()) {
            element.empty();
            list.appendList(element, charList);
            list.appendList(element, npcList);
            element.change(function () {
                button.charSelectOptionClick($(this).children(':selected'));
            });
        //}
    },
    appendList: function (element, list) {
        var childs = "";
        var addChild = function (c) {
                childs += c
            },
            newChild = function (n) {
                return "<option>" + n + "</option>"
            };
        list.forEach(function (ch) {
            var charName = charFunctions.findData(ch, 'nombre').value;
            addChild(newChild(charName));
        });
        element.append(childs);
    },
    exists: function() {
        return $('select#char-list').length > 0;
    }
};