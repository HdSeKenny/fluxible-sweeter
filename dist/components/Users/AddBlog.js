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

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _reactRouter = require('react-router');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _plugins = require('../../plugins');

var _Layout = require('../UI/Layout');

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddBlog = (0, _createReactClass2.default)({

  displayName: 'AddBlog',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    params: _propTypes2.default.object,
    location: _propTypes2.default.object
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  statics: {
    storeListeners: [_stores.UserStore, _stores.BlogStore]
  },

  getInitialState: function getInitialState() {
    return this.getStateFromStores();
  },
  getStateFromStores: function getStateFromStores() {
    var username = this.props.params.username;

    var store = this.getStore(_stores.UserStore);
    return {
      currentUser: store.getCurrentUser(),
      user: store.getUserByUsername(username),
      isCurrentUser: store.isCurrentUser(username),
      title: '',
      content: '',
      tags: []
    };
  },
  onChange: function onChange(res) {
    var _this = this;

    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      _plugins.Swal.success(res.msg, function () {
        var newBlogId = res.newBlog.id_str;
        _this.context.router.push(newBlogId + '/details');
      });
    }
  },
  onHandleTitle: function onHandleTitle(e) {
    this.setState({ title: e.target.value });
  },
  onHanleTagsChange: function onHanleTagsChange(val) {
    this.setState({ tags: val });
  },
  onCreateArticle: function onCreateArticle(editorState) {
    var editorContent = editorState.editorContent,
        plainText = editorState.plainText;
    var _state = this.state,
        title = _state.title,
        tags = _state.tags,
        currentUser = _state.currentUser;

    var now = new Date();
    if (!title.trim()) {
      return _plugins.Swal.error('Please enter title !');
    }

    if (!plainText.trim()) {
      return _plugins.Swal.error('Please enter content !');
    }

    if (!tags.length) {
      return _plugins.Swal.error('Please choose a tag !');
    }

    var newBlog = {
      type: 'article',
      title: '' + title.trim(),
      content: editorContent,
      text: plainText,
      author: currentUser.id_str,
      tags: tags,
      created_at: now
    };

    this.executeAction(_actions.BlogActions.AddBlog, newBlog);
  },
  render: function render() {
    var _this2 = this;

    var _state2 = this.state,
        title = _state2.title,
        tags = _state2.tags,
        currentUser = _state2.currentUser;

    var options = [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }];

    if (!currentUser) return _react2.default.createElement(_.NotFound, { classes: 'create-article-page' });

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
              instanceId: 's',
              placeholder: 'Select or create tags',
              value: tags,
              options: options,
              onChange: function onChange(val) {
                return _this2.onHanleTagsChange(val);
              },
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