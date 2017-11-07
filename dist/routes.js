'use strict';

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _mode = require('./configs/mode');

var _mode2 = _interopRequireDefault(_mode);

var _env = require('./utils/env');

var _env2 = _interopRequireDefault(_env);

var _actions = require('./actions');

var _Users = require('./components/Users');

var _components = require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = _configs2.default.path_prefix === '' ? '/' : _configs2.default.path_prefix;

var createRoutes = function createRoutes(context) {
  var requireLogin = function requireLogin(nextState, replace, cb) {
    // do nothing for public visists
    if (_mode2.default.isPublic) {
      return cb();
    }

    // only load session to store on server side for isNotPublic visits
    if (_env2.default.is_server) {
      context.executeAction(_actions.UserActions.LoadKennyUser).then(function () {
        return cb();
      });
      context.executeAction(_actions.UserActions.LoadSessionUser).then(function () {
        return cb();
      });
    } else {
      cb();
    }
  };

  var onRouterChange = function onRouterChange(routes, state, nextState, callback) {
    $('.loading').removeClass('hide');
    (0, _setImmediate3.default)(function () {
      callback();
    });
  };

  return _react2.default.createElement(
    _reactRouter.Route,
    { history: _reactRouter.History, component: _components.App, path: path, onEnter: requireLogin, onChange: onRouterChange },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.Home }),
    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _components.Home }),
    _react2.default.createElement(_reactRouter.Route, { path: 'signup', component: _components.Signup }),
    _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _components.About }),
    _react2.default.createElement(_reactRouter.Route, { path: ':blogId/details', component: _components.Details }),
    _react2.default.createElement(
      _reactRouter.Route,
      { path: ':username', component: _components.UserHome },
      _react2.default.createElement(_reactRouter.IndexRoute, { component: _components.UserMoments }),
      _react2.default.createElement(_reactRouter.Route, { path: 'mine', component: _components.UserBlogs }),
      _react2.default.createElement(_reactRouter.Route, { path: 'create', component: _components.AddBlog })
    ),
    _react2.default.createElement(_reactRouter.Route, { path: ':username/Personal', component: _components.UserInfo }),
    _react2.default.createElement(_reactRouter.Route, { path: ':username/changepassword', component: _components.ChangePassword }),
    _react2.default.createElement(_reactRouter.Route, { path: ':username/more', component: _components.UserMore }),
    _react2.default.createElement(_reactRouter.Route, { path: ':username/messages', component: _components.UserMessages }),
    _react2.default.createElement(_reactRouter.Route, { path: ':username/follows', component: _Users.UserFollows }),
    _react2.default.createElement(_reactRouter.Route, { path: ':username/photos', component: _Users.UserPhotos }),
    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _components.NotFound })
  );
};

module.exports = createRoutes;