'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _stores = require('../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSettingsNav = _react2.default.createClass({

  displayName: 'UserSettingsNav',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    path: _react2.default.PropTypes.object,
    isCurrentUser: _react2.default.PropTypes.bool,
    user: _react2.default.PropTypes.object,
    displayBlogs: _react2.default.PropTypes.array,
    currentUser: _react2.default.PropTypes.object
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
