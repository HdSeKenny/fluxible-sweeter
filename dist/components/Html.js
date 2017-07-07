'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * build general structure of whole app
 * <link href="http://localhost:3000/favicon.ico?v=2" rel="icon" />
 */
class Html extends _react2.default.Component {

  render() {
    const { assets: assets, markup: markup, exposed: exposed } = this.props;
    const { style: style, main: main, common: common, essentials: essentials } = assets;
    const markupHtml = { __html: markup };
    const exposedHtml = { __html: exposed };
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
        _react2.default.createElement('link', { href: '/styles/bootstrap/css/font-awesome.min.css', rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: '/styles/components/ui/sweetalert.css', rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: '/styles/css/slim.min.css', rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: '/assets/revolution/css/settings.css', rel: 'stylesheet', media: 'screen' }),
        _react2.default.createElement('link', { href: '/assets/revolution/css/layers.css', rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: '/assets/revolution/css/navigation.css', rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: style, rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: '/styles/components/pages/blog.css', rel: 'stylesheet' }),
        _react2.default.createElement('script', { src: '/styles/js/jquery.min.js' }),
        _react2.default.createElement('script', { src: '/styles/js/bootstrap.min.js' })
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
        _react2.default.createElement('script', { src: '/styles/js/sweetalert.min.js' }),
        _react2.default.createElement('script', { src: '/styles/js/lazysizes.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/jquery.themepunch.tools.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/jquery.themepunch.revolution.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.actions.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.carousel.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.kenburn.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.layeranimation.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.migration.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.navigation.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.parallax.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.slideanims.min.js' }),
        _react2.default.createElement('script', { src: '/assets/revolution/js/extensions/revolution.extension.video.min.js' }),
        essentials && _react2.default.createElement('script', { src: essentials })
      )
    );
  }
}
exports.default = Html;
Html.displayName = 'Html';
Html.propTypes = {
  assets: _propTypes2.default.object,
  exposed: _propTypes2.default.string,
  markup: _propTypes2.default.string
};
module.exports = exports['default'];
