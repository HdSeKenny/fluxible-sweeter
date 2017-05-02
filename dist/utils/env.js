'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  CLIENT: typeof window !== 'undefined',
  SERVER: typeof window === 'undefined'
};
module.exports = exports['default'];
