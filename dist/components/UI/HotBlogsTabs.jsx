'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _stores = require('../../stores');

var _actions = require('../../actions');

var _reactBootstrap = require('react-bootstrap');

var _reactRouter = require('react-router');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HotBlogsTabs = _react2.default.createClass({

  displayName: 'HotBlogsTabs',

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
      blogs: this.getStore(_stores.BlogStore).getAllBlogs()
    };
  },
  onChange: function () {
    // this.setState(this.getStatesFromStores());
  },
  onDisplayEllipsis: function (hotBlog) {
    const hotBlogTitle = hotBlog.title.split(' ');
    let blogTitle = '';
    if (hotBlogTitle.length > 8) {
      hotBlogTitle.forEach((word, index) => {
        if (index < 9) {
          blogTitle = `${blogTitle} ${word}`;
        }
      });
      blogTitle = `${blogTitle}...`;
    } else {
      blogTitle = hotBlog.title;
    }
    return blogTitle;
  },
  _renderHotBlogs: function (tabsBlogs) {
    return _react2.default.createElement(
      'div',
      { className: 'hot-blogs' },
      tabsBlogs.sort((a, b) => {
        return b.likers.length - a.likers.length;
      }).map(hotBlog => {
        if (hotBlog.type === 'article') {
          const blogTitle = this.onDisplayEllipsis(hotBlog);
          return _react2.default.createElement(
            'div',
            { key: hotBlog._id, className: 'row hot-blog-row' },
            _react2.default.createElement(
              'div',
              { className: 'col-xs-9' },
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: `/blog-details/${hotBlog._id}` },
                  blogTitle
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-xs-3' },
              _react2.default.createElement('i', { className: 'fa fa-heart-o' }),
              ' ',
              hotBlog.likers.length
            )
          );
        }
      })
    );
  },
  render: function () {
    const { currentUser: currentUser, blogs: blogs } = this.state;
    const tabsBlogs = _lodash2.default.cloneDeep(blogs);
    return _react2.default.createElement(
      _UserControls.Tabs,
      null,
      _react2.default.createElement(
        _UserControls.Pane,
        { label: 'Hot Blogs' },
        this._renderHotBlogs(tabsBlogs)
      ),
      _react2.default.createElement(
        _UserControls.Pane,
        { label: 'Q & A' },
        _react2.default.createElement(
          'div',
          null,
          'Question and Answer, kenny didn\'t finish this.'
        )
      ),
      _react2.default.createElement(
        _UserControls.Pane,
        { label: 'Classify' },
        _react2.default.createElement(
          'div',
          null,
          'Classify, kenny didn\'t finish this.'
        )
      )
    );
  }
});

exports.default = HotBlogsTabs;
module.exports = exports['default'];
