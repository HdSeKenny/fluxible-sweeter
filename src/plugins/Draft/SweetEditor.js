import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw } from 'draft-js';

export default class SweetEditor extends React.Component {

  static propTypes = {
    EmojiPlugins: PropTypes.array,
    onSweetContentChange: PropTypes.func
  };

  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = (editorState) => {
    const editorContent = convertToRaw(editorState.getCurrentContent());
    const plainText = editorState.getCurrentContent().getPlainText();
    this.setState({ editorState }, () => {
      this.props.onSweetContentChange(editorContent, plainText);
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    const { EmojiPlugins } = this.props;
    return (
      <div className="sweet-editor" onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={EmojiPlugins}
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  }
}