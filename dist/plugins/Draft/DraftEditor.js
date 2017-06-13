'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _BlockStyleControls = require('./BlockStyleControls');

var _BlockStyleControls2 = _interopRequireDefault(_BlockStyleControls);

var _InlineStyleControls = require('./InlineStyleControls');

var _InlineStyleControls2 = _interopRequireDefault(_InlineStyleControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {stateToHTML} from 'draft-js-export-html';
class DraftEditor extends _react2.default.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: _draftJs.EditorState.createEmpty(),
      styleMap: {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2
        }
      },
      showEditor: false
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => {
      // console.log(JSON.stringify());
      const plainText = editorState.getCurrentContent().getPlainText();
      this.setState({ editorState: editorState, plainText: plainText });
    };

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const { editorState: editorState } = this.state;
    const newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(_draftJs.RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(_draftJs.RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  createArticle() {
    const { editorState: editorState } = this.state;
    const editorContent = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
    const plainText = editorState.getCurrentContent().getPlainText();
    this.props.onCreateArticle({ editorContent: editorContent, plainText: plainText });
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return null;
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ showEditor: true });
  }

  render() {
    const { editorState: editorState, styleMap: styleMap, showEditor: showEditor } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const contentState = editorState.getCurrentContent();
    let className = 'RichEditor-editor';
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return _react2.default.createElement(
      'div',
      { className: 'DraftEditor' },
      _react2.default.createElement(
        'div',
        { className: 'RichEditor-root' },
        _react2.default.createElement(_BlockStyleControls2.default, { editorState: editorState, onToggle: this.toggleBlockType }),
        _react2.default.createElement(_InlineStyleControls2.default, { editorState: editorState, onToggle: this.toggleInlineStyle }),
        _react2.default.createElement(
          'div',
          { className: className, onClick: this.focus },
          showEditor && _react2.default.createElement(_draftJs.Editor, {
            editorKey: 'b_editor',
            dataOffsetKey: 'b_editor',
            blockStyleFn: block => this.getBlockStyle(block),
            customStyleMap: styleMap,
            editorState: editorState,
            handleKeyCommand: this.handleKeyCommand,
            onChange: this.onChange,
            onTab: this.onTab,
            placeholder: 'Write an article...',
            ref: 'editor',
            spellCheck: true
          })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'btns mt-15 tar' },
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary mr-10', onClick: () => this.createArticle() },
          'Create'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-default' },
          'Reset'
        )
      )
    );
  }
}
exports.default = DraftEditor;
DraftEditor.propTypes = {
  onToggle: _propTypes2.default.func,
  onCreateArticle: _propTypes2.default.func
};
module.exports = exports['default'];
