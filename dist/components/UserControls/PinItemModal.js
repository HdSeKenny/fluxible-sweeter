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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UI = require('../UI');

var _Pages = require('../Pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule PinItemModal
 */

var PinItemModal = function (_React$Component) {
  (0, _inherits3.default)(PinItemModal, _React$Component);

  function PinItemModal() {
    (0, _classCallCheck3.default)(this, PinItemModal);
    return (0, _possibleConstructorReturn3.default)(this, (PinItemModal.__proto__ || (0, _getPrototypeOf2.default)(PinItemModal)).apply(this, arguments));
  }

  (0, _createClass3.default)(PinItemModal, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          pin = _props.pin,
          currentUser = _props.currentUser,
          showModal = _props.showModal;

      if (pin.author && showModal) {
        return _react2.default.createElement(
          'section',
          { className: 'pin-item-modal mt-20 mb-30 ml-10 mr-10' },
          _react2.default.createElement(_UI.PinItem, { pin: pin, disabledClick: true, currentUser: currentUser }),
          _react2.default.createElement(_Pages.Comments, { blog: pin, isSweet: true, currentUser: currentUser, isModal: true })
        );
      } else {
        return null;
      }
    }
  }]);
  return PinItemModal;
}(_react2.default.Component);

PinItemModal.propTypes = {
  pin: _propTypes2.default.object,
  currentUser: _propTypes2.default.object,
  showModal: _propTypes2.default.bool
};
exports.default = PinItemModal;
module.exports = exports['default'];