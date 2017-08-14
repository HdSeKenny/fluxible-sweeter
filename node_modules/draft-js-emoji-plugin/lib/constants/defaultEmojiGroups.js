'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fa = require('react-icons/lib/fa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultEmojiGroups = [{
  title: 'People',
  icon: _react2.default.createElement(_fa.FaSmileO, { style: { verticalAlign: '' } }),
  categories: ['people']
}, {
  title: 'Nature',
  icon: _react2.default.createElement(_fa.FaPaw, { style: { verticalAlign: '' } }),
  categories: ['nature']
}, {
  title: 'Food & Drink',
  icon: _react2.default.createElement(_fa.FaCutlery, { style: { verticalAlign: '' } }),
  categories: ['food']
}, {
  title: 'Activity',
  icon: _react2.default.createElement(_fa.FaFutbolO, { style: { verticalAlign: '' } }),
  categories: ['activity']
}, {
  title: 'Travel & Places',
  icon: _react2.default.createElement(_fa.FaPlane, { style: { verticalAlign: '' } }),
  categories: ['travel']
}, {
  title: 'Objects',
  icon: _react2.default.createElement(_fa.FaBell, { style: { verticalAlign: '' } }),
  categories: ['objects']
}, {
  title: 'Symbols',
  icon: _react2.default.createElement(_fa.FaHeart, { style: { verticalAlign: '' } }),
  categories: ['symbols']
}, {
  title: 'Flags',
  icon: _react2.default.createElement(_fa.FaFlag, { style: { verticalAlign: '' } }),
  categories: ['flags']
}];

exports.default = defaultEmojiGroups;