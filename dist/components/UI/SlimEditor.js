'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _plugins = require('../../plugins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React Component
class SlimEditor extends _react2.default.Component {

  componentDidMount() {
    this.instance = _plugins.Slim ? _plugins.Slim.create(_reactDom2.default.findDOMNode(this), this.props) : null;
  }

  render() {
    return _react2.default.createElement(
      'div',
      { className: 'slim' },
      this.props.children
    );
  }
}
exports.default = SlimEditor;

// Slim (place slim CSS and module js file in same folder as this file)
/*
 * Slim v4.6.3 - Image Cropping Made Easy
 * Copyright (c) 2017 Rik Schennink - http://slimimagecropper.com
 */
// Necessary React Modules

SlimEditor.propTypes = {
  children: _react2.default.PropTypes.object
};
module.exports = exports['default'];
