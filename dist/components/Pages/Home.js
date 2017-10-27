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

var _plugins = require('../../plugins');

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

var _UserControls = require('../UserControls');

var _Pages = require('../Pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = (0, _createReactClass2.default)({

  displayName: 'Home',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.BlogStore, _stores.UserStore]
  },

  getInitialState: function getInitialState() {
    return this.getStateFromStores();
  },
  getStateFromStores: function getStateFromStores() {
    var isMedium = _utils.mediaSize.getBrowserMediaInfo(true).media === 'medium';
    var isSmall = _utils.mediaSize.getBrowserMediaInfo(true).media === 'small';
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      kenny: this.getStore(_stores.UserStore).getKennyUser(),
      blogs: this.getStore(_stores.BlogStore).getAllBlogs(),
      welcomeText: 'What happened today, Write a blog here !',
      blogText: '',
      selectedPin: {},
      showPinModal: false,
      isMedium: isMedium,
      isSmall: isSmall,
      blogTags: ['News', 'Hots', 'Stars', 'Funny', 'social', 'Fashion', 'Funny', 'Funny', 'Funny', 'Funny', 'Funny', 'Funny', 'Funny'],
      showSignupModal: false
    };
  },
  onChange: function onChange(res) {
    var _this = this;

    var blogMessages = ['CREATE_BLOG_SUCCESS', 'DELETE_BLOG_SUCCESS', 'THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS', 'COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS'];

    if (blogMessages.includes(res.msg)) {
      _plugins.swal.success(res.msg, function () {
        _this.setState({ blogs: _this.getStore(_stores.BlogStore).getAllBlogs() });
      });
    }
  },
  getBrowserScreenInfo: function getBrowserScreenInfo() {
    var isMedium = _utils.mediaSize.getBrowserMediaInfo(true).media === 'medium';
    var isSmall = _utils.mediaSize.getBrowserMediaInfo(true).media === 'small';
    this.setState({ isMedium: isMedium, isSmall: isSmall });
  },
  componentWillMount: function componentWillMount() {
    this.getBrowserScreenInfo();
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener('resize', this.getBrowserScreenInfo);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this.getBrowserScreenInfo);
  },
  handleBlogText: function handleBlogText(e) {
    this.setState({ blogText: e.target.value });
  },
  handleMicroBlog: function handleMicroBlog() {
    var currentUser = this.state.currentUser;

    if (currentUser) {
      var newBlog = {
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
  onSearchBlog: function onSearchBlog(e) {
    var searchText = e.target.value.toLocaleLowerCase();
    var searchedBlogs = this.getStore(_stores.BlogStore).getSearchedBlogs(searchText);
    this.setState({ blogs: searchedBlogs });
  },
  sortByType: function sortByType(e) {
    var sortText = e.target.value.toLocaleLowerCase();
    var sortedBlogs = this.getStore(_stores.BlogStore).getSortedBlogs(sortText);
    this.setState({ blogs: sortedBlogs });
  },
  checkCurrentUser: function checkCurrentUser() {
    _plugins.swal.warning('Login first !');
    this.setState({ blogText: '' });
  },
  onViewPinItem: function onViewPinItem(id) {
    var _this2 = this;

    var blogs = this.state.blogs;

    var selectedPin = blogs.find(function (p) {
      return p.id_str === id;
    });
    this.setState({ selectedPin: selectedPin, showPinModal: true });

    $('#pinModal').on('hidden.bs.modal', function () {
      if (_this2.hidePinModal) {
        _this2.hidePinModal();
      }
    });

    _UI.ModalsFactory.show('pinModal');
  },
  hidePinModal: function hidePinModal() {
    var homePage = $('.home-page');
    if (homePage && homePage.length) {
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  },
  getTagClassName: function getTagClassName(query, tag) {
    return query.tag === tag ? 'active' : '';
  },
  openSignupModal: function openSignupModal() {
    this.setState({ showSignupModal: true });
    _UI.ModalsFactory.show('signupModal');
  },
  _renderPinSection: function _renderPinSection(sectionTitle, typedPins) {
    var _this3 = this;

    var _state = this.state,
        currentUser = _state.currentUser,
        isMedium = _state.isMedium,
        isSmall = _state.isSmall;

    var marginRightIndex = isMedium || isSmall ? 2 : 3;

    return _react2.default.createElement(
      'div',
      { className: '' },
      typedPins.map(function (pin, index) {
        var specialClass = (index + 1) % marginRightIndex === 0 ? 'mr-0' : '';
        return _react2.default.createElement(_UI.PinItem, {
          key: index,
          onSelect: function onSelect(id) {
            return _this3.onViewPinItem(id);
          },
          pin: pin,
          type: pin.type,
          currentUser: currentUser,
          specialClass: specialClass,
          showImage: true,
          readMore: true
        });
      })
    );
  },
  _renderPinItems: function _renderPinItems(pins) {
    var articles = pins.filter(function (pin) {
      return pin.type === 'article';
    });
    var thumbedSortedArticles = articles.sort(function (a, b) {
      return b.likers.length - a.likers.length;
    });
    var moments = pins.filter(function (pin) {
      return pin.type === 'moment';
    });
    var thumbedSortedMoments = moments.sort(function (a, b) {
      return b.likers.length - a.likers.length;
    });
    var dateSortedPins = pins.sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return _react2.default.createElement(
      'article',
      { className: 'classification' },
      this._renderPinSection('It\'s new', dateSortedPins),
      this._renderPinSection('Hot articles', thumbedSortedArticles),
      this._renderPinSection('Good sweets', thumbedSortedMoments)
    );
  },
  _renderHomeLeftTags: function _renderHomeLeftTags(tags, pathname, query) {
    var _this4 = this;

    return _react2.default.createElement(
      'ul',
      { className: 'blog-tags' },
      tags.map(function (tag, index) {
        var lowcaseTag = tag.toLocaleLowerCase();
        var url = { pathname: pathname, query: { tag: lowcaseTag } };
        var classname = _this4.getTagClassName(query, lowcaseTag);
        if (!query.tag && index === 0) {
          classname = 'active';
        }
        return _react2.default.createElement(
          'li',
          { className: classname, key: index },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: url },
            tag
          )
        );
      })
    );
  },
  _renderHomeRightContent: function _renderHomeRightContent() {
    return _react2.default.createElement(
      'div',
      { className: '' },
      _react2.default.createElement(_Pages.Login, { isModalLogin: false }),
      _react2.default.createElement('div', { className: 'right-dsad' })
    );
  },
  render: function render() {
    var _state2 = this.state,
        blogs = _state2.blogs,
        selectedPin = _state2.selectedPin,
        currentUser = _state2.currentUser,
        showPinModal = _state2.showPinModal,
        blogTags = _state2.blogTags,
        showSignupModal = _state2.showSignupModal;
    var _props$location = this.props.location,
        pathname = _props$location.pathname,
        query = _props$location.query;

    var showSliders = query.tag === 'news' || typeof query.tag === 'undefined';
    return _react2.default.createElement(
      'div',
      { className: 'home-page' },
      _react2.default.createElement(
        'div',
        { className: 'left' },
        this._renderHomeLeftTags(blogTags, pathname, query)
      ),
      _react2.default.createElement(
        'div',
        { className: 'main' },
        _react2.default.createElement(_UI.MainSliders, { show: showSliders }),
        this._renderPinItems(blogs)
      ),
      _react2.default.createElement(
        'div',
        { className: 'right' },
        this._renderHomeRightContent()
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
          showHeaderAndFooter: false }),
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'signupModal',
          title: 'Create an account',
          ModalComponent: _Pages.Signup,
          size: 'modal-md',
          showHeaderAndFooter: true,
          showModal: showSignupModal,
          openNavbarModals: this.openNavbarModals,
          hideNavbarModals: this.hideNavbarModals,
          switchOpenModal: this.switchOpenModal })
      )
    );
  }
});

exports.default = Home;
module.exports = exports['default'];