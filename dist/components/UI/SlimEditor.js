'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _plugins = require('../../plugins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React Component
/*
 * Slim v4.6.3 - Image Cropping Made Easy
 * Copyright (c) 2017 Rik Schennink - http://slimimagecropper.com
 */
// Necessary React Modules
var SlimEditor = function (_React$Component) {
  (0, _inherits3.default)(SlimEditor, _React$Component);

  function SlimEditor() {
    (0, _classCallCheck3.default)(this, SlimEditor);
    return (0, _possibleConstructorReturn3.default)(this, (SlimEditor.__proto__ || (0, _getPrototypeOf2.default)(SlimEditor)).apply(this, arguments));
  }

  (0, _createClass3.default)(SlimEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.instance = _plugins.slim ? _plugins.slim.create(_reactDom2.default.findDOMNode(this), this.props) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'slim' },
        this.props.children
      );
    }
  }]);
  return SlimEditor;
}(_react2.default.Component);

// Slim (place slim CSS and module js file in same folder as this file)


SlimEditor.propTypes = {
  children: _propTypes2.default.object
};
exports.default = SlimEditor;
module.exports = exports['default'];