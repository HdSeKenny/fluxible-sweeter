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

var _draftJs = require('draft-js');

var _stores = require('../../stores');

var _Pages = require('../Pages');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Details = (0, _createReactClass2.default)({

  displayName: 'Details',

  contextTypes: {
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
      }
    };
  },
  onChange: function () {},
  render: function () {
    const { blog: blog, currentUser: currentUser, styleMap: styleMap } = this.state;
    const fromNow = _utils.format.fromNow(blog.created_at);
    const commentRefer = blog.comments.length > 1 ? 'comments' : 'comment';
    const parsedContent = (0, _draftJs.convertFromRaw)(blog.content);

    return _react2.default.createElement(
      'article',
      { className: 'details-page' },
      _react2.default.createElement(
        'section',
        { className: 'details' },
        _react2.default.createElement(
          'section',
          { className: 'title' },
          _react2.default.createElement(
            'p',
            null,
            blog.title
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'info' },
          _react2.default.createElement(
            'field',
            { className: 'info-left' },
            blog.author.username
          ),
          _react2.default.createElement(
            'field',
            { className: 'info-right' },
            fromNow
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'content' },
          _react2.default.createElement(
            'p',
            null,
            blog.text
          )
        ),
        _react2.default.createElement(
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
        ),
        _react2.default.createElement(_draftJs.Editor, { editorState: _draftJs.EditorState.createWithContent(parsedContent), customStyleMap: styleMap, readOnly: true })
      )
    );
  }
});

exports.default = Details;
module.exports = exports['default'];
