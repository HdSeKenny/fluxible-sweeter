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

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _stores = require('../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSettingsNav = (0, _createReactClass2.default)({

  displayName: 'UserSettingsNav',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    path: _propTypes2.default.object,
    isCurrentUser: _propTypes2.default.bool,
    user: _propTypes2.default.object,
    displayBlogs: _propTypes2.default.array,
    currentUser: _propTypes2.default.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser()
    };
  },
  isActive: function (route) {
    return route === this.props.path ? 'active' : '';
  },
  onChange: function () {
    this.setState(this.getStateFromStores());
  },
  render: function () {
    const { currentUser: currentUser } = this.state;
    return _react2.default.createElement(
      'div',
      { className: 'well user-setting-nav' },
      _react2.default.createElement(
        'li',
        { className: this.isActive(`/user-settings/${currentUser.strId}/info`) },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-settings/${currentUser.strId}/info` },
          _react2.default.createElement('i', { className: 'fa fa-user' }),
          ' Personal Infomation'
        )
      ),
      _react2.default.createElement(
        'li',
        { className: this.isActive(`/user-settings/${currentUser.strId}/change-password`) },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-settings/${currentUser.strId}/change-password` },
          _react2.default.createElement('i', { className: 'fa fa-wrench' }),
          ' Change password'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '' },
          _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' })
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '' },
          _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' })
        )
      )
    );
  }
});

exports.default = UserSettingsNav;
module.exports = exports['default'];
