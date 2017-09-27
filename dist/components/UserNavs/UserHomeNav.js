'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Layout = require('../UI/Layout');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserHomeNav = function (_React$Component) {
  _inherits(UserHomeNav, _React$Component);

  function UserHomeNav() {
    _classCallCheck(this, UserHomeNav);

    return _possibleConstructorReturn(this, (UserHomeNav.__proto__ || Object.getPrototypeOf(UserHomeNav)).apply(this, arguments));
  }

  _createClass(UserHomeNav, [{
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


      if (!displayUser) return swal.info('You need login');

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