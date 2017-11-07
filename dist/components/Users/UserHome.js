'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _NotFound = require('../NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _Users = require('../Users');

var _stores = require('../../stores');

var _UserNavs = require('../UserNavs');

var _utils = require('../../utils');

var _UI = require('../UI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserHome = (0, _createReactClass2.default)({

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

  getInitialState: function getInitialState() {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function getStatesFromStores() {
    var username = this.props.params.username;

    var userStore = this.getStore(_stores.UserStore);
    var blogStore = this.getStore(_stores.BlogStore);
    var currentUser = userStore.getCurrentUser();
    var user = userStore.getUserByUsername(username);
    var isCurrentUser = userStore.isCurrentUser(username);
    var displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    var currentUserBlogs = blogStore.getCurrentUserBlogs(isCurrentUser, currentUser);
    return {
      currentUser: currentUser,
      user: user,
      displayBlogs: displayBlogs,
      currentUserBlogs: currentUserBlogs,
      searchedBlogs: []
    };
  },
  onChange: function onChange(res) {
    var username = this.props.params.username;

    var userStore = this.getStore(_stores.UserStore);
    var blogStore = this.getStore(_stores.BlogStore);
    var currentUser = userStore.getCurrentUser();
    var user = userStore.getUserByUsername(username);
    var displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    var responseMessages = ['CREATE_BLOG_SUCCESS'];
    var result = {};

    if (responseMessages.includes(res.msg)) {
      _UI.Swal.success(res.msg, function () {
        result.displayBlogs = displayBlogs;
      });
    }

    if (res.msg && res.msg !== 'LOGOUT_SUCCESS' || !res.msg) {
      result.user = user;
      result.currentUser = currentUser;
    }

    if ((0, _keys2.default)(result).length) {
      this.setState(result);
    }
  },
  onSearchBlogs: function onSearchBlogs(searchText) {
    var pathname = this.props.location.pathname;
    var _state = this.state,
        currentUserBlogs = _state.currentUserBlogs,
        displayBlogs = _state.displayBlogs;

    var routes = _utils.jsUtils.splitUrlBySlash(pathname);
    var isMine = routes.includes('mine');
    var sourceBlogs = isMine ? _lodash2.default.cloneDeep(currentUserBlogs) : _lodash2.default.cloneDeep(displayBlogs);
    var searchedBlogs = _utils.jsUtils.searchFromArray(sourceBlogs, searchText);
    this.setState({ searchedBlogs: searchedBlogs, searchText: searchText });
  },
  render: function render() {
    var _state2 = this.state,
        currentUser = _state2.currentUser,
        user = _state2.user,
        displayBlogs = _state2.displayBlogs,
        searchedBlogs = _state2.searchedBlogs,
        currentUserBlogs = _state2.currentUserBlogs,
        searchText = _state2.searchText;
    var pathname = this.props.location.pathname;

    var isCurrentUser = currentUser && user ? currentUser.id_str === user.id_str : false;
    var trimedSearchText = searchText ? searchText.trim() : '';
    var displayMineBlogs = searchedBlogs.length || trimedSearchText ? searchedBlogs : currentUserBlogs;
    var searchBlogsData = (0, _assign2.default)({}, { displayMineBlogs: displayMineBlogs, searchText: searchText });
    var child = _react2.default.cloneElement(this.props.children, searchBlogsData);

    if (!user) {
      return _react2.default.createElement(
        'div',
        { className: 'user-home' },
        _react2.default.createElement(_NotFound2.default, null)
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'user-home' },
      _react2.default.createElement(_Users.UserBar, { path: pathname, user: user, currentUser: currentUser }),
      _react2.default.createElement(
        'div',
        { className: 'home-left' },
        _react2.default.createElement(_UserNavs.UserHomeNav, { path: pathname, user: user, currentUser: currentUser, displayBlogs: displayBlogs })
      ),
      _react2.default.createElement(
        'div',
        { className: 'home-right' },
        _react2.default.createElement(_UserNavs.HomeRightNav, {
          path: pathname,
          user: user,
          currentUser: currentUser,
          isCurrentUser: isCurrentUser,
          onSearchBlogs: this.onSearchBlogs }),
        _react2.default.createElement(
          'div',
          { className: 'right-pages' },
          child
        )
      )
    );
  }
});

exports.default = UserHome;
module.exports = exports['default'];