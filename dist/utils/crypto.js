'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  hashCrypto: function (content) {
    return _crypto2.default.createHmac('sha1', this.getPrivateKey()).update(content).digest('hex');
  },
  getPrivateKey: function () {
    return 'qhe9gfRxWIrJVt2bXP9ltwzup1hWnvYEQ';
  }
};
module.exports = exports['default'];
