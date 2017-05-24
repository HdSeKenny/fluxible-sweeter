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

var _Users = require('../Users');

var _stores = require('../../stores');

var _UserNavs = require('../UserNavs');

var _UI = require('../UI');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserHome = (0, _createReactClass2.default)({

  displayName: 'UserHome',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    params: _propTypes2.default.object,
    location: _propTypes2.default.object,
    children: _propTypes2.default.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { username: username } = this.props.params;
    const userStore = this.getStore(_stores.UserStore);
    const blogStore = this.getStore(_stores.BlogStore);
    const currentUser = userStore.getCurrentUser();
    const user = userStore.getUserByUsername(username);
    const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    return {
      currentUser: currentUser,
      user: user,
      displayBlogs: displayBlogs
    };
  },
  onChange: function (res) {
    const { username: username } = this.props.params;
    const userStore = this.getStore(_stores.UserStore);
    const blogStore = this.getStore(_stores.BlogStore);
    const currentUser = userStore.getCurrentUser();
    const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    const responseMessages = ['CREATE_BLOG_SUCCESS'];
    if (responseMessages.includes(res.msg)) {
      if (res.msg === 'CREATE_BLOG_SUCCESS') {
        _utils.sweetAlert.success(res.msg, () => {
          _UI.ModalsFactory.hide('createBlogModal');
        });
      }

      this.setState({ displayBlogs: displayBlogs });
    }
  },
  render: function () {
    const { currentUser: currentUser, user: user, displayBlogs: displayBlogs } = this.state;
    const { pathname: pathname } = this.props.location;
    const isCurrentUser = currentUser ? currentUser.id_str === user.id_str : false;
    return _react2.default.createElement(
      'div',
      { className: 'user-home' },
      _react2.default.createElement(_Users.UserBar, { path: pathname, user: user, currentUser: currentUser }),
      _react2.default.createElement(
        'div',
        { className: 'home-content' },
        _react2.default.createElement(
          'div',
          { className: 'home-left' },
          _react2.default.createElement(_UserNavs.UserHomeNav, { path: pathname, user: user, currentUser: currentUser, displayBlogs: displayBlogs })
        ),
        _react2.default.createElement(
          'div',
          { className: 'home-right' },
          _react2.default.createElement(_UserNavs.HomeRightNav, { path: pathname, user: user, currentUser: currentUser, isCurrentUser: isCurrentUser }),
          _react2.default.createElement(
            'div',
            { className: 'right-pages' },
            this.props.children
          )
        )
      )
    );
  }
});

exports.default = UserHome;
module.exports = exports['default'];
