'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _env = require('../utils/env');

var _env2 = _interopRequireDefault(_env);

var _mode = require('../utils/mode');

var _mode2 = _interopRequireDefault(_mode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import sessionStorage from '../utilsssionStorage';
// import { MetadataStore, AuthStore } from '../stores';
// import {getInstancePath} from '../utils/historyUtils';

// const {isSecure} = Mode;
// const home = getInstancePath(isSecure ? '/login' : '/');

function interceptFetchrMethod(actionContext, methodName) {
  var method = actionContext.service[methodName];

  actionContext.service[methodName] = function () {

    // parse arguments
    const resource = arguments[0];
    const params = arguments[1];

    console.log(arguments);
    // let _args = [resource, params];
    // let body, clientConfig, callback;
    // if (['create', 'update'].includes(methodName)) {
    //   body = arguments[2];
    //   clientConfig = arguments[3];
    //   callback = arguments[4];
    //   _args.push(body);
    // }
    // else if(['read', 'delete'].includes(methodName)) {
    //   clientConfig = arguments[2];
    //   callback = arguments[3];
    // }
    // _args.push(clientConfig);

    // // intercept on client before sending to server
    // if (env.CLIENT) {
    //   params.clientWindowSessionid = window.sessionid;
    // }

    // // intercept on client before action callback
    // const cb = (err, res) => {
    //   let isLogout = (res && res.msg === 'LOGOUT_SUCCCESS');
    //   let isUnAuthorizedAPIAccess = _.get(err, 'body.msg') === 'UNAUTHORIZED_API_ACCESS';
    //   if (isLogout || isUnAuthorizedAPIAccess) {
    //     if (env.CLIENT) {
    //       window.authenticated = false;
    //       window.sessionid = isLogout ? res.sessionid : _.get(err, 'body.sessionid');
    //     } 
    //     sessionStorage.clearAllForLogin();
    //     actionContext.getStore(MetadataStore).clearStore();
    //     actionContext.getStore(AuthStore).clearSessionExpired();
    //     env.CLIENT ? (window.location.href = getInstancePath('/')) : actionContext.history.push(home);
    //   } else {
    //     if (callback && _.isFunction(callback)) {
    //       callback(err, res);
    //     }
    //   }
    // };
    // _args.push(cb);

    // method.apply(this, _args);
  };
}

module.exports = {
  name: 'CustomFetchrPlugin',

  plugContext: function (options) {
    return {
      plugActionContext: function (actionContext) {
        interceptFetchrMethod(actionContext, 'read');
        interceptFetchrMethod(actionContext, 'create');
        interceptFetchrMethod(actionContext, 'update');
        interceptFetchrMethod(actionContext, 'delete');
      }
    };
  }
};
