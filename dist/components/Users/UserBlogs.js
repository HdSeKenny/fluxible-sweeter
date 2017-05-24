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

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _utils = require('../../utils');

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _actions = require('../../actions');

var _stores = require('../../stores');

var _UserControls = require('../UserControls');

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

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.BlogStore, _stores.UserStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { username: username } = this.props.params;
    const userStore = this.getStore(_stores.UserStore);
    const blogStore = this.getStore(_stores.BlogStore);
    const user = userStore.getUserByUsername(username);
    const currentUser = userStore.getCurrentUser();
    const isCurrentUser = currentUser.username === username;
    return {
      currentUser: currentUser,
      user: user,
      currentBlog: blogStore.getCurrentBlog(),
      // deletedBlog: blogStore.getDeletedBlog(),
      isUpdated: blogStore.getIsUpdated(),
      isCurrentUser: isCurrentUser,
      displayBlogs: blogStore.getBlogsWithUsername(currentUser, username)
    };
  },
  onChange: function (res) {
    const { currentUser: currentUser } = this.state;
    const { username: username } = this.props.params;
    if (res.msg === 'COMMENT_SUCCESS' || res.msg === 'DELETE_COMMENT_SUCCESS') {
      _utils.sweetAlert.success(res.msg);
      // this.setState({displayBlogs: this.getStore(BlogStore).getBlogsByUserId(currentUser._id)});
    }

    if (res.msg === 'UPDATE_BLOG_SUCCESS') {
      _utils.sweetAlert.success(res.msg);
      this.setState({
        displayBlogs: this.getStore(_stores.BlogStore).getBlogsByUserId(currentUser._id),
        currentBlog: this.getStore(_stores.BlogStore).getCurrentBlog(),
        isUpdated: this.getStore(_stores.BlogStore).getIsUpdated()
      });
    }

    if (res.msg === 'EDIT_BLOG' || res.msg === 'CANCEL_EDIT_BLOG') {
      this.setState({ currentBlog: this.getStore(_stores.BlogStore).getCurrentBlog() });
    }

    if (res.msg === 'CONFIRM_DELETE_BLOG' || res.msg === 'CANCEL_DELETE_BLOG') {
      // this.setState({deletedBlog: this.getStore(BlogStore).getDeletedBlog()})
    }

    if (res.msg === 'DELETE_BLOG_SUCCESS') {
      _utils.sweetAlert.success(res.msg);
      this.setState({
        // deletedBlog: this.getStore(BlogStore).getDeletedBlog(),
        displayBlogs: this.getStore(_stores.BlogStore).getBlogsByUserId(username)
      });
    }

    this.setState({
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(_stores.UserStore).isCurrentUser(username)
    });
  },
  onEditBlog: function (blog) {
    this.executeAction(_actions.BlogActions.EditBlog, blog);
  },
  onCancelEdit: function () {
    this.executeAction(_actions.BlogActions.CancelEditBlog);
  },
  onUpdateBlog: function (blog) {
    if (!blog.title) {
      _utils.sweetAlert.alertErrorMessage('Please enter title !');
      return;
    }

    if (!blog.content) {
      _utils.sweetAlert.alertErrorMessage('Please enter content');
      return;
    }
    // eslint-disable-next-line no-param-reassign
    blog.title = `<< ${blog.title} >>`;
    this.executeAction(_actions.BlogActions.UpdateBlog, blog);
  },
  onDeleteBlog: function (blog) {
    _utils.sweetAlert.alertConfirmMessage('', () => {
      this.executeAction(_actions.BlogActions.DeleteBlog, blog);
    });
  },
  onSearchBlog: function (e) {
    const searchText = e.target.value.toLocaleLowerCase();
    const { user: user } = this.state;
    const searchedBlogs = this.getStore(_stores.BlogStore).getSearchedBlogsWithUser(searchText, user);
    this.setState({ displayBlogs: searchedBlogs });
  },
  sortByType: function (e) {
    const sortText = e.target.value.toLocaleLowerCase();
    const { user: user } = this.state;
    const sortedBlogs = this.getStore(_stores.BlogStore).getSortedBlogsWithUser(sortText, user);
    this.setState({ displayBlogs: sortedBlogs });
  },
  changeShowCommentsState: function () {
    const { userId: userId } = this.props.params;
    this.setState({ displayBlogs: this.getStore(_stores.BlogStore).getBlogsByUserId(userId) });
  },
  changeBlogThumbsUpState: function () {
    this.setState(this.getStatesFromStores());
  },
  _renderMicroBlog: function (blog, blogDate) {
    return _react2.default.createElement(
      'div',
      { key: blog._id, className: 'well list-blogs micro-blog' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-8' },
          _react2.default.createElement(
            'div',
            { className: 'blog-title' },
            _react2.default.createElement(
              'h5',
              null,
              blog.content
            ),
            _react2.default.createElement(
              'h6',
              null,
              blogDate
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-4 blog-manage' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-danger btn-sm delete-btn', onClick: this.onDeleteBlog.bind(this, blog) },
            _react2.default.createElement('i', { className: 'fa fa-trash' }),
            ' Delete'
          )
        )
      )
    );
  },
  _renderArticle: function (blog, blogDate) {
    return _react2.default.createElement(
      'div',
      { key: blog._id, className: 'well list-blogs article' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-8' },
          _react2.default.createElement(
            'div',
            { className: 'blog-title' },
            _react2.default.createElement(
              'h4',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: `/blog-details/${blog._id}` },
                blog.title
              )
            ),
            _react2.default.createElement(
              'h6',
              null,
              blogDate
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-4 blog-manage' },
          _react2.default.createElement(
            'button',
            {
              className: 'btn btn-danger btn-sm delete-btn',
              onClick: this.onDeleteBlog.bind(this, blog)
            },
            _react2.default.createElement('i', { className: 'fa fa-trash' }),
            ' Delete'
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'btn btn-primary btn-sm delete-btn',
              onClick: this.onEditBlog.bind(this, blog)
            },
            _react2.default.createElement('i', { className: 'fa fa-pencil' }),
            ' Edit'
          )
        )
      )
    );
  },
  _renderCurrentUserContentLeft: function (pathname, currentUser, displayBlogs) {
    return _react2.default.createElement(UserBlogsNav, { path: pathname, currentUser: currentUser, displayBlogs: displayBlogs });
  },
  _renderCurrentUserContentRight: function (displayBlogs) {
    return _react2.default.createElement(
      'div',
      null,
      displayBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(blog => {
        const fromNow = _utils.format.fromNow(blog.created_at);
        if (blog.type === 'article') {
          return this._renderArticle(blog, fromNow);
        } else {
          return this._renderMicroBlog(blog, fromNow);
        }
      })
    );
  },
  _renderBlogsSearchBar: function () {
    return _react2.default.createElement(
      'div',
      { className: 'well search-bar' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-9 search-query' },
          _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Search', onChange: this.onSearchBlog }),
          _react2.default.createElement('i', { className: 'fa fa-search' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-3 sort-by' },
          _react2.default.createElement(
            'select',
            { className: 'form-control', onChange: this.sortByType },
            _react2.default.createElement(
              'option',
              null,
              'All blogs'
            ),
            _react2.default.createElement(
              'option',
              null,
              'Microblog'
            ),
            _react2.default.createElement(
              'option',
              null,
              'Article'
            )
          )
        )
      )
    );
  },
  render: function () {
    const {
      currentUser: currentUser,
      isCurrentUser: isCurrentUser,
      displayBlogs: displayBlogs,
      user: user,
      currentBlog: currentBlog,
      isUpdated: isUpdated
    } = this.state;
    const { pathname: pathname } = this.props.location;
    return _react2.default.createElement(
      'div',
      { className: 'user-blogs-page' },
      isCurrentUser && _react2.default.createElement(
        'div',
        { className: '' },
        this._renderCurrentUserContentRight(displayBlogs)
      ),
      currentBlog && _react2.default.createElement(_UserControls.BlogEditor, {
        show: currentBlog !== null,
        blog: currentBlog,
        onSave: this.onUpdateBlog,
        onCancel: this.onCancelEdit,
        isUpdated: isUpdated
      })
    );
  }
});

exports.default = UserBlogs;
module.exports = exports['default'];
