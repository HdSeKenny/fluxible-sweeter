'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const List = _react2.default.createClass({

  displayName: 'List',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
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
      showCreateModal: true
    };
  },
  onChange: function (res) {
    const thumbsAndCommentMsgs = ['COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS', 'THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS', 'DELETE_BLOG_SUCCESS', 'CREATE_BLOG_SUCCESS'];

    if (thumbsAndCommentMsgs.includes(res.msg)) {
      _sweetAlert2.default.success(res.msg);
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
    _sweetAlert2.default.alertWarningMessage('Login first !');
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
    this.setState({ selectedPin: selectedPin });

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
      this.setState({ selectedPin: {} });
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
            { to: `/${username}/home` },
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
              { to: `/${username}/home` },
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
    return _react2.default.createElement(
      'div',
      { className: '' },
      pins.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((pin, index) => _react2.default.createElement(_UI.PinItem, {
        key: index,
        onSelect: id => this.onViewPinItem(id),
        pin: pin,
        type: pin.type,
        currentUser: currentUser
      }))
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
    const { currentUser: currentUser, kenny: kenny, blogs: blogs, selectedPin: selectedPin, showCreateModal: showCreateModal } = this.state;
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
          ModalComponent: _UserControls.PinItemModal,
          showHeaderAndFooter: false })
      )
    );
  }
});

exports.default = List;
module.exports = exports['default'];
