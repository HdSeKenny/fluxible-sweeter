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

var _reactRouter = require('react-router');

var _actions = require('../../actions');

var _Layout = require('../UI/Layout');

var _plugins = require('../../plugins');

var _Draft = require('../../plugins/Draft');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright 2017, created by Kuan Lu
 * @ui BlogModal
 */

const config = {
  selectGroups: [{
    title: 'People',
    icon: _react2.default.createElement('i', { className: 'fa fa-smile-o' }),
    categories: ['people']
  }, {
    title: 'Food & Drink',
    icon: _react2.default.createElement('i', { className: 'fa fa-cutlery' }),
    categories: ['food']
  }, {
    title: 'Symbols',
    icon: _react2.default.createElement('i', { className: 'fa fa-heart' }),
    categories: ['symbols']
  }]
};

const emojiPlugin = (0, _draftJsEmojiPlugin2.default)(config);
const { EmojiSuggestions: EmojiSuggestions, EmojiSelect: EmojiSelect } = emojiPlugin;
const EmojiPlugins = [emojiPlugin];

class BlogModal extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      welcomeText: 'Calm down, just a bad day, not a bad life !',
      blogText: '',
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
  }

  goToArticleCreatePage() {
    const { currentUser: currentUser } = this.props;
    if (!currentUser) {
      return _plugins.swal.warning('Login first!');
    }

    this.context.router.push(`/${currentUser.username}/create`);
  }

  onSweetChange(editorContent, plainText) {
    if (editorContent && plainText) {
      this.setState({ blogText: plainText, editorContent: editorContent });
    }
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
      _react2.default.createElement(_Draft.SweetEditor, {
        EmojiPlugins: EmojiPlugins,
        onSweetChange: (editorContent, plainText) => this.onSweetChange(editorContent, plainText)
      }),
      _react2.default.createElement(EmojiSuggestions, null),
      _react2.default.createElement(
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
    const { welcomeText: welcomeText, blogText: blogText } = this.state;
    const blogTextLength = blogText.length;
    const isDisabled = blogTextLength > 140 || blogTextLength === 0;
    const isLimmitWords = blogTextLength < 141;

    return _react2.default.createElement(
      'div',
      { className: 'create-well' },
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
      this.state.loadEmoji && this._renderSweetEditor(isDisabled)
    );
  }
}
exports.default = BlogModal;
BlogModal.displayName = 'BlogModal';
BlogModal.contextTypes = {
  executeAction: _propTypes2.default.func,
  router: _reactRouter.routerShape.isRequired
};
BlogModal.propTypes = {
  location: _propTypes2.default.object,
  children: _propTypes2.default.object,
  currentUser: _propTypes2.default.object,
  isUserHome: _propTypes2.default.bool
};
module.exports = exports['default'];
