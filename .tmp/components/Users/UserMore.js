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

var _stores = require('../../stores');

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserMore = (0, _createReactClass2.default)({

  displayName: 'UserMore',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    params: _propTypes2.default.object,
    location: _propTypes2.default.object
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
