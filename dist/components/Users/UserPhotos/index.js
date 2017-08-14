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

var _plugins = require('../../../plugins');

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

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { username: username } = this.props.params;
    const userStore = this.getStore(_stores.UserStore);
    const user = userStore.getUserByUsername(username);
    const currentUser = userStore.getCurrentUser();
    const isCurrentUser = userStore.isCurrentUser();

    return {
      currentUser: currentUser,
      user: user,
      isCurrentUser: isCurrentUser
    };
  },
  onChange: function () {},
  render: function () {
    const { isCurrentUser: isCurrentUser, user: user, currentUser: currentUser } = this.state;
    const { pathname: pathname } = this.props.location;
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
