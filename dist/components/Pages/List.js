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

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _reactRouter = require('react-router');

var _utils = require('../../utils');

var _plugins = require('../../plugins');

var _stores = require('../../stores');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createReactClass2.default)({

  displayName: 'List',

  contextTypes: {
    executeAction: _propTypes2.default.func,
    getStore: _propTypes2.default.func
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  statics: {
    storeListeners: [_stores.BlogStore, _stores.UserStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      kenny: this.getStore(_stores.UserStore).getKennyUser(),
      blogs: this.context.getStore(_stores.BlogStore).getAllBlogs(),
      selectedPin: {},
      showPinModal: false
    };
  },
  onChange: function (res) {
    const thumbsAndCommentMsgs = ['COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS', 'THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS'];

    const blogsMsgs = ['DELETE_BLOG_SUCCESS', 'CREATE_BLOG_SUCCESS'];

    if (thumbsAndCommentMsgs.includes(res.msg)) {
      _plugins.swal.success(res.msg);
      this.setState({
        selectedPin: res.newBlog,
        blogs: this.context.getStore(_stores.BlogStore).getAllBlogs()
      });
    }

    if (blogsMsgs.includes(res.msg)) {
      _plugins.swal.success(res.msg, () => {
        this.setState({
          blogs: this.context.getStore(_stores.BlogStore).getAllBlogs()
        });
      });
    }

    if (['USER_LOGIN_SUCCESS', 'USER_REGISTER_SUCCESS'].includes(res.msg)) {
      const currentUser = this.context.getStore(_stores.UserStore).getCurrentUser();
      this.setState({
        currentUser: currentUser
      });
    }
  },
  onViewPinItem: function (id) {
    const { blogs: blogs } = this.state;
    const selectedPin = blogs.find(p => p.id_str === id);
    this.setState({ selectedPin: selectedPin, showPinModal: true });

    $('#pinModal').on('hidden.bs.modal', () => {
      if (this.hidePinModal) {
        this.hidePinModal();
      }
    });
    _UI.ModalsFactory.show('pinModal');
  },
  hidePinModal: function () {
    const listDom = $('.list-page');
    if (listDom && listDom.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  },
  _renderUserCardInfo: function (displayUser) {
    const { image_url: image_url, username: username, profession: profession, description: description } = displayUser;
    return _react2.default.createElement(
      'div',
      { className: '' },
      _react2.default.createElement(
        _Layout.Row,
        { className: 'card-header' },
        _react2.default.createElement(
          _Layout.Col,
          { size: '3' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: `/${username}` },
            _react2.default.createElement('img', { alt: 'user', src: image_url })
          )
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '8' },
          _react2.default.createElement(
            'h3',
            { className: 'm-0' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: `/${username}` },
              username
            )
          ),
          _react2.default.createElement(
            'h5',
            null,
            profession
          )
        )
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: 'card-body' },
        _react2.default.createElement(
          'p',
          null,
          description
        )
      )
    );
  },
  _renderUserCardFooter: function (displayUser) {
    const focusNumber = displayUser.focuses.length;
    const fansNumber = displayUser.fans.length;
    const blogsNumber = displayUser.blogs.length;
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'card-footer' },
      _react2.default.createElement(
        _Layout.Col,
        { size: '4', className: 'tac' },
        _react2.default.createElement(
          'h5',
          null,
          _react2.default.createElement(
            'span',
            { className: 'mr-5' },
            focusNumber
          ),
          'Focus'
        )
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '4', className: 'tac' },
        _react2.default.createElement(
          'h5',
          null,
          _react2.default.createElement(
            'span',
            { className: 'mr-5' },
            fansNumber
          ),
          'Fans '
        )
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '4', className: 'tac' },
        _react2.default.createElement(
          'h5',
          null,
          _react2.default.createElement(
            'span',
            { className: 'mr-5' },
            blogsNumber
          ),
          'Articles'
        )
      )
    );
  },
  _renderAllPinItems: function (pins, currentUser) {
    const sortedPins = _utils.jsUtils.sortByDate(pins);
    return _react2.default.createElement(
      'div',
      { className: '' },
      sortedPins.map(pin => _react2.default.createElement(_UI.PinItem, { key: pin.id_str, onSelect: id => this.onViewPinItem(id), pin: pin, currentUser: currentUser, readMore: false }))
    );
  },
  render: function () {
    const { currentUser: currentUser, kenny: kenny, blogs: blogs, selectedPin: selectedPin, showPinModal: showPinModal } = this.state;
    const displayUser = currentUser || kenny;
    return _react2.default.createElement(
      'article',
      { className: 'list-page' },
      _react2.default.createElement(
        'section',
        { className: 'mid' },
        _react2.default.createElement(_UserControls.BlogModal, { currentUser: currentUser, isUserHome: true }),
        this._renderAllPinItems(blogs, currentUser)
      ),
      _react2.default.createElement(
        'section',
        { className: 'right' },
        _react2.default.createElement(
          'div',
          { className: 'right-user-card mb-10' },
          this._renderUserCardInfo(displayUser),
          this._renderUserCardFooter(displayUser)
        ),
        _react2.default.createElement('div', { className: 'right-blog-option' })
      ),
      _react2.default.createElement(
        _UI.Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'pinModal',
          large: true,
          pin: selectedPin,
          showModal: showPinModal,
          ModalComponent: _UserControls.PinItemModal,
          showHeaderAndFooter: false,
          currentUser: currentUser })
      )
    );
  }
});
module.exports = exports['default'];
