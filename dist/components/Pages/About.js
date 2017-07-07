'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class About extends _react2.default.Component {

  render() {
    return _react2.default.createElement(
      'div',
      { className: 'about' },
      _react2.default.createElement(
        'h1',
        null,
        'About page'
      )
    );
  }
}
exports.default = About;
About.displayName = 'About';
module.exports = exports['default'];
