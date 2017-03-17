import configs from '../configs';
import request from 'superagent';
import fs from 'fs';
import path from 'path';
import LanguageHelper from '../utils/language';

/**
 * language service API
 */
const language = {
    name: 'language',
    read: function (req, resource, params, config, callback) {
        var helper = new LanguageHelper({req: req});
        var langName = params.lang || helper.getLang();
        var langPath = '../locales/' + langName + '.json';
        var languages = require(path.join(__dirname, langPath));
        callback(null, languages);
    }
};

export default language;
