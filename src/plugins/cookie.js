/**
 * Created by hshen on 6/7/2015.
 */
var Cookie = require('../utils/cookie');

module.exports = {
    name: 'CookiePlugin',

    plugContext: function(options) {
        return {
            plugActionContext: function(actionContext) {
                actionContext.cookie = new Cookie({
                    req: options.req,
                    res: options.res
                });
            }
        };
    }
};
