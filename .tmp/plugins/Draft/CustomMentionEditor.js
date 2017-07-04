'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsMentionPlugin = require('draft-js-mention-plugin');

var _draftJsMentionPlugin2 = _interopRequireDefault(_draftJsMentionPlugin);

var _mentions = require('./mentions.example');

var _mentions2 = _interopRequireDefault(_mentions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // eslint-disable-line import/no-unresolved
// eslint-disable-line import/no-unresolved


const positionSuggestions = ({ state: state, props: props }) => {
  let transform;
  let transition;

  if (state.isActive && props.suggestions.size > 0) {
    transform = 'scaleY(1)';
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
  } else if (state.isActive) {
    transform = 'scaleY(0)';
    transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
  }

  return {
    transform: transform,
    transition: transition
  };
};

const mentionPlugin = (0, _draftJsMentionPlugin2.default)({
  mentions: _mentions2.default,
  entityMutability: 'IMMUTABLE',
  // theme: mentionsStyles,
  positionSuggestions: positionSuggestions,
  mentionPrefix: '@'
});
const { MentionSuggestions: MentionSuggestions } = mentionPlugin;
// const plugins = [mentionPlugin];

const Entry = props => {
  const {
    mention: mention,
    theme: theme,
    searchValue: searchValue } = props,
        parentProps = _objectWithoutProperties(props, ['mention', 'theme', 'searchValue']);

  return _react2.default.createElement(
    'div',
    parentProps,
    _react2.default.createElement(
      'div',
      { className: 'mentionSuggestionsEntryContainer' },
      _react2.default.createElement(
        'div',
        { className: 'mentionSuggestionsEntryContainerLeft' },
        _react2.default.createElement('img', {
          src: mention.get('avatar'),
          className: 'mentionSuggestionsEntryAvatar',
          role: 'presentation'
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'mentionSuggestionsEntryContainerRight' },
        _react2.default.createElement(
          'div',
          { className: 'mentionSuggestionsEntryText' },
          mention.get('name')
        ),
        _react2.default.createElement(
          'div',
          { className: 'mentionSuggestionsEntryTitle' },
          mention.get('title')
        )
      )
    )
  );
};

class CustomMentionEditor extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      editorState: _draftJs.EditorState.createEmpty(),
      suggestions: _mentions2.default
    }, this.onChange = editorState => {
      this.setState({
        editorState: editorState
      });
    }, this.onSearchChange = ({ value: value }) => {
      this.setState({
        suggestions: (0, _draftJsMentionPlugin.defaultSuggestionsFilter)(value, _mentions2.default)
      });
    }, this.focus = () => {
      this.editor.focus();
    }, _temp;
  }

  // editorStyles.editor
  render() {
    const { EmojiPlugins: EmojiPlugins } = this.props;
    return _react2.default.createElement(
      'div',
      { className: 'sweet-editor', onClick: this.focus },
      _react2.default.createElement(_draftJsPluginsEditor2.default, {
        editorState: this.state.editorState,
        onChange: this.onChange,
        plugins: EmojiPlugins,
        ref: element => {
          this.editor = element;
        }
      }),
      _react2.default.createElement(MentionSuggestions, {
        onSearchChange: this.onSearchChange,
        suggestions: this.state.suggestions,
        entryComponent: Entry
      })
    );
  }
}
exports.default = CustomMentionEditor;
module.exports = exports['default'];
