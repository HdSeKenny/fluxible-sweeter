import React from 'react';
import dateFormat from 'dateformat';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import sweetAlert from '../../utils/sweetAlert';
import { UserStore, BlogStore } from '../../stores';
import { BlogActions } from '../../actions';
import { Link } from 'react-router';
import { Comments } from '../Pages';
import { ConfirmDialog } from '../UI';

const BlogsWell = React.createClass({

  displayName: 'BlogsWell',

  contextTypes: {
    executeAction: React.PropTypes.func
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
      this.setState({deletedBlog: this.getStore(BlogStore).getDeletedBlog()})
    }
  },

  onDisplayEllipsis(blog){
    const blogWords = blog.text.split(' ');
    let blogContent = '';
    if (blogWords.length > 20) {
       blogWords.forEach((word, index)=> {
        if (index < 21) {
          blogContent = `${blogContent} ${word}`;
        }
      })
       blogContent = `${blogContent}...`;
    }else{
      blogContent = blog.text;
    }

    return blogContent;
  },

  showCommentTextarea(blog) {
    let {displayBlogs} = this.props;
    if (blog.show_comments) {
      blog.show_comments = false;
    }else{
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
        blogId: blogId
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
        blogId: blogId
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
    const date = blog.created_at.toString();
    const blogDate = dateFormat(date);
    return(
      <div className="row user-row">
        <div className="user-img">
          <Link to={`/user-home/${blog.author._id}/home`}>
            <img src={blog.author.image_url} />
          </Link>
        </div>
        <div className="user-info">
          <h4><Link to={`/user-home/${blog.author._id}/home`}> {blog.author.username}</Link></h4>
          <p><small>{blogDate}</small></p>
        </div>
      </div>
    )
  },

  _renderBlogDetails(currentUser, blog) {
    const isThumbedUp = currentUser ? blog.likers.includes(currentUser._id.toString()) : false;
    return(
      <div className="blog-details">
        <div className="blog-details-title">
          <h4><Link to={`/blog-details/${blog._id}`}>{blog.title}</Link></h4>
        </div>
        <p>{this.onDisplayEllipsis(blog)}</p>
        {this._renderBlogFooter(currentUser, blog, isThumbedUp)}
        {blog.show_comments && <Comments blog={blog} isBlogsWell={true} />}
      </div>
    )
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
    sweetAlert.alertWarningMessage("Login first !");
  },

  _renderBlogFooter(currentUser, blog, isThumbedUp) {
    return(
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
    )
  },

	render(){
    const { deletedBlog, currentUser } = this.state;
    const { displayBlogs, commentText } = this.props;
    return (
      <div className="blogs-well">
        {displayBlogs.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        }).map((blog, index) => {
          return(
            <div key={blog._id} className="well blog">
              {this._renderBlogAuthor(blog)}
              {this._renderBlogDetails(currentUser, blog)}
              {deletedBlog && (
                <ConfirmDialog showImmediately={true}
                  close={true}
                  modal={true}
                  dialogWindowClassName='w35'
                  onCancel={this.onCancelDeleteBlog}
                  onConfirm={this.onDeleteMicroBlog}
                />
              )}
            </div>
          )
        })}
      </div>
	  )
	}
})

export default BlogsWell;
