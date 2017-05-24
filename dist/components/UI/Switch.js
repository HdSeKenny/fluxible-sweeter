'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Switch extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      on: false
    };
  }

  onSwitchCheckBox() {
    this.setState({ on: !this.state.on });
  }

  render() {
    const switchStyleOn = {
      borderColor: 'rgb(0,169,218)',
      boxShadow: 'rgb(0,169,218) 0px 0px 0px 0px inset',
      transition: 'border 0.4s, box-shadow 0.4s, background-color 1.2s',
      WebkitTransition: 'border 0.4s, box-shadow 0.4s, background-color 1.2s',
      backgroundColor: 'rgb(0,169,218)'
    };

    const switchStyleOff = {
      borderColor: 'rgb(232, 232, 232)',
      boxShadow: 'rgb(232, 232, 232) 0px 0px 0px 0px inset',
      backgroundColor: 'rgb(232, 232, 232)'
    };

    const buttonStyleOn = {
      left: 13,
      transition: 'left 0.2s',
      WebkitTransition: 'left 0.2s',
      backgroundColor: 'rgb(255, 255, 255)'
    };

    const buttonStyleOff = {
      left: 0
    };
    const { before: before, after: after } = this.props;
    const spanMergeParam = !this.state.on ? switchStyleOff : {};
    const btnMergeParam = !this.state.on ? buttonStyleOff : {};
    const switchSpan = (0, _reactAddonsUpdate2.default)(switchStyleOn, { $merge: spanMergeParam });
    const switchBtn = (0, _reactAddonsUpdate2.default)(buttonStyleOn, { $merge: btnMergeParam });

    return _react2.default.createElement(
      'div',
      { className: 'switch-checkbox' },
      _react2.default.createElement('input', { type: 'checkbox', className: 'js-switch-small', style: { display: 'none' } }),
      _react2.default.createElement(
        'span',
        { className: 'switchery switchery-small', style: switchSpan, onClick: () => this.onSwitchCheckBox() },
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
} /**
   * Copyright 2017 - developed by Kenny
   * All rights reserved.
   *
   * ui - Switch
   */

Switch.propTypes = {
  onChange: _propTypes2.default.func,
  on: _propTypes2.default.bool,
  className: _propTypes2.default.string
};
Switch.defaultProps = {
  on: false
};
exports.default = Switch;
module.exports = exports['default'];
