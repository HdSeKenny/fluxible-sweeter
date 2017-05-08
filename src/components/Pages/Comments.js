import React from 'react';
import dateFormat from 'dateformat';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Link } from 'react-router';
import { Glyphicon } from 'react-bootstrap';
import { UserStore, BlogStore } from '../../stores';
import { BlogActions } from '../../actions';
import sweetAlert from '../../utils/sweetAlert';
import { Row, Col } from '../UI/Layout';

const Comments = React.createClass({

  displayName: 'Comments',

  contextTypes: {
    executeAction: React.PropTypes.func
  },

  propTypes: {
    blog: React.PropTypes.object,
    isBlogsWell: React.PropTypes.bool
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore, BlogStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      commentText: '',
      replyText: ''
    };
  },

  onChange(res) {
    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      // this.setState({ commentText: '' });
    }
  },

  handleCommentText(e) {
    this.setState({ commentText: e.target.value });
  },

  handleReplyText(e) {
    this.setState({ replyText: e.target.value });
  },

  checkLogin() {
    sweetAlert.alertWarningMessage('Login first !');
    this.setState({ commentText: '' });
  },

  getBlogCommentsById(blogId) {
    return this.state.comments.filter(comment => comment.blogId === blogId);
  },

  getCommenter(userId) {
    return this.getStore(UserStore).getCommenter(userId);
  },

  onCommentBlog(blog) {
    const comment = {
      blogId: blog._id,
      commentText: this.state.commentText,
      created_at: new Date(),
      commenter: this.state.currentUser._id
    };

    this.executeAction(BlogActions.AddBlogComment, comment);
  },

  showReplyTextarea(comment) {
    const blogComments = this.props.blog.comments;
    if (comment.show_replies) {
      // eslint-disable-next-line no-param-reassign
      comment.show_replies = false;
    } else {
      // eslint-disable-next-line no-param-reassign
      comment.show_replies = true;
    }

    blogComments.forEach((c, index) => {
      if (c._id === comment._id) {
        blogComments[index] = comment;
      }
    });
    this.setState({ blogComments });
  },

  onReplyComment() {
    sweetAlert.alertInfoMessage('This is not finished !');
    this.setState({ replyText: '' });
  },

  onDeleteComment(comment) {
    sweetAlert.alertConfirmMessage('', () => {
      this.executeAction(BlogActions.DeleteBlogComment, comment);
    });
  },

  _renderBlogTextarea(blog, isCommentText, currentUser, commentText) {
    return (
      <Row className="comment-textarea">
        <Col size="9 pl-5 pr-0">
          <textarea rows="1" className="form-control" value={commentText} onChange={this.handleCommentText} ></textarea>
        </Col>
        <Col size="3 pr-5 pl-5">
          {currentUser &&
            <button className="btn btn-info fr" onClick={this.onCommentBlog.bind(this, blog)} disabled={isCommentText}> Comment</button>}
          {!currentUser &&
            <button className="btn btn-info fr" onClick={this.checkLogin} disabled={isCommentText}> Comment</button>}
        </Col>
      </Row>
    );
  },

  _renderArticleTextarea(blog, isCommentText, currentUser, commentText) {
    return (
      <div className="row comment-textarea">
        <div className="row">
          <textarea rows="4" className="form-control" value={commentText} onChange={this.handleCommentText} ></textarea>
        </div>
        <div className="row">
          {currentUser &&
            <button className="comment-btn" onClick={this.onCommentBlog.bind(this, blog)} disabled={isCommentText}> Comment</button>}
          {!currentUser &&
            <button className="comment-btn" onClick={this.checkLogin} disabled={isCommentText}> Comment</button>}
        </div>
      </div>
    );
  },

  _renderReplyTextarea(replyText, comment) {
    return (
      <div className="row reply-row">
        <div className="col-xs-1"></div>
        <div className="col-xs-9">
          <textarea rows="1" className="form-control" value={replyText} onChange={this.handleReplyText} ></textarea>
        </div>
        <div className="col-xs-2">
          <button className="reply-btn" onClick={this.onReplyComment.bind(this, comment)} disabled={replyText.length === 0}>
            Reply
          </button>
        </div>
      </div>
    );
  },

  render() {
    const { currentUser, replyText, commentText } = this.state;
    const isCommentText = commentText.length === 0;
    const { blog, isBlogsWell } = this.props;
    const { comments } = blog;
    return (
      <div className="comments-page">
        {isBlogsWell && this._renderBlogTextarea(blog, isCommentText, currentUser, commentText)}
        {!isBlogsWell && this._renderArticleTextarea(blog, isCommentText, currentUser, commentText)}
        <div className="row comments">
          {comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(comment => {
            const date = comment.created_at ? comment.created_at.toString() : null;
            const commentDate = dateFormat(date, 'dddd, h:MM TT');
            const commenter = this.getCommenter(comment.commenter);
            const displayIcon = currentUser ? commenter.id_str === currentUser.id_str : false;
            return (
              <Row key={comment._id} className="comment-row">
                <Col size="1 commenter-img p-0 pl-5">
                  <img alt="commenter" src={commenter.image_url} />
                </Col>
                <Col size="10 p-0">
                  <h5 className="comment-text">
                    <Link to={`/${commenter.username}/home`} >{commenter.username}</Link> : {comment.commentText}
                  </h5>
                  <p className="comment-date">
                    <small>{commentDate}</small>
                    <button onClick={this.showReplyTextarea.bind(this, comment)}>
                      <i className="fa fa-reply"></i>
                    </button>
                  </p>
                </Col>
                <Col size="1 comment-thumbs">
                  {displayIcon && <Glyphicon glyph="trash" onClick={this.onDeleteComment.bind(this, comment)} />}
                </Col>
                {comment.show_replies && this._renderReplyTextarea(replyText, comment)}
              </Row>
            );
          })}
        </div>
      </div>
    );
  }
});

export default Comments;
