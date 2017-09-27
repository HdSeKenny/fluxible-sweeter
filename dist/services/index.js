'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comments = exports.users = exports.blogs = exports.language = undefined;

var _language2 = require('./language');

var _language3 = _interopRequireDefault(_language2);

var _blogs2 = require('./blogs');

var _blogs3 = _interopRequireDefault(_blogs2);

var _users2 = require('./users');

var _users3 = _interopRequireDefault(_users2);

var _comments2 = require('./comments');

var _comments3 = _interopRequireDefault(_comments2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.language = _language3.default;
exports.blogs = _blogs3.default;
exports.users = _users3.default;
exports.comments = _comments3.default;