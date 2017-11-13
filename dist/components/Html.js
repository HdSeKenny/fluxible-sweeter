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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * build general structure of whole app
 * <link href="http://localhost:3000/favicon.ico?v=2" rel="icon" />
 * <link href="http://fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" />
 * <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,400italic,500,600,700" rel="stylesheet" />
 * link href="http://fonts.googleapis.com/css?family=Roboto%3A700%2C300" rel="stylesheet" property="stylesheet" media="all" />
 */
var Html = function (_React$Component) {
  (0, _inherits3.default)(Html, _React$Component);

  function Html() {
    (0, _classCallCheck3.default)(this, Html);
    return (0, _possibleConstructorReturn3.default)(this, (Html.__proto__ || (0, _getPrototypeOf2.default)(Html)).apply(this, arguments));
  }

  (0, _createClass3.default)(Html, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          assets = _props.assets,
          markup = _props.markup,
          exposed = _props.exposed;
      var style = assets.style,
          main = assets.main,
          common = assets.common,
          essentials = assets.essentials;

      var markupHtml = { __html: markup };
      var exposedHtml = { __html: exposed };
      var stylesheets = ['/css/font-awesome.min.css', '/css/sweetalert2.min.css', '/css/slim.min.css', '/css/emoji.css', '/slick/slick.min.css', '/slick/slick-theme.min.css', style];

      var scripts = ['/js/jquery.min.js', '/js/bootstrap.min.js'];

      return _react2.default.createElement(
        'html',
        { lang: 'en', className: 'no-js' },
        _react2.default.createElement(
          'head',
          null,
          _react2.default.createElement('meta', { charSet: 'utf-8' }),
          _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
          _react2.default.createElement(
            'title',
            null,
            'Sweeter'
          ),
          _react2.default.createElement('meta', { name: 'author', content: 'Kenny' }),
          _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, initial-scale=1' }),
          stylesheets.map(function (styleUrl) {
            return _react2.default.createElement('link', { key: styleUrl, href: styleUrl, rel: 'stylesheet' });
          }),
          scripts.map(function (scriptUrl) {
            return _react2.default.createElement('script', { key: scriptUrl, src: scriptUrl });
          })
        ),
        _react2.default.createElement(
          'body',
          null,
          _react2.default.createElement(
            'div',
            { className: 'loading' },
            _react2.default.createElement('div', { className: 'loader' })
          ),
          _react2.default.createElement('div', { id: 'main', dangerouslySetInnerHTML: markupHtml }),
          _react2.default.createElement('script', { dangerouslySetInnerHTML: exposedHtml }),
          _react2.default.createElement('script', { src: common }),
          _react2.default.createElement('script', { src: main }),
          _react2.default.createElement('script', { src: '/js/sweetalert2.min.js' }),
          essentials && _react2.default.createElement('script', { src: essentials })
        )
      );
    }
  }]);
  return Html;
}(_react2.default.Component);

Html.displayName = 'Html';
Html.propTypes = {
  assets: _propTypes2.default.object,
  exposed: _propTypes2.default.string,
  markup: _propTypes2.default.string
};
exports.default = Html;
module.exports = exports['default'];