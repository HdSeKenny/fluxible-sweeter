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

var _draftJs = require('draft-js');

var _stores = require('../../stores');

var _Pages = require('../Pages');

var _utils = require('../../utils');

var _Layout = require('../UI/Layout');

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

  mixins: [_FluxibleMixin2.default],

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
  onChange: function () {},
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
  _renderArticleUserInfo: function (blog, author) {
    const fromNow = _utils.format.fromNow(blog.created_at);
    const avatar = _react2.default.createElement('img', {
      src: author.image_url,
      alt: 'article-user',
      width: '40',
      height: '40',
      onClick: () => this.goToUserCenter(author.username)
    });

    // const preloadUrlObject = {
    //   preload: author.image_url,
    //   content: author.image_url
    //   <ImagePreloader className="custom-image" src={preloadUrlObject} key="image-preloader" />
    // };

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
    const { blog: blog, currentUser: currentUser, styleMap: styleMap, showEditor: showEditor } = this.state;
    const { author: author } = blog;
    return _react2.default.createElement(
      'article',
      { className: 'details-page' },
      _react2.default.createElement(
        'section',
        { className: 'details' },
        this._renderArticleHeader(blog),
        this._renderArticleUserInfo(blog, author),
        showEditor && this._renderDraftEditorContent(blog, styleMap),
        this._renderArticleComments(blog, currentUser)
      )
    );
  }
});
// import { ImagePreloader } from '../../plugins/ImagePreloader';
exports.default = Details;
module.exports = exports['default'];
