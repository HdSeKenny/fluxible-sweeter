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
    const userStore = this.getStore(UserStore);
    const blogStore = this.getStore(BlogStore);
    const currentUser = userStore.getCurrentUser();
    const user = userStore.getUserByUsername(username);
    const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
    return {
      currentUser,
      user,
      displayBlogs,
      selectedPin: {},
      showPinModal: false
    };
  },

  onChange(res) {
    const successMessages = [
      'CREATE_BLOG_SUCCESS',
      'COMMENT_SUCCESS',
      'DELETE_COMMENT_SUCCESS',
      'THUMBS_UP_BLOG_SUCCESS',
      'CANCEL_THUMBS_UP_BLOG_SUCCESS'
    ];

    if (successMessages.includes(res.msg)) {
      const { username } = this.props.params;
      const blogStore = this.getStore(BlogStore);
      const currentUser = this.getStore(UserStore).getCurrentUser();
      const displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);

      sweetAlert.success(res.msg, () => {
        if (res.msg === 'CREATE_BLOG_SUCCESS') {
          ModalsFactory.hide('createBlogModal');
        }
        this.setState({ displayBlogs });
      });
    }
  },

  onViewPinItem(id) {
    const { displayBlogs } = this.state;
    const selectedPin = displayBlogs.find(b => b.id_str === id);
    this.setState({ selectedPin, showPinModal: true });

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
      this.setState({ selectedPin: {}, showPinModal: false });
    }
  },

  render() {
    const { currentUser, displayBlogs, selectedPin, showPinModal } = this.state;
    const sortedBlogs = jsUtils.sortByDate(displayBlogs);
    return (
      <div className="user-moments">
        <div className="user-blogs">
          {sortedBlogs.map((blog, index) => <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={blog} currentUser={currentUser} />)}
        </div>
        <Layout.Page>
          <ModalsFactory
            modalref="pinModal"
            pin={selectedPin}
            ModalComponent={PinItemModal}
            showHeaderAndFooter={false}
            showModal={showPinModal}
            currentUser={currentUser} />
        </Layout.Page>
      </div>
    );
  }
});

export default UserHome;

