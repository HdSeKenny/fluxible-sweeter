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

const Home = _react2.default.createClass({

  displayName: 'Home',

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
    const blogMessages = ['THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS', 'CREATE_BLOG_SUCCESS', 'DELETE_BLOG_SUCCESS'];
    if (blogMessages.includes(res.msg)) {
      _sweetAlert2.default.success(res.msg);
      this.setState({ blogs: this.getStore(_stores.BlogStore).getAllBlogs() });
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
    const homePage = $('.home-page');
    if (homePage && homePage.length) {
      this.setState({ selectedPin: {} });
    }
  },
  _renderPinSection: function (sectionTitle, typedPins) {
    const { currentUser: currentUser } = this.state;
    return _react2.default.createElement(
      'section',
      { className: 'pins-section' },
      _react2.default.createElement(
        'p',
        { className: 'home-tag' },
        sectionTitle,
        ' > ',
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/list', className: 'view-all' },
          '.view more'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'pins-block' },
        typedPins.map((pin, index) => {
          const specialClass = (index + 1) % 3 === 0 ? 'mr-0' : '';
          return _react2.default.createElement(_UI.PinItem, {
            key: index,
            onSelect: id => this.onViewPinItem(id),
            pin: pin,
            type: pin.type,
            currentUser: currentUser,
            specialClass: specialClass
          });
        })
      )
    );
  },
  _renderPinItems: function (pins) {
    const articles = pins.filter(pin => pin.type === 'article');
    const thumbedSortedArticles = articles.sort((a, b) => b.likers.length - a.likers.length);
    const moments = pins.filter(pin => pin.type === 'moment');
    const thumbedSortedMoments = moments.sort((a, b) => b.likers.length - a.likers.length);
    const dateSortedPins = pins.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return _react2.default.createElement(
      'article',
      { className: 'classification' },
      this._renderPinSection('It\'s new', dateSortedPins),
      this._renderPinSection('Hot articles', thumbedSortedArticles),
      this._renderPinSection('Good sweets', thumbedSortedMoments)
    );
  },
  render: function () {
    const { blogs: blogs, selectedPin: selectedPin, currentUser: currentUser } = this.state;
    return _react2.default.createElement(
      'div',
      { className: 'home-page' },
      _react2.default.createElement(
        'div',
        { className: 'main' },
        this._renderPinItems(blogs)
      ),
      _react2.default.createElement(
        _Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'pinModal',
          hidePinModal: this.hidePinModal,
          pin: selectedPin,
          currentUser: currentUser,
          ModalComponent: _UserControls.PinItemModal,
          showHeaderAndFooter: false })
      )
    );
  }
});

exports.default = Home;
module.exports = exports['default'];
