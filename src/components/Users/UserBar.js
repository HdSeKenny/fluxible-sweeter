import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import $ from 'jquery';
import { Link } from 'react-router';
import { FluxibleMixin } from 'fluxible-addons-react';
import { sweetAlert, jsUtils, env } from '../../utils';
import { UserActions, BlogActions } from '../../actions';
import { UserStore } from '../../stores';
import { UserImageEditor } from '../UserControls';
import { Row, Col, Page } from '../UI/Layout';
import { ModalsFactory } from '../UI';

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
    // const showImageModal = currentUploadedImage !== null;
    // const currentUser =  store.getCurrentUser();
    return {
      currentUploadedImage,
      currentUser: store.getCurrentUser(),
      showImageModal: false
    };
  },

  componentDidMount() {

  },

  onChange(res) {
    if (res.msg === 'FOLLOW_USER_SUCCESS') {
      sweetAlert.success(res.msg);
    }

    if (res.msg === 'CANCEL_FOLLOW_USER_SUCCESS') {
      sweetAlert.success(res.msg);
    }

    if (res.msg === 'UPLOAD_IMAGE_SUCCESS') {
      sweetAlert.success(res.msg);
      ModalsFactory.hide('uploadModal');
      this.setState(this.getStateFromStores());
    }
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
      this.checkCurrentUser();
      return;
    }

    const followObj = {
      thisUserId: user._id,
      currentUserId: currentUser._id
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
      this.checkCurrentUser();
      return;
    }

    const cancelFollowObj = {
      thisUserId: user._id,
      currentUserId: currentUser._id
    };

    this.executeAction(UserActions.CancelFollowThisUser, cancelFollowObj);
  },

  checkCurrentUser() {
    sweetAlert.alertWarningMessage('Login first please!');
  },

  preloadBackgroundImage(background) {
    // eslint-disable-next-line
    const newImage = new Image();
    newImage.src = background;
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
      },
      More: { label: 'More', icon: 'fa fa-ellipsis-h' }
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
      <div className="mt-10">
        <p className="user-name">{user.username}</p>
        {!isCurrentUser &&
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
      </div>
    );
  },

  _renderUserImage(isCurrentUser, user, currentUser) {
    const defaultImageUrl = '/styles/images/users/default-user.png';
    const hasChangedImage = currentUser ? (currentUser.image_url === defaultImageUrl) : false;
    const imageClass = isCurrentUser ? 'image-tooltip' : '';
    return (
      <form accept="multipart/form-data" className={imageClass}>
        {isCurrentUser && <img alt="user" className="current-user" src={currentUser.image_url} onClick={this.onEditUserImage} />}
        {isCurrentUser && hasChangedImage && <span className="tooltiptext">Click to change image</span>}
        {!isCurrentUser && <img alt="user" className="user-image" src={user.image_url} />}
      </form>
    );
  },

  render() {
    const { user } = this.props;
    const { currentUser, showImageModal } = this.state;
    const isCurrentUser = currentUser ? user.id_str === currentUser.id_str : false;
    const isFollowed = this.isFollowedThisUser(currentUser, user);
    const displayUser = isCurrentUser ? currentUser : user;
    const background = user.background_image_url;
    const userBackground = {
      backgroundImage: `url(${background})`
    };

    // preload image
    if (env.is_client) this.preloadBackgroundImage(background);

    return (
      <div className="user-bar mb-20">
        <div className="user-background" style={userBackground}>
          <Row className="user-img">
            {this._renderUserImage(isCurrentUser, user, currentUser)}
          </Row>
          <Row className="user-info">
            {this._renderUserInfo(isCurrentUser, user, isFollowed)}
          </Row>
        </div>

        <Row className="nav">
          {this._renderUserBarNavs(isCurrentUser, displayUser)}
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
