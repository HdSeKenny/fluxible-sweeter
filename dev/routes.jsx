'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _mode = require('./utils/mode');

var _mode2 = _interopRequireDefault(_mode);

var _env = require('./utils/env');

var _env2 = _interopRequireDefault(_env);

var _actions = require('./actions');

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = _configs2.default.path_prefix === '' ? '/' : _configs2.default.path_prefix;
const { isPublic: isPublic } = _mode2.default;

const createRoutes = context => {
  const requireLogin = (nextState, replace, cb) => {
    // do nothing for public visists
    if (isPublic) {
      cb();
      return;
    }

    // only load session to store on server side for isNotPublic visits
    if (_env2.default.SERVER) {
      context.executeAction(_actions.UserActions.LoadKennyUser).then(() => {
        cb();
      });

      context.executeAction(_actions.UserActions.LoadSessionUser).then(() => {
        cb();
      });
    } else {
      cb();
    }
  };

  return _react2.default.createElement(
    _reactRouter.Route,
    { history: _reactRouter.History, component: _components.App, path: path, onEnter: requireLogin },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.Home }),
    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _components.Home }),
    _react2.default.createElement(_reactRouter.Route, { path: 'login', component: _components.Login }),
    _react2.default.createElement(_reactRouter.Route, { path: 'register', component: _components.Register }),
    _react2.default.createElement(_reactRouter.Route, { path: 'list', component: _components.List }),
    _react2.default.createElement(_reactRouter.Route, { path: 'blog-details/:blogId', component: _components.BlogsDetails }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user-home/:userId/home', component: _components.UserHome }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user-blogs/:userId/list', component: _components.UserBlogs }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user-blogs/:userId/add', component: _components.AddBlog }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user-settings/:userId/info', component: _components.UserInfo }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user-settings/:userId/change-password', component: _components.ChangePassword }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user-more/:userId', component: _components.UserMore }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user-messages/:userId', component: _components.UserMessages }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user-follows/:userId', component: _components.UserFollows }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _components.NotFound })
  );
};

module.exports = createRoutes;
