'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJsEmojiPlugin = require('draft-js-emoji-plugin');

var _draftJsEmojiPlugin2 = _interopRequireDefault(_draftJsEmojiPlugin);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJs = require('draft-js');

var _reactRouter = require('react-router');

var _actions = require('../../actions');

var _Layout = require('../UI/Layout');

var _plugins = require('../../plugins');

var _stores = require('../../stores');

var _configs = require('../../configs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2017, created by Kuan Lu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @ui BlogModal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var emojiPlugin = (0, _draftJsEmojiPlugin2.default)(_configs.params.emojiConfig);
var EmojiSuggestions = emojiPlugin.EmojiSuggestions,
    EmojiSelect = emojiPlugin.EmojiSelect;

var plugins = _configs.params.showEmoji ? [emojiPlugin] : [];

var BlogModal = function (_React$Component) {
  _inherits(BlogModal, _React$Component);

  function BlogModal() {
    _classCallCheck(this, BlogModal);

    var _this = _possibleConstructorReturn(this, (BlogModal.__proto__ || Object.getPrototypeOf(BlogModal)).call(this));

    _this.focus = function () {
      _this.editor.focus();
    };

    _this.onChange = function (editorState) {
      var editorContent = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
      var plainText = editorState.getCurrentContent().getPlainText();
      _this.setState({ blogText: plainText, editorContent: editorContent, editorState: editorState });
    };

    _this._onStoreChange = _this._onStoreChange.bind(_this);
    _this.state = {
      welcomeText: 'Calm down, just a bad day, not a bad life !',
      blogText: '',
      editorContent: '',
      editorState: _draftJs.EditorState.createEmpty(),
      loadEmoji: false
    };
    return _this;
  }

  _createClass(BlogModal, [{
    key: 'onCreateSweet',
    value: function onCreateSweet() {
      var _state = this.state,
          editorContent = _state.editorContent,
          blogText = _state.blogText;
      var currentUser = this.props.currentUser;

      if (!currentUser) {
        return _plugins.swal.warning('Login first !');
      }

      var newBlog = {
        text: blogText,
        content: editorContent,
        created_at: new Date(),
        type: 'moment',
        author: currentUser.id_str
      };

      this.context.executeAction(_actions.BlogActions.AddBlog, newBlog);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // eslint-disable-next-line
      this.setState({ loadEmoji: true });
      this.context.getStore(_stores.BlogStore).addChangeListener(this._onStoreChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.getStore(_stores.BlogStore).removeChangeListener(this._onStoreChange);
    }
  }, {
    key: '_onStoreChange',
    value: function _onStoreChange(res) {
      if (res.msg === 'CREATE_BLOG_SUCCESS') {
        this.setState({
          blogText: '',
          editorState: _draftJs.EditorState.createEmpty(),
          editorContent: ''
        });
      }
    }
  }, {
    key: 'goToArticleCreatePage',
    value: function goToArticleCreatePage() {
      var currentUser = this.props.currentUser;

      if (!currentUser) {
        return _plugins.swal.warning('Login first!');
      }

      this.context.router.push('/' + currentUser.username + '/create');
    }
  }, {
    key: '_renderCreateBtns',
    value: function _renderCreateBtns(isDisabled) {
      var _this2 = this;

      var isUserHome = this.props.isUserHome;

      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'button',
          { disabled: isDisabled, className: 'btn btn-info', onClick: function onClick() {
              return _this2.onCreateSweet();
            } },
          'Create'
        ),
        !isUserHome && _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: function onClick() {
              return _this2.onCloseBlogModal();
            } },
          'Cancel'
        ),
        isUserHome && _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: function onClick() {
              return _this2.goToArticleCreatePage();
            } },
          'Article'
        )
      );
    }
  }, {
    key: '_renderSweetEditor',
    value: function _renderSweetEditor(isDisabled) {
      var _this3 = this;

      return _react2.default.createElement(
        _Layout.Row,
        { className: 'textarea-row' },
        _react2.default.createElement(
          'div',
          { className: 'sweet-editor', onClick: this.focus },
          _react2.default.createElement(_draftJsPluginsEditor2.default, {
            editorState: this.state.editorState,
            onChange: this.onChange,
            plugins: plugins,
            ref: function ref(element) {
              _this3.editor = element;
            }
          }),
          _configs.params.showEmoji && _react2.default.createElement(EmojiSuggestions, null)
        ),
        _configs.params.showEmoji && _react2.default.createElement(
          _Layout.Col,
          { size: '8 p-0' },
          _react2.default.createElement(EmojiSelect, null)
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '4 btn-row p-0' },
          this._renderCreateBtns(isDisabled)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          welcomeText = _state2.welcomeText,
          blogText = _state2.blogText,
          loadEmoji = _state2.loadEmoji;

      var blogTextLength = blogText.length;
      var isDisabled = blogTextLength > 140 || blogTextLength === 0;
      var isLimmitWords = blogTextLength < 141;

      return _react2.default.createElement(
        'div',
        { className: 'create-well mb-10' },
        _react2.default.createElement(
          _Layout.Row,
          { className: 'text-row' },
          _react2.default.createElement(
            _Layout.Col,
            { size: '12', className: 'p-0' },
            _react2.default.createElement(
              'p',
              { className: 'welcomeText' },
              welcomeText
            ),
            _react2.default.createElement(
              'div',
              { className: 'create-tip mt-5' },
              isLimmitWords ? _react2.default.createElement(
                'p',
                null,
                'You can still write ',
                _react2.default.createElement(
                  'span',
                  { className: 'len-span' },
                  140 - blogTextLength
                ),
                ' words'
              ) : _react2.default.createElement(
                'p',
                null,
                'Words can\'t be more than ',
                _react2.default.createElement(
                  'span',
                  { className: 'len-span-red' },
                  '140'
                ),
                ' words'
              )
            )
          )
        ),
        loadEmoji && this._renderSweetEditor(isDisabled)
      );
    }
  }]);

  return BlogModal;
}(_react2.default.Component);

BlogModal.displayName = 'BlogModal';
BlogModal.contextTypes = {
  executeAction: _propTypes2.default.func,
  getStore: _propTypes2.default.func.isRequired,
  router: _reactRouter.routerShape.isRequired
};
BlogModal.propTypes = {
  location: _propTypes2.default.object,
  children: _propTypes2.default.object,
  currentUser: _propTypes2.default.object,
  isUserHome: _propTypes2.default.bool
};
exports.default = BlogModal;
module.exports = exports['default'];