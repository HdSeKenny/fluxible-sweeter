'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Layout = require('../UI/Layout');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserHomeNav extends _react2.default.Component {

  componentDidMount() {
    _utils.animations.fixed_left_nav('.user-info-others');
  }

  isActive(route) {
    return route === this.props.path ? 'active' : '';
  }

  goToUserPages(str) {
    this.context.router.push(str);
  }

  _renderUserInfo(user) {
    const { firstName: firstName, lastName: lastName, email: email, phone: phone, birthday: birthday, profession: profession, description: description } = user;
    const { currentUser: currentUser } = this.props;
    const isCurrentUser = currentUser ? user.id_str === currentUser.id_str : false;
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
  }

  render() {
    const { user: user, displayBlogs: displayBlogs, currentUser: currentUser } = this.props;
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
            { onClick: () => this.goToUserPages(`/${username}`) },
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
            { onClick: () => this.goToUserPages(`/${username}/follows`) },
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
            { onClick: () => this.goToUserPages(`/${username}/follows`) },
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
}
exports.default = UserHomeNav;
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
module.exports = exports['default'];
