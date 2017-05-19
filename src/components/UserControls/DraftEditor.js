import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

export default class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }
  render() {
    return (
      <div id="content">
        <h1>Draft.js Editor</h1>
        <button onClick={() => this._onBoldClick()}>Bold</button>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}