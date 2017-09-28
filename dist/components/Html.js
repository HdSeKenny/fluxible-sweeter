'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * build general structure of whole app
 * <link href="http://localhost:3000/favicon.ico?v=2" rel="icon" />
 */
var Html = function (_React$Component) {
  _inherits(Html, _React$Component);

  function Html() {
    _classCallCheck(this, Html);

    return _possibleConstructorReturn(this, (Html.__proto__ || Object.getPrototypeOf(Html)).apply(this, arguments));
  }

  _createClass(Html, [{
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
          _react2.default.createElement('link', { href: 'http://fonts.googleapis.com/css?family=Raleway:400,300,600', rel: 'stylesheet' }),
          _react2.default.createElement('link', { href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,400italic,500,600,700', rel: 'stylesheet' }),
          _react2.default.createElement('link', { href: 'http://fonts.googleapis.com/css?family=Roboto%3A700%2C300', rel: 'stylesheet', property: 'stylesheet', media: 'all' }),
          _react2.default.createElement('link', { href: '/css/font-awesome.min.css', rel: 'stylesheet' }),
          _react2.default.createElement('link', { href: '/css/sweetalert.css', rel: 'stylesheet' }),
          _react2.default.createElement('link', { href: '/css/slim.min.css', rel: 'stylesheet' }),
          _react2.default.createElement('link', { href: '/css/blog.css', rel: 'stylesheet' }),
          _react2.default.createElement('link', { href: '/revolution/css/settings.css', rel: 'stylesheet', media: 'screen' }),
          _react2.default.createElement('link', { href: '/revolution/css/layers.css', rel: 'stylesheet' }),
          _react2.default.createElement('link', { href: '/revolution/css/navigation.css', rel: 'stylesheet' }),
          _react2.default.createElement('link', { href: style, rel: 'stylesheet' }),
          _react2.default.createElement('script', { src: '/js/jquery.min.js' }),
          _react2.default.createElement('script', { src: '/js/bootstrap.min.js' })
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
          _react2.default.createElement('script', { src: '/js/sweetalert.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/jquery.themepunch.tools.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/jquery.themepunch.revolution.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.actions.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.carousel.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.kenburn.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.layeranimation.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.migration.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.navigation.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.parallax.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.slideanims.min.js' }),
          _react2.default.createElement('script', { src: '/revolution/js/extensions/revolution.extension.video.min.js' }),
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