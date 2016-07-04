/**
 * Objeto para controlar la lista de jugadores
 * Created by mor on 24/05/16.
 */

var list = {
    /**
     * Carga la lista de personajes de la partida en un elemento select.
     */
    load: function () {
        var element = $('select#char-list'), charList = game.charList,
            npcList = game.npcList, event = 'change', childrenSelector = ':selected',
            separatorElement = '<option>--------------------</option>';
        element.empty();
        list.appendList(element, charList);
        element.append(separatorElement);
        list.appendList(element, npcList);
        element.off(event);
        element.on(event, function () {
            button.charSelectOptionClick(element.children(childrenSelector));
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
            newChild = function (c) {
                var currentCharName = charFunctions.findData(char, 'nombre').value,
                    otherCharName = charFunctions.findData(c, 'nombre').value,
                    htmlClass = ((util.isUndefined(c.npc) || !c.npc) ? 'char' : 'npc'),
                    htmlSelected = (currentCharName === otherCharName ? " selected" : "");
                return "<option" + htmlSelected + " class='"+htmlClass+"'>" + otherCharName + "</option>"
            };
        list.forEach(function (ch) {
            addChild(newChild(ch));
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