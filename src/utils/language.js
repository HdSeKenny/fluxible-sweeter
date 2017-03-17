var env = require('./env');
var _ = require('lodash');
var supportLocales = ['en-US'];

function Language(options) {
    options = options || {};
    this._req = options.req;
    if (env.SERVER && !this._req) {
        throw new Error('Express `req` is a required option');
    }
}

Language.prototype.getLang = function () {
    var lang;
    if (env.SERVER) {
        lang = this._req.headers['accept-language'];
        if (lang && lang.indexOf(',') > -1) {
            lang = lang.split(',')[0];
        }
        return this.filterLang(lang);
    }
    lang = navigator.language || navigator.browserlanguage;
    return this.filterLang(lang);
};

Language.prototype.filterLang = function (lang) {
    if (_.indexOf(supportLocales, lang) > -1) {
        return lang;
    }
    return supportLocales[0];
}

module.exports = Language;
