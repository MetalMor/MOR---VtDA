/**
 * Propiedades de las cabeceras HTTP predefinidas.
 * Created by becari on 30/06/2016.
 */
var util = require('./util');

var http = {
    list: [
        {
            nm: 'X-Frame-Options',
            val: 'DENY'
        },{
            nm: 'X-XSS-Protection',
            val: '1'
        },{
            nm: 'X-Content-Type-Options',
            val: 'nosniff'
        },{
            nm: 'X-Clacks-Overhead',
            val: 'GNU Terry Pratchet'
        }
    ],
    contentType: function(res, type) {
        res.setHeader('Content-Type', type);
    },
    addHeaders: function (req, res, next) {
        var list = http.list, h, cur;
        for (h in list) {
            cur = list[h];
            res.setHeader(cur.nm, cur.val);
        }
        next();
    }
};

module.exports = http;