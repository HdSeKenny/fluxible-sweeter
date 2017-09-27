'use strict';

/* eslint-disable all, no-param-reassign */
module.exports = {
  name: 'ConfigPlugin',

  plugContext: function plugContext(options) {
    var config = options.config;
    return {
      plugActionContext: function plugActionContext(actionContext) {
        actionContext.config = config;
      },
      plugComponentContext: function plugComponentContext(componentContext) {
        componentContext.config = config;
      },
      plugStoreContext: function plugStoreContext(storeContext) {
        storeContext.config = config;
      },
      dehydrate: function dehydrate() {
        return {
          config: config
        };
      },
      rehydrate: function rehydrate(state) {
        config = state.config;
      }
    };
  }
};