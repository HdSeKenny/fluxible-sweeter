'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = exports.Col = exports.Row = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable react/prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = {};

/**
 * [getColSizeClassName description]
 * @param  {string || object} size
 * @return {string}
 * example col-xs-1, col-md-1...
 */
function getColSizeClassName(size) {
  var colSize = '';
  if (size) {
    if ((typeof size === 'undefined' ? 'undefined' : _typeof(size)) === 'object') {
      colSize = Object.keys(size).map(function (k) {
        return 'col-' + k + '-' + size[k] + ' ';
      }).join(' ');
    } else {
      colSize = 'col-xs-' + size;
    }
  }

  return colSize;
}

/**
 * [getOffsetSizeClassName description]
 * @param  {object || string} offset
 * @return {string}
 * example col-xs-offset-1, col-md-offset-1...
 */
function getOffsetSizeClassName(offset) {
  var offsetSize = '';
  if (offset) {
    if ((typeof offset === 'undefined' ? 'undefined' : _typeof(offset)) === 'object') {
      offsetSize = Object.keys(offset).map(function (k) {
        return 'col-' + k + '-offset-' + offset[k] + ' ';
      }).join(' ');
    } else {
      offsetSize = 'col-xs-offset-' + offset;
    }
  }

  return offsetSize;
}

Layout.Row = function (_ref) {
  var children = _ref.children,
      className = _ref.className,
      mason = _ref.mason,
      onClick = _ref.onClick;

  var classesString = 'row';
  if (className) {
    classesString = classesString + ' ' + className;
    if (mason) {
      classesString = classesString + ' ' + mason;
    }
  }
  return _react2.default.createElement(
    'div',
    { className: classesString, onClick: onClick },
    children
  );
};

Layout.Col = function (_ref2) {
  var children = _ref2.children,
      size = _ref2.size,
      offset = _ref2.offset,
      className = _ref2.className,
      style = _ref2.style,
      onClick = _ref2.onClick;

  var colSize = getColSizeClassName(size);
  var offsetSize = getOffsetSizeClassName(offset);
  var classesString = '';
  if (colSize) {
    classesString = colSize;

    if (offsetSize) {
      classesString = classesString + ' ' + offsetSize;
    }

    if (className) {
      classesString = classesString + ' ' + offsetSize + ' ' + className;
    }
  }
  return _react2.default.createElement(
    'div',
    { className: classesString, style: style, onClick: onClick },
    children
  );
};

Layout.Page = function (_ref3) {
  var children = _ref3.children,
      height = _ref3.height;
  return _react2.default.createElement(
    'section',
    { className: 'vbox', style: height ? { height: height } : {} },
    _react2.default.createElement(
      'section',
      { className: 'scrollable' },
      _react2.default.createElement(
        'div',
        { className: 'container full content-body' },
        children
      )
    )
  );
};

Layout.Scroller = function (_ref4) {
  var children = _ref4.children,
      height = _ref4.height;
  return _react2.default.createElement(
    'div',
    { className: 'scrollable', style: { height: height } },
    children
  );
};

var Row = exports.Row = Layout.Row;
var Col = exports.Col = Layout.Col;
var Page = exports.Page = Layout.Page;

exports.default = Layout;