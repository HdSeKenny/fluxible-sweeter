'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserSuggestions extends _react2.default.Component {

  render() {
    return _react2.default.createElement('div', { className: 'follows-suggestion' });
  }
}
exports.default = UserSuggestions;
UserSuggestions.displayName = 'UserSuggestions';
module.exports = exports['default'];
