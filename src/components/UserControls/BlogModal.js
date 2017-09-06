/**
 * Copyright 2017, created by Kuan Lu
 * @ui BlogModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw } from 'draft-js';
import { routerShape } from 'react-router';
import { BlogActions } from '../../actions';
import { Row, Col } from '../UI/Layout';
import { swal } from '../../plugins';
import { BlogStore } from '../../stores';
import { params } from '../../configs';

const emojiPlugin = createEmojiPlugin(params.emojiConfig);
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = params.showEmoji ? [emojiPlugin] : [];

export default class BlogModal extends React.Component {

  static displayName = 'BlogModal';

  static contextTypes = {
    executeAction: PropTypes.func,
    getStore: PropTypes.func.isRequired,
    router: routerShape.isRequired
  };

  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
    currentUser: PropTypes.object,
    isUserHome: PropTypes.bool
  };

  constructor() {
    super();
    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      welcomeText: 'Calm down, just a bad day, not a bad life !',
      blogText: '',
      editorContent: '',
      editorState: EditorState.createEmpty(),
      loadEmoji: false
    };
  }

  onCreateSweet() {
    const { editorContent, blogText } = this.state;
    const { currentUser } = this.props;
    if (!currentUser) {
      return swal.warning('Login first !');
    }

    const newBlog = {
      text: blogText,
      content: editorContent,
      created_at: new Date(),
      type: 'moment',
      author: currentUser.id_str
    };

    this.context.executeAction(BlogActions.AddBlog, newBlog);
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ loadEmoji: true });
    this.context.getStore(BlogStore).addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    this.context.getStore(BlogStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      this.setState({
        blogText: '',
        editorState: EditorState.createEmpty(),
        editorContent: ''
      });
    }
  }

  goToArticleCreatePage() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return swal.warning('Login first!');
    }

    this.context.router.push(`/${currentUser.username}/create`);
  }

  focus = () => {
    this.editor.focus();
  }

  onChange = (editorState) => {
    const editorContent = convertToRaw(editorState.getCurrentContent());
    const plainText = editorState.getCurrentContent().getPlainText();
    this.setState({ blogText: plainText, editorContent, editorState });
  }

  _renderCreateBtns(isDisabled) {
    const { isUserHome } = this.props;
    return (
      <div className="">
        <button disabled={isDisabled} className="btn btn-info" onClick={() => this.onCreateSweet()}>Create</button>
        {!isUserHome && <button className="btn btn-primary" onClick={() => this.onCloseBlogModal()}>Cancel</button>}
        {isUserHome && <button className="btn btn-primary" onClick={() => this.goToArticleCreatePage()}>Article</button>}
      </div>
    );
  }

  _renderSweetEditor(isDisabled) {
    return (
      <Row className="textarea-row">
        <div className="sweet-editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />

          {params.showEmoji && <EmojiSuggestions />}
        </div>
        {params.showEmoji && <Col size="8 p-0"><EmojiSelect /></Col>}
        <Col size="4 btn-row p-0">{this._renderCreateBtns(isDisabled)}</Col>
      </Row>
    );
  }

  render() {
    const { welcomeText, blogText, loadEmoji } = this.state;
    const blogTextLength = blogText.length;
    const isDisabled = blogTextLength > 140 || blogTextLength === 0;
    const isLimmitWords = blogTextLength < 141;

    return (
      <div className="create-well mb-10">
        <Row className="text-row">
          <Col size="12" className="p-0">
            <p className="welcomeText">{welcomeText}</p>
            <div className="create-tip mt-5">
              {isLimmitWords ? <p>You can still write <span className="len-span">{140 - blogTextLength}</span> words</p>
                : <p>Words can't be more than <span className="len-span-red">140</span> words</p>
              }
            </div>
          </Col>
        </Row>

        {loadEmoji && this._renderSweetEditor(isDisabled)}
      </div>
    );
  }
}