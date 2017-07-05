import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw } from 'draft-js';
import { BlogStore } from '../../stores';

export default class SweetEditor extends React.Component {

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  };

  static propTypes = {
    EmojiPlugins: PropTypes.array,
    onSweetChange: PropTypes.func,
    editorState: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this._onStoreChange = this._onStoreChange.bind(this);
  }
  onChange = (editorState) => {
    const editorContent = convertToRaw(editorState.getCurrentContent());
    const plainText = editorState.getCurrentContent().getPlainText();
    this.setState({ editorState }, () => {
      this.props.onSweetChange(editorContent, plainText);
    });
  };

  focus = () => {
    this.editor.focus();
  };

  componentDidMount() {
    this.context.getStore(BlogStore).addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    this.context.getStore(BlogStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      this.setState({ editorState: EditorState.createEmpty() });
    }
  }

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
