'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comments = exports.users = exports.blogs = undefined;

var _blog = require('./blog');

var _blog2 = _interopRequireDefault(_blog);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.blogs = _blog2.default;
exports.users = _user2.default;
exports.comments = _comment2.default;