import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import sweetAlert from '../../utils/sweetAlert';
import UserBar from './UserBar';
import { BlogActions } from '../../actions';
import { UserStore, BlogStore } from '../../stores';
import { UserBlogsNav } from '../LeftNavs';
import { BlogsWell } from '../UI';
import { BlogEditor } from '../UserControls';

const UserBlogs = React.createClass({

  displayName: 'UserBlogs',

  contextTypes: {
    executeAction: React.PropTypes.func
  },

  propTypes: {
    params: React.PropTypes.object,
    location: React.PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [BlogStore, UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { userId } = this.props.params;
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserById(userId),
      currentBlog: this.getStore(BlogStore).getCurrentBlog(),
      // deletedBlog: this.getStore(BlogStore).getDeletedBlog(),
      isUpdated: this.getStore(BlogStore).getIsUpdated(),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(userId),
      displayBlogs: this.getStore(BlogStore).getBlogsByUserId(userId)
    };
  },

  onChange(res) {
    const { currentUser } = this.state;
    const { userId } = this.props.params;
    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      sweetAlert.alertSuccessMessage(res.resMsg);
      // this.setState({displayBlogs: this.getStore(BlogStore).getBlogsByUserId(currentUser._id)});
    }

    if (res.resMsg === 'UPDATE_BLOG_SUCCESS') {
      sweetAlert.alertSuccessMessage(res.resMsg);
      this.setState({
        displayBlogs: this.getStore(BlogStore).getBlogsByUserId(currentUser._id),
        currentBlog: this.getStore(BlogStore).getCurrentBlog(),
        isUpdated: this.getStore(BlogStore).getIsUpdated()
      });
    }

    if (res.resMsg === 'EDIT_BLOG' || res.resMsg === 'CANCEL_EDIT_BLOG') {
      this.setState({ currentBlog: this.getStore(BlogStore).getCurrentBlog() });
    }

    if (res.resMsg === 'CONFIRM_DELETE_BLOG' || res.resMsg === 'CANCEL_DELETE_BLOG') {
      // this.setState({deletedBlog: this.getStore(BlogStore).getDeletedBlog()})
    }

    if (res.resMsg === 'DELETE_BLOG_SUCCESS') {
      sweetAlert.alertSuccessMessage(res.resMsg);
      this.setState({
        // deletedBlog: this.getStore(BlogStore).getDeletedBlog(),
        displayBlogs: this.getStore(BlogStore).getBlogsByUserId(userId)
      });
    }

    this.setState({
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserById(userId),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(userId)
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

  changeShowCommentsState() {
    const { userId } = this.props.params;
    this.setState({ displayBlogs: this.getStore(BlogStore).getBlogsByUserId(userId) });
  },

  changeBlogThumbsUpState() {
    this.setState(this.getStatesFromStores());
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
            <Button className="btn btn-danger btn-sm delete-btn" onClick={this.onDeleteBlog.bind(this, blog)}>
              <Glyphicon glyph="trash" /> Delete
            </Button>
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
            <Button
              className="btn btn-danger btn-sm delete-btn"
              onClick={this.onDeleteBlog.bind(this, blog)}
            >
              <Glyphicon glyph="trash" /> Delete
            </Button>
            <Button
              className="btn btn-primary btn-sm delete-btn"
              onClick={this.onEditBlog.bind(this, blog)}
            >
              <Glyphicon glyph="pencil" /> Edit
            </Button>
          </div>
        </div>
      </div>
    );
  },

  _renderCurrentUserContentLeft(pathname, currentUser, displayBlogs) {
    return <UserBlogsNav path={pathname} currentUser={currentUser} displayBlogs={displayBlogs} />;
  },

  _renderCurrentUserContentRight(displayBlogs) {
    return (
      <div>
        {displayBlogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(blog => {
          const dateString = blog.created_at.toString();
          const blogDate = dateFormat(dateString);
          if (blog.type === 'article') {
            return this._renderArticle(blog, blogDate);
          } else {
            return this._renderMicroBlog(blog, blogDate);
          }
        })}
      </div>
    );
  },

  _renderBlogsSearchBar() {
    return (
      <div className="well search-bar">
        <div className="row">
          <div className="col-xs-9 search-query">
            <input type="text" className="form-control" placeholder="Search" onChange={this.onSearchBlog} />
            <i className="fa fa-search"></i>
          </div>
          <div className="col-xs-3 sort-by">
            <select className="form-control" onChange={this.sortByType}>
              <option>All blogs</option>
              <option>Microblog</option>
              <option>Article</option>
            </select>
          </div>
        </div>
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
        <UserBar path={pathname} user={user} isCurrentUser={isCurrentUser} currentUser={currentUser} />
        {!isCurrentUser &&
          <div className="user-blogs-content">
            <div className="content-mid">
              {this._renderBlogsSearchBar()}
              <BlogsWell
                displayBlogs={displayBlogs}
                changeShowCommentsState={this.changeShowCommentsState}
                changeBlogThumbsUpState={this.changeBlogThumbsUpState}
              />
            </div>
          </div>
        }
        {isCurrentUser &&
          <div className="user-blogs-content">
            <div className="content-left">
              {this._renderCurrentUserContentLeft(pathname, currentUser, displayBlogs)}
            </div>
            <div className="content-right">
              {this._renderBlogsSearchBar()}
              {this._renderCurrentUserContentRight(displayBlogs)}
            </div>
          </div>
        }
        {currentBlog && (
          <BlogEditor
            show={currentBlog !== null}
            blog={currentBlog}
            onSave={this.onUpdateBlog}
            onCancel={this.onCancelEdit}
            isUpdated={isUpdated}
          />
        )}
      </div>
    );
  }
});

export default UserBlogs;
