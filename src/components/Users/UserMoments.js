import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { UserStore, BlogStore } from '../../stores';
import { PinItem, ModalsFactory, Layout } from '../UI';
import { PinItemModal } from '../UserControls';
import { sweetAlert, jsUtils } from '../../utils';

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
    const store = this.getStore(UserStore);
    const currentUser = store.getCurrentUser();
    const isCurrentUser = currentUser ? (currentUser.username === username) : false;
    return {
      currentUser,
      isCurrentUser,
      user: store.getUserByUsername(username),
      displayBlogs: store.getBlogsWithUsername(isCurrentUser, username),
      selectedPin: {}
    };
  },

  onChange(res) {
    const { username } = this.props.params;
    const store = this.getStore(UserStore);
    const { displayBlogs } = this.state;

    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      sweetAlert.success(res.msg);
      displayBlogs.push(res.newBlog);
      this.setState({ displayBlogs });
      ModalsFactory.hide('createBlogModal');
    }

    if (res.msg === 'COMMENT_SUCCESS'
        || res.msg === 'DELETE_COMMENT_SUCCESS') {
      sweetAlert.success(res.msg);
      // const singleUserBlogs = this.getStore(BlogStore).getUserBlogsWithFocuses(isCurrentUser, user);
      // this.setState({ singleUserBlogs }); 'FOLLOW_USER_SUCCESS', 'CANCEL_FOLLOW_USER_SUCCESS',
    }

    if (['THUMBS_UP_BLOG_SUCCESS', 'CANCEL_THUMBS_UP_BLOG_SUCCESS'].includes(res.msg)) {
      sweetAlert.success(res.msg, () => {
        const currentUser = store.getCurrentUser();
        const isCurrentUser = currentUser.username === username;
        const thumbedBlodIndex = displayBlogs.findIndex(blog => blog.id_str === res.newBlog.id_str);
        if (thumbedBlodIndex !== -1) {
          displayBlogs[thumbedBlodIndex].likers = res.newBlog.likers;
        }
        // const newBlogs = displayBlogs.forEach(blog => {
        //   if (blog.id_str === res.newBlog.id_str) {
        //     blog = res.newBlog;
        //   }
        // });
        this.setState({
          displayBlogs
        });
      });
    }
  },

  onViewPinItem(id) {
    const { displayBlogs } = this.state;
    const selectedPin = displayBlogs.find(b => b.id_str === id);
    this.setState({ selectedPin });

    $('#pinModal').on('hidden.bs.modal', () => {
      if (this.hidePinModal) {
        this.hidePinModal();
      }
    });

    ModalsFactory.show('pinModal');
  },

  hidePinModal() {
    const userHomeDom = $('.user-home');
    if (userHomeDom && userHomeDom.length) {
      this.setState({ selectedPin: {} });
    }
  },

  render() {
    const { currentUser, displayBlogs, selectedPin } = this.state;
    const sortedBlogs = jsUtils.sortByDate(displayBlogs);
    return (
      <div className="user-moments">
        <div className="user-blogs">
          {sortedBlogs.map((blog, index) =>
            <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={blog} currentUser={currentUser} />
          )}
        </div>
        <Layout.Page>
          <ModalsFactory modalref="pinModal" pin={selectedPin} ModalComponent={PinItemModal} showHeaderAndFooter={false} />
        </Layout.Page>
      </div>
    );
  }
});

export default UserHome;

