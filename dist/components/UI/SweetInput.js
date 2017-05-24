'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2017 - developed by Kenny
 * ui - Input
 */

class SweetInput extends _react2.default.Component {

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    const { icon: icon, format: format, errorMessage: errorMessage } = this.props;
    return _react2.default.createElement(
      'div',
      { className: `${icon ? 'iconic-input' : ''}` },
      icon ? _react2.default.createElement('i', { className: icon }) : null,
      _react2.default.createElement('input', { type: format, autoComplete: 'off', className: 'form-control', onChange: e => this.handleChange(e) }),
      !errorMessage ? null : _react2.default.createElement(
        'p',
        { className: 'help-block text-left' },
        errorMessage
      )
    );
  }
}
exports.default = SweetInput;
SweetInput.propTypes = {
  icon: _propTypes2.default.string,
  format: _propTypes2.default.string,
  errorMessage: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  valid: _propTypes2.default.bool
};
module.exports = exports['default'];
