/* eslint-disable all, no-param-reassign */

/**
 * Copyright 2017, created by Kuan Lu
 * @ui BlogsWell
 */

import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Link } from 'react-router';
import { sweetAlert, format } from '../../utils';
import { UserStore, BlogStore } from '../../stores';
import { BlogActions } from '../../actions';
import { Comments } from '../Pages';
import { ConfirmDialog } from '../UI';

const BlogsWell = React.createClass({

  displayName: 'BlogsWell',

  contextTypes: {
    executeAction: React.PropTypes.func
  },

  propTypes: {
    changeShowCommentsState: React.PropTypes.func,
    changeBlogThumbsUpState: React.PropTypes.func,
    displayBlogs: React.PropTypes.array,
    commentText: React.PropTypes.string
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
      deletedBlog: this.getStore(BlogStore).getDeletedBlog()
    };
  },

  onChange(res) {
    if (res.msg === 'THUMBS_UP_BLOG_SUCCESS' || res.msg === 'CANCEL_THUMBS_UP_BLOG_SUCCESS') {
      sweetAlert.success(res.msg);
      this.props.changeBlogThumbsUpState();
    }

    if (res.msg === 'DELETE_BLOG_SUCCESS') {
      sweetAlert.success(res.msg);
      this.setState({ deletedBlog: this.getStore(BlogStore).getDeletedBlog() });
    }
  },

  onDisplayEllipsis(blog) {
    const blogWords = blog.text.split(' ');
    let blogContent = '';
    if (blogWords.length > 20) {
      blogWords.forEach((word, index) => {
        if (index < 21) {
          blogContent = `${blogContent} ${word}`;
        }
      });

      blogContent = `${blogContent}...`;
    }
    else {
      blogContent = blog.text;
    }

    return blogContent;
  },

  showCommentTextarea(blog) {
    const { displayBlogs } = this.props;
    if (blog.show_comments) {
      blog.show_comments = false;
    }
    else {
      blog.show_comments = true;
    }

    displayBlogs.forEach((b, index) => {
      if (b._id === blog._id) {
        displayBlogs[index] = blog;
      }
    });
    this.getStore(BlogStore).changeShowCommentsState(blog);
    this.props.changeShowCommentsState(displayBlogs);
  },

  cancelThumbsUpBlog(currentUser, blogId) {
    if (currentUser) {
      this.executeAction(BlogActions.CancelThumbsUpBlog, {
        currentUserId: currentUser._id,
        blogId
      });
    }
    else {
      this.checkCurrentUser();
    }
  },

  thumbsUpBlog(currentUser, blogId) {
    if (currentUser) {
      this.executeAction(BlogActions.ThumbsUpBlog, {
        currentUserId: currentUser._id,
        blogId
      });
    }
    else {
      this.checkCurrentUser();
    }
  },

  _renderBlogOptions() {
    return (
      <div className="dropdown">
        <button className="ellipsis-btn">
          <i className="fa fa-ellipsis-h"></i>
        </button>
        <div className="dropdown-content">
          <span onClick={e => e.preventDefault()}>Share</span>
          <span to="" onClick={e => e.preventDefault()}>Report</span>
          <span to="" onClick={e => e.preventDefault()}>Delete</span>
        </div>
      </div>
    );
  },

  _renderBlogAuthor(blog) {
    const { created_at, author } = blog;
    const fromNow = format.fromNow(created_at);
    return (
      <div className="row user-row">
        <div className="user-img">
          <Link to={`/${author.username}/home`}>
            <img src={author.image_url} alt="user" />
          </Link>
        </div>
        <div className="user-info">
          <h4><Link to={`/${author.username}/home`}> {author.username}</Link></h4>
          <p><small>{fromNow}</small></p>
        </div>
      </div>
    );
  },

  _renderBlogDetails(currentUser, blog) {
    const isThumbedUp = currentUser ? blog.likers.includes(currentUser.id_str) : false;
    return (
      <div className="blog-details">
        <div className="blog-details-title">
          <h4><Link to={`/blog-details/${blog._id}`}>{blog.title}</Link></h4>
        </div>
        <p>{this.onDisplayEllipsis(blog)}</p>
        {this._renderBlogFooter(currentUser, blog, isThumbedUp)}
        {blog.show_comments && <Comments blog={blog} isBlogsWell={true} />}
      </div>
    );
  },

  onDeleteMicroBlog() {
    this.executeAction(BlogActions.DeleteBlog, this.state.deletedBlog);
  },

  onConfirmDeleteBlog(blog) {
    this.executeAction(BlogActions.ConfirmDeleteBlog, blog);
  },

  onCancelDeleteBlog() {
    this.executeAction(BlogActions.CancelDeleteBlog);
  },

  checkCurrentUser() {
    sweetAlert.alertWarningMessage('Login first !');
  },

  _renderBlogFooter(currentUser, blog, isThumbedUp) {
    return (
      <div className="blog-footer">
        <div className="row">
          <div className="col-xs-6"></div>
          <div className="col-xs-2">
            <button onClick={this.showCommentTextarea.bind(this, blog)}>
              <i className="fa fa-comments-o"></i> {blog.comments.length}
            </button>
          </div>
          <div className="col-xs-2">
            {isThumbedUp &&
              <button onClick={this.cancelThumbsUpBlog.bind(this, currentUser, blog._id)}>
                <i className="fa fa-thumbs-up"></i> {blog.likers.length}
              </button>
            }
            {!isThumbedUp &&
              <button onClick={this.thumbsUpBlog.bind(this, currentUser, blog._id)}>
                <i className="fa fa-thumbs-o-up"></i> {blog.likers.length}
              </button>
            }
          </div>
          <div className="col-xs-2">
            {this._renderBlogOptions()}
          </div>
        </div>
      </div>
    );
  },

  render() {
    const { deletedBlog, currentUser } = this.state;
    const { displayBlogs } = this.props;
    return (
      <div className="blogs-well">
        {displayBlogs.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        }).map(blog => {
          return (
            <div key={blog._id} className="well blog">
              {this._renderBlogAuthor(blog)}
              {this._renderBlogDetails(currentUser, blog)}
              {deletedBlog && (
                <ConfirmDialog
                  showImmediately={true}
                  close={true}
                  modal={true}
                  dialogWindowClassName="w35"
                  onCancel={this.onCancelDeleteBlog}
                  onConfirm={this.onDeleteMicroBlog}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
});

export default BlogsWell;
