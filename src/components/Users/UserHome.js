import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import { BlogActions } from '../../actions';
import { UserStore, BlogStore } from '../../stores';
import { UserHomeNav } from '../LeftNavs';
import { BlogsWell } from '../UI';
import UserBar from './UserBar';
import sweetAlert from '../../utils/sweetAlert';

const UserHome = React.createClass({

  displayName: 'UserHome',

  contextTypes: {
    executeAction: React.PropTypes.func,
  },

  propTypes: {
    params: React.PropTypes.object,
    location: React.PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore, BlogStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { username } = this.props.params;
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(username),
      singleUserBlogs: null,
      welcomeText: 'What happened today, Write a blog here !',
      blogText: ''
    };
  },

  onChange(res) {
    const { user, isCurrentUser } = this.state;
    const { username } = this.props.params;
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      sweetAlert.success(res.msg);
      this.setState({ blogText: '' });
    }

    if (res.msg === 'COMMENT_SUCCESS'
        || res.msg === 'DELETE_COMMENT_SUCCESS') {
      sweetAlert.success(res.msg);
      const singleUserBlogs = this.getStore(BlogStore).getUserBlogsWithFocuses(isCurrentUser, user);
      // this.setState({ singleUserBlogs });
    }

    // if(res.msg === 'FOLLOW_USER_SUCCESS' || res.msg === 'CANCEL_FOLLOW_USER_SUCCESS'){
    //   this.setState({
    //     currentUser: this.getStore(UserStore).getCurrentUser(),
    //     user: this.getStore(UserStore).getUserById(userId),
    //     isCurrentUser: this.getStore(UserStore).isCurrentUser(userId)
    //   })
    // }

    this.setState({
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(username)
    });
  },

  handleBlogText(e) {
    this.setState({ blogText: e.target.value });
  },

  handleMicroBlog() {
    const newBlog = {
      text: this.state.blogText,
      created_at: new Date(),
      type: 'microblog',
      author: this.state.currentUser._id
    };

    this.executeAction(BlogActions.AddBlog, newBlog);
  },

  getUserBlogsWithFocuses(isCurrentUser, user, singleUserBlogs) {
    let displayBlogs = singleUserBlogs;
    if (!displayBlogs) {
      displayBlogs = this.getStore(BlogStore).getUserBlogsWithFocuses(isCurrentUser, user);
    }
    return displayBlogs;
  },

  changeShowCommentsState(displayBlogs) {
    this.setState({ singleUserBlogs: displayBlogs });
  },

  changeBlogThumbsUpState() {
    const { user, isCurrentUser } = this.state;
    this.setState({
      singleUserBlogs: this.getStore(BlogStore).getUserBlogsWithFocuses(isCurrentUser, user)
    });
  },

  _renderUserCreateWell(currentUser, blogText, welcomeText) {
    const isBlogTextLength = blogText.length > 140;
    return (
      <div className="well create-well">
        <div className="row">
          <div className="col-xs-7">
            <p>{welcomeText}</p>
          </div>
          <div className="col-xs-5">
            {!isBlogTextLength &&
              <p>You can still write <span className="len-span">{140 - blogText.length}</span> words</p>}
            {isBlogTextLength &&
              <p>You can't write words large than <span className="len-span-red">140</span> words</p>}
          </div>
        </div>
        <div className="row textarea-row">
          <textarea type="text" rows="3" value={blogText} onChange={this.handleBlogText} />
        </div>
        <div className="row btn-row">
          <Button
            disabled={isBlogTextLength || blogText.length === 0}
            onClick={this.handleMicroBlog}
            className="btn-primary create-btn"
          >
            <Glyphicon glyph="send" /> Create
          </Button>
          <Link to={`/user-blogs/${currentUser.strId}/add`}>
            <Button className="btn-info create-btn" >
              <Glyphicon glyph="pencil" /> Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  },

  render() {
    const {
      currentUser,
      blogText,
      isCurrentUser,
      user,
      singleUserBlogs,
      welcomeText
    } = this.state;
    const displayBlogs = this.getUserBlogsWithFocuses(isCurrentUser, user, singleUserBlogs);
    const { pathname } = this.props.location;
    return (
      <div className="user-home">
        <UserBar path={pathname} user={user} isCurrentUser={isCurrentUser} currentUser={currentUser} />
        <div className="home-content">
          <div className="home-left">
            <UserHomeNav
              path={pathname}
              isCurrentUser={isCurrentUser}
              user={user}
              currentUser={currentUser}
              displayBlogs={displayBlogs}
            />
          </div>
          <div className="home-right">
            {isCurrentUser && this._renderUserCreateWell(currentUser, blogText, welcomeText)}
            <BlogsWell
              displayBlogs={displayBlogs}
              changeShowCommentsState={this.changeShowCommentsState}
              changeBlogThumbsUpState={this.changeBlogThumbsUpState}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
});

export default UserHome;
