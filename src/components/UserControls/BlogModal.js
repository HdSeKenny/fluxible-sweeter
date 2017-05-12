/**
 * Copyright 2017, created by Kuan Lu
 * @ui BlogModal
 */

import React, { Component, PropTypes } from 'react';
import { BlogActions } from '../../actions';
import { Row, Col } from '../UI/Layout';
import { ModalsFactory } from '../UI';
import { sweetAlert } from '../../utils';

export default class BlogModal extends Component {

  static displayName = 'BlogModal';

  static contextTypes = {
    executeAction: PropTypes.func
  };

  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      welcomeText: "What's happening now ?",
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

  _renderCreateBtns(isDisabled) {
    return (
      <div className="">
        <button disabled={isDisabled} className="btn btn-info" onClick={() => this.onCreateSweet()}>Create</button>
        <button className="btn btn-primary" onClick={() => this.onCloseBlogModal()}>Cancel</button>
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
          <textarea type="text" rows="4" value={blogText} onChange={(e) => this.onChangeBlogText(e)} />
        </Row>
        <Row className="btn-row">{this._renderCreateBtns(isDisabled)}</Row>
      </div>
    );
  }
}
