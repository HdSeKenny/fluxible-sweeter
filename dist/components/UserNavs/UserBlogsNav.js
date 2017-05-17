'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _stores = require('../../stores');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserBlogsNav = _react2.default.createClass({

  displayName: 'UserBlogsNav',

  mixins: [_FluxibleMixin2.default],

  getInitialState: function () {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser()
    };
  },
  isActive: function (route) {
    return route === this.props.path ? 'active' : '';
  },
  render: function () {
    const { currentUser: currentUser } = this.state;
    const { displayBlogs: displayBlogs } = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'user-blog-nav' },
      _react2.default.createElement(
        'div',
        { className: 'well second-left-well' },
        _react2.default.createElement(
          'li',
          { className: this.isActive(`/user-blogs/${currentUser.strId}/list`) },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: `/user-blogs/${currentUser.strId}/list` },
            _react2.default.createElement('i', { className: 'fa fa-book' }),
            ' Manage blogs'
          )
        ),
        _react2.default.createElement(
          'li',
          { className: this.isActive(`/user-blogs/${currentUser.strId}/add`) },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: `/user-blogs/${currentUser.strId}/add` },
            _react2.default.createElement('i', { className: 'fa fa-pencil' }),
            ' Write article'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '' },
            _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' })
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '' },
            _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' })
          )
        )
      )
    );
  }
});

exports.default = UserBlogsNav;
module.exports = exports['default'];
