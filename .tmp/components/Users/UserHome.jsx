'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _LeftNavs = require('../LeftNavs');

var _UI = require('../UI');

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserHome = _react2.default.createClass({

  displayName: 'UserHome',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    params: _react2.default.PropTypes.object,
    location: _react2.default.PropTypes.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { userId: userId } = this.props.params;
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserById(userId),
      isCurrentUser: this.getStore(_stores.UserStore).isCurrentUser(userId),
      singleUserBlogs: null,
      welcomeText: 'What happened today, Write a blog here !',
      blogText: ''
    };
  },
  onChange: function (res) {
    const { user: user, isCurrentUser: isCurrentUser } = this.state;
    const { userId: userId } = this.props.params;
    if (res.resMsg === 'CREATE_BLOG_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState({ blogText: '' });
    }

    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      const singleUserBlogs = this.getStore(_stores.BlogStore).getUserBlogsWithFocuses(isCurrentUser, user);
      this.setState({ singleUserBlogs: singleUserBlogs });
    }

    // if(res.resMsg === 'FOLLOW_USER_SUCCESS' || res.resMsg === 'CANCEL_FOLLOW_USER_SUCCESS'){
    //   this.setState({
    //     currentUser: this.getStore(UserStore).getCurrentUser(),
    //     user: this.getStore(UserStore).getUserById(userId),
    //     isCurrentUser: this.getStore(UserStore).isCurrentUser(userId)
    //   })
    // }

    this.setState({
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserById(userId),
      isCurrentUser: this.getStore(_stores.UserStore).isCurrentUser(userId)
    });
  },
  handleBlogText: function (e) {
    this.setState({ blogText: e.target.value });
  },
  handleMicroBlog: function () {
    const newBlog = {
      content: this.state.blogText,
      created_at: new Date(),
      type: 'microblog',
      author: this.state.currentUser._id
    };

    this.executeAction(_actions.BlogActions.AddBlog, newBlog);
  },
  getUserBlogsWithFocuses: function (isCurrentUser, user, singleUserBlogs) {
    let displayBlogs = singleUserBlogs;
    if (!displayBlogs) {
      displayBlogs = this.getStore(_stores.BlogStore).getUserBlogsWithFocuses(isCurrentUser, user);
    }
    return displayBlogs;
  },
  changeShowCommentsState: function (displayBlogs) {
    this.setState({ singleUserBlogs: displayBlogs });
  },
  changeBlogThumbsUpState: function () {
    const { user: user, isCurrentUser: isCurrentUser } = this.state;
    this.setState({
      singleUserBlogs: this.getStore(_stores.BlogStore).getUserBlogsWithFocuses(isCurrentUser, user)
    });
  },
  _renderUserCreateWell: function (currentUser, blogText, welcomeText) {
    const isBlogTextLength = blogText.length > 140;
    return _react2.default.createElement(
      'div',
      { className: 'well create-well' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-7' },
          _react2.default.createElement(
            'p',
            null,
            welcomeText
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-5' },
          !isBlogTextLength && _react2.default.createElement(
            'p',
            null,
            'You can still write ',
            _react2.default.createElement(
              'span',
              { className: 'len-span' },
              140 - blogText.length
            ),
            ' words'
          ),
          isBlogTextLength && _react2.default.createElement(
            'p',
            null,
            'You can\'t write words large than ',
            _react2.default.createElement(
              'span',
              { className: 'len-span-red' },
              '140'
            ),
            ' words'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row textarea-row' },
        _react2.default.createElement('textarea', { type: 'text', rows: '3', value: blogText, onChange: this.handleBlogText })
      ),
      _react2.default.createElement(
        'div',
        { className: 'row btn-row' },
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            disabled: isBlogTextLength || blogText.length === 0,
            onClick: this.handleMicroBlog,
            className: 'btn-primary create-btn'
          },
          _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'send' }),
          ' Create'
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-blogs/${currentUser.strId}/add` },
          _react2.default.createElement(
            _reactBootstrap.Button,
            { className: 'btn-info create-btn' },
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'pencil' }),
            ' Articles'
          )
        )
      )
    );
  },
  render: function () {
    const {
      currentUser: currentUser,
      blogText: blogText,
      isCurrentUser: isCurrentUser,
      user: user,
      singleUserBlogs: singleUserBlogs,
      welcomeText: welcomeText
    } = this.state;
    const displayBlogs = this.getUserBlogsWithFocuses(isCurrentUser, user, singleUserBlogs);
    const { pathname: pathname } = this.props.location;
    return _react2.default.createElement(
      'div',
      { className: 'user-home' },
      _react2.default.createElement(_UserBar2.default, {
        path: pathname,
        user: user,
        isCurrentUser: isCurrentUser,
        currentUser: currentUser
      }),
      _react2.default.createElement(
        'div',
        { className: 'user-content' },
        _react2.default.createElement(
          'div',
          { className: 'content-left' },
          _react2.default.createElement(_LeftNavs.UserHomeNav, {
            path: pathname,
            isCurrentUser: isCurrentUser,
            user: user,
            currentUser: currentUser,
            displayBlogs: displayBlogs
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'content-right' },
          isCurrentUser && this._renderUserCreateWell(currentUser, blogText, welcomeText),
          _react2.default.createElement(_UI.BlogsWell, {
            displayBlogs: displayBlogs,
            changeShowCommentsState: this.changeShowCommentsState,
            changeBlogThumbsUpState: this.changeBlogThumbsUpState,
            currentUser: currentUser
          })
        )
      )
    );
  }
});

exports.default = UserHome;
module.exports = exports['default'];
