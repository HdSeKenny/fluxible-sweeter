'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Copyright 2017 - developed by Kenny
                                                                                                                                                                                                                                                                   * ui - Input
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Input extends _react.Component {

  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  handleChange(e) {
    this.validate(e);
    this.props.onFieldChange(e);
  }

  isValid() {
    return this.state.valid;
  }

  validate(e) {
    const val = e.currentTarget.value;
    if (this.props.required) {
      if (!val) {
        this.setState({ valid: false });
        return;
      }
      this.setState({ valid: this.validateFormat(this.props.format, val) });
    } else {
      this.setState({ valid: this.validateFormat(this.props.format, val) });
    }
  }

  validateLength(val, minLength, maxLength) {
    return true;
  }

  validateFormat(format, val) {
    switch (format) {
      case 'email':
        return _utils.Validations.isEmail('', val);
      default:
        return true;
    }
  }

  render() {
    const { icon: icon, format: format, errorMessage: errorMessage, rounded: rounded, classes: classes } = this.props;
    const { valid: valid } = this.state;
    const iconComponent = icon ? _react2.default.createElement('i', { className: icon }) : null;
    const errorMsg = errorMessage || 'required';
    const error = valid ? null : _react2.default.createElement(
      'p',
      { className: 'help-block text-left' },
      errorMsg
    );
    return _react2.default.createElement(
      'div',
      { className: `${classes}` },
      _react2.default.createElement(
        'div',
        { className: `${icon ? 'iconic-input' : ''}` },
        iconComponent,
        _react2.default.createElement('input', _extends({
          type: format,
          autoComplete: 'off',
          className: `form-control ${rounded ? 'rounded' : ''}`,
          onChange: e => this.handleChange(e) }, this.props)),
        error
      )
    );
  }
}
exports.default = Input;
Input.propTypes = {
  icon: _react2.default.PropTypes.string,
  format: _react2.default.PropTypes.string,
  errorMessage: _react2.default.PropTypes.string,
  onFieldChange: _react2.default.PropTypes.func,
  required: _react2.default.PropTypes.bool,
  classes: _react2.default.PropTypes.string,
  rounded: _react2.default.PropTypes.bool,
  valid: _react2.default.PropTypes.bool
};
Input.defaultProps = {
  rounded: false
};
module.exports = exports['default'];
