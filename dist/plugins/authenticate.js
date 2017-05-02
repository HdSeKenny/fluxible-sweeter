'use strict';

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

  plugContext: function (options) {
    let authenticated = options.authenticated;
    let clearSessionStore = options.clearSessionStore;
    return {
      plugActionContext: function (actionContext) {
        actionContext.authenticated = authenticated;
        actionContext.clearSessionStore = clearSessionStore;
      },
      plugComponentContext: function (componentContext) {
        componentContext.authenticated = authenticated;
        componentContext.clearSessionStore = clearSessionStore;
      },
      plugStoreContext: function (storeContext) {
        storeContext.authenticated = authenticated;
        storeContext.clearSessionStore = clearSessionStore;
      },
      dehydrate: function () {
        return {
          authenticated: authenticated,
          clearSessionStore: clearSessionStore
        };
      },
      rehydrate: function (state) {
        authenticated = state.authenticated;
        clearSessionStore = state.clearSessionStore;
      }
    };
  }
};
