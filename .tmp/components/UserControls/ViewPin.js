'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule viewPin
 */

class ViewPin extends _react.Component {

  constructor(props) {
    super(props);
    this.state = {
      errormessage: ''
    };
  }

  render() {
    let { pin: pin } = this.props;

    if (pin.author) {
      return _react2.default.createElement(
        'section',
        { style: { marginBottom: 0 } },
        _react2.default.createElement(
          'div',
          { className: 'panel-body m-b-none text-center' },
          _react2.default.createElement(
            'a',
            { href: pin.web_url, target: '_blank' },
            _react2.default.createElement('img', { style: { width: '100%', height: '100%' }, src: pin.image_url })
          )
        ),
        _react2.default.createElement(
          'footer',
          { className: 'panel-footer', style: { backgroundColor: '#ffffff', borderTop: 'none' } },
          _react2.default.createElement(
            'span',
            { className: 'thumb-sm avatar pull-left m-r-xs' },
            _react2.default.createElement('img', { src: pin.author.avatar ? pin.author.avatar : '' })
          ),
          _react2.default.createElement(
            'strong',
            { className: 'd-b' },
            pin.author.name
          ),
          _react2.default.createElement(
            'span',
            { className: 'text-muted text-xs' },
            (0, _moment2.default)(pin.dateCreated).fromNow()
          )
        )
      );
    } else {
      return null;
    }
  }
}
exports.default = ViewPin;
module.exports = exports['default'];
