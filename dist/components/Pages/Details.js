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

var _reactRouter = require('react-router');

var _draftJs = require('draft-js');

var _stores = require('../../stores');

var _Pages = require('../Pages');

var _utils = require('../../utils');

var _Layout = require('../UI/Layout');

var _plugins = require('../../plugins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Details = (0, _createReactClass2.default)({

  displayName: 'Details',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    params: _propTypes2.default.object
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  statics: {
    storeListeners: [_stores.BlogStore, _stores.UserStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { blogId: blogId } = this.props.params;
    return {
      blog: this.getStore(_stores.BlogStore).getBlogById(blogId),
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      styleMap: {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2
        }
      },
      showEditor: false
    };
  },
  onChange: function (res) {
    const commentMsgs = ['COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS'];

    if (commentMsgs.includes(res.msg)) {
      _plugins.swal.success(res.msg);
      this.setState({
        blog: res.newBlog
      });
    }
  },
  componentDidMount: function () {
    // eslint-disable-next-line
    this.setState({ showEditor: true });
  },
  goToUserCenter: function (username) {
    this.context.router.push(`/${username}`);
  },
  downloadToPdf: function (blog) {
    const data = {
      id_str: blog.id_str,
      html: document.documentElement.outerHTML
    };

    $.post('/api/download', data, () => {});
  },
  _renderArticleHeader: function (blog) {
    return _react2.default.createElement(
      'div',
      { className: 'article-header' },
      _react2.default.createElement(
        _Layout.Row,
        { className: '' },
        _react2.default.createElement(
          _Layout.Col,
          { size: '11 title p-0' },
          _react2.default.createElement(
            'p',
            null,
            blog.title
          )
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '1 p-0 tar' },
          _react2.default.createElement(
            'span',
            { className: 'icon', onClick: () => this.downloadToPdf(blog) },
            _react2.default.createElement('i', { className: 'fa fa-download', 'aria-hidden': 'true' })
          )
        )
      )
    );
  },
  _renderDraftEditorContent: function (blog, styleMap) {
    const isContent = blog.content && typeof blog.content === 'object';
    if (isContent) {
      const parsedContent = (0, _draftJs.convertFromRaw)(blog.content);
      const editorState = _draftJs.EditorState.createWithContent(parsedContent);
      return _react2.default.createElement(
        'section',
        { className: 'content RichEditor-editor m-0' },
        _react2.default.createElement(_draftJs.Editor, { editorState: editorState, customStyleMap: styleMap, readOnly: true })
      );
    } else {
      return _react2.default.createElement(
        'section',
        { className: 'content' },
        _react2.default.createElement(
          'p',
          null,
          blog.text
        )
      );
    }
  },
  _renderArticleUserInfo: function (blog) {
    const { author: author } = blog;
    const fromNow = _utils.format.fromNow(blog.created_at);
    const avatar = _react2.default.createElement('img', {
      src: author.image_url,
      alt: 'article-user',
      width: '40',
      height: '40',
      onClick: () => this.goToUserCenter(author.username)
    });

    return _react2.default.createElement(
      _Layout.Row,
      { className: 'info mt-10' },
      _react2.default.createElement(
        _Layout.Col,
        { size: '6 info-left' },
        _react2.default.createElement(
          _Layout.Col,
          { size: '1 p-0' },
          avatar
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '10' },
          _react2.default.createElement(
            _Layout.Row,
            { className: 'username' },
            _react2.default.createElement(
              'span',
              { onClick: () => this.goToUserCenter(author.username) },
              author.username
            )
          ),
          _react2.default.createElement(
            _Layout.Row,
            { className: 'real-name' },
            author.firstName,
            ' ',
            author.lastName
          )
        )
      ),
      _react2.default.createElement(
        _Layout.Col,
        { size: '6 info-right' },
        fromNow
      )
    );
  },
  _renderArticleComments: function (blog, currentUser) {
    const commentRefer = blog.comments.length > 1 ? 'comments' : 'comment';
    return _react2.default.createElement(
      'div',
      { className: 'comments' },
      _react2.default.createElement('hr', null),
      _react2.default.createElement(
        'h3',
        null,
        blog.comments.length,
        ' ',
        commentRefer
      ),
      _react2.default.createElement(_Pages.Comments, { blog: blog, currentUser: currentUser })
    );
  },
  render: function () {
    const { styleMap: styleMap, showEditor: showEditor, blog: blog, currentUser: currentUser } = this.state;
    return _react2.default.createElement(
      'article',
      { className: 'details-page' },
      this._renderArticleHeader(blog),
      this._renderArticleUserInfo(blog),
      showEditor && this._renderDraftEditorContent(blog, styleMap),
      this._renderArticleComments(blog, currentUser)
    );
  }
});

exports.default = Details;
module.exports = exports['default'];
