'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _stores = require('../../stores');

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserMore = _react2.default.createClass({

  displayName: 'UserMore',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    params: _react2.default.PropTypes.object,
    location: _react2.default.PropTypes.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const store = this.getStore(_stores.UserStore);
    const { username: username } = this.props.params;
    return {
      currentUser: store.getCurrentUser(),
      user: store.getUserByUsername(username),
      isCurrentUser: store.isCurrentUser(username),
      loaded: false
    };
  },
  onChange: function () {
    this.setState(this.getStatesFromStores());
  },
  render: function () {
    const { pathname: pathname } = this.props.location;
    const { currentUser: currentUser, user: user, isCurrentUser: isCurrentUser } = this.state;
    return _react2.default.createElement(
      'div',
      { className: 'user-more' },
      _react2.default.createElement(_UserBar2.default, { path: pathname, user: user, isCurrentUser: isCurrentUser, currentUser: currentUser }),
      _react2.default.createElement(
        'div',
        { className: 'more-content' },
        _react2.default.createElement(
          'div',
          { className: 'well' },
          _react2.default.createElement(
            'center',
            null,
            _react2.default.createElement(
              'h2',
              null,
              'More - Not Finished !'
            )
          )
        )
      )
    );
  }
});

exports.default = UserMore;
module.exports = exports['default'];
