'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Layout = require('../UI/Layout');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserHomeNav = _react2.default.createClass({

  displayName: 'UserHomeNav',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    path: _react2.default.PropTypes.string,
    isCurrentUser: _react2.default.PropTypes.bool,
    user: _react2.default.PropTypes.object,
    displayBlogs: _react2.default.PropTypes.array,
    currentUser: _react2.default.PropTypes.object
  },

  getInitialState: function () {
    return {};
  },
  componentDidMount: function () {
    _utils.animations.fixed_left_nav('.isNotCurrentUser');
  },
  isActive: function (route) {
    return route === this.props.path ? 'active' : '';
  },
  goToUserPages: function (str) {
    this.context.router.push(str);
  },
  _renderUserInfo: function (isCurrentUser, user) {
    const { firstName: firstName, lastName: lastName, email: email, phone: phone, birthday: birthday, profession: profession, description: description } = user;
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
            { className: 'more' },
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
  },
  render: function () {
    const { user: user, displayBlogs: displayBlogs, currentUser: currentUser, isCurrentUser: isCurrentUser } = this.props;
    const displayUser = user || currentUser;
    const { username: username, fans: fans, focuses: focuses } = displayUser;
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
            { onClick: this.goToUserPages.bind(this, `/${username}/blogs`) },
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
            { onClick: this.goToUserPages.bind(this, `/${username}/follows`) },
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
            { onClick: this.goToUserPages.bind(this, `/${username}/follows`) },
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
        _Layout.Row,
        { className: 'user-info' },
        this._renderUserInfo(isCurrentUser, displayUser)
      ),
      _react2.default.createElement(_Layout.Row, { className: 'others' })
    );
  }
});

exports.default = UserHomeNav;
module.exports = exports['default'];
