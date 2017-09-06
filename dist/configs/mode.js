'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  isSecure: _configs2.default.supported_modes === 'secure',
  isNSecure: _configs2.default.supported_modes === 'publicNSecure',
  isPublic: _configs2.default.supported_modes === 'public',
  isNotPublic: ['secure', 'publicNSecure'].includes(_configs2.default.supported_modes)
};
module.exports = exports['default'];
