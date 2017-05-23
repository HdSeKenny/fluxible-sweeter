import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { UserBar } from '../Users';
import { UserStore, BlogStore } from '../../stores';
import { UserHomeNav, HomeRightNav } from '../UserNavs';
import { ModalsFactory } from '../UI';
import { sweetAlert } from '../../utils';

const UserHome = CreateReactClass({

  displayName: 'UserHome',

  contextTypes: {
    executeAction: PropTypes.func,
  },

  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.object
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
    const userStore = this.getStore(UserStore);
    const blogStore = this.getStore(BlogStore);
    const currentUser = userStore.getCurrentUser();
    const user = userStore.getUserByUsername(username);
    const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    return {
      currentUser,
      user,
      displayBlogs
    };
  },

  onChange(res) {
    const { username } = this.props.params;
    const userStore = this.getStore(UserStore);
    const blogStore = this.getStore(BlogStore);
    const currentUser = userStore.getCurrentUser();
    const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    const responseMessages = ['CREATE_BLOG_SUCCESS'];
    if (responseMessages.includes(res.msg)) {
      if (res.msg === 'CREATE_BLOG_SUCCESS') {
        sweetAlert.success(res.msg, () => {
          ModalsFactory.hide('createBlogModal');
        });
      }

      this.setState({ displayBlogs });
    }
  },

  render() {
    const { currentUser, user, displayBlogs } = this.state;
    const { pathname } = this.props.location;
    const isCurrentUser = currentUser ? currentUser.id_str === user.id_str : false;
    return (
      <div className="user-home">
        <UserBar path={pathname} user={user} currentUser={currentUser} />
        <div className="home-content">
          <div className="home-left">
            <UserHomeNav path={pathname} user={user} currentUser={currentUser} displayBlogs={displayBlogs} />
          </div>
          <div className="home-right">
            <HomeRightNav path={pathname} user={user} currentUser={currentUser} isCurrentUser={isCurrentUser} />
            <div className="right-pages">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
});

export default UserHome;
