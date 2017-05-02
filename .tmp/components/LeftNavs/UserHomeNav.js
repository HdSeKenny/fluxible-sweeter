'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserHomeNav = _react2.default.createClass({

  displayName: 'UserHomeNav',

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
  isActive: function (route) {
    return route === this.props.path ? 'active' : '';
  },
  render: function () {
    const { isCurrentUser: isCurrentUser, user: user, displayBlogs: displayBlogs, currentUser: currentUser } = this.props;
    const displayUser = user || currentUser;
    return _react2.default.createElement(
      'div',
      { className: 'user-home-nav' },
      !isCurrentUser && _react2.default.createElement(
        'div',
        { className: 'well first-left-well' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-4' },
            _react2.default.createElement(
              'p',
              null,
              'Blogs'
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: `/user-blogs/${displayUser.strId}/list` },
              displayBlogs.length
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-4' },
            _react2.default.createElement(
              'p',
              null,
              'Fans'
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: `/user-follows/${displayUser.strId}/list` },
              displayUser.fans.length
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-4' },
            _react2.default.createElement(
              'p',
              null,
              'Focus'
            ),
            _react2.default.createElement(
              _reactRouter.Link,
              { to: `/user-follows/${displayUser.strId}/list` },
              displayUser.focuses.length
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'well second-left-well' },
        isCurrentUser && _react2.default.createElement(
          'div',
          { className: 'isCurrentUser' },
          _react2.default.createElement(
            'li',
            { className: this.isActive(`/user-home/${displayUser.strId}/home`) },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: `/user-blogs/${displayUser.strId}/list` },
              _react2.default.createElement('i', { className: 'fa fa-star-o' }),
              ' Moments'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: '' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: `/user-home/${displayUser.strId}/home` },
              _react2.default.createElement('i', { className: 'fa fa-comment' }),
              ' Related Info'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: `/user-home/${displayUser.strId}/home` },
              _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' }),
              ' '
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: `/user-home/${displayUser.strId}/home` },
              _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' }),
              ' '
            )
          )
        ),
        !isCurrentUser && _react2.default.createElement(
          'div',
          { className: 'isNotCurrentUser' },
          _react2.default.createElement(
            'div',
            { className: 'basic-info' },
            _react2.default.createElement(
              'h5',
              null,
              'Basic Information'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            'Name : ',
            _react2.default.createElement(
              'span',
              { className: 'info-field' },
              displayUser.firstName,
              ' ',
              displayUser.lastName
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            'Email : ',
            _react2.default.createElement(
              'span',
              { className: 'info-field' },
              displayUser.email
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            'Phone : ',
            _react2.default.createElement(
              'span',
              { className: 'info-field' },
              displayUser.phone
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            'Birthday : ',
            _react2.default.createElement(
              'span',
              { className: 'info-field' },
              displayUser.birthday
            )
          )
        )
      )
    );
  }
});

exports.default = UserHomeNav;
module.exports = exports['default'];
