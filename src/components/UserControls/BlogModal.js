/**
 * Copyright 2017, created by Kuan Lu
 * @ui BlogModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import { routerShape } from 'react-router';
import createEmojiPlugin from 'draft-js-emoji-plugin'; // eslint-disable-line import/no-unresolved
import { BlogActions } from '../../actions';
import { Row, Col } from '../UI/Layout';
import { ModalsFactory } from '../UI';
import { sweetAlert } from '../../utils';
import { CustomMentionEditor } from '../../plugins/Draft';

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const EmojiPlugins = [emojiPlugin];

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
      currentUser: props.currentUser,
      welcomeText: 'Calm down, just a bad day, not a bad life !',
      blogText: ''
    };
  }

  onCreateSweet() {
    const { currentUser, blogText } = this.state;
    if (!currentUser) {
      sweetAlert.alertWarningMessage('Login first !');
      return;
    }

    const newBlog = {
      text: blogText,
      created_at: new Date(),
      type: 'moment',
      author: currentUser._id
    };

    this.context.executeAction(BlogActions.AddBlog, newBlog);
  }

  onCloseBlogModal() {
    ModalsFactory.hide('createBlogModal');
  }

  onChangeBlogText(e) {
    this.setState({ blogText: e.target.value });
  }

  goToArticleCreatePage() {
    const { currentUser } = this.state;
    if (!currentUser) {
      return sweetAlert.alertWarningMessage('Login first!');
    }

    this.context.router.push(`/${currentUser.username}/create`);
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

  _renderCreateTips(isLimmitWords, blogTextLength) {
    if (isLimmitWords) {
      return <p>You can still write <span className="len-span">{140 - blogTextLength}</span> words</p>;
    }
    else {
      return <p>Words can't be more than <span className="len-span-red">140</span> words</p>;
    }
  }

  render() {
    const { welcomeText, blogText } = this.state;
    const blogTextLength = blogText.length;
    const isDisabled = blogTextLength > 140 || blogTextLength === 0;
    const isLimmitWords = blogTextLength < 141;
    return (
      <div className="create-well">
        <Row className="text-row">
          <Col size="12" className="p-0">
            <p className="welcomeText">{welcomeText}</p>
            <div className="create-tip mt-5">{this._renderCreateTips(isLimmitWords, blogTextLength)}</div>
          </Col>
        </Row>
        <Row className="textarea-row">
          <CustomMentionEditor EmojiPlugins={EmojiPlugins} />
          <EmojiSuggestions />
          <EmojiSelect />
        </Row>
        <Row className="btn-row">{this._renderCreateBtns(isDisabled)}</Row>

      </div>
    );
  }
}
