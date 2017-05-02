'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layout = require('../UI/Layout');

var _UI = require('../UI');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListLeftNav extends _react.Component {

  // constructor(props) {
  //   super(props);
  // }


  render() {

    return _react2.default.createElement('section', { className: 'list-left-nav' });
  }
}
exports.default = ListLeftNav;
ListLeftNav.displayName = 'ListLeftNav';
ListLeftNav.propTypes = {};
module.exports = exports['default'];
