'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _stores = require('../../stores');

var _Pages = require('../Pages');

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Link, Router } from 'react-router';
// import { Button, Glyphicon } from 'react-bootstrap';
const BlogsDetails = _react2.default.createClass({

  displayName: 'BlogsDetails',

  contextTypes: {
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
  onChange: function (res) {
    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState(this.getStatesFromStores());
    }
  },
  render: function () {
    const { blog: blog } = this.state;
    const date = blog.created_at.toString();
    const blogDate = (0, _dateformat2.default)(date);
    const commentRefer = blog.comments.length > 1 ? 'comments' : 'comment';
    return _react2.default.createElement(
      'article',
      { className: 'blog-details-page' },
      _react2.default.createElement(
        'section',
        { className: 'blog-details' },
        _react2.default.createElement(
          'section',
          { className: 'blog-title' },
          _react2.default.createElement(
            'h2',
            null,
            blog.title
          )
        ),
        _react2.default.createElement(
          'section',
          { classMame: 'blog-info' },
          _react2.default.createElement(
            'field',
            { className: 'info-left' },
            blog.author.username
          ),
          _react2.default.createElement(
            'field',
            { className: 'info-right' },
            blogDate
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'blog-content' },
          _react2.default.createElement(
            'p',
            null,
            blog.content
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'blog-comments' },
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
    );
  }
});

exports.default = BlogsDetails;
module.exports = exports['default'];
