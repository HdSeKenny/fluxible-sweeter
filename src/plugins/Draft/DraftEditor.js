import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
// import {stateToHTML} from 'draft-js-export-html';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

export default class DraftEditor extends React.Component {

  static propTypes = {
    onToggle: PropTypes.func,
    onCreateArticle: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      styleMap: {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
      },
      showEditor: false
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      // console.log(JSON.stringify());
      const plainText = editorState.getCurrentContent().getPlainText();
      this.setState({ editorState, plainText });
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  createArticle() {
    const { editorState } = this.state;
    const editorContent = convertToRaw(editorState.getCurrentContent());
    const plainText = editorState.getCurrentContent().getPlainText();
    this.props.onCreateArticle({ editorContent, plainText });
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ showEditor: true });
  }

  render() {
    const { editorState, styleMap, showEditor } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const contentState = editorState.getCurrentContent();
    let className = 'RichEditor-editor';
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="DraftEditor">
        <div className="RichEditor-root">
          <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
          <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
          <div className={className} onClick={this.focus}>
            {showEditor &&
              <Editor
                editorKey="b_editor"
                dataOffsetKey="b_editor"
                blockStyleFn={(block) => this.getBlockStyle(block)}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                onTab={this.onTab}
                placeholder="Write an article..."
                ref="editor"
                spellCheck={true}
              />
            }
          </div>
        </div>
        <div className="btns mt-15 tar">
          <button className="btn btn-primary mr-10" onClick={() => this.createArticle()}>Create</button>
          <button className="btn btn-default">Reset</button>
        </div>
      </div>
    );
  }
}
