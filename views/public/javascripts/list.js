/**
 * Objeto para controlar la lista de jugadores
 * Created by mor on 24/05/16.
 */

var list = {
    /**
     * Carga la lista de personajes de la partida en un elemento select.
     */
    load: function () {
        var element = $('select#char-list'), charList = game.charList, npcList = game.npcList;
        element.empty();
        list.appendList(element, charList);
        list.appendList(element, npcList);
        element.change(function () {
            button.charSelectOptionClick($(this).children(':selected'));
        });
    },
    /**
     * Añade elementos option a un elemento select especificado por parámetro.
     * @param element Elemento select.
     * @param list Lista de objetos personaje que añadir como elementos option.
     */
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
    /**
     * Comprueba si el elemento lista de personajes existe.
     * @returns {boolean}
     */
    exists: function() {
        return $('select#char-list').length > 0;
    }
};