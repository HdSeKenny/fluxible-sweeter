import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router';
import { FluxibleMixin } from 'fluxible-addons-react';
import { jsUtils } from '../../utils';
import { UserActions, BlogActions } from '../../actions';
import { UserStore } from '../../stores';
import { UserImageEditor } from '../UserControls';
import { Row, Col, Page } from '../UI/Layout';
import { ModalsFactory } from '../UI';
import { swal } from '../../plugins';

const UserBar = CreateReactClass({

  displayName: 'UserBar',

  contextTypes: {
    executeAction: PropTypes.func,
  },

  propTypes: {
    path: PropTypes.string,
    user: PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    const store = this.getStore(UserStore);
    const currentUploadedImage = store.getCurrentUploadedImage();
    return {
      currentUploadedImage,
      currentUser: store.getCurrentUser(),
      showImageModal: false,
      defaultUserImageUrl: '/styles/images/users/default-user.png',
    };
  },

  onChange(res) {
    if (res.msg === 'FOLLOW_USER_SUCCESS') {
      swal.success(res.msg);
    }

    if (res.msg === 'CANCEL_FOLLOW_USER_SUCCESS') {
      swal.success(res.msg);
    }

    if (res.msg === 'UPLOAD_IMAGE_SUCCESS') {
      swal.success(res.msg);
      ModalsFactory.hide('uploadModal');
      this.setState(this.getStateFromStores());
    }
  },

  componentDidMount() {

  },

  isActive(routes) {
    const path = jsUtils.splitUrlBySlash(this.props.path, routes.length);
    const isActive = _.isEqual(routes.sort(), path.sort());
    return isActive ? 'active' : '';
  },

  onEditUserImage() {
    const { showImageModal } = this.state;

    if (!showImageModal) {
      this.setState({ showImageModal: true });
    }

    $('#uploadModal').on('hidden.bs.modal', () => {
      // eslint-disable-next-line
      this.hideImageModal && this.hideImageModal();
    });

    ModalsFactory.show('uploadModal');
  },

  hideImageModal() {
    this.setState({ showImageModal: false });
  },

  onUploadImage(newImage) {
    // eslint-disable-next-line
    const formData = new FormData();
    formData.append('file', newImage.file);
    const _this = this;

    $.ajax({
      url: `/api/${newImage.userId}/changeProfileImage`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: (newUser) => {
        _this.executeAction(UserActions.UploadImageSuccess, newUser);
        _this.executeAction(BlogActions.UploadImageSuccess, newUser);
        _this.executeAction(UserActions.LoadSessionUser);
      }
    });
  },

  onCancelUpload() {
    this.executeAction(UserActions.CancelEditUserImage);
  },

  onFollowThisUser(user) {
    const { currentUser } = this.state;
    if (!currentUser) {
      return swal.warning('Login first please!');
    }

    const followObj = {
      thisUserId: user.id_str,
      currentUserId: currentUser.id_str
    };

    this.executeAction(UserActions.FollowThisUser, followObj);
  },

  isFollowedThisUser(currentUser, user) {
    let isFollowed = false;
    if (currentUser && user) {
      user.fans.forEach(fan => {
        if (fan.id_str === currentUser.id_str) {
          isFollowed = true;
        }
      });
    }
    return isFollowed;
  },

  onCancelFollowThisUser(user) {
    const { currentUser } = this.state;
    if (!currentUser) {
      return swal.warning('Login first please!');
    }

    const cancelFollowObj = {
      thisUserId: user.id_str,
      currentUserId: currentUser.id_str
    };

    this.executeAction(UserActions.CancelFollowThisUser, cancelFollowObj);
  },

  _renderUserBarNavs(isCurrentUser, user) {
    const { username } = user;

    const navs = {
      Home: { label: 'Home', icon: 'fa fa-home' },
      Follows: { label: 'Follows', icon: 'fa fa-heart' },
      Messages: { label: 'Messages', icon: 'fa fa-comments-o' },
      Photos: { label: 'Photos', icon: 'fa fa-picture-o' },
      Settings: {
        label: isCurrentUser ? 'Settings' : 'Personal',
        icon: isCurrentUser ? 'fa fa-cogs' : 'fa fa-user'
      }
    };

    const colSize = '2';

    return Object.keys(navs).map((navli, index) => {
      const lowcaseNav = navli.toLowerCase();
      const isHome = lowcaseNav === 'home';
      let isActive = false;
      if (isHome) {
        isActive = this.isActive([username]) || this.isActive(['create', username]) || this.isActive(['mine', username]);
      }
      else {
        isActive = this.isActive([lowcaseNav, username]);
      }

      const classes = `${colSize} bar-nav ${isActive}`;
      const url = isHome ? `/${username}` : `/${username}/${lowcaseNav}`;
      const icon = navs[navli].icon;
      const label = navs[navli].label;
      return (
        <Col size={classes} key={index}><Link to={url}><i className={icon}></i> {label}</Link></Col>
      );
    });
  },

  _renderUserInfo(isCurrentUser, user, isFollowed) {
    return (
      <Row className="user-info mt-0">
        {user && <p className="user-name">{user.username}</p>}
        {!isCurrentUser && user &&
          <div className="user-btn mt-10">
            {!isFollowed &&
              <button className="follow-btn" onClick={this.onFollowThisUser.bind(this, user)} >
                <i className="fa fa-plus" /> Follow
              </button>}
            {isFollowed &&
              <button className="cancel-follow-btn" onClick={this.onCancelFollowThisUser.bind(this, user)} >
                 Following
              </button>}
            <button className="message-btn" > Message</button>
          </div>
        }
      </Row>
    );
  },

  _renderUserImage(isCurrentUser, user, currentUser) {
    const defaultImageUrl = this.state.defaultUserImageUrl;
    const hasChangedImage = currentUser ? (currentUser.image_url === defaultImageUrl) : false;
    const imageClass = isCurrentUser ? 'image-tooltip' : '';
    return (
      <Row className="user-img">
        <form accept="multipart/form-data" className={imageClass}>
          {isCurrentUser && <img alt="user" className="current-user" src={currentUser.image_url} onClick={this.onEditUserImage} />}
          {isCurrentUser && hasChangedImage && <span className="tooltiptext">Click to change image</span>}
          {!isCurrentUser && user && <img alt="user" className="user-image" src={user.image_url} />}
        </form>
      </Row>
    );
  },

  render() {
    const { user } = this.props;
    const { currentUser, showImageModal } = this.state;
    const isCurrentUser = currentUser ? user.id_str === currentUser.id_str : false;
    const isFollowed = this.isFollowedThisUser(currentUser, user);
    const displayUser = isCurrentUser ? currentUser : user;
    const background = user ? user.background_image_url : '';
    const background_lq = user ? user.lq_background_url : '';

    // const userBackground = {
    //   background: `url(${background}) no-repeat center center fixed`,
    //   backgroundSize: 'cover'
    // };

    return (
      <div className="user-bar mb-20">
        <div className="user-background">
          <img alt="user-bg" src={background_lq} data-src={background} className="background lazyload blur-up" />
          {this._renderUserImage(isCurrentUser, user, currentUser)}
          {this._renderUserInfo(isCurrentUser, user, isFollowed)}
        </div>

        <Row className="nav">
          {user && this._renderUserBarNavs(isCurrentUser, displayUser)}
        </Row>

        <Page>
          <ModalsFactory
            modalref="uploadModal"
            title="Upload an image !"
            ModalComponent={UserImageEditor}
            size="modal-md"
            showHeaderAndFooter={true}
            showModal={showImageModal}
            currentUser={currentUser} />
        </Page>
      </div>
    );
  }
});

export default UserBar;
