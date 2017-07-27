import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import NotFound from '../NotFound';
import { UserBar } from '../Users';
import { UserStore, BlogStore } from '../../stores';
import { UserHomeNav, HomeRightNav } from '../UserNavs';
import { jsUtils } from '../../utils';
import { swal } from '../../plugins';

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
    const isCurrentUser = userStore.isCurrentUser(username);
    const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    const currentUserBlogs = blogStore.getCurrentUserBlogs(isCurrentUser, currentUser);
    return {
      currentUser,
      user,
      displayBlogs,
      currentUserBlogs,
      searchedBlogs: []
    };
  },

  onChange(res) {
    const { username } = this.props.params;
    const userStore = this.getStore(UserStore);
    const blogStore = this.getStore(BlogStore);
    const currentUser = userStore.getCurrentUser();
    const user = userStore.getUserByUsername(username);
    const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    const responseMessages = ['CREATE_BLOG_SUCCESS'];
    const result = {};

    if (responseMessages.includes(res.msg)) {
      swal.success(res.msg, () => {
        result.displayBlogs = displayBlogs;
      });
    }

    if (res.msg && res.msg !== 'LOGOUT_SUCCESS' || !res.msg) {
      result.user = user;
      result.currentUser = currentUser;
    }

    if (Object.keys(result).length) {
      this.setState(result);
    }
  },

  onSearchBlogs(searchText) {
    const { pathname } = this.props.location;
    const { currentUserBlogs, displayBlogs } = this.state;
    const routes = jsUtils.splitUrlBySlash(pathname);
    const isMine = routes.includes('mine');
    const sourceBlogs = isMine ? _.cloneDeep(currentUserBlogs) : _.cloneDeep(displayBlogs);
    const searchedBlogs = jsUtils.searchFromArray(sourceBlogs, searchText);
    this.setState({ searchedBlogs, searchText });
  },

  render() {
    const { currentUser, user, displayBlogs, searchedBlogs, currentUserBlogs, searchText } = this.state;
    const { pathname } = this.props.location;
    const isCurrentUser = currentUser && user ? currentUser.id_str === user.id_str : false;
    const trimedSearchText = searchText ? searchText.trim() : '';
    const displayMineBlogs = (searchedBlogs.length || trimedSearchText) ? searchedBlogs : currentUserBlogs;
    const searchBlogsData = Object.assign({}, { displayMineBlogs, searchText });
    const child = React.cloneElement(this.props.children, searchBlogsData);

    if (!user) {
      return (
        <div className="user-home">
          <NotFound />
        </div>
      );
    }

    return (
      <div className="user-home">
        <UserBar path={pathname} user={user} currentUser={currentUser} />
        <div className="home-left">
          <UserHomeNav path={pathname} user={user} currentUser={currentUser} displayBlogs={displayBlogs} />
        </div>
        <div className="home-right">
          <HomeRightNav
            path={pathname}
            user={user}
            currentUser={currentUser}
            isCurrentUser={isCurrentUser}
            onSearchBlogs={this.onSearchBlogs} />
          <div className="right-pages">{child}</div>
        </div>
      </div>
    );
  }
});

export default UserHome;
