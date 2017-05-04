'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * build general structure of whole app
 * <link href="http://localhost:3000/favicon.ico?v=2" rel="icon" />
 */
class Html extends _react.Component {

  render() {
    const { assets: assets, markup: markup, exposed: exposed } = this.props;
    const { style: style, main: main, common: common, essentials: essentials } = assets;
    const markupHtml = { __html: markup };
    const exposedHtml = { __html: exposed };
    return _react2.default.createElement(
      'html',
      { lang: 'en' },
      _react2.default.createElement(
        'head',
        null,
        _react2.default.createElement('meta', { charSet: 'utf-8' }),
        _react2.default.createElement(
          'title',
          null,
          'Kenny"s Blog'
        ),
        _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, initial-scale=1' }),
        _react2.default.createElement('link', { href: '/styles/bootstrap/css/font-awesome.min.css', rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: style, rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: '/styles/components/ui/sweetalert.css', rel: 'stylesheet' }),
        _react2.default.createElement('link', { href: '/styles/components/pages/blog.css', rel: 'stylesheet' })
      ),
      _react2.default.createElement(
        'body',
        null,
        _react2.default.createElement('div', { id: 'main', dangerouslySetInnerHTML: markupHtml }),
        _react2.default.createElement('script', { dangerouslySetInnerHTML: exposedHtml }),
        _react2.default.createElement('script', { src: common }),
        _react2.default.createElement('script', { src: main }),
        _react2.default.createElement('script', { src: '/styles/js/sweetalert.min.js' }),
        essentials && _react2.default.createElement('script', { src: essentials })
      )
    );
  }
}
exports.default = Html;
Html.displayName = 'Html';
Html.propTypes = {
  assets: _react2.default.PropTypes.object,
  exposed: _react2.default.PropTypes.string,
  markup: _react2.default.PropTypes.string
};
module.exports = exports['default'];
