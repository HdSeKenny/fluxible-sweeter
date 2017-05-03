'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

var _data = require('../../utils/data');

var _data2 = _interopRequireDefault(_data);

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
      selectedPin: {}
    };
  },
  onChange: function (res) {
    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState(this.getStateFromStores());
    }

    if (res.resMsg === 'CREATE_BLOG_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState({
        blogText: '',
        blogs: this.getStore(_stores.BlogStore).getAllBlogs()
      });
    }

    if (res.resMsg === 'LOGOUT_SUCCESS') {
      // this.setState(this.getStateFromStores());
    }

    if (res.resMsg === 'DELETE_BLOG_SUCCESS') {
      this.setState({ blogs: this.getStore(_stores.BlogStore).getAllBlogs() });
    }
  },
  componentDidMount: function () {},
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
    this.setState({ selectedPin: blogs.find(p => p.id_str === id) });
    _UI.ModalsFactory.show('pinModal');
  },
  openCreateBlogModal: function () {
    _UI.ModalsFactory.show('createBlogModal');
  },
  _renderUserCardInfo: function (displayUser) {
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
            { to: `/user-home/${displayUser.strId}/home` },
            _react2.default.createElement('img', { alt: 'user', src: '/styles/images/upload/1484229196773.jpg' })
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
              { to: `/user-home/${displayUser.strId}/home` },
              displayUser.username
            )
          ),
          _react2.default.createElement(
            'h5',
            null,
            displayUser.profession
          )
        )
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: 'card-body' },
        _react2.default.createElement(
          'p',
          null,
          'This guy is lazy...'
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
  _renderAllPinItems: function (pins) {
    return _react2.default.createElement(
      'div',
      { className: '' },
      pins.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((pin, index) => _react2.default.createElement(_UI.PinItem, { key: index, onSelect: id => this.onViewPinItem(id), pin: pin, type: pin.type }))
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
    const { currentUser: currentUser, kenny: kenny, blogs: blogs, selectedPin: selectedPin } = this.state;
    const displayUser = currentUser || kenny;
    return _react2.default.createElement(
      'article',
      { className: 'list-page' },
      _react2.default.createElement(
        'section',
        { className: 'mid' },
        this._renderSearchBlock(),
        this._renderAllPinItems(blogs)
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
        _react2.default.createElement(_UI.ModalsFactory, { modalref: 'createBlogModal', title: 'Create a sweet !', ModalComponent: _UserControls.BlogModal, size: 'modal-md', showHeaderAndFooter: false }),
        _react2.default.createElement(_UI.ModalsFactory, { modalref: 'pinModal', large: true, pin: selectedPin, ModalComponent: _UserControls.ViewPin, showHeaderAndFooter: true })
      )
    );
  }
});

exports.default = List;
module.exports = exports['default'];
