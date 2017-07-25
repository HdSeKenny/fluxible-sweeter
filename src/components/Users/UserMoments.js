import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { UserStore, BlogStore } from '../../stores';
import { PinItem, ModalsFactory, Layout } from '../UI';
import { PinItemModal, BlogModal } from '../UserControls';
import { jsUtils } from '../../utils';
import { swal } from '../../plugins';

const UserHome = CreateReactClass({

  displayName: 'UserHome',

  contextTypes: {
    executeAction: PropTypes.func,
  },

  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object
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
      'CANCEL_THUMBS_UP_BLOG_SUCCESS',
      'BLOG_CHANGE_IMAGE_SUCCESS'
    ];
    const { username } = this.props.params;
    const blogStore = this.getStore(BlogStore);
    const userStore = this.getStore(UserStore);
    const currentUser = userStore.getCurrentUser();
    const user = userStore.getUserByUsername(username);
    const result = { user, currentUser };

    if (successMessages.includes(res.msg)) {
      result.displayBlogs = blogStore.getBlogsWithUsername(currentUser, username);
      if (res.msg !== 'BLOG_CHANGE_IMAGE_SUCCESS') {
        swal.success(res.msg);
      }
    }

    if (res.msg && res.msg !== 'LOGOUT_SUCCESS') {
      this.setState(result);
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
    const { currentUser, selectedPin, displayBlogs, showPinModal, user } = this.state;
    const { searchText } = this.props;
    const trimedSearchText = searchText ? searchText.trim() : '';
    const sortedBlogs = jsUtils.sortByDate(displayBlogs);
    const searchedBlogs = jsUtils.searchFromArray(sortedBlogs, searchText);
    const finalDisplayBlogs = (searchedBlogs.length || trimedSearchText) ? searchedBlogs : sortedBlogs;
    const isCurrentUser = currentUser && user ? currentUser.id_str === user.id_str : false;
    return (
      <div className="user-moments">
        <div className="user-blogs">
          {isCurrentUser && <BlogModal currentUser={currentUser} isUserHome={true} />}
          {finalDisplayBlogs.length ?
            <div className="">
              {finalDisplayBlogs.map((blog, index) =>
                <PinItem key={index} onSelect={(id) => this.onViewPinItem(id)} pin={blog} currentUser={currentUser} />
              )}
            </div> :
            <div className={isCurrentUser ? 'no-moments' : 'no-moments not-current'}>
              <h4>{isCurrentUser ? `You don't have any sweets, write a sweet here!` : `He doesn't have any sweets!`}</h4>
            </div>
          }
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

