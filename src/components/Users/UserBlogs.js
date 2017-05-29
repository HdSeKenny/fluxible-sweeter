import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { sweetAlert, format } from '../../utils';
import { BlogActions } from '../../actions';
import { UserStore, BlogStore } from '../../stores';

const UserBlogs = CreateReactClass({

  displayName: 'UserBlogs',

  contextTypes: {
    executeAction: PropTypes.func
  },

  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [BlogStore, UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { username } = this.props.params;
    const userStore = this.getStore(UserStore);
    const blogStore = this.getStore(BlogStore);
    const user = userStore.getUserByUsername(username);
    const currentUser = userStore.getCurrentUser();
    const isCurrentUser = currentUser ? (currentUser.username === username) : false;
    return {
      currentUser,
      user,
      currentBlog: blogStore.getCurrentBlog(),
      isUpdated: blogStore.getIsUpdated(),
      isCurrentUser,
      displayBlogs: blogStore.getBlogsWithUsername(currentUser, username)
    };
  },

  onChange(res) {
    const { currentUser } = this.state;
    const { username } = this.props.params;
    if (res.msg === 'COMMENT_SUCCESS' || res.msg === 'DELETE_COMMENT_SUCCESS') {
      sweetAlert.success(res.msg);
      // this.setState({displayBlogs: this.getStore(BlogStore).getBlogsByUserId(currentUser._id)});
    }

    if (res.msg === 'UPDATE_BLOG_SUCCESS') {
      sweetAlert.success(res.msg);
      this.setState({
        displayBlogs: this.getStore(BlogStore).getBlogsByUserId(currentUser._id),
        currentBlog: this.getStore(BlogStore).getCurrentBlog(),
        isUpdated: this.getStore(BlogStore).getIsUpdated()
      });
    }

    if (res.msg === 'EDIT_BLOG' || res.msg === 'CANCEL_EDIT_BLOG') {
      this.setState({ currentBlog: this.getStore(BlogStore).getCurrentBlog() });
    }

    if (res.msg === 'CONFIRM_DELETE_BLOG' || res.msg === 'CANCEL_DELETE_BLOG') {
      // this.setState({deletedBlog: this.getStore(BlogStore).getDeletedBlog()})
    }

    if (res.msg === 'DELETE_BLOG_SUCCESS') {
      sweetAlert.success(res.msg);
      this.setState({
        // deletedBlog: this.getStore(BlogStore).getDeletedBlog(),
        displayBlogs: this.getStore(BlogStore).getBlogsByUserId(username)
      });
    }

    this.setState({
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(username)
    });
  },

  onEditBlog(blog) {
    this.executeAction(BlogActions.EditBlog, blog);
  },

  onCancelEdit() {
    this.executeAction(BlogActions.CancelEditBlog);
  },

  onUpdateBlog(blog) {
    if (!blog.title) {
      sweetAlert.alertErrorMessage('Please enter title !');
      return;
    }

    if (!blog.content) {
      sweetAlert.alertErrorMessage('Please enter content');
      return;
    }
    // eslint-disable-next-line no-param-reassign
    blog.title = `<< ${blog.title} >>`;
    this.executeAction(BlogActions.UpdateBlog, blog);
  },

  onDeleteBlog(blog) {
    sweetAlert.alertConfirmMessage('', () => {
      this.executeAction(BlogActions.DeleteBlog, blog);
    });
  },

  onSearchBlog(e) {
    const searchText = e.target.value.toLocaleLowerCase();
    const { user } = this.state;
    const searchedBlogs = this.getStore(BlogStore).getSearchedBlogsWithUser(searchText, user);
    this.setState({ displayBlogs: searchedBlogs });
  },

  sortByType(e) {
    const sortText = e.target.value.toLocaleLowerCase();
    const { user } = this.state;
    const sortedBlogs = this.getStore(BlogStore).getSortedBlogsWithUser(sortText, user);
    this.setState({ displayBlogs: sortedBlogs });
  },

  _renderMicroBlog(blog, blogDate) {
    return (
      <div key={blog._id} className="well list-blogs micro-blog">
        <div className="row">
          <div className="col-xs-8">
            <div className="blog-title">
              <h5>{blog.content}</h5>
              <h6>{blogDate}</h6>
            </div>
          </div>
          <div className="col-xs-4 blog-manage">
            <button className="btn btn-danger btn-sm delete-btn" onClick={this.onDeleteBlog.bind(this, blog)}>
              <i className="fa fa-trash" /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  },

  _renderArticle(blog, blogDate) {
    return (
      <div key={blog._id} className="well list-blogs article">
        <div className="row">
          <div className="col-xs-8">
            <div className="blog-title">
              <h4><Link to={`/blog-details/${blog._id}`}>{blog.title}</Link></h4>
              <h6>{blogDate}</h6>
            </div>
          </div>
          <div className="col-xs-4 blog-manage">
            <button
              className="btn btn-danger btn-sm delete-btn"
              onClick={this.onDeleteBlog.bind(this, blog)}
            >
              <i className="fa fa-trash" /> Delete
            </button>
            <button
              className="btn btn-primary btn-sm delete-btn"
              onClick={this.onEditBlog.bind(this, blog)}
            >
              <i className="fa fa-pencil" /> Edit
            </button>
          </div>
        </div>
      </div>
    );
  },

  _renderCurrentUserContentRight(displayBlogs) {
    return (
      <div>
        {displayBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(blog => {
          const fromNow = format.fromNow(blog.created_at);
          if (blog.type === 'article') {
            return this._renderArticle(blog, fromNow);
          } else {
            return this._renderMicroBlog(blog, fromNow);
          }
        })}
      </div>
    );
  },


  render() {
    const {
      currentUser,
      isCurrentUser,
      displayBlogs,
      user,
      currentBlog,
      isUpdated
    } = this.state;
    const { pathname } = this.props.location;
    return (
      <div className="user-blogs-page">
        {isCurrentUser &&
          <div className="">
              {this._renderCurrentUserContentRight(displayBlogs)}
          </div>
        }
      </div>
    );
  }
});

export default UserBlogs;
