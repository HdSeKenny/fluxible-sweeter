'use strict';

/**
 * Created by hshen on 6/7/2015.
 */
var Cookie = require('../utils/cookie');

module.exports = {
    name: 'CookiePlugin',

    plugContext: function plugContext(options) {
        return {
            plugActionContext: function plugActionContext(actionContext) {
                actionContext.cookie = new Cookie({
                    req: options.req,
                    res: options.res
                });
            }
        };
    }
};