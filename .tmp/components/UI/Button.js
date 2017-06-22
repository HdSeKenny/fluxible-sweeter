'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ({ icon: icon, label: label, size: size, color: color, classes: classes, onClick: onClick, style: style, tooltip: tooltip, rounded = false }) => {
  const buttonIcon = icon ? _react2.default.createElement('i', { className: `${label ? 'm-r-xs' : ''} fa ${icon}` }) : null;
  const buttonLabel = label ? _react2.default.createElement(
    'span',
    { className: 'text' },
    label
  ) : null;
  const btnClassName = `btn ${color} ${size} ${classes} ${rounded ? 'btn-rounded' : ''}`;
  return _react2.default.createElement(
    'button',
    { style: style, 'data-balloon': tooltip, onClick: onClick, className: btnClassName },
    buttonIcon,
    buttonLabel
  );
}; /* eslint-disable react/prop-types */


module.exports = exports['default'];
