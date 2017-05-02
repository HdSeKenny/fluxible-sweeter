'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

var _actions = require('../../actions');

var _stores = require('../../stores');

var _LeftNavs = require('../LeftNavs');

var _UI = require('../UI');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserBlogs = _react2.default.createClass({

  displayName: 'UserBlogs',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    params: _react2.default.PropTypes.object,
    location: _react2.default.PropTypes.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.BlogStore, _stores.UserStore]
  },

  getInitialState: function () {
    return this.getStatesFromStores();
  },
  getStatesFromStores: function () {
    const { userId: userId } = this.props.params;
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserById(userId),
      currentBlog: this.getStore(_stores.BlogStore).getCurrentBlog(),
      // deletedBlog: this.getStore(BlogStore).getDeletedBlog(),
      isUpdated: this.getStore(_stores.BlogStore).getIsUpdated(),
      isCurrentUser: this.getStore(_stores.UserStore).isCurrentUser(userId),
      displayBlogs: this.getStore(_stores.BlogStore).getBlogsByUserId(userId)
    };
  },
  onChange: function (res) {
    const { currentUser: currentUser } = this.state;
    const { userId: userId } = this.props.params;
    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      // this.setState({displayBlogs: this.getStore(BlogStore).getBlogsByUserId(currentUser._id)});
    }

    if (res.resMsg === 'UPDATE_BLOG_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState({
        displayBlogs: this.getStore(_stores.BlogStore).getBlogsByUserId(currentUser._id),
        currentBlog: this.getStore(_stores.BlogStore).getCurrentBlog(),
        isUpdated: this.getStore(_stores.BlogStore).getIsUpdated()
      });
    }

    if (res.resMsg === 'EDIT_BLOG' || res.resMsg === 'CANCEL_EDIT_BLOG') {
      this.setState({ currentBlog: this.getStore(_stores.BlogStore).getCurrentBlog() });
    }

    if (res.resMsg === 'CONFIRM_DELETE_BLOG' || res.resMsg === 'CANCEL_DELETE_BLOG') {
      // this.setState({deletedBlog: this.getStore(BlogStore).getDeletedBlog()})
    }

    if (res.resMsg === 'DELETE_BLOG_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      this.setState({
        // deletedBlog: this.getStore(BlogStore).getDeletedBlog(),
        displayBlogs: this.getStore(_stores.BlogStore).getBlogsByUserId(userId)
      });
    }

    this.setState({
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserById(userId),
      isCurrentUser: this.getStore(_stores.UserStore).isCurrentUser(userId)
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
      _sweetAlert2.default.alertErrorMessage('Please enter title !');
      return;
    }

    if (!blog.content) {
      _sweetAlert2.default.alertErrorMessage('Please enter content');
      return;
    }
    // eslint-disable-next-line no-param-reassign
    blog.title = `<< ${blog.title} >>`;
    this.executeAction(_actions.BlogActions.UpdateBlog, blog);
  },
  onDeleteBlog: function (blog) {
    _sweetAlert2.default.alertConfirmMessage('', () => {
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
            _reactBootstrap.Button,
            { className: 'btn btn-danger btn-sm delete-btn', onClick: this.onDeleteBlog.bind(this, blog) },
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'trash' }),
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
            _reactBootstrap.Button,
            {
              className: 'btn btn-danger btn-sm delete-btn',
              onClick: this.onDeleteBlog.bind(this, blog)
            },
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'trash' }),
            ' Delete'
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            {
              className: 'btn btn-primary btn-sm delete-btn',
              onClick: this.onEditBlog.bind(this, blog)
            },
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'pencil' }),
            ' Edit'
          )
        )
      )
    );
  },
  _renderCurrentUserContentLeft: function (pathname, currentUser, displayBlogs) {
    return _react2.default.createElement(_LeftNavs.UserBlogsNav, { path: pathname, currentUser: currentUser, displayBlogs: displayBlogs });
  },
  _renderCurrentUserContentRight: function (displayBlogs) {
    return _react2.default.createElement(
      'div',
      null,
      displayBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(blog => {
        const dateString = blog.created_at.toString();
        const blogDate = (0, _dateformat2.default)(dateString);
        if (blog.type === 'article') {
          return this._renderArticle(blog, blogDate);
        } else {
          return this._renderMicroBlog(blog, blogDate);
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
      _react2.default.createElement(_UserBar2.default, { path: pathname, user: user, isCurrentUser: isCurrentUser, currentUser: currentUser }),
      !isCurrentUser && _react2.default.createElement(
        'div',
        { className: 'user-blogs-content' },
        _react2.default.createElement(
          'div',
          { className: 'content-mid' },
          this._renderBlogsSearchBar(),
          _react2.default.createElement(_UI.BlogsWell, {
            displayBlogs: displayBlogs,
            changeShowCommentsState: this.changeShowCommentsState,
            changeBlogThumbsUpState: this.changeBlogThumbsUpState
          })
        )
      ),
      isCurrentUser && _react2.default.createElement(
        'div',
        { className: 'user-blogs-content' },
        _react2.default.createElement(
          'div',
          { className: 'content-left' },
          this._renderCurrentUserContentLeft(pathname, currentUser, displayBlogs)
        ),
        _react2.default.createElement(
          'div',
          { className: 'content-right' },
          this._renderBlogsSearchBar(),
          this._renderCurrentUserContentRight(displayBlogs)
        )
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
