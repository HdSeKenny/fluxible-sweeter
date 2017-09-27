'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 - developed by Kenny
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ui - Input
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SweetInput = function (_React$Component) {
  _inherits(SweetInput, _React$Component);

  function SweetInput() {
    _classCallCheck(this, SweetInput);

    return _possibleConstructorReturn(this, (SweetInput.__proto__ || Object.getPrototypeOf(SweetInput)).apply(this, arguments));
  }

  _createClass(SweetInput, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.props.onChange(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          icon = _props.icon,
          format = _props.format,
          errorMessage = _props.errorMessage;

      return _react2.default.createElement(
        'div',
        { className: '' + (icon ? 'iconic-input' : '') },
        icon ? _react2.default.createElement('i', { className: icon }) : null,
        _react2.default.createElement('input', { type: format, autoComplete: 'off', className: 'form-control', onChange: function onChange(e) {
            return _this2.handleChange(e);
          } }),
        !errorMessage ? null : _react2.default.createElement(
          'p',
          { className: 'help-block text-left' },
          errorMessage
        )
      );
    }
  }]);

  return SweetInput;
}(_react2.default.Component);

SweetInput.propTypes = {
  icon: _propTypes2.default.string,
  format: _propTypes2.default.string,
  errorMessage: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  valid: _propTypes2.default.bool
};
exports.default = SweetInput;
module.exports = exports['default'];