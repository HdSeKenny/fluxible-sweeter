'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _stores = require('../../stores');

var _actions = require('../../actions');

var _utils = require('../../utils');

var _plugins = require('../../plugins');

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comments = (0, _createReactClass2.default)({

  displayName: 'Comments',

  contextTypes: {
    executeAction: _propTypes2.default.func,
    router: _propTypes2.default.object
  },

  propTypes: {
    blog: _propTypes2.default.object,
    isSweet: _propTypes2.default.bool,
    currentUser: _propTypes2.default.object
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore]
  },

  getInitialState: function getInitialState() {
    return {
      commentText: '',
      replyText: ''
    };
  },
  onChange: function onChange(res) {
    if (['COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS'].includes(res.msg)) {
      this.setState({ commentText: '' });
    }
  },
  handleCommentText: function handleCommentText(e) {
    this.setState({ commentText: e.target.value });
  },
  handleReplyText: function handleReplyText(e) {
    this.setState({ replyText: e.target.value });
  },
  getCommenter: function getCommenter(userId) {
    return this.getStore(_stores.UserStore).getCommenter(userId);
  },
  onCommentBlog: function onCommentBlog(blog) {
    var commentText = this.state.commentText;
    var currentUser = this.props.currentUser;

    if (!currentUser) {
      this.setState({ commentText: '' });
      return _plugins.swal.warning('Login first !');
    }

    if (!commentText.trim()) {
      return _plugins.swal.error('Invalid text!');
    }

    var comment = {
      blogId: blog._id,
      commentText: this.state.commentText,
      created_at: new Date(),
      commenter: currentUser.id_str
    };

    this.context.executeAction(_actions.BlogActions.AddBlogComment, comment);
  },
  showReplyTextarea: function showReplyTextarea(comment) {
    var blogComments = this.props.blog.comments;
    if (comment.show_replies) {
      comment.show_replies = false;
    } else {
      comment.show_replies = true;
    }

    var idx = blogComments.findIndex(function (bc) {
      return bc._id === comment._id;
    });
    blogComments[idx] = comment;
    this.setState({ blogComments: blogComments });
  },
  onReplyComment: function onReplyComment() {
    _plugins.swal.info('This is not finished !');
    this.setState({ replyText: '' });
  },
  onDeleteComment: function onDeleteComment(comment) {
    var _this = this;

    _plugins.swal.confirm('Are you sure?', 'Yes, delete it!', function () {
      _this.executeAction(_actions.BlogActions.DeleteBlogComment, comment);
    });
  },
  goToUserCenter: function goToUserCenter(username) {
    $('#pinModal').modal('hide');
    this.context.router.push('/' + username);
  },
  getCommentOptions: function getCommentOptions(currentUser, comment) {
    var id_str = comment.id_str,
        commenter = comment.commenter,
        created_at = comment.created_at,
        show_replies = comment.show_replies;

    var fromNow = _utils.format.fromNow(created_at);
    var user = this.getCommenter(commenter);
    var displayIcon = currentUser ? user.id_str === currentUser.id_str : false;
    var username = user.username,
        image_url = user.image_url;


    return {
      id_str: id_str,
      show_replies: show_replies,
      fromNow: fromNow,
      displayIcon: displayIcon,
      username: username,
      image_url: image_url
    };
  },
  _renderBlogTextarea: function _renderBlogTextarea(blog, isCommentText, currentUser, commentText) {
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'comment-textarea' },
      _react2.default.createElement(
        _Layout.Col,
        { size: '9 pl-5 pr-0' },
        _react2.default.createElement('textarea', { rows: '1', className: 'form-control', value: commentText, onChange: this.handleCommentText })
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '3 pr-5 pl-5' },
        _react2.default.createElement(
          'button',
          { className: 'btn btn-info fr', onClick: this.onCommentBlog.bind(this, blog), disabled: isCommentText },
          ' Comment'
        )
      )
    );
  },
  _renderArticleTextarea: function _renderArticleTextarea(blog, isCommentText, currentUser, commentText) {
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'comment-textarea' },
      _react2.default.createElement(
        _Layout.Row,
        null,
        _react2.default.createElement('textarea', { rows: '3', className: 'form-control', value: commentText, onChange: this.handleCommentText })
      ),
      _react2.default.createElement(
        _Layout.Row,
        null,
        _react2.default.createElement(
          'button',
          { className: 'btn btn-info fr mt-15', onClick: this.onCommentBlog.bind(this, blog), disabled: isCommentText },
          ' Comment'
        )
      )
    );
  },
  _renderReplyTextarea: function _renderReplyTextarea(replyText, comment) {
    var _this2 = this;

    var isDisabled = replyText.length === 0;
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
          { className: 'btn btn-info reply-btn', onClick: function onClick() {
              return _this2.onReplyComment(_this2, comment);
            }, disabled: isDisabled },
          ' Reply'
        )
      )
    );
  },
  render: function render() {
    var _this3 = this;

    var _state = this.state,
        replyText = _state.replyText,
        commentText = _state.commentText;
    var _props = this.props,
        isSweet = _props.isSweet,
        blog = _props.blog,
        currentUser = _props.currentUser;
    var comments = blog.comments;

    var isCommentText = commentText.length === 0;
    return _react2.default.createElement(
      'div',
      { className: 'comments-page' },
      isSweet && this._renderBlogTextarea(blog, isCommentText, currentUser, commentText),
      !isSweet && this._renderArticleTextarea(blog, isCommentText, currentUser, commentText),
      comments.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      }).map(function (comment) {
        var result = _this3.getCommentOptions(currentUser, comment);
        var id_str = result.id_str,
            image_url = result.image_url,
            username = result.username,
            fromNow = result.fromNow,
            displayIcon = result.displayIcon,
            show_replies = result.show_replies;

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
                  { className: 'username', onClick: function onClick() {
                      return _this3.goToUserCenter(username);
                    } },
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
                  { className: 'reply-icon', onClick: function onClick() {
                      return _this3.showReplyTextarea(comment);
                    } },
                  _react2.default.createElement('i', { className: 'fa fa-reply' })
                )
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '1 comment-thumbs' },
              displayIcon && _react2.default.createElement('i', { className: 'fa fa-trash', onClick: function onClick() {
                  return _this3.onDeleteComment(comment);
                } })
            )
          ),
          show_replies && _this3._renderReplyTextarea(replyText, comment)
        );
      })
    );
  }
}); /* eslint-disable all, camelcase, no-param-reassign */
exports.default = Comments;
module.exports = exports['default'];