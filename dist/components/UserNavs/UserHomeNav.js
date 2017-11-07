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

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserHomeNav = function (_React$Component) {
  (0, _inherits3.default)(UserHomeNav, _React$Component);

  function UserHomeNav() {
    (0, _classCallCheck3.default)(this, UserHomeNav);
    return (0, _possibleConstructorReturn3.default)(this, (UserHomeNav.__proto__ || (0, _getPrototypeOf2.default)(UserHomeNav)).apply(this, arguments));
  }

  (0, _createClass3.default)(UserHomeNav, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _utils.animations.fixed_left_nav('.user-info-others');
    }
  }, {
    key: 'isActive',
    value: function isActive(route) {
      return route === this.props.path ? 'active' : '';
    }
  }, {
    key: 'goToUserPages',
    value: function goToUserPages(str, qt) {
      if (qt) {
        _reactRouter.browserHistory.push({
          pathname: str,
          query: {
            title: qt
          }
        });
      } else {
        this.context.router.push(str);
      }
    }
  }, {
    key: '_renderUserInfo',
    value: function _renderUserInfo(user) {
      var _this2 = this;

      var firstName = user.firstName,
          lastName = user.lastName,
          email = user.email,
          phone = user.phone,
          birthday = user.birthday,
          profession = user.profession,
          description = user.description;
      var currentUser = this.props.currentUser;

      var isCurrentUser = currentUser ? user.id_str === currentUser.id_str : false;
      var displayUserName = isCurrentUser ? currentUser.username : user.username;
      return _react2.default.createElement(
        'div',
        { className: 'isNotCurrentUser' },
        _react2.default.createElement(
          _Layout.Row,
          { className: 'basic-info' },
          _react2.default.createElement(
            'p',
            { className: 'text' },
            'Personal Information',
            _react2.default.createElement(
              'span',
              { className: 'more', onClick: function onClick() {
                  return _this2.goToUserPages('/' + displayUserName + '/personal');
                } },
              !isCurrentUser ? 'more' : 'edit'
            )
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement('i', { className: 'fa fa-user' }),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'info-field' },
            firstName,
            ' ',
            lastName
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement('i', { className: 'fa fa-envelope' }),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'info-field' },
            email
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement('i', { className: 'fa fa-phone' }),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'info-field' },
            phone || 'No phone'
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement('i', { className: 'fa fa-birthday-cake' }),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'info-field' },
            birthday || 'No birthday'
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement('i', { className: 'fa fa-briefcase' }),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'info-field' },
            profession || 'No profession'
          )
        ),
        _react2.default.createElement(
          _Layout.Row,
          null,
          _react2.default.createElement('i', { className: 'fa fa-book' }),
          ' ',
          _react2.default.createElement(
            'span',
            { className: 'info-field' },
            description || 'No description'
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          user = _props.user,
          displayBlogs = _props.displayBlogs,
          currentUser = _props.currentUser;

      var displayUser = user || currentUser;
      var username = displayUser.username,
          fans = displayUser.fans,
          focuses = displayUser.focuses;


      if (!displayUser) return Swal.info('You need login');

      return _react2.default.createElement(
        'div',
        { className: 'user-home-left' },
        _react2.default.createElement(
          _Layout.Row,
          { className: 'blog-tips' },
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 tip-li p-0' },
            _react2.default.createElement(
              'p',
              { onClick: function onClick() {
                  return _this3.goToUserPages('/' + username);
                } },
              displayBlogs.length
            ),
            _react2.default.createElement(
              'span',
              null,
              'Blogs'
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 tip-li p-0' },
            _react2.default.createElement(
              'p',
              { onClick: function onClick() {
                  return _this3.goToUserPages('/' + username + '/follows', 'focuses_list');
                } },
              fans.length
            ),
            _react2.default.createElement(
              'span',
              null,
              'Fans'
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 tip-li p-0' },
            _react2.default.createElement(
              'p',
              { onClick: function onClick() {
                  return _this3.goToUserPages('/' + username + '/follows', 'focuses_list');
                } },
              focuses.length
            ),
            _react2.default.createElement(
              'span',
              null,
              'Focus'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'user-info-others' },
          _react2.default.createElement(
            _Layout.Row,
            { className: 'user-info' },
            this._renderUserInfo(displayUser)
          ),
          _react2.default.createElement(_Layout.Row, { className: 'others' })
        )
      );
    }
  }]);
  return UserHomeNav;
}(_react2.default.Component);

UserHomeNav.displayName = 'UserHomeNav';
UserHomeNav.contextTypes = {
  router: _reactRouter.routerShape.isRequired,
  executeAction: _propTypes2.default.func
};
UserHomeNav.propTypes = {
  path: _propTypes2.default.string,
  user: _propTypes2.default.object,
  displayBlogs: _propTypes2.default.array,
  currentUser: _propTypes2.default.object
};
exports.default = UserHomeNav;
module.exports = exports['default'];