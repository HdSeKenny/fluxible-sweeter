'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UI = require('../UI');

var _Pages = require('../Pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule PinItemModal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PinItemModal = function (_React$Component) {
  _inherits(PinItemModal, _React$Component);

  function PinItemModal() {
    _classCallCheck(this, PinItemModal);

    return _possibleConstructorReturn(this, (PinItemModal.__proto__ || Object.getPrototypeOf(PinItemModal)).apply(this, arguments));
  }

  _createClass(PinItemModal, [{
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