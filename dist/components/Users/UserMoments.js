'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _UserControls = require('../UserControls');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserHome = (0, _createReactClass2.default)({

  displayName: 'UserHome',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    params: _propTypes2.default.object,
    location: _propTypes2.default.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore],
    fetchData: function fetchData(context, params, query, done) {
      _promise2.default.all([context.executeAction(_actions.UserActions.LoadUsers, params), context.executeAction(_actions.BlogActions.LoadBlogs, params)]).then(function () {
        done();
      });
    }
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
    var displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    return {
      currentUser: currentUser,
      user: user,
      displayBlogs: displayBlogs,
      selectedPin: {},
      showPinModal: false
    };
  },
  onChange: function onChange(res) {
    var successMessages = ['CREATE_BLOG_SUCCESS', 'COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS', 'THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS', 'BLOG_CHANGE_IMAGE_SUCCESS'];
    var username = this.props.params.username;

    var blogStore = this.getStore(_stores.BlogStore);
    var userStore = this.getStore(_stores.UserStore);
    var currentUser = userStore.getCurrentUser();
    var user = userStore.getUserByUsername(username);
    var result = { user: user, currentUser: currentUser };

    if (successMessages.includes(res.msg)) {
      result.displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
      if (res.msg !== 'BLOG_CHANGE_IMAGE_SUCCESS') {
        _UI.Swal.success(res.msg);
      }
    }

    if (res.msg && res.msg !== 'LOGOUT_SUCCESS') {
      this.setState(result);
    }
  },
  onViewPinItem: function onViewPinItem(id) {
    var _this = this;

    var displayBlogs = this.state.displayBlogs;

    var selectedPin = displayBlogs.find(function (b) {
      return b.id_str === id;
    });
    this.setState({ selectedPin: selectedPin, showPinModal: true });

    $('#pinModal').on('hidden.bs.modal', function () {
      if (_this.hidePinModal) {
        _this.hidePinModal();
      }
    });

    _UI.ModalsFactory.show('pinModal');
  },
  hidePinModal: function hidePinModal() {
    var userHomeDom = $('.user-home');
    if (userHomeDom && userHomeDom.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  },
  render: function render() {
    var _this2 = this;

    var _state = this.state,
        currentUser = _state.currentUser,
        selectedPin = _state.selectedPin,
        displayBlogs = _state.displayBlogs,
        showPinModal = _state.showPinModal,
        user = _state.user;
    var searchText = this.props.searchText;

    var trimedSearchText = searchText ? searchText.trim() : '';
    var sortedBlogs = _utils.jsUtils.sortByDate(displayBlogs);
    var searchedBlogs = _utils.jsUtils.searchFromArray(sortedBlogs, searchText);
    var finalDisplayBlogs = searchedBlogs.length || trimedSearchText ? searchedBlogs : sortedBlogs;
    var isCurrentUser = currentUser && user ? currentUser.id_str === user.id_str : false;
    return _react2.default.createElement(
      'div',
      { className: 'user-moments' },
      _react2.default.createElement(
        'div',
        { className: 'user-blogs' },
        isCurrentUser && _react2.default.createElement(_UserControls.BlogModal, { currentUser: currentUser, isUserHome: true }),
        finalDisplayBlogs.length ? _react2.default.createElement(
          'div',
          { className: '' },
          finalDisplayBlogs.map(function (blog, index) {
            return _react2.default.createElement(_UI.PinItem, { key: index, onSelect: function onSelect(id) {
                return _this2.onViewPinItem(id);
              }, pin: blog, currentUser: currentUser });
          })
        ) : _react2.default.createElement(
          'div',
          { className: isCurrentUser ? 'no-moments' : 'no-moments not-current' },
          _react2.default.createElement(
            'h4',
            null,
            isCurrentUser ? 'You don\'t have any sweets, write a sweet here!' : 'He doesn\'t have any sweets!'
          )
        )
      ),
      _react2.default.createElement(
        _UI.Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'pinModal',
          pin: selectedPin,
          ModalComponent: _UserControls.PinItemModal,
          showHeaderAndFooter: false,
          showModal: showPinModal,
          currentUser: currentUser })
      )
    );
  }
});

exports.default = UserHome;
module.exports = exports['default'];