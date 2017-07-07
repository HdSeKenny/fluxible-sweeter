/* eslint-disable all, no-param-reassign*/
const Language = require('../utils/language');

module.exports = {

  name: 'LanguagePlugin',

  plugContext(options) {
    return {
      plugActionContext(actionContext) {
        actionContext.language = new Language({
          req: options.req,
          res: options.res
        });
      }
    };
  }
};
