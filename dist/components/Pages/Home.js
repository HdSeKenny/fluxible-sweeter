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

const Home = (0, _createReactClass2.default)({

  displayName: 'Home',

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
    const isMedium = _utils.mediaSize.getBrowserMediaInfo(true).media === 'medium';
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      kenny: this.getStore(_stores.UserStore).getKennyUser(),
      blogs: this.getStore(_stores.BlogStore).getAllBlogs(),
      welcomeText: 'What happened today, Write a blog here !',
      blogText: '',
      selectedPin: {},
      showPinModal: false,
      isMedium: isMedium
    };
  },
  onChange: function (res) {
    const blogMessages = ['CREATE_BLOG_SUCCESS', 'DELETE_BLOG_SUCCESS', 'THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS', 'COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS'];

    if (blogMessages.includes(res.msg)) {
      _utils.sweetAlert.success(res.msg, () => {
        this.setState({ blogs: this.getStore(_stores.BlogStore).getAllBlogs() });
      });
    }
  },
  getBrowserScreenInfo: function () {
    const isMedium = _utils.mediaSize.getBrowserMediaInfo(true).media === 'medium';
    this.setState({ isMedium: isMedium });
  },
  componentWillMount: function () {
    this.getBrowserScreenInfo();
  },
  componentDidMount: function () {
    window.addEventListener('resize', this.getBrowserScreenInfo);
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this.getBrowserScreenInfo);
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
    const homePage = $('.home-page');
    if (homePage && homePage.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  },
  _renderPinSection: function (sectionTitle, typedPins) {
    const { currentUser: currentUser, isMedium: isMedium } = this.state;
    const marginRightIndex = isMedium ? 2 : 3;

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
          const specialClass = (index + 1) % marginRightIndex === 0 ? 'mr-0' : '';
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
    const { blogs: blogs, selectedPin: selectedPin, currentUser: currentUser, showPinModal: showPinModal } = this.state;
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
          pin: selectedPin,
          showModal: showPinModal,
          currentUser: currentUser,
          ModalComponent: _UserControls.PinItemModal,
          showHeaderAndFooter: false })
      )
    );
  }
});

exports.default = Home;
module.exports = exports['default'];
