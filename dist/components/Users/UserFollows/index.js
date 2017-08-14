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

var _UserBar = require('../UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _NotFound = require('../../NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _RightTabs = require('./RightTabs');

var _RightTabs2 = _interopRequireDefault(_RightTabs);

var _LeftNav = require('./LeftNav');

var _LeftNav2 = _interopRequireDefault(_LeftNav);

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _plugins = require('../../../plugins');

var _actions = require('../../../actions');

var _stores = require('../../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createReactClass2.default)({

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
  onChange: function (res) {
    if (res.msg && res.msg !== 'LOGOUT_SUCCESS' || !res.msg) {
      this.setState(this.getStatesFromStores());
    }
  },
  componentDidMount: function () {},
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
    const { pathname: pathname, query: query } = this.props.location;
    const { currentUser: currentUser, user: user, isCurrentUser: isCurrentUser } = this.state;

    if (!currentUser) {
      return _react2.default.createElement(
        'div',
        { className: 'user-follows' },
        _react2.default.createElement(_NotFound2.default, null)
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'user-follows' },
      _react2.default.createElement(_UserBar2.default, { path: pathname, user: user, isCurrentUser: isCurrentUser, currentUser: currentUser }),
      isCurrentUser ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'follows-left' },
          _react2.default.createElement(_LeftNav2.default, { currentUser: currentUser, user: user, isCurrentUser: isCurrentUser, query: query, pathname: pathname }),
          _react2.default.createElement(_Suggestions2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'follows-right' },
          _react2.default.createElement(_RightTabs2.default, { currentUser: currentUser, user: user, isCurrentUser: isCurrentUser, query: query, pathname: pathname })
        )
      ) : _react2.default.createElement(
        'div',
        { className: 'follows-center' },
        _react2.default.createElement(_RightTabs2.default, { currentUser: currentUser, user: user, isCurrentUser: isCurrentUser, query: query, pathname: pathname })
      )
    );
  }
});
module.exports = exports['default'];
