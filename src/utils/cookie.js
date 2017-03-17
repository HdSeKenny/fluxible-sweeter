/**
 * Created by hshen on 6/7/2015.
 */
var env = require('./env');
var _=require('lodash');

function Cookie(options) {
    options = options || {};

    this._req = options.req;
    if (env.SERVER && !this._req) {
        throw new Error('Express `req` is a required option');
    }

    this._res = options.res;
    if (env.SERVER && !this._res) {
        throw new Error('Express `res` is a required option');
    }
}

Cookie.prototype.get = function(name) {
    if (env.SERVER) {
        return this._req.cookies[name];
    }
    var pairs = document.cookie.split(';');
    var cookieValue=null;
    _.each(pairs, function (p) {
        var key = p.replace(/[\s\n]/g, '').split('=');
        if (key.length == 2 || key[0] == name) {
            cookieValue=key[1];
        }
    });
    return cookieValue;
};



Cookie.prototype.set = function(name, value) {
    if (env.SERVER) {
        return this._res.cookie(name, value);
    }
    document.cookie = name + '=' + value;
};

Cookie.prototype.clear = function(name) {
    if (env.SERVER) {
        return this._res.clearCookie(name);
    }
    var expDate = new Date(1970, 0, 1).toGMTString();
    document.cookie = [
        name + '=',
        'expires=' + expDate
    ].join(';') + ';';
};

module.exports = Cookie;
