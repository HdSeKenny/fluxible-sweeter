/**
 * Created by hshen on 6/7/2015.
 */
var Language = require('../utils/language');

module.exports = {

    name: 'LanguagePlugin',

    plugContext: function(options) {
        return {
            plugActionContext: function(actionContext) {
                actionContext.language = new Language({
                    req: options.req,
                    res: options.res
                });
            }
        };
    }
};
