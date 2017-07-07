'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = exports.Col = exports.Row = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Layout = {};

/**
 * [getColSizeClassName description]
 * @param  {string || object} size
 * @return {string}
 * example col-xs-1, col-md-1...
 */
/* eslint-disable react/prop-types */
function getColSizeClassName(size) {
  let colSize = '';
  if (size) {
    if (typeof size === 'object') {
      colSize = Object.keys(size).map(k => {
        return `col-${k}-${size[k]} `;
      }).join(' ');
    } else {
      colSize = `col-xs-${size}`;
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
  let offsetSize = '';
  if (offset) {
    if (typeof offset === 'object') {
      offsetSize = Object.keys(offset).map(k => {
        return `col-${k}-offset-${offset[k]} `;
      }).join(' ');
    } else {
      offsetSize = `col-xs-offset-${offset}`;
    }
  }

  return offsetSize;
}

Layout.Row = ({ children: children, className: className, mason: mason }) => {
  let classesString = 'row';
  if (className) {
    classesString = `${classesString} ${className}`;
    if (mason) {
      classesString = `${classesString} ${mason}`;
    }
  }
  return _react2.default.createElement(
    'div',
    { className: classesString },
    children
  );
};

Layout.Col = ({ children: children, size: size, offset: offset, className: className, style: style }) => {
  const colSize = getColSizeClassName(size);
  const offsetSize = getOffsetSizeClassName(offset);
  let classesString = '';
  if (colSize) {
    classesString = colSize;

    if (offsetSize) {
      classesString = `${classesString} ${offsetSize}`;
    }

    if (className) {
      classesString = `${classesString} ${offsetSize} ${className}`;
    }
  }
  return _react2.default.createElement(
    'div',
    { className: classesString, style: style },
    children
  );
};

Layout.Page = ({ children: children, height: height }) => _react2.default.createElement(
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

Layout.Scroller = ({ children: children, height: height }) => _react2.default.createElement(
  'div',
  { className: 'scrollable', style: { height: height } },
  children
);

const Row = exports.Row = Layout.Row;
const Col = exports.Col = Layout.Col;
const Page = exports.Page = Layout.Page;

exports.default = Layout;
