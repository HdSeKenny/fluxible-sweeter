import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { UserBar } from '../Users';
// import { BlogActions } from '../../actions';
import { UserStore, BlogStore } from '../../stores';
import { UserHomeNav, HomeRightNav } from '../UserNavs';
import { ModalsFactory } from '../UI';
import { sweetAlert, jsUtils } from '../../utils';

const UserHome = React.createClass({

  displayName: 'UserHome',

  contextTypes: {
    executeAction: React.PropTypes.func,
  },

  propTypes: {
    params: React.PropTypes.object,
    location: React.PropTypes.object,
    children: React.PropTypes.object
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
      displayBlogs: this.getStore(UserStore).getBlogsWithUsername(username),
      selectedPin: {},
      singleUserBlogs: null,
      showCreateModal: false
    };
  },

  onChange(res) {
    const { displayBlogs } = this.state;
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      sweetAlert.success(res.msg);
      displayBlogs.push(res.newBlog);
      this.setState({ displayBlogs });
      ModalsFactory.hide('createBlogModal');
    }
  },

  render() {
    const { currentUser, user, displayBlogs } = this.state;
    const { pathname } = this.props.location;
    return (
      <div className="user-home">
        <UserBar path={pathname} user={user} currentUser={currentUser} />
        <div className="home-content">
          <div className="home-left">
            <UserHomeNav path={pathname} user={user} currentUser={currentUser} displayBlogs={displayBlogs} />
          </div>
          <div className="home-right">
            {currentUser && <HomeRightNav path={pathname} currentUser={currentUser} />}
            <div className="right-pages">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
});

export default UserHome;
