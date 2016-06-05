/**
 * Objeto para controlar los botones de la interfaz
 * Created by becari on 11/05/2016.
 */
var button = {
    /**
     * Guarda los datos del formulario y procede a construir la tabla. Según el clan, printará sus correspondientes disciplinas.
     * Si alguno de los campos está vacío, simplemente se muestra un alert encima del formulario que informará de que quedan
     * campos sin rellenar.
     */
    submitCharData: function() {
        var alertId = 'emptyFields', panelName = 'data';
        if (util.allInputsSet(panelName)) {
            overlay.close(panelName);
            var charData = char.data, overlayId = 'sheet', inputs = [], inputsGroup, counter = 0,
                clanName = $("select#clan").val(), attrName = 'atributos', skillsName = 'habilidades',
                attrId = 'attr', skillsId = 'skills', statsTableId = 'stats', discsTableId = 'disciplinas',
                defClanName = 'Assamita guerrero';
            clanName = util.isUndefined(clanName) ? defClanName : clanName;
            charFunctions.modStats(clanName);
            inputs = form.getDataInputs();
            while(inputs.length > 0) {
                inputsGroup = inputs.shift();
                charData[counter].fields.forEach(function(f) {
                    f.value = inputsGroup.shift();
                });
                counter++;
            }
            var discs = charFunctions.getDiscs(clanName);
            prefs.setPrefs(attrName, prefs.getPrefs(attrId));
            prefs.setPrefs(skillsName, prefs.getPrefs(skillsId));
            table.build(char, statsTableId);
            table.build(discs, discsTableId);
            charFunctions.setDiscs(discs);
            button.setTableButtons(statsTableId);
            table.updateOther();
            overlay.open(overlayId);
        } else {
            overlay.showAlert(alertId);
        }
    },
    /**
     * Guarda los datos de la ficha y envía por websockets al servidor el objeto del cliente, que contiene datos del
     * usuario, personaje y partida
     * @param char Personaje del cliente
     * @param user Usuario del cliente
     * @param game Partida del cliente
     */
    submitSheet: function(char, user, game) {
        if(restrict.fullSheet(char)) {
            var sheet, npc, mes = 'setChar',
                listId = (npc = char.npc) ? 'npc' : 'char',
                sheetPanel = 'sheet', charPoints = 'fp';
            charFunctions.setReady(char, true);
            charFunctions.setCharPoints(charPoints, 15);
            char.xp = 15; // testing
            charFunctions.initBlood(char);
            charFunctions.setOwner(char, user);
            charFunctions.addCharacter(char, listId, game);
            sheet = {user: user, char: char, game: game};
            sockets.server(mes, sheet);
            overlay.close(sheetPanel);
            overlay[npc ? 'masterPanel' : 'playerPanel']();
        }
    },
    /**
     * Establece los eventos de botones de la tabla del personaje.
     * @param id Tabla o fila de la que establecer el evento.
     */
    setTableButtons: function(id) {
        var levelButtons = $('#'+id+' img[class]');
        levelButtons.each(function() {
            var attrName = $(this).closest('td[id]').attr('id');
            if(restrict.lookRestriction(attrName) && util.isUndefined($(this).attr('onclick')))
                $(this).on('click', function() {
                    var firstClass = $(this).attr('class').split(' ')[0]; // set, unset o max
                    button.statButtonClick(attrName, firstClass)
                });
        });
    },
    /**
     * Define el comportamiento del botón de otorgar experiencia.
     */
    setXpGiver: function () {
        var element = $('span#xp-giver');
        element.on('click', function () {
            var sheet = {user: user, game: game, char: char};
            char.xp++;
            overlay.gameWindow(char);
            sockets.update();
        });
    },
    setCharCreationButton: function () {
        var element = $('span#char-creation-button');
        element.on('click', function () {
            $.ajax({
                url: '/game/initChar/',
                cache: false,
                success: function (ch) {
                    char = ch;
                    overlay.initCharPanel(function () {
                        overlay.close('panel');
                    });
                }
            });
        });
    },
    /**
     * Define las funciones que se llaman al clicar sobre los botones de la tabla de preferencias
     * @param id Identificador de la tabla de preferencias
     */
    setPrefsButtons: function(id) {
        var rowList = $('table#'+id+'-prefs tr'),
            row, spanList, spanBtn, btn, spanClass;
        rowList.each(function() {
            row = $(this);
            spanList = row.find('span');
            spanList.each(function() {
                spanBtn = $(this);
                spanBtn.on('click', function() {
                    btn = $(this);
                    row = btn.parent().parent();
                    var spanClassList = util.getClassList(btn);
                    spanClassList.forEach(function(c) {
                        if(c === 'prev' || c === 'next')
                            spanClass = c;
                    });
                    prefs.modPrefs(row, spanClass);
                })
            });
        });
    },
    /**
     * Define las funciones que se lanzan al hacer clic sobre los iconos de subida de nivel de una estadística.
     * Restaura el display
     */
    setXpButtons: function() {
        var rows = $('table#show-stats tr:not(:has(table))'), // selecciona todas las filas que NO contengan una tabla
            row, btn, stat, statId, s, r;
        var arrowUpClass = 'glyphicon glyphicon-arrow-up', learnedClass = 'learned';
        rows.each(function() {
            row = $(this);
            statId = util.clean(row.find('td[class]').text());
            if(statId !== "") {
                stat = charFunctions.findStat(char, util.clean(row.find('td[class]').text()));
                var cost = charFunctions.xpCost(stat);
            }
            col = row.find('td:has(span)');
            btn = row.find('td>span');
            table.removeText(col);
            if (!util.isUndefined(stat) && !util.isUndefined(cost) &&
                restrict.lookRestriction(stat) &&
                restrict.notEnoughPoints(charFunctions.getCharPoints(), cost)) {
                if (stat.level > 0) row.addClass(learnedClass);
                col.append(' '+cost);
                btn.addClass(arrowUpClass);
                btn.off('click');
                btn.on('click', function () {
                    r = $(this).parent().parent();
                    s = charFunctions.findStat(char, util.clean(r.find('td[class]').text()));
                    charFunctions.growStat(s);
                    sockets.update();
                });
            } else {
                btn.removeClass(arrowUpClass);
                btn.off('click');
            }
        });
    },
    /**
     * Función que carga un personaje seleccionado en el elemento especificado por parametro.
     * @param option Elemento que contiene el identificador del personaje seleccionado.
     */
    charSelectOptionClick: function (option) {
        var o = option, charName = o.text(), tmpChar, charList = game.charList, npcList = game.npcList;
        charList.forEach(function (ch) {
            if (util.isUndefined(tmpChar) &&
                charName === charFunctions.findData(ch, 'nombre').value)
                tmpChar = ch;
        });
        if (!util.isUndefined(tmpChar)) {
            char = tmpChar;
        } else {
            npcList.forEach(function (ch) {
                if (util.isUndefined(tmpChar) &&
                    charName === charFunctions.findData(ch, 'nombre').value)
                    tmpChar = ch;
            });
            if (!util.isUndefined(tmpChar)) char = tmpChar;
        }
        overlay.gameWindow(char);
    },
    /**
     * Función que abre un panel desplegable.
     * @param id Identificador del panel
     * @param own Objeto del botón que ha lanzado la función
     */
    openPanel: function(id, own) {
        overlay.show(id);
        if(!util.isUndefined(own)) {
            own.removeClass('glyphicon-plus opener');
            own.addClass('glyphicon-minus closer');
        }
    },
    /**
     * Función que cierra un panel desplegable
     * @param id Identificador del panel
     * @param own Objeto del botón que ha lanzado la función
     */
    closePanel: function(id, own) {
        overlay.hide(id);
        if(!util.isUndefined(own)) {
            own.removeClass('glyphicon-minus closer');
            own.addClass('glyphicon-plus opener');
        }
    },
    /**
     * Define el botón de apertura/cierre de un panel desplegable
     * @param panelId Identificador del panel desplegable
     */
    setPanelButton: function(panelId) {
        $('#'+panelId+'>.panel-heading>span.glyphicon').click(function() {
            var cls = $(this).attr('class'), mode,
                panel = $('#'+panelId+' .panel-body'), own = $(this);
            if(cls.indexOf('opener') > 0) {
                mode = 'openPanel';
            } else if(cls.indexOf('closer') > 0) {
                mode = 'closePanel';
            }
            if(!util.isUndefined(mode))
                button[mode](panel, own);
        });
    },
    /**
     * Función destinada a llamarse al hacer clic en uno de los iconos de nivel de la ficha del personaje.
     * @param id String identificador del elemento padre del icpno (correspondiente a la estadistica a la que pertenece)
     * @param cls Clase del icono: set, unset o max
     */
    statButtonClick: function(id, cls) {
        if (cls === table.icons.unset.class)
            mode = true;
        else if (cls === table.icons.set.class)
            mode = false;

        var stat = charFunctions.findStat(char, id),
            parent = charFunctions.findParent(char, id);

        if(restrict.notUpdatable(stat) && restrict.lookRestriction(stat)) {
            if(mode && parent.initPoints > 0 && restrict.maxLevelRestriction(stat)) {
                    parent.initPoints--;
                    table.modStat(stat, mode);
                    table.updateInitPoints(parent);
            } else if(!mode && parent.initPoints >= 0 && restrict.levelZeroRestriction(stat)) {
                if(!char.ready) {
                    parent.initPoints++;
                    table.modStat(stat, mode);
                    table.updateInitPoints(parent);
                }
            }
            table.updateOther();
            sockets.update();
        }
    }
};