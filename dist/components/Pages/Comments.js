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

const Comments = (0, _createReactClass2.default)({

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

  getInitialState: function () {
    return {
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
  getCommenter: function (userId) {
    return this.getStore(_stores.UserStore).getCommenter(userId);
  },
  onCommentBlog: function (blog) {
    const { commentText: commentText } = this.state;
    const { currentUser: currentUser } = this.props;
    if (!currentUser) {
      this.setState({ commentText: '' });
      return _plugins.swal.warning('Login first !');
    }

    if (!commentText.trim()) {
      return _plugins.swal.error('Invalid text!');
    }

    const comment = {
      blogId: blog._id,
      commentText: this.state.commentText,
      created_at: new Date(),
      commenter: currentUser.id_str
    };

    this.context.executeAction(_actions.BlogActions.AddBlogComment, comment);
  },
  showReplyTextarea: function (comment) {
    const blogComments = this.props.blog.comments;
    if (comment.show_replies) {
      comment.show_replies = false;
    } else {
      comment.show_replies = true;
    }

    const idx = blogComments.findIndex(bc => bc._id === comment._id);
    blogComments[idx] = comment;
    this.setState({ blogComments: blogComments });
  },
  onReplyComment: function () {
    _plugins.swal.info('This is not finished !');
    this.setState({ replyText: '' });
  },
  onDeleteComment: function (comment) {
    _plugins.swal.confirm('Are you sure?', 'Yes, delete it!', () => {
      this.executeAction(_actions.BlogActions.DeleteBlogComment, comment);
    });
  },
  goToUserCenter: function (username) {
    $('#pinModal').modal('hide');
    this.context.router.push(`/${username}`);
  },
  getCommentOptions: function (currentUser, comment) {
    const { id_str: id_str, commenter: commenter, created_at: created_at, show_replies: show_replies } = comment;
    const fromNow = _utils.format.fromNow(created_at);
    const user = this.getCommenter(commenter);
    const displayIcon = currentUser ? user.id_str === currentUser.id_str : false;
    const { username: username, image_url: image_url } = user;

    return {
      id_str: id_str,
      show_replies: show_replies,
      fromNow: fromNow,
      displayIcon: displayIcon,
      username: username,
      image_url: image_url
    };
  },
  _renderBlogTextarea: function (blog, isCommentText, currentUser, commentText) {
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
  _renderArticleTextarea: function (blog, isCommentText, currentUser, commentText) {
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
    const { replyText: replyText, commentText: commentText } = this.state;
    const { isSweet: isSweet, blog: blog, currentUser: currentUser } = this.props;
    const { comments: comments } = blog;
    const isCommentText = commentText.length === 0;
    return _react2.default.createElement(
      'div',
      { className: 'comments-page' },
      isSweet && this._renderBlogTextarea(blog, isCommentText, currentUser, commentText),
      !isSweet && this._renderArticleTextarea(blog, isCommentText, currentUser, commentText),
      comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(comment => {
        const result = this.getCommentOptions(currentUser, comment);
        const { id_str: id_str, image_url: image_url, username: username, fromNow: fromNow, displayIcon: displayIcon, show_replies: show_replies } = result;
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
          show_replies && this._renderReplyTextarea(replyText, comment)
        );
      })
    );
  }
}); /* eslint-disable all, camelcase, no-param-reassign */
exports.default = Comments;
module.exports = exports['default'];
