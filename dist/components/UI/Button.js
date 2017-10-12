'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var icon = _ref.icon,
      label = _ref.label,
      size = _ref.size,
      color = _ref.color,
      classes = _ref.classes,
      onClick = _ref.onClick,
      style = _ref.style,
      tooltip = _ref.tooltip,
      _ref$rounded = _ref.rounded,
      rounded = _ref$rounded === undefined ? false : _ref$rounded;

  var buttonIcon = icon ? _react2.default.createElement('i', { className: (label ? 'm-r-xs' : '') + ' fa ' + icon }) : null;
  var buttonLabel = label ? _react2.default.createElement(
    'span',
    { className: 'text' },
    label
  ) : null;
  var btnClassName = 'btn ' + color + ' ' + size + ' ' + classes + ' ' + (rounded ? 'btn-rounded' : '');
  return _react2.default.createElement(
    'button',
    { style: style, 'data-balloon': tooltip, onClick: onClick, className: btnClassName },
    buttonIcon,
    buttonLabel
  );
}; /* eslint-disable react/prop-types */


module.exports = exports['default'];