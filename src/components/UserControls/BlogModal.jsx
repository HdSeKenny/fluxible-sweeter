import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';


export default class BlogModal extends Component {

  static displayName = 'App';

  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      welcomeText: 'What happened today, Write a blog here !',
      blogText: ''
    };
  }

  _renderCreateBtns(isDisabled) {
    const { currentUser } = this.state;
    return (
      <div className="row btn-row">
        <button disabled={isDisabled} onClick={this.handleMicroBlog} className="btn-primary create-btn">
          <Glyphicon glyph="send" />Create
        </button>
        {currentUser &&
          <Link to={`/user-blogs/${currentUser.strId}/add`}>
            <button className="btn-info create-btn">
              <Glyphicon glyph="pencil" />Articles
            </button>
          </Link>
        }
        {!currentUser &&
          <Link to="">
            <button className="btn-info create-btn" onClick={this.checkCurrentUser}>
              <Glyphicon glyph="pencil" />Articles
            </button>
          </Link>
        }
      </div>
    );
  }

  render() {
    const { welcomeText, blogText } = this.state;
    const isDisabled = blogText.length > 140 || blogText.length === 0;
    return (
      <div className="well create-well">
        <div className="row">
          <div className="col-xs-7 col-md-7">
            <p>{welcomeText}</p>
          </div>
          <div className="col-xs-5 col-md-5">
            {blogText.length < 141 &&
              <p>You can still write <span className="len-span">{140 - blogText.length}</span> words</p> }
            {blogText.length > 140 &&
              <p>Words can't be more than <span className="len-span-red">140</span> words</p>}
          </div>
        </div>
        <div className="row textarea-row">
          <textarea type="text" rows="3" value={blogText} onChange={this.handleBlogText} />
        </div>
        {this._renderCreateBtns(isDisabled)}
      </div>
    );
  }
}
