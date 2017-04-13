import React, { Component, PropTypes } from 'react';
import { Row, Col } from '../UI/Layout';
import { ModalsFactory } from '../UI';

export default class BlogModal extends Component {

  static displayName = 'App';

  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      welcomeText: "What's happening now ?",
      blogText: ''
    };
  }

  closeCreateBlogModal() {
    ModalsFactory.hide('createBlogModal');
  }

  onChangeBlogText(e) {
    this.setState({ blogText: e.target.value });
  }

  _renderCreateBtns(isDisabled) {
    return (
      <div className="row btn-row">
        <button type="button" disabled={isDisabled} className="btn btn-info" onClick={this.handleMicroBlog}>
          <i className="fa fa-pencil"></i> Create
        </button>
        <button type="button" disabled={false} className="btn btn-primary" onClick={this.closeCreateBlogModal}>
          <i className="fa fa-pencil"></i> Cancel
        </button>
      </div>
    );
  }

  render() {
    const { welcomeText, blogText } = this.state;
    const isDisabled = blogText.length > 140 || blogText.length === 0;
    return (
      <div className="create-well mt-15">
        <Row>
          <Col size="12" className="p-0">
            <p className="welcomeText">{welcomeText}</p>
            {blogText.length < 141 &&
              <p className="create-tip mt-5">
                You can still write <span className="len-span">{140 - blogText.length}</span>
              </p>
            }
            {blogText.length > 140 &&
              <p className="create-tip mt-5">
                Words can't be more than <span className="len-span-red">140</span> words
              </p>
            }
          </Col>
        </Row>
        <div className="row textarea-row">
          <textarea type="text" rows="4" value={blogText} onChange={(e) => this.onChangeBlogText(e)} />
        </div>
        {this._renderCreateBtns(isDisabled)}
      </div>
    );
  }
}
