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

var _UI = require('../UI');

var _UserControls = require('../UserControls');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserHome = (0, _createReactClass2.default)({

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
      displayBlogs: displayBlogs,
      selectedPin: {},
      showPinModal: false
    };
  },
  onChange: function (res) {
    const successMessages = ['CREATE_BLOG_SUCCESS', 'COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS', 'THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS', 'BLOG_CHANGE_IMAGE_SUCCESS'];

    if (successMessages.includes(res.msg)) {
      const { username: username } = this.props.params;
      const blogStore = this.getStore(_stores.BlogStore);
      const currentUser = this.getStore(_stores.UserStore).getCurrentUser();
      const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
      if (res.msg !== 'BLOG_CHANGE_IMAGE_SUCCESS') {
        _utils.sweetAlert.success(res.msg, () => {
          if (res.msg === 'CREATE_BLOG_SUCCESS') {
            _UI.ModalsFactory.hide('createBlogModal');
          }
        });
      }

      this.setState({ displayBlogs: displayBlogs });
    }
  },
  onViewPinItem: function (id) {
    const { displayBlogs: displayBlogs } = this.state;
    const selectedPin = displayBlogs.find(b => b.id_str === id);
    this.setState({ selectedPin: selectedPin, showPinModal: true });

    $('#pinModal').on('hidden.bs.modal', () => {
      if (this.hidePinModal) {
        this.hidePinModal();
      }
    });

    _UI.ModalsFactory.show('pinModal');
  },
  hidePinModal: function () {
    const userHomeDom = $('.user-home');
    if (userHomeDom && userHomeDom.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  },
  render: function () {
    const { currentUser: currentUser, selectedPin: selectedPin, displayBlogs: displayBlogs, showPinModal: showPinModal } = this.state;
    const { searchText: searchText } = this.props;
    const trimedSearchText = searchText ? searchText.trim() : '';
    const sortedBlogs = _utils.jsUtils.sortByDate(displayBlogs);
    const searchedBlogs = _utils.jsUtils.searchFromArray(sortedBlogs, searchText);
    const finalDisplayBlogs = searchedBlogs.length || trimedSearchText ? searchedBlogs : sortedBlogs;
    return _react2.default.createElement(
      'div',
      { className: 'user-moments' },
      _react2.default.createElement(
        'div',
        { className: 'user-blogs' },
        finalDisplayBlogs.map((blog, index) => _react2.default.createElement(_UI.PinItem, { key: index, onSelect: id => this.onViewPinItem(id), pin: blog, currentUser: currentUser }))
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
