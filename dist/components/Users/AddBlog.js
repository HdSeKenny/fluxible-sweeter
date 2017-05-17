'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _actions = require('../../actions');

var _stores = require('../../stores');

var _UserNavs = require('../UserNavs');

var _UserBar = require('./UserBar');

var _UserBar2 = _interopRequireDefault(_UserBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ReactDOM from 'react-dom';
const AddBlog = _react2.default.createClass({

  displayName: 'AddBlog',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    params: _react2.default.PropTypes.object,
    location: _react2.default.PropTypes.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    const { userId: userId } = this.props.params;
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      user: this.getStore(_stores.UserStore).getUserById(userId),
      isCurrentUser: this.getStore(_stores.UserStore).isCurrentUser(userId),
      title: '',
      content: ''
    };
  },
  onChange: function (res) {
    const { currentUser: currentUser } = this.state;
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessageWithCallback(res.msg, () => {
        this.context.router.push(`/user-blogs/${currentUser.strId}/list`);
      });
    }
  },
  updateTitle: function (e) {
    this.setState({ title: e.target.value });
  },
  updateContent: function (e) {
    this.setState({ content: e.target.value });
  },
  cancelAddBlog: function () {
    this.setState({ title: '', content: '' });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    const title = this.state.title;
    const content = this.state.content;
    const now = new Date();
    if (!title) {
      _sweetAlert2.default.alertErrorMessage('Please enter title !');
      return;
    }

    if (!content) {
      _sweetAlert2.default.alertErrorMessage('Please enter content !');
      return;
    }

    const newBlog = {
      type: 'article',
      title: `<< ${title.trim()} >>`,
      content: content,
      author: this.state.currentUser._id,
      created_at: now
    };

    this.executeAction(_actions.BlogActions.AddBlog, newBlog);
  },
  _renderArticleTitle: function (title) {
    return _react2.default.createElement(
      'div',
      { className: 'form-group' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-3' },
          _react2.default.createElement(
            'select',
            { className: 'form-control' },
            _react2.default.createElement(
              'option',
              null,
              'IT'
            ),
            _react2.default.createElement(
              'option',
              null,
              'Sport'
            ),
            _react2.default.createElement(
              'option',
              null,
              'Life'
            ),
            _react2.default.createElement(
              'option',
              null,
              'Story'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-9' },
          _react2.default.createElement('input', {
            type: 'text',
            ref: 'blogTitle',
            className: 'form-control',
            value: title,
            placeholder: 'Write title here..',
            onChange: this.updateTitle,
            autoFocus: true
          })
        )
      )
    );
  },
  _renderArticleContent: function (content) {
    return _react2.default.createElement(
      'div',
      { className: 'form-group' },
      _react2.default.createElement('textarea', {
        type: 'text',
        ref: 'blogContent',
        className: 'form-control',
        value: content,
        rows: '20',
        placeholder: 'Write content here..',
        onChange: this.updateContent,
        autoFocus: true
      })
    );
  },
  _rednerCreateBtns: function () {
    return _react2.default.createElement(
      'div',
      { className: 'form-group btns' },
      _react2.default.createElement(
        _reactBootstrap.Button,
        { onClick: this.cancelAddBlog, className: 'cancel-btn' },
        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'glyphicon glyphicon-remove' }),
        ' Cancel'
      ),
      _react2.default.createElement(
        _reactBootstrap.Button,
        { type: 'submit', className: 'create-btn k-blue' },
        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'pencil' }),
        ' Create'
      )
    );
  },
  _renderAddBlogContent: function (title, content) {
    return _react2.default.createElement(
      'div',
      { className: 'well' },
      _react2.default.createElement(
        'div',
        { className: 'create-blog' },
        _react2.default.createElement(
          'h3',
          null,
          'Write an article'
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          this._renderArticleTitle(title),
          this._renderArticleContent(content),
          this._rednerCreateBtns()
        )
      )
    );
  },
  render: function () {
    const { user: user, currentUser: currentUser, isCurrentUser: isCurrentUser, title: title, content: content } = this.state;
    const { pathname: pathname } = this.props.location;
    return _react2.default.createElement(
      'div',
      { className: 'add-blog-content' },
      _react2.default.createElement(_UserBar2.default, {
        path: pathname,
        user: user,
        isCurrentUser: isCurrentUser,
        currentUser: currentUser
      }),
      _react2.default.createElement(
        'div',
        { className: 'content-left' },
        _react2.default.createElement(_UserNavs.UserBlogsNav, { path: pathname, user: currentUser, isCurrentUser: isCurrentUser })
      ),
      _react2.default.createElement(
        'div',
        { className: 'content-right' },
        this._renderAddBlogContent(title, content)
      )
    );
  }
});

exports.default = AddBlog;
module.exports = exports['default'];
