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

var _stores = require('../../stores');

var _actions = require('../../actions');

var _utils = require('../../utils');

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { routerShape } from 'react-router';
/* eslint-disable all, camelcase */
const Comments = (0, _createReactClass2.default)({

  displayName: 'Comments',

  contextTypes: {
    executeAction: _propTypes2.default.func,
    router: _propTypes2.default.object
  },

  propTypes: {
    blog: _propTypes2.default.object,
    isBlogsWell: _propTypes2.default.bool,
    currentUser: _propTypes2.default.object
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
      currentUser: this.props.currentUser,
      blog: this.props.blog,
      commentText: '',
      replyText: ''
    };
  },
  onChange: function (res) {
    if (['COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS'].includes(res.msg)) {
      this.setState({ commentText: '' });
    }
  },
  handleCommentText: function (e) {
    this.setState({ commentText: e.target.value });
  },
  handleReplyText: function (e) {
    this.setState({ replyText: e.target.value });
  },
  checkLogin: function () {
    _utils.sweetAlert.alertWarningMessage('Login first !');
    this.setState({ commentText: '' });
  },
  getBlogCommentsById: function (blogId) {
    return this.state.comments.filter(comment => comment.blogId === blogId);
  },
  getCommenter: function (userId) {
    return this.getStore(_stores.UserStore).getCommenter(userId);
  },
  onCommentBlog: function (blog) {
    const { currentUser: currentUser, commentText: commentText } = this.state;
    if (!currentUser) {
      return this.checkLogin();
    }

    if (!commentText.trim()) {
      return _utils.sweetAlert.alertErrorMessage('Invalid text!');
    }

    const comment = {
      blogId: blog._id,
      commentText: this.state.commentText,
      created_at: new Date(),
      commenter: this.state.currentUser._id
    };

    this.executeAction(_actions.BlogActions.AddBlogComment, comment);
  },
  showReplyTextarea: function (comment) {
    const blogComments = this.props.blog.comments;
    if (comment.show_replies) {
      // eslint-disable-next-line no-param-reassign
      comment.show_replies = false;
    } else {
      // eslint-disable-next-line no-param-reassign
      comment.show_replies = true;
    }

    blogComments.forEach((c, index) => {
      if (c._id === comment._id) {
        blogComments[index] = comment;
      }
    });
    this.setState({ blogComments: blogComments });
  },
  onReplyComment: function () {
    _utils.sweetAlert.alertInfoMessage('This is not finished !');
    this.setState({ replyText: '' });
  },
  onDeleteComment: function (comment) {
    _utils.sweetAlert.alertConfirmMessage('', () => {
      this.executeAction(_actions.BlogActions.DeleteBlogComment, comment);
    });
  },
  goToUserCenter: function (username) {
    $('#pinModal').modal('hide');
    this.context.router.push(`/${username}`);
  },
  _renderBlogTextarea: function (blog, isCommentText, currentUser, commentText) {
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'comment-textarea' },
      _react2.default.createElement(
        _Layout.Col,
        { size: '9 pl-5 pr-0' },
        _react2.default.createElement('textarea', {
          rows: '1',
          className: 'form-control',
          value: commentText,
          onChange: this.handleCommentText })
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '3 pr-5 pl-5' },
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-info fr',
            onClick: this.onCommentBlog.bind(this, blog),
            disabled: isCommentText },
          ' Comment'
        )
      )
    );
  },
  _renderArticleTextarea: function (blog, isCommentText, currentUser, commentText) {
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'comment-textarea' },
      _react2.default.createElement(
        _Layout.Row,
        null,
        _react2.default.createElement('textarea', {
          rows: '3',
          className: 'form-control',
          value: commentText,
          onChange: this.handleCommentText
        })
      ),
      _react2.default.createElement(
        _Layout.Row,
        null,
        _react2.default.createElement(
          'button',
          {
            className: 'btn btn-info fr mt-15',
            onClick: this.onCommentBlog.bind(this, blog),
            disabled: isCommentText },
          ' Comment'
        )
      )
    );
  },
  _renderReplyTextarea: function (replyText, comment) {
    const isDisabled = replyText.length === 0;
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'reply-row mt-10' },
      _react2.default.createElement(_Layout.Col, { size: '1 reply-empty' }),
      _react2.default.createElement(
        _Layout.Col,
        { size: '9' },
        _react2.default.createElement('textarea', { rows: '1', className: 'form-control', value: replyText, onChange: this.handleReplyText })
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '2' },
        _react2.default.createElement(
          'button',
          { className: 'btn btn-info reply-btn', onClick: () => this.onReplyComment(this, comment), disabled: isDisabled },
          ' Reply'
        )
      )
    );
  },
  render: function () {
    const { currentUser: currentUser, replyText: replyText, commentText: commentText, blog: blog } = this.state;
    const isCommentText = commentText.length === 0;
    const { isBlogsWell: isBlogsWell } = this.props;
    const { comments: comments } = blog;
    return _react2.default.createElement(
      'div',
      { className: 'comments-page' },
      isBlogsWell && this._renderBlogTextarea(blog, isCommentText, currentUser, commentText),
      !isBlogsWell && this._renderArticleTextarea(blog, isCommentText, currentUser, commentText),
      comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(comment => {
        const { id_str: id_str, commenter: commenter, created_at: created_at, show_replies: show_replies } = comment;
        const fromNow = _utils.format.fromNow(created_at);
        const user = this.getCommenter(commenter);
        const displayIcon = currentUser ? user.id_str === currentUser.id_str : false;
        const { username: username, image_url: image_url } = user;
        return _react2.default.createElement(
          'div',
          { key: id_str },
          _react2.default.createElement(
            _Layout.Row,
            { className: 'comment-row' },
            _react2.default.createElement(
              _Layout.Col,
              { size: '1 commenter-img p-0' },
              _react2.default.createElement('img', { alt: 'commenter', src: image_url })
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '10 p-0' },
              _react2.default.createElement(
                'h5',
                { className: 'comment-text' },
                _react2.default.createElement(
                  'span',
                  { className: 'username', onClick: () => this.goToUserCenter(username) },
                  username
                ),
                ' : ',
                comment.commentText
              ),
              _react2.default.createElement(
                'p',
                { className: 'comment-date' },
                _react2.default.createElement(
                  'small',
                  null,
                  fromNow
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'reply-icon', onClick: () => this.showReplyTextarea(comment) },
                  _react2.default.createElement('i', { className: 'fa fa-reply' })
                )
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '1 comment-thumbs' },
              displayIcon && _react2.default.createElement('i', { className: 'fa fa-trash', onClick: () => this.onDeleteComment(comment) })
            )
          ),
          _react2.default.createElement(_Layout.Row, { className: 'comment-icons' }),
          show_replies && this._renderReplyTextarea(replyText, comment)
        );
      })
    );
  }
});

exports.default = Comments;
module.exports = exports['default'];
