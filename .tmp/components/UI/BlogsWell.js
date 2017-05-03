'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _stores = require('../../stores');

var _actions = require('../../actions');

var _reactBootstrap = require('react-bootstrap');

var _reactRouter = require('react-router');

var _Pages = require('../Pages');

var _UI = require('../UI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BlogsWell = _react2.default.createClass({

  displayName: 'BlogsWell',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      deletedBlog: this.getStore(_stores.BlogStore).getDeletedBlog()
    };
  },
  onChange: function (res) {
    if (res.resMsg === 'THUMBS_UP_BLOG_SUCCESS' || res.resMsg === 'CANCEL_THUMBS_UP_BLOG_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.props.changeBlogThumbsUpState();
    }

    if (res.resMsg === 'DELETE_BLOG_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState({ deletedBlog: this.getStore(_stores.BlogStore).getDeletedBlog() });
    }
  },
  onDisplayEllipsis: function (blog) {
    const blogWords = blog.text.split(' ');
    let blogContent = '';
    if (blogWords.length > 20) {
      blogWords.forEach((word, index) => {
        if (index < 21) {
          blogContent = `${blogContent} ${word}`;
        }
      });
      blogContent = `${blogContent}...`;
    } else {
      blogContent = blog.text;
    }

    return blogContent;
  },
  showCommentTextarea: function (blog) {
    let { displayBlogs: displayBlogs } = this.props;
    if (blog.show_comments) {
      blog.show_comments = false;
    } else {
      blog.show_comments = true;
    }

    displayBlogs.forEach((b, index) => {
      if (b._id === blog._id) {
        displayBlogs[index] = blog;
      }
    });
    this.getStore(_stores.BlogStore).changeShowCommentsState(blog);
    this.props.changeShowCommentsState(displayBlogs);
  },
  cancelThumbsUpBlog: function (currentUser, blogId) {
    if (currentUser) {
      this.executeAction(_actions.BlogActions.CancelThumbsUpBlog, {
        currentUserId: currentUser._id,
        blogId: blogId
      });
    } else {
      this.checkCurrentUser();
    }
  },
  thumbsUpBlog: function (currentUser, blogId) {
    if (currentUser) {
      this.executeAction(_actions.BlogActions.ThumbsUpBlog, {
        currentUserId: currentUser._id,
        blogId: blogId
      });
    } else {
      this.checkCurrentUser();
    }
  },
  _renderBlogOptions: function () {
    return _react2.default.createElement(
      'div',
      { className: 'dropdown' },
      _react2.default.createElement(
        _reactBootstrap.Button,
        { className: 'ellipsis-btn' },
        _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'dropdown-content' },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '', onClick: e => e.preventDefault() },
          'Share'
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '', onClick: e => e.preventDefault() },
          'Report'
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '', onClick: e => e.preventDefault() },
          'Delete'
        )
      )
    );
  },
  _renderBlogAuthor: function (blog) {
    const date = blog.created_at.toString();
    const blogDate = (0, _dateformat2.default)(date);
    return _react2.default.createElement(
      'div',
      { className: 'row user-row' },
      _react2.default.createElement(
        'div',
        { className: 'user-img' },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-home/${blog.author._id}/home` },
          _react2.default.createElement('img', { src: blog.author.image_url })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'user-info' },
        _react2.default.createElement(
          'h4',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: `/user-home/${blog.author._id}/home` },
            ' ',
            blog.author.username
          )
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'small',
            null,
            blogDate
          )
        )
      )
    );
  },
  _renderBlogDetails: function (currentUser, blog) {
    const isThumbedUp = currentUser ? blog.likers.includes(currentUser._id.toString()) : false;
    return _react2.default.createElement(
      'div',
      { className: 'blog-details' },
      _react2.default.createElement(
        'div',
        { className: 'blog-details-title' },
        _react2.default.createElement(
          'h4',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: `/blog-details/${blog._id}` },
            blog.title
          )
        )
      ),
      _react2.default.createElement(
        'p',
        null,
        this.onDisplayEllipsis(blog)
      ),
      this._renderBlogFooter(currentUser, blog, isThumbedUp),
      blog.show_comments && _react2.default.createElement(_Pages.Comments, { blog: blog, isBlogsWell: true })
    );
  },
  onDeleteMicroBlog: function () {
    this.executeAction(_actions.BlogActions.DeleteBlog, this.state.deletedBlog);
  },
  onConfirmDeleteBlog: function (blog) {
    this.executeAction(_actions.BlogActions.ConfirmDeleteBlog, blog);
  },
  onCancelDeleteBlog: function () {
    this.executeAction(_actions.BlogActions.CancelDeleteBlog);
  },
  checkCurrentUser: function () {
    _sweetAlert2.default.alertWarningMessage("Login first !");
  },
  _renderBlogFooter: function (currentUser, blog, isThumbedUp) {
    return _react2.default.createElement(
      'div',
      { className: 'blog-footer' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement('div', { className: 'col-xs-6' }),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-2' },
          _react2.default.createElement(
            _reactBootstrap.Button,
            { onClick: this.showCommentTextarea.bind(this, blog) },
            _react2.default.createElement('i', { className: 'fa fa-comments-o' }),
            ' ',
            blog.comments.length
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-2' },
          isThumbedUp && _react2.default.createElement(
            _reactBootstrap.Button,
            { onClick: this.cancelThumbsUpBlog.bind(this, currentUser, blog._id) },
            _react2.default.createElement('i', { className: 'fa fa-thumbs-up' }),
            ' ',
            blog.likers.length
          ),
          !isThumbedUp && _react2.default.createElement(
            _reactBootstrap.Button,
            { onClick: this.thumbsUpBlog.bind(this, currentUser, blog._id) },
            _react2.default.createElement('i', { className: 'fa fa-thumbs-o-up' }),
            ' ',
            blog.likers.length
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-2' },
          this._renderBlogOptions()
        )
      )
    );
  },
  render: function () {
    const { deletedBlog: deletedBlog, currentUser: currentUser } = this.state;
    const { displayBlogs: displayBlogs, commentText: commentText } = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'blogs-well' },
      displayBlogs.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      }).map((blog, index) => {
        return _react2.default.createElement(
          'div',
          { key: blog._id, className: 'well blog' },
          this._renderBlogAuthor(blog),
          this._renderBlogDetails(currentUser, blog),
          deletedBlog && _react2.default.createElement(_UI.ConfirmDialog, { showImmediately: true,
            close: true,
            modal: true,
            dialogWindowClassName: 'w35',
            onCancel: this.onCancelDeleteBlog,
            onConfirm: this.onDeleteMicroBlog
          })
        );
      })
    );
  }
});

exports.default = BlogsWell;
module.exports = exports['default'];
