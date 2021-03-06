'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Layout = require('../UI/Layout');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlogNews = function (_React$Component) {
  (0, _inherits3.default)(BlogNews, _React$Component);

  function BlogNews() {
    (0, _classCallCheck3.default)(this, BlogNews);
    return (0, _possibleConstructorReturn3.default)(this, (BlogNews.__proto__ || (0, _getPrototypeOf2.default)(BlogNews)).apply(this, arguments));
  }

  (0, _createClass3.default)(BlogNews, [{
    key: 'showDetails',
    value: function showDetails(id) {
      this.context.router.push(id + '/details');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var blogs = this.props.blogs;

      return _react2.default.createElement(
        'section',
        { className: 'blog-news' },
        _react2.default.createElement(
          'h3',
          { className: 'title' },
          'Blog News'
        ),
        blogs.sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        }).map(function (blog, index) {
          var id_str = blog.id_str,
              title = blog.title,
              created_at = blog.created_at,
              images = blog.images;

          var fromNow = _utils.format.fromNow(created_at);
          return _react2.default.createElement(
            _Layout.Row,
            { key: id_str, className: 'blog', onClick: function onClick() {
                return _this2.showDetails(id_str);
              } },
            _react2.default.createElement(
              _Layout.Col,
              { size: '7 p-0' },
              _react2.default.createElement(
                'h4',
                { className: 'b-title' },
                title
              ),
              _react2.default.createElement(
                'small',
                { className: 'date' },
                fromNow
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '5 p-0' },
              _react2.default.createElement('img', { src: images[0], alt: 'blog-image' })
            )
          );
        })
      );
    }
  }]);
  return BlogNews;
}(_react2.default.Component); /* eslint-disable all, camelcase */


BlogNews.displayName = 'BlogNews';
BlogNews.contextTypes = {
  router: _reactRouter.routerShape.isRequired
};
BlogNews.propTypes = {
  blogs: _propTypes2.default.array,
  currentUser: _propTypes2.default.object
};
exports.default = BlogNews;
module.exports = exports['default'];