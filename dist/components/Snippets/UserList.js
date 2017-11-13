'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserList = function (_React$Component) {
  (0, _inherits3.default)(UserList, _React$Component);

  function UserList() {
    (0, _classCallCheck3.default)(this, UserList);
    return (0, _possibleConstructorReturn3.default)(this, (UserList.__proto__ || (0, _getPrototypeOf2.default)(UserList)).apply(this, arguments));
  }

  (0, _createClass3.default)(UserList, [{
    key: 'render',
    value: function render() {
      var users = this.props.users;

      var sortedUsers = users.sort(function (a, b) {
        return a.fans - b.fans;
      });
      return _react2.default.createElement(
        'div',
        { className: 'user-list' },
        _react2.default.createElement(
          'h3',
          { className: 'title' },
          'Blog Stars'
        ),
        sortedUsers.map(function (u) {
          return _react2.default.createElement(
            _Layout.Row,
            { className: 'user', key: u.id_str },
            _react2.default.createElement(
              _Layout.Col,
              { size: '3 pl-0' },
              _react2.default.createElement('img', { src: u.image_url, alt: 'user' })
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '9 p-0' },
              _react2.default.createElement(
                'h4',
                { className: 'name' },
                u.username
              ),
              _react2.default.createElement(
                _Layout.Row,
                null,
                _react2.default.createElement(
                  _Layout.Col,
                  { size: '6 p-0' },
                  'Focuses ',
                  u.focuses.length
                ),
                _react2.default.createElement(
                  _Layout.Col,
                  { size: '6 p-0' },
                  'Fans ',
                  u.fans.length
                )
              )
            )
          );
        })
      );
    }
  }]);
  return UserList;
}(_react2.default.Component);

UserList.displayName = 'UserList';
UserList.propTypes = {
  users: _propTypes2.default.array
};
exports.default = UserList;
module.exports = exports['default'];