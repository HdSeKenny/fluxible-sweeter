'use strict';

/* eslint-disable all, no-param-reassign */
module.exports = {
  name: 'ConfigPlugin',

  plugContext: function (options) {
    let config = options.config;
    return {
      plugActionContext: function (actionContext) {
        actionContext.config = config;
      },
      plugComponentContext: function (componentContext) {
        componentContext.config = config;
      },
      plugStoreContext: function (storeContext) {
        storeContext.config = config;
      },
      dehydrate: function () {
        return {
          config: config
        };
      },
      rehydrate: function (state) {
        config = state.config;
      }
    };
  }
};
