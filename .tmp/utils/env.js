'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  is_client: typeof window !== 'undefined',
  is_server: typeof window === 'undefined'
};
module.exports = exports['default'];
