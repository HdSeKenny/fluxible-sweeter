'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _stores = require('../../stores');

var _Pages = require('../Pages');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Details = _react2.default.createClass({

  displayName: 'Details',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    params: _react2.default.PropTypes.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.BlogStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { blogId: blogId } = this.props.params;
    return {
      blog: this.getStore(_stores.BlogStore).getBlogById(blogId)
    };
  },
  onChange: function (res) {},
  render: function () {
    const { blog: blog } = this.state;
    const fromNow = _utils.format.fromNow(blog.created_at);
    const commentRefer = blog.comments.length > 1 ? 'comments' : 'comment';
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
          { classMame: 'info' },
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
          _react2.default.createElement(_Pages.Comments, { blog: blog, isBlogsWell: false })
        )
      )
    );
  }
});

exports.default = Details;
module.exports = exports['default'];
