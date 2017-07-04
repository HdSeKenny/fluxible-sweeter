'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _draftJsEmojiPlugin = require('draft-js-emoji-plugin');

var _draftJsEmojiPlugin2 = _interopRequireDefault(_draftJsEmojiPlugin);

var _actions = require('../../actions');

var _Layout = require('../UI/Layout');

var _UI = require('../UI');

var _utils = require('../../utils');

var _Draft = require('../../plugins/Draft');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emojiPlugin = (0, _draftJsEmojiPlugin2.default)(); // eslint-disable-line import/no-unresolved
/**
 * Copyright 2017, created by Kuan Lu
 * @ui BlogModal
 */

const { EmojiSuggestions: EmojiSuggestions, EmojiSelect: EmojiSelect } = emojiPlugin;
const EmojiPlugins = [emojiPlugin];

class BlogModal extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      welcomeText: 'Calm down, just a bad day, not a bad life !',
      blogText: ''
    };
  }

  onCreateSweet() {
    const { currentUser: currentUser, blogText: blogText } = this.state;
    if (!currentUser) {
      _utils.sweetAlert.alertWarningMessage('Login first !');
      return;
    }

    const newBlog = {
      text: blogText,
      created_at: new Date(),
      type: 'moment',
      author: currentUser._id
    };

    this.context.executeAction(_actions.BlogActions.AddBlog, newBlog);
  }

  onCloseBlogModal() {
    _UI.ModalsFactory.hide('createBlogModal');
  }

  onChangeBlogText(e) {
    this.setState({ blogText: e.target.value });
  }

  goToArticleCreatePage() {
    const { currentUser: currentUser } = this.state;
    if (!currentUser) {
      return _utils.sweetAlert.alertWarningMessage('Login first!');
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

  _renderCreateTips(isLimmitWords, blogTextLength) {
    if (isLimmitWords) {
      return _react2.default.createElement(
        'p',
        null,
        'You can still write ',
        _react2.default.createElement(
          'span',
          { className: 'len-span' },
          140 - blogTextLength
        ),
        ' words'
      );
    } else {
      return _react2.default.createElement(
        'p',
        null,
        'Words can\'t be more than ',
        _react2.default.createElement(
          'span',
          { className: 'len-span-red' },
          '140'
        ),
        ' words'
      );
    }
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
            this._renderCreateTips(isLimmitWords, blogTextLength)
          )
        )
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: 'textarea-row' },
        _react2.default.createElement(_Draft.CustomMentionEditor, { EmojiPlugins: EmojiPlugins }),
        _react2.default.createElement(EmojiSuggestions, null),
        _react2.default.createElement(EmojiSelect, null)
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: 'btn-row' },
        this._renderCreateBtns(isDisabled)
      )
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
