'use strict';

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

  plugContext: function plugContext(options) {
    var authenticated = options.authenticated;
    var clearSessionStore = options.clearSessionStore;
    return {
      plugActionContext: function plugActionContext(actionContext) {
        actionContext.authenticated = authenticated;
        actionContext.clearSessionStore = clearSessionStore;
      },
      plugComponentContext: function plugComponentContext(componentContext) {
        componentContext.authenticated = authenticated;
        componentContext.clearSessionStore = clearSessionStore;
      },
      plugStoreContext: function plugStoreContext(storeContext) {
        storeContext.authenticated = authenticated;
        storeContext.clearSessionStore = clearSessionStore;
      },
      dehydrate: function dehydrate() {
        return {
          authenticated: authenticated,
          clearSessionStore: clearSessionStore
        };
      },
      rehydrate: function rehydrate(state) {
        authenticated = state.authenticated;
        clearSessionStore = state.clearSessionStore;
      }
    };
  }
};