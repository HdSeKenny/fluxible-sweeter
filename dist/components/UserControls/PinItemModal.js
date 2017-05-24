'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

class PinItemModal extends _react2.default.Component {

  render() {
    const { pin: pin, currentUser: currentUser, showModal: showModal } = this.props;
    if (pin.author && showModal) {
      return _react2.default.createElement(
        'section',
        { className: 'pin-item-modal mt-15 mb-20' },
        _react2.default.createElement(_UI.PinItem, { pin: pin, disabledClick: true, currentUser: currentUser }),
        _react2.default.createElement(_Pages.Comments, { blog: pin, isBlogsWell: true, currentUser: currentUser })
      );
    } else {
      return null;
    }
  }
}
exports.default = PinItemModal;
PinItemModal.propTypes = {
  pin: _propTypes2.default.object,
  currentUser: _propTypes2.default.object,
  showModal: _propTypes2.default.bool
};
module.exports = exports['default'];
