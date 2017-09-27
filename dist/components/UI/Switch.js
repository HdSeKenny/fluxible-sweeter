'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017 - developed by Kenny
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ui - Switch
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

    _this.state = {
      on: false
    };
    return _this;
  }

  _createClass(Switch, [{
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
}(_react2.default.Component);

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