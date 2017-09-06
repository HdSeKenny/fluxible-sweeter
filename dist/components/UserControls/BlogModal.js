'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

const emojiPlugin = (0, _draftJsEmojiPlugin2.default)(_configs.params.emojiConfig); /**
                                                                                     * Copyright 2017, created by Kuan Lu
                                                                                     * @ui BlogModal
                                                                                     */

const { EmojiSuggestions: EmojiSuggestions, EmojiSelect: EmojiSelect } = emojiPlugin;
const plugins = _configs.params.showEmoji ? [emojiPlugin] : [];

class BlogModal extends _react2.default.Component {

  constructor() {
    super();

    this.focus = () => {
      this.editor.focus();
    };

    this.onChange = editorState => {
      const editorContent = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
      const plainText = editorState.getCurrentContent().getPlainText();
      this.setState({ blogText: plainText, editorContent: editorContent, editorState: editorState });
    };

    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      welcomeText: 'Calm down, just a bad day, not a bad life !',
      blogText: '',
      editorContent: '',
      editorState: _draftJs.EditorState.createEmpty(),
      loadEmoji: false
    };
  }

  onCreateSweet() {
    const { editorContent: editorContent, blogText: blogText } = this.state;
    const { currentUser: currentUser } = this.props;
    if (!currentUser) {
      return _plugins.swal.warning('Login first !');
    }

    const newBlog = {
      text: blogText,
      content: editorContent,
      created_at: new Date(),
      type: 'moment',
      author: currentUser.id_str
    };

    this.context.executeAction(_actions.BlogActions.AddBlog, newBlog);
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ loadEmoji: true });
    this.context.getStore(_stores.BlogStore).addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    this.context.getStore(_stores.BlogStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      this.setState({
        blogText: '',
        editorState: _draftJs.EditorState.createEmpty(),
        editorContent: ''
      });
    }
  }

  goToArticleCreatePage() {
    const { currentUser: currentUser } = this.props;
    if (!currentUser) {
      return _plugins.swal.warning('Login first!');
    }

    this.context.router.push(`/${currentUser.username}/create`);
  }

  _renderCreateBtns(isDisabled) {
    const { isUserHome: isUserHome } = this.props;
    return _react2.default.createElement(
      'div',
      { className: '' },
      _react2.default.createElement(
        'button',
        { disabled: isDisabled, className: 'btn btn-info', onClick: () => this.onCreateSweet() },
        'Create'
      ),
      !isUserHome && _react2.default.createElement(
        'button',
        { className: 'btn btn-primary', onClick: () => this.onCloseBlogModal() },
        'Cancel'
      ),
      isUserHome && _react2.default.createElement(
        'button',
        { className: 'btn btn-primary', onClick: () => this.goToArticleCreatePage() },
        'Article'
      )
    );
  }

  _renderSweetEditor(isDisabled) {
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
          ref: element => {
            this.editor = element;
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

  render() {
    const { welcomeText: welcomeText, blogText: blogText, loadEmoji: loadEmoji } = this.state;
    const blogTextLength = blogText.length;
    const isDisabled = blogTextLength > 140 || blogTextLength === 0;
    const isLimmitWords = blogTextLength < 141;

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
}
exports.default = BlogModal;
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
module.exports = exports['default'];
