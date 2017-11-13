'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _reactRouter = require('react-router');

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _Layout = require('../UI/Layout');

var _Pages = require('../Pages');

var _Snippets = require('../Snippets');

var _UserControls = require('../UserControls');

var _Blogs = require('../Blogs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = (0, _createReactClass2.default)({

  displayName: 'Home',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  statics: {
    storeListeners: [_stores.BlogStore, _stores.UserStore],
    fetchData: function fetchData(context, params, query, done) {
      _promise2.default.all([context.executeAction(_actions.UserActions.LoadUsers, params), context.executeAction(_actions.BlogActions.LoadBlogs, params)]).then(function () {
        done();
      });
    }
  },

  getInitialState: function getInitialState() {
    return this.getStateFromStores();
  },
  getStateFromStores: function getStateFromStores() {
    var username = this.props.params.username;

    var userStore = this.getStore(_stores.UserStore);
    var blogStore = this.getStore(_stores.BlogStore);
    return {
      currentUser: userStore.getCurrentUser(),
      user: userStore.getUserByUsername(username),
      blogs: blogStore.getAllBlogs(),
      recommendUsers: userStore.getRecommendUsers(),
      blogTags: ['News', 'Hots', 'Stars', 'Funny', 'social', 'Fashion', 'Funny', 'Funny', 'Funny', 'Funny', 'Funny', 'Funny', 'Funny']
    };
  },
  onChange: function onChange(res) {
    var _this = this;

    var blogMessages = ['CREATE_BLOG_SUCCESS', 'DELETE_BLOG_SUCCESS', 'THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS', 'COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS'];

    var authMessages = ['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS'];

    if (res.msg === 'BEFORE_LOGGED_IN' || res.msg === 'AFTER_LOGGED_IN') {
      this.showLoading();
    }

    if (blogMessages.includes(res.msg)) {
      _UI.Swal.success(res.msg, '', false, function () {
        _this.setState({
          blogs: _this.getStore(_stores.BlogStore).getAllBlogs()
        });
      });
    }

    if (authMessages.includes(res.msg)) {
      this.setState({
        currentUser: this.getStore(_stores.UserStore).getCurrentUser()
      });
    }
  },
  componentDidMount: function componentDidMount() {
    // Make blog image height adjust the parent content
    var pinBodyRight = document.querySelectorAll('.pin-right');
    var pinBodyLeft = document.querySelectorAll('.pin-left .pin-image img');
    for (var i = 0; i < pinBodyRight.length; i++) {
      pinBodyLeft[i].style.height = pinBodyRight[i].scrollHeight + 'px';
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    this.hideLoading();
  },
  showLoading: function showLoading() {
    $('.loading').removeClass('hide');
  },
  hideLoading: function hideLoading() {
    $('.loading').addClass('hide');
  },
  getTagClassName: function getTagClassName(query, tag) {
    return query.tag === tag ? 'active' : '';
  },
  openSignupModal: function openSignupModal() {
    _UI.ModalsFactory.show('signupModal');
  },
  getLinkParams: function getLinkParams(tag, index, pathname, query) {
    var lowcaseTag = tag.toLocaleLowerCase();
    var url = { pathname: pathname, query: { tag: lowcaseTag } };
    var classname = this.getTagClassName(query, lowcaseTag);
    if (!query.tag && index === 0) {
      classname = 'active';
    }

    return {
      classname: classname,
      url: url
    };
  },
  _renderHomeLeftTags: function _renderHomeLeftTags(tags, pathname, query) {
    var _this2 = this;

    return _react2.default.createElement(
      'ul',
      { className: 'blog-tags' },
      tags.map(function (tag, index) {
        var _getLinkParams = _this2.getLinkParams(tag, index, pathname, query),
            classname = _getLinkParams.classname,
            url = _getLinkParams.url;

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
  render: function render() {
    var _this3 = this;

    var _state = this.state,
        blogs = _state.blogs,
        currentUser = _state.currentUser,
        blogTags = _state.blogTags,
        recommendUsers = _state.recommendUsers;
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
        !currentUser && _react2.default.createElement(_UI.MainSliders, { show: showSliders }),
        _react2.default.createElement(_UserControls.BlogModal, { currentUser: currentUser, isUserHome: true }),
        _react2.default.createElement(_Blogs.BlogSection, { blogs: blogs, currentUser: currentUser })
      ),
      _react2.default.createElement(
        'div',
        { className: 'right' },
        _react2.default.createElement(
          'div',
          { className: 'right-login mb-10 ' + (currentUser ? 'current-user' : '') },
          !currentUser && _react2.default.createElement(_Pages.Login, { isModalLogin: false, openSignupModal: function openSignupModal() {
              return _this3.openSignupModal();
            } }),
          currentUser && _react2.default.createElement(_Snippets.UserCard, { user: currentUser, showSignature: true })
        ),
        _react2.default.createElement(_Blogs.BlogNews, { blogs: blogs, currentUser: currentUser }),
        _react2.default.createElement(_Snippets.UserList, { users: recommendUsers })
      ),
      _react2.default.createElement(
        _Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'signupModal',
          title: 'Create an account',
          ModalComponent: _Pages.Signup,
          size: 'modal-md',
          showHeaderAndFooter: true
        })
      )
    );
  }
});

exports.default = Home;
module.exports = exports['default'];