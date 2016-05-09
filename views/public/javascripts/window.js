/**
 * Script para controlar la paginación.
 * Created by mor on 09/05/2016.
 */
function openNav(selectorId) {
    $("#"+selectorId).css('width', '100%');
}
function closeNav(selectorId) {
    $("#"+selectorId).css('width', '0%');
}
$(document).ready(function () {
    openNav("sheet");
});