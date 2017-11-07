'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _utils = require('../../../utils');

var _UI = require('../../UI');

var _actions = require('../../../actions');

var _stores = require('../../../stores');

var _Layout = require('../../UI/Layout');

var _UserBar = require('../UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createReactClass2.default)({

  displayName: 'UserPhotos',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    params: _propTypes2.default.object,
    location: _propTypes2.default.object
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function getInitialState() {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function getStatesFromStores() {
    var username = this.props.params.username;

    var userStore = this.getStore(_stores.UserStore);
    var user = userStore.getUserByUsername(username);
    var currentUser = userStore.getCurrentUser();
    var isCurrentUser = userStore.isCurrentUser();

    return {
      currentUser: currentUser,
      user: user,
      isCurrentUser: isCurrentUser
    };
  },
  onChange: function onChange() {},
  render: function render() {
    var _state = this.state,
        isCurrentUser = _state.isCurrentUser,
        user = _state.user,
        currentUser = _state.currentUser;
    var pathname = this.props.location.pathname;

    return _react2.default.createElement(
      'div',
      { className: 'user-photos' },
      _react2.default.createElement(_UserBar2.default, { path: pathname, user: user, isCurrentUser: isCurrentUser, currentUser: currentUser }),
      _react2.default.createElement(
        'center',
        null,
        _react2.default.createElement(
          'h1',
          null,
          ' User Photos Page...'
        )
      )
    );
  }
});
module.exports = exports['default'];