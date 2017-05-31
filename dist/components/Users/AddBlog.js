'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactRouter = require('react-router');

var _utils = require('../../utils');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _plugins = require('../../plugins');

var _Layout = require('../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AddBlog = (0, _createReactClass2.default)({

  displayName: 'AddBlog',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    params: _propTypes2.default.object,
    location: _propTypes2.default.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    const { username: username } = this.props.params;
    const store = this.getStore(_stores.UserStore);
    return {
      currentUser: store.getCurrentUser(),
      user: store.getUserByUsername(username),
      isCurrentUser: store.isCurrentUser(username),
      title: '',
      content: '',
      tags: []
    };
  },
  onChange: function (res) {
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      _utils.sweetAlert.success(res.msg, () => {
        this.context.router.push(`${res.id_str}/details`);
      });
    }
  },
  onHandleTitle: function (e) {
    this.setState({ title: e.target.value });
  },
  onHanleTagsChange: function (val) {
    this.setState({ tags: val });
  },
  onCreateArticle: function (editorState) {
    const { editorContent: editorContent, plainText: plainText } = editorState;
    const { title: title, tags: tags, currentUser: currentUser } = this.state;
    const now = new Date();
    if (!title.trim()) {
      return _utils.sweetAlert.alertErrorMessage('Please enter title !');
    }

    if (!plainText.trim()) {
      return _utils.sweetAlert.alertErrorMessage('Please enter content !');
    }

    if (!tags.length) {
      return _utils.sweetAlert.alertErrorMessage('Please choose a tag !');
    }

    const newBlog = {
      type: 'article',
      title: `${title.trim()}`,
      content: editorContent,
      plainText: plainText,
      author: currentUser.id_str,
      tags: tags,
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
  render: function () {
    const { user: user, currentUser: currentUser, isCurrentUser: isCurrentUser, title: title, content: content, tags: tags } = this.state;
    const { pathname: pathname } = this.props.location;
    var options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];

    return _react2.default.createElement(
      'div',
      { className: 'create-article-page' },
      _react2.default.createElement(
        'div',
        { className: 'draft-options' },
        _react2.default.createElement(
          _Layout.Row,
          { className: 'mb-10' },
          _react2.default.createElement(
            _Layout.Col,
            { size: '7 pl-0 title-input' },
            _react2.default.createElement('input', {
              type: 'text',
              className: 'form-control',
              placeholder: 'Add a title..',
              value: title,
              onChange: this.onHandleTitle })
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '5 pr-0' },
            _react2.default.createElement(_reactSelect2.default, {
              placeholder: 'Select or create tags',
              value: tags,
              options: options,
              onChange: val => this.onHanleTagsChange(val),
              multi: true,
              deleteRemoves: false })
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'draft-editor' },
        _react2.default.createElement(_plugins.DraftEditor, { onCreateArticle: this.onCreateArticle })
      )
    );
  }
});

exports.default = AddBlog;
module.exports = exports['default'];
