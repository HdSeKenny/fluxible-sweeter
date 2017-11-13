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

var _reactRouter = require('react-router');

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable all, camelcase */
var UserCard = function (_React$Component) {
  (0, _inherits3.default)(UserCard, _React$Component);

  function UserCard() {
    (0, _classCallCheck3.default)(this, UserCard);
    return (0, _possibleConstructorReturn3.default)(this, (UserCard.__proto__ || (0, _getPrototypeOf2.default)(UserCard)).apply(this, arguments));
  }

  (0, _createClass3.default)(UserCard, [{
    key: 'goToUserPage',
    value: function goToUserPage(username, str) {
      var url = str ? '/' + username + '/' + str : '/' + username;
      this.context.router.push(url);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$user = this.props.user,
          image_url = _props$user.image_url,
          username = _props$user.username,
          background_image_url = _props$user.background_image_url,
          focuses = _props$user.focuses,
          fans = _props$user.fans,
          blogs = _props$user.blogs,
          signature = _props$user.signature;
      var _props = this.props,
          showSignature = _props.showSignature,
          showFollow = _props.showFollow;

      var focusNum = focuses.length;
      var fansNum = fans.length;
      var blogsNum = blogs.length;
      var cardBgImageStyle = {
        height: '50%',
        paddingTop: '13%',
        backgroundImage: 'url(' + background_image_url + ')',
        backgroundSize: 'cover'
      };
      var defaultFocusUrl = 'follows?title=focuses_list';
      var defaultFanUrl = 'follows?title=fans_list';
      return _react2.default.createElement(
        'div',
        { className: 'user-card' },
        _react2.default.createElement(
          'div',
          { className: 'uc-bg', style: cardBgImageStyle },
          _react2.default.createElement(
            _Layout.Row,
            { className: 'uc-image' },
            _react2.default.createElement(
              _Layout.Col,
              { size: '3 p-0' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' + username },
                _react2.default.createElement('img', { src: image_url, alt: 'user' })
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '5 pl-0' },
              _react2.default.createElement(
                'h4',
                { className: 'uc-name' },
                username
              )
            ),
            showFollow && _react2.default.createElement(
              _Layout.Col,
              { size: '4 tar' },
              _react2.default.createElement(
                'button',
                { className: 'follow-btn sm' },
                'Follow'
              )
            )
          )
        ),
        showSignature && _react2.default.createElement(
          'div',
          { className: 'uc-signature tac' },
          _react2.default.createElement(
            'p',
            null,
            signature
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          { className: 'uc-detail ' + (!showSignature && 'mt-20') },
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 u-info', onClick: function onClick() {
                return _this2.goToUserPage(username, defaultFocusUrl);
              } },
            _react2.default.createElement(
              'h5',
              { className: 'title' },
              'Focuses'
            ),
            _react2.default.createElement(
              'h5',
              { className: 'number' },
              focusNum
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 u-info', onClick: function onClick() {
                return _this2.goToUserPage(username, defaultFanUrl);
              } },
            _react2.default.createElement(
              'h5',
              { className: 'title' },
              'Fans'
            ),
            _react2.default.createElement(
              'h5',
              { className: 'number' },
              fansNum
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 u-info', onClick: function onClick() {
                return _this2.goToUserPage(username);
              } },
            _react2.default.createElement(
              'h5',
              { className: 'title' },
              'Blogs'
            ),
            _react2.default.createElement(
              'h5',
              { className: 'number' },
              blogsNum
            )
          )
        )
      );
    }
  }]);
  return UserCard;
}(_react2.default.Component);

UserCard.displayName = 'UserCard';
UserCard.propTypes = {
  user: _propTypes2.default.object,
  showSignature: _propTypes2.default.bool,
  showFollow: _propTypes2.default.bool
};
UserCard.contextTypes = {
  router: _reactRouter.routerShape.isRequired
};
exports.default = UserCard;
module.exports = exports['default'];