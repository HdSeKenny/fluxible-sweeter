'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _utils = require('../../utils');

var _plugins = require('../../plugins');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserBlogs = (0, _createReactClass2.default)({

  displayName: 'UserBlogs',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    params: _propTypes2.default.object,
    location: _propTypes2.default.object
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { username: username } = this.props.params;
    const userStore = this.getStore(_stores.UserStore);
    const user = userStore.getUserByUsername(username);
    const currentUser = userStore.getCurrentUser();
    const isCurrentUser = userStore.isCurrentUser();

    return {
      currentUser: currentUser,
      user: user,
      isCurrentUser: isCurrentUser
    };
  },
  onChange: function () {},
  onUpdateBlog: function (blog) {
    if (!blog.title) {
      return _plugins.swal.error('Please enter title !');
    }

    if (!blog.content) {
      return _plugins.swal.error('Please enter content');
    }

    this.executeAction(_actions.BlogActions.UpdateBlog, blog);
  },
  onDeleteBlog: function (blog) {
    _plugins.swal.confirm('Are you sure?', 'Yes, delete it!', () => {
      this.executeAction(_actions.BlogActions.DeleteBlog, blog);
    });
  },
  _renderCurrentUserContentRight: function (displayBlogs) {
    const sortedBlogs = _utils.jsUtils.sortByDate(displayBlogs);
    return _react2.default.createElement(
      'div',
      { className: 'list-blogs' },
      _react2.default.createElement(
        'div',
        { className: 'tips mb-10' },
        _react2.default.createElement(
          'span',
          { 'data-balloon': '\'A\': article, \'S\': sweet', 'data-balloon-pos': 'right' },
          _react2.default.createElement('i', { className: 'fa fa-info-circle', 'aria-hidden': 'true' })
        )
      ),
      sortedBlogs.map((blog, index) => {
        const fromNow = _utils.format.fromNow(blog.created_at);
        const isArticle = blog.type === 'article';
        const text = _utils.jsUtils.shorten(blog.text, 40);
        return _react2.default.createElement(
          _Layout.Row,
          { key: index, className: 'mb-10' },
          _react2.default.createElement(
            _Layout.Col,
            { size: '1 type' },
            isArticle ? 'A' : 'S'
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '7 p-0' },
            isArticle && _react2.default.createElement(
              'p',
              { className: 'title' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: `/${blog.id_str}/details` },
                blog.title
              )
            ),
            !isArticle && _react2.default.createElement(
              'p',
              { className: 'text' },
              text
            ),
            _react2.default.createElement(
              'p',
              { className: 'date' },
              fromNow
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '4 tar pr-0 option-btns' },
            isArticle && _react2.default.createElement(
              'button',
              { className: 'btn btn-warning btn-sm', onClick: () => this.onEditBlog(blog) },
              _react2.default.createElement('i', { className: 'fa fa-pencil' }),
              ' Edit'
            ),
            _react2.default.createElement(
              'button',
              { className: 'btn btn-danger btn-sm ml-10', onClick: () => this.onDeleteBlog(blog) },
              _react2.default.createElement('i', { className: 'fa fa-trash' }),
              ' Delete'
            )
          )
        );
      })
    );
  },
  render: function () {
    const { isCurrentUser: isCurrentUser } = this.state;
    const { displayMineBlogs: displayMineBlogs } = this.props;
    return _react2.default.createElement(
      'div',
      { className: '' },
      isCurrentUser ? _react2.default.createElement(
        'div',
        { className: 'user-blogs-page' },
        this._renderCurrentUserContentRight(displayMineBlogs)
      ) : _react2.default.createElement('div', null)
    );
  }
});

exports.default = UserBlogs;
module.exports = exports['default'];
