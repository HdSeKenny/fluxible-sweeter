/* eslint-disable all, no-param-reassign */
/**
 * Devices Plugin for fluxible
 * get the authenticated info from context.
 * Usage
 *
 * contextTypes: {
 *   authenticated: React.PropTypes.object.isRequired
 * }
 * @type {{name: string, plugContext: Function}}
 */

module.exports = {

  name: 'AuthenticatePlugin',

  plugContext(options) {
    let authenticated = options.authenticated;
    let clearSessionStore = options.clearSessionStore;
    return {
      plugActionContext(actionContext) {
        actionContext.authenticated = authenticated;
        actionContext.clearSessionStore = clearSessionStore;
      },
      plugComponentContext(componentContext) {
        componentContext.authenticated = authenticated;
        componentContext.clearSessionStore = clearSessionStore;
      },
      plugStoreContext(storeContext) {
        storeContext.authenticated = authenticated;
        storeContext.clearSessionStore = clearSessionStore;
      },
      dehydrate() {
        return {
          authenticated,
          clearSessionStore
        };
      },
      rehydrate(state) {
        authenticated = state.authenticated;
        clearSessionStore = state.clearSessionStore;
      }
    };
  }
};
