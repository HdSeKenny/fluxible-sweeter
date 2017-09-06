'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _draftJsEmojiPlugin = require('draft-js-emoji-plugin');

var _draftJsEmojiPlugin2 = _interopRequireDefault(_draftJsEmojiPlugin);

var _configs = require('../../configs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emojiPlugin = (0, _draftJsEmojiPlugin2.default)(_configs.params.emojiConfig);
const plugins = [emojiPlugin];

class SweetEditor extends _react2.default.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      emojiState: (0, _draftJsPluginsEditor.createEditorStateWithText)(this.props.contentText)
    }, this.onEmojiChange = editorState => {
      this.setState({ emojiState: editorState });
    }, _temp;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Add new sweet record caused previous record re-render
    return this.state.emojiState.getCurrentContent() != nextState.emojiState.getCurrentContent();
  }

  render() {
    return _react2.default.createElement(
      'div',
      { className: 'pin-editor' },
      _react2.default.createElement(_draftJsPluginsEditor2.default, {
        editorState: this.state.emojiState,
        onChange: editorState => this.onEmojiChange(editorState),
        plugins: plugins,
        ref: element => {
          this.editor = element;
        },
        readOnly: true
      })
    );
  }
}
exports.default = SweetEditor;
SweetEditor.propTypes = {
  EmojiPlugins: _propTypes2.default.array,
  onSweetChange: _propTypes2.default.func,
  editorState: _propTypes2.default.object,
  contentText: _propTypes2.default.string,
  isPinItem: _propTypes2.default.bool
};
module.exports = exports['default'];
