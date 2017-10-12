'use strict';

/* eslint-disable all, no-param-reassign*/
var Language = require('../utils/language');

module.exports = {

  name: 'LanguagePlugin',

  plugContext: function plugContext(options) {
    return {
      plugActionContext: function plugActionContext(actionContext) {
        actionContext.language = new Language({
          req: options.req,
          res: options.res
        });
      }
    };
  }
};