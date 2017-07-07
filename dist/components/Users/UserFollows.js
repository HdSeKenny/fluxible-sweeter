'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _plugins = require('../../plugins');

var _UI = require('../UI');

var _actions = require('../../actions');

var _stores = require('../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserFollows = (0, _createReactClass2.default)({

  displayName: 'UserFollows',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    location: _propTypes2.default.object,
    params: _propTypes2.default.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { username: username } = this.props.params;
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(_stores.UserStore).isCurrentUser(username)
    };
  },
  onChange: function () {
    this.setState(this.getStatesFromStores());
  },
  onFollowThisUser: function (followUser) {
    const { currentUser: currentUser, user: user } = this.state;
    if (!currentUser) {
      return _plugins.swal.error('Login first please!');
    }

    const followObj = {
      userId: user._id,
      type: followUser.type,
      thisUserId: followUser.user._id,
      currentUserId: currentUser._id
    };

    this.executeAction(_actions.UserActions.FollowThisUserWithFollow, followObj);
  },
  onCancelFollowThisUser: function (followUser) {
    const { currentUser: currentUser, user: user } = this.state;
    if (!currentUser) {
      return _plugins.swal.error('Login first please!');
    }

    const cancelFollowObj = {
      userId: user._id,
      type: followUser.type,
      thisUserId: followUser.user._id,
      currentUserId: currentUser._id
    };

    this.executeAction(_actions.UserActions.CancelFollowThisUserWithFollow, cancelFollowObj);
  },
  render: function () {
    const { pathname: pathname } = this.props.location;
    const { currentUser: currentUser, user: user, isCurrentUser: isCurrentUser } = this.state;
    return _react2.default.createElement(
      'div',
      { className: 'user-follows' },
      _react2.default.createElement(_UserBar2.default, { path: pathname, user: user, isCurrentUser: isCurrentUser, currentUser: currentUser }),
      _react2.default.createElement(
        'div',
        { className: 'follows-content' },
        _react2.default.createElement(
          'div',
          { className: 'well follows-bg' },
          _react2.default.createElement(_UI.UserFollowsTabs, {
            user: user,
            currentUser: currentUser,
            onFollowThisUser: this.onFollowThisUser,
            onCancelFollowThisUser: this.onCancelFollowThisUser
          })
        )
      )
    );
  }
});

exports.default = UserFollows;
module.exports = exports['default'];
