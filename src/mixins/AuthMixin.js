/**
 * Created by navy on 15/6/7.
 */
var AuthStore = require('../stores/AuthStore');
var config = require('../configs');

module.exports = {
    statics: {
        willTransitionTo: function (transition) {
            var isAuthenticated = transition.context
                .getActionContext().getStore(AuthStore).isAuthenticated();
            if (!isAuthenticated) {
                transition.redirect(`${config.path_prefix}/login?returnUrl=${transition.path}`);
            }
        }
    }
};
