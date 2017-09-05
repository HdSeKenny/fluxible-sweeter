/* eslint-disable all, no-param-reassign */
module.exports = {
  name: 'ConfigPlugin',

  plugContext(options) {
    let config = options.config;
    return {
      plugActionContext(actionContext) {
        actionContext.config = config;
      },
      plugComponentContext(componentContext) {
        componentContext.config = config;
      },
      plugStoreContext(storeContext) {
        storeContext.config = config;
      },
      dehydrate() {
        return {
          config
        };
      },
      rehydrate(state) {
        config = state.config;
      }
    };
  }
};