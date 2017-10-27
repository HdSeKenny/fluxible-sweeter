'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * not found page
 */
var NotFound = (0, _createReactClass2.default)({
  render: function render() {
    var classes = this.props.classes;

    var classNames = 'not-found ' + classes;
    return _react2.default.createElement(
      'div',
      { className: classNames },
      _react2.default.createElement(
        'h1',
        null,
        '! NotFound'
      )
    );
  }
});

exports.default = NotFound;
module.exports = exports['default'];