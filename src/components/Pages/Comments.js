/* eslint-disable all, camelcase, no-param-reassign */
import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FluxibleMixin } from 'fluxible-addons-react';
import { UserStore, BlogStore } from '../../stores';
import { BlogActions } from '../../actions';
import { format } from '../../utils';
import { swal } from '../../plugins';
import { Row, Col } from '../UI/Layout';

const Comments = CreateReactClass({

  displayName: 'Comments',

  contextTypes: {
    executeAction: PropTypes.func,
    router: PropTypes.object
  },

  propTypes: {
    blog: PropTypes.object,
    isSweet: PropTypes.bool,
    currentUser: PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore, BlogStore]
  },

  getInitialState() {
    return {
      commentText: '',
      replyText: ''
    };
  },

  onChange(res) {
    if (['COMMENT_SUCCESS', 'DELETE_COMMENT_SUCCESS'].includes(res.msg)) {
      this.setState({ commentText: '' });
    }
  },

  handleCommentText(e) {
    this.setState({ commentText: e.target.value });
  },

  handleReplyText(e) {
    this.setState({ replyText: e.target.value });
  },

  getCommenter(userId) {
    return this.getStore(UserStore).getCommenter(userId);
  },

  onCommentBlog(blog) {
    const { commentText } = this.state;
    const { currentUser } = this.props;
    if (!currentUser) {
      this.setState({ commentText: '' });
      return swal.warning('Login first !');
    }

    if (!commentText.trim()) {
      return swal.error('Invalid text!');
    }

    const comment = {
      blogId: blog._id,
      commentText: this.state.commentText,
      created_at: new Date(),
      commenter: currentUser.id_str
    };

    this.context.executeAction(BlogActions.AddBlogComment, comment);
  },

  showReplyTextarea(comment) {
    const blogComments = this.props.blog.comments;
    if (comment.show_replies) {
      comment.show_replies = false;
    } else {
      comment.show_replies = true;
    }

    const idx = blogComments.findIndex(bc => bc._id === comment._id);
    blogComments[idx] = comment;
    this.setState({ blogComments });
  },

  onReplyComment() {
    swal.info('This is not finished !');
    this.setState({ replyText: '' });
  },

  onDeleteComment(comment) {
    swal.confirm('Are you sure?', 'Yes, delete it!', () => {
      this.executeAction(BlogActions.DeleteBlogComment, comment);
    });
  },

  goToUserCenter(username) {
    $('#pinModal').modal('hide');
    this.context.router.push(`/${username}`);
  },

  getCommentOptions(currentUser, comment) {
    const { id_str, commenter, created_at, show_replies } = comment;
    const fromNow = format.fromNow(created_at);
    const user = this.getCommenter(commenter);
    const displayIcon = currentUser ? user.id_str === currentUser.id_str : false;
    const { username, image_url } = user;

    return {
      id_str,
      show_replies,
      fromNow,
      displayIcon,
      username,
      image_url
    };
  },

  _renderBlogTextarea(blog, isCommentText, currentUser, commentText) {
    return (
      <Row className="comment-textarea">
        <Col size="9 pl-5 pr-0">
          <textarea rows="1" className="form-control" value={commentText} onChange={this.handleCommentText} />
        </Col>
        <Col size="3 pr-5 pl-5">
          <button className="btn btn-info fr" onClick={this.onCommentBlog.bind(this, blog)} disabled={isCommentText}> Comment</button>
        </Col>
      </Row>
    );
  },

  _renderArticleTextarea(blog, isCommentText, currentUser, commentText) {
    return (
      <Row className="comment-textarea">
        <Row><textarea rows="3" className="form-control" value={commentText} onChange={this.handleCommentText} /></Row>
        <Row><button className="btn btn-info fr mt-15" onClick={this.onCommentBlog.bind(this, blog)} disabled={isCommentText}> Comment</button></Row>
      </Row>
    );
  },

  _renderReplyTextarea(replyText, comment) {
    const isDisabled = replyText.length === 0;
    return (
      <Row className="reply-row mt-10">
        <Col size="1 reply-empty" />
        <Col size="9">
          <textarea rows="1" className="form-control" value={replyText} onChange={this.handleReplyText} />
        </Col>
        <Col size="2">
          <button className="btn btn-info reply-btn" onClick={() => this.onReplyComment(this, comment)} disabled={isDisabled}> Reply</button>
        </Col>
      </Row>
    );
  },

  render() {
    const { replyText, commentText } = this.state;
    const { isSweet, blog, currentUser } = this.props;
    const { comments } = blog;
    const isCommentText = commentText.length === 0;
    return (
      <div className="comments-page">
        {isSweet && this._renderBlogTextarea(blog, isCommentText, currentUser, commentText)}
        {!isSweet && this._renderArticleTextarea(blog, isCommentText, currentUser, commentText)}
        {comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(comment => {
          const result = this.getCommentOptions(currentUser, comment);
          const { id_str, image_url, username, fromNow, displayIcon, show_replies } = result;
          return (
            <div key={id_str}>
              <Row className="comment-row">
                <Col size="1 commenter-img p-0"><img alt="commenter" src={image_url} /></Col>
                <Col size="10 p-0">
                  <h5 className="comment-text">
                    <span className="username" onClick={() => this.goToUserCenter(username)}>{username}</span> : {comment.commentText}
                  </h5>
                  <p className="comment-date">
                    <small>{fromNow}</small>
                    <button className="reply-icon" onClick={() => this.showReplyTextarea(comment)}>
                      <i className="fa fa-reply"></i>
                    </button>
                  </p>
                </Col>
                <Col size="1 comment-thumbs">
                  {displayIcon && <i className="fa fa-trash" onClick={() => this.onDeleteComment(comment)} />}
                </Col>
              </Row>

              {show_replies && this._renderReplyTextarea(replyText, comment)}
            </div>
          );
        })}
      </div>
    );
  }
});

export default Comments;
