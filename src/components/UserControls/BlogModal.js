/**
 * Copyright 2017, created by Kuan Lu
 * @ui BlogModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { routerShape } from 'react-router';
import { BlogActions } from '../../actions';
import { Row, Col } from '../UI/Layout';
import { swal } from '../../plugins';
import { SweetEditor } from '../../plugins/Draft';
import { params } from '../../configs';

const config = {
  selectGroups: [{
    title: 'People',
    icon: React.createElement('i', { className: 'fa fa-smile-o' }),
    categories: ['people'],
  }, {
    title: 'Food & Drink',
    icon: React.createElement('i', { className: 'fa fa-cutlery' }),
    categories: ['food'],
  }, {
    title: 'Symbols',
    icon: React.createElement('i', { className: 'fa fa-heart' }),
    categories: ['symbols'],
  }]
};

const emojiPlugin = params.showEmoji ? createEmojiPlugin(config) : {};
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const EmojiPlugins = params.showEmoji ? [emojiPlugin] : [];

export default class BlogModal extends React.Component {

  static displayName = 'BlogModal';

  static contextTypes = {
    executeAction: PropTypes.func,
    router: routerShape.isRequired
  };

  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
    currentUser: PropTypes.object,
    isUserHome: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      welcomeText: 'Calm down, just a bad day, not a bad life !',
      blogText: '',
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
  }

  goToArticleCreatePage() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return swal.warning('Login first!');
    }

    this.context.router.push(`/${currentUser.username}/create`);
  }

  onSweetChange(editorContent, plainText) {
    if (editorContent && plainText) {
      this.setState({ blogText: plainText, editorContent });
    }
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

  _renderSweetEditor(isDisabled, showEmoji) {
    return (
      <Row className="textarea-row">
        <SweetEditor
          EmojiPlugins={EmojiPlugins}
          onSweetChange={(editorContent, plainText) => this.onSweetChange(editorContent, plainText)}
        />
        {showEmoji && <EmojiSuggestions />}
        <Col size="8 p-0">
          {showEmoji && <EmojiSelect />}
        </Col>
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
      <div className="create-well mb-15">
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

        {loadEmoji && this._renderSweetEditor(isDisabled, params.showEmoji)}
      </div>
    );
  }
}
