'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _language = require('../utils/language');

var _language2 = _interopRequireDefault(_language);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * language service API
 */
var language = {
    name: 'language',
    read: function read(req, resource, params, config, callback) {
        var helper = new _language2.default({ req: req });
        var langName = params.lang || helper.getLang();
        var langPath = '../locales/' + langName + '.json';
        var languages = require(_path2.default.join(__dirname, langPath));
        callback(null, languages);
    }
};

exports.default = language;
module.exports = exports['default'];