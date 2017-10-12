'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BgIcon = (0, _createReactClass2.default)({
  getClassName: function getClassName() {
    return (0, _classnames2.default)({
      'bg-icon': true
    }, this.props.iconClassName, this.props.className);
  },
  render: function render() {
    var className = this.getClassName();
    return _react2.default.createElement(
      'span',
      (0, _extends3.default)({}, this.props, { className: className }),
      ' ',
      this.props.children,
      ' '
    );
  }
});

exports.default = BgIcon;
module.exports = exports['default'];