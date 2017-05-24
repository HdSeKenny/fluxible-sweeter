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

var _reactRouter = require('react-router');

var _utils = require('../../utils');

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const List = (0, _createReactClass2.default)({

  displayName: 'List',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  mixins: [_FluxibleMixin2.default],

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
      blogs: this.getStore(_stores.BlogStore).getAllBlogs(),
      welcomeText: 'What happened today, Write a blog here !',
      blogText: '',
      selectedPin: {},
      showCreateModal: false,
      showPinModal: false
    };
  },
  onChange: function (res) {
    const thumbsAndCommentMsgs = ['COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS', 'THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS', 'DELETE_BLOG_SUCCESS', 'CREATE_BLOG_SUCCESS'];

    if (thumbsAndCommentMsgs.includes(res.msg)) {
      _utils.sweetAlert.success(res.msg);
      this.setState({
        blogs: this.getStore(_stores.BlogStore).getAllBlogs()
      });
    }

    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      _UI.ModalsFactory.hide('createBlogModal');
    }
  },
  handleBlogText: function (e) {
    this.setState({ blogText: e.target.value });
  },
  handleMicroBlog: function () {
    const { currentUser: currentUser } = this.state;
    if (currentUser) {
      const newBlog = {
        content: this.state.blogText,
        created_at: new Date(),
        type: 'microblog',
        author: currentUser._id
      };
      this.executeAction(_actions.BlogActions.AddBlog, newBlog);
    } else {
      this.checkCurrentUser();
    }
  },
  onSearchBlog: function (e) {
    const searchText = e.target.value.toLocaleLowerCase();
    const searchedBlogs = this.getStore(_stores.BlogStore).getSearchedBlogs(searchText);
    this.setState({ blogs: searchedBlogs });
  },
  sortByType: function (e) {
    const sortText = e.target.value.toLocaleLowerCase();
    const sortedBlogs = this.getStore(_stores.BlogStore).getSortedBlogs(sortText);
    this.setState({ blogs: sortedBlogs });
  },
  checkCurrentUser: function () {
    _utils.sweetAlert.alertWarningMessage('Login first !');
    this.setState({ blogText: '' });
  },
  changeShowCommentsState: function () {
    this.setState({ blogs: this.getStore(_stores.BlogStore).getAllBlogs() });
  },
  changeBlogThumbsUpState: function () {
    this.setState(this.getStateFromStores());
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
  hideCreateModal: function () {
    this.setState({ showCreateModal: false });
  },
  openCreateBlogModal: function () {
    if (!this.state.showCreateModal) {
      this.setState({ showCreateModal: true });
    }
    $('#createBlogModal').on('hidden.bs.modal', () => {
      // eslint-disable-next-line
      this.hideCreateModal && this.hideCreateModal();
    });

    _UI.ModalsFactory.show('createBlogModal');
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
      sortedPins.map((pin, index) => _react2.default.createElement(_UI.PinItem, { key: index, onSelect: id => this.onViewPinItem(id), pin: pin, currentUser: currentUser }))
    );
  },
  _renderSearchBlock: function () {
    return _react2.default.createElement(
      'section',
      { className: 'search-block' },
      _react2.default.createElement(
        'div',
        { className: 'search-block-header' },
        this._renderSearchBlockHeader()
      ),
      _react2.default.createElement(
        'div',
        { className: 'search-block-body' },
        this._renderSearchBlockBody()
      ),
      _react2.default.createElement(
        'div',
        { className: 'search-block-footer' },
        this._renderSearchBlockFooter()
      )
    );
  },
  _renderSearchBlockBody: function () {
    return _react2.default.createElement(
      _Layout.Row,
      null,
      _react2.default.createElement(
        'form',
        { className: 'search-content', action: '#', method: 'post' },
        _react2.default.createElement(
          'div',
          { className: 'iconic-input' },
          _react2.default.createElement('i', { className: 'fa fa-search' }),
          _react2.default.createElement('input', { type: 'text', className: 'form-control', name: 'keyword', placeholder: 'Search...' })
        )
      )
    );
  },
  _renderSearchBlockFooter: function () {
    return _react2.default.createElement(
      _Layout.Row,
      null,
      _react2.default.createElement(
        'h5',
        { className: 'hot-searched' },
        'Hot searched \uFF1A'
      )
    );
  },
  _renderSearchBlockHeader: function () {
    return _react2.default.createElement(
      _Layout.Row,
      null,
      _react2.default.createElement(
        _Layout.Col,
        { size: '10', className: 'p-0' },
        _react2.default.createElement(
          'h3',
          { className: 'search-tip m-0' },
          'Todaydasdasdasdasdasdasdasdasdasdasdsaadsadsadaasddsadasdasdadasdasdsdsad'
        )
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '2', className: 'pr-0 pl-30' },
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-info btn-block',
            'data-balloon': 'create a sweet!',
            'data-balloon-ops': 'top',
            onClick: this.openCreateBlogModal },
          _react2.default.createElement('i', { className: 'fa fa-pencil' }),
          ' Sweet'
        )
      )
    );
  },
  render: function () {
    const { currentUser: currentUser, kenny: kenny, blogs: blogs, selectedPin: selectedPin, showCreateModal: showCreateModal, showPinModal: showPinModal } = this.state;
    const displayUser = currentUser || kenny;
    return _react2.default.createElement(
      'article',
      { className: 'list-page' },
      _react2.default.createElement(
        'section',
        { className: 'mid' },
        this._renderSearchBlock(),
        this._renderAllPinItems(blogs, currentUser)
      ),
      _react2.default.createElement(
        'section',
        { className: 'right' },
        _react2.default.createElement(
          'div',
          { className: 'right-user-card' },
          this._renderUserCardInfo(displayUser),
          this._renderUserCardFooter(displayUser)
        ),
        _react2.default.createElement('div', { className: 'right-blog-option' })
      ),
      _react2.default.createElement(
        _UI.Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'createBlogModal',
          title: 'Create a sweet !',
          ModalComponent: _UserControls.BlogModal,
          size: 'modal-md',
          showHeaderAndFooter: false,
          showModal: showCreateModal,
          currentUser: currentUser }),
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

exports.default = List;
module.exports = exports['default'];
