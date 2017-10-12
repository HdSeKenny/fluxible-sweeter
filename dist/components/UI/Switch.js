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

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Switch = function (_React$Component) {
  (0, _inherits3.default)(Switch, _React$Component);

  function Switch(props) {
    (0, _classCallCheck3.default)(this, Switch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Switch.__proto__ || (0, _getPrototypeOf2.default)(Switch)).call(this, props));

    _this.state = {
      on: false
    };
    return _this;
  }

  (0, _createClass3.default)(Switch, [{
    key: 'onSwitchCheckBox',
    value: function onSwitchCheckBox() {
      this.setState({ on: !this.state.on }, function () {
        // this.props.rememberMe();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var switchStyleOn = {
        borderColor: 'rgb(0,169,218)',
        boxShadow: 'rgb(0,169,218) 0px 0px 0px 0px inset',
        transition: 'border 0.4s, box-shadow 0.4s, background-color 1.2s',
        WebkitTransition: 'border 0.4s, box-shadow 0.4s, background-color 1.2s',
        backgroundColor: 'rgb(0,169,218)'
      };

      var switchStyleOff = {
        borderColor: 'rgb(232, 232, 232)',
        boxShadow: 'rgb(232, 232, 232) 0px 0px 0px 0px inset',
        backgroundColor: 'rgb(232, 232, 232)'
      };

      var buttonStyleOn = {
        left: 13,
        transition: 'left 0.2s',
        WebkitTransition: 'left 0.2s',
        backgroundColor: 'rgb(255, 255, 255)'
      };

      var buttonStyleOff = {
        left: 0
      };
      var after = this.props.after;

      var spanMergeParam = !this.state.on ? switchStyleOff : {};
      var btnMergeParam = !this.state.on ? buttonStyleOff : {};
      var switchSpan = (0, _reactAddonsUpdate2.default)(switchStyleOn, { $merge: spanMergeParam });
      var switchBtn = (0, _reactAddonsUpdate2.default)(buttonStyleOn, { $merge: btnMergeParam });

      return _react2.default.createElement(
        'div',
        { className: 'switch-checkbox' },
        _react2.default.createElement('input', { type: 'checkbox', className: 'js-switch-small', style: { display: 'none' } }),
        _react2.default.createElement(
          'span',
          { className: 'switchery switchery-small', style: switchSpan, onClick: function onClick() {
              return _this2.onSwitchCheckBox();
            } },
          _react2.default.createElement('small', { style: switchBtn })
        ),
        ' ',
        after ? _react2.default.createElement(
          'span',
          { className: 'pl-5' },
          after
        ) : ''
      );
    }
  }]);
  return Switch;
}(_react2.default.Component); /**
                               * Copyright 2017 - developed by Kenny
                               * All rights reserved.
                               *
                               * ui - Switch
                               */

Switch.propTypes = {
  onChange: _propTypes2.default.func,
  rememberMe: _propTypes2.default.func,
  on: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  before: _propTypes2.default.string,
  after: _propTypes2.default.string
};
Switch.defaultProps = {
  on: false
};
exports.default = Switch;
module.exports = exports['default'];