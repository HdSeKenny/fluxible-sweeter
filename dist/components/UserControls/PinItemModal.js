'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UI = require('../UI');

var _Pages = require('../Pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PinItemModal extends _react.Component {

  render() {
    const { pin: pin } = this.props;
    if (pin.author) {
      return _react2.default.createElement(
        'section',
        { className: 'pin-item-modal mt-15 mb-20' },
        _react2.default.createElement(_UI.PinItem, { pin: pin, type: pin.type, disabledClick: true }),
        _react2.default.createElement(_Pages.Comments, { blog: pin, isBlogsWell: true })
      );
    } else {
      return null;
    }
  }
}
exports.default = PinItemModal; /**
                                 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
                                 * All rights reserved.
                                 *
                                 * This source code is licensed under the license found in the
                                 * LICENSE file in the root directory of this source tree.
                                 *
                                 * @providesModule PinItemModal
                                 */

PinItemModal.propTypes = {
  pin: _react2.default.PropTypes.object
};
module.exports = exports['default'];
