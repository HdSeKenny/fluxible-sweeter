import React from 'react';
import PropTypes from 'prop-types';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { params } from '../../configs';

const emojiPlugin = createEmojiPlugin(params.emojiConfig);
const plugins = [emojiPlugin];

export default class SweetEditor extends React.Component {

  static propTypes = {
    EmojiPlugins: PropTypes.array,
    onSweetChange: PropTypes.func,
    editorState: PropTypes.object,
    contentText: PropTypes.string,
    isPinItem: PropTypes.bool
  };

  state = {
    emojiState: createEditorStateWithText(this.props.contentText),
  };

  shouldComponentUpdate(nextProps, nextState) {
    // Add new sweet record caused previous record re-render
    return this.state.emojiState.getCurrentContent() != nextState.emojiState.getCurrentContent();
  }

  onEmojiChange = (editorState) => {
    this.setState({ emojiState: editorState });
  }

  render() {
    return (
      <div className="pin-editor">
        <Editor
          editorState={this.state.emojiState}
          onChange={(editorState) => this.onEmojiChange(editorState)}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
          readOnly={true}
        />
      </div>
    );
  }
}