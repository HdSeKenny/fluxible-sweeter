import React from 'react';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import _ from 'lodash';
import { sweetAlert, jsUtils } from '../../utils';
import { UserActions, BlogActions } from '../../actions';
import { UserStore } from '../../stores';
import { UserImageEditor } from '../UserControls';
import { Row, Col } from '../UI/Layout';

const UserBar = React.createClass({

  displayName: 'UserBar',

  contextTypes: {
    executeAction: React.PropTypes.func,
  },

  propTypes: {
    path: React.PropTypes.string,
    isCurrentUser: React.PropTypes.bool,
    user: React.PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      currentUploadedImage: this.getStore(UserStore).getCurrentUploadedImage(),
      currentUser: this.getStore(UserStore).getCurrentUser()
    };
  },

  onChange(res) {
    if (res.msg === 'FOLLOW_USER_SUCCESS') {
      sweetAlert.success(res.msg);
    }

    if (res.msg === 'CANCEL_FOLLOW_USER_SUCCESS') {
      sweetAlert.success(res.msg);
    }

    if (['UPLOAD_IMAGE_SUCCESS', 'EDIT_IMAGE_SUCCESS', 'CANCEL_IMAGE_SUCCESS'].includes(res.msg)) {
      if (res.msg === 'UPLOAD_IMAGE_SUCCESS') {
        sweetAlert.success(res.msg);
      }
      this.setState(this.getStateFromStores());
    }
  },

  isActive(routes) {
    const path = jsUtils.splitUrlBySlash(this.props.path, routes.length);
    const isActive = _.isEqual(routes.sort(), path.sort());
    return isActive ? 'active' : '';
  },

  onEditUserImage() {
    const { currentUser } = this.state;
    const image = { userId: currentUser._id, imageUrl: currentUser.image_url };
    this.executeAction(UserActions.EditUserImage, image);
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

  _renderUserBarNavs(isCurrentUser, user) {
    const { username } = user;

    const navs = {
      Home: 'fa fa-home',
      Blogs: 'fa fa-book',
      Follows: 'fa fa-flag',
      More: 'fa fa-ellipsis-h'
    };

    if (isCurrentUser) {
      navs.Messages = 'fa fa-comment';
      navs.Settings = 'fa fa-cogs';
    }

    const colSize = isCurrentUser ? '2' : '3';

    return Object.keys(navs).map((navli, index) => {
      const lowcaseNav = navli.toLowerCase();
      const isActive = this.isActive([lowcaseNav]);
      const classes = `${colSize} bar-nav ${isActive}`;
      const url = `/${username}/${lowcaseNav}`;
      const icon = navs[navli];
      return (
        <Col size={classes} key={index}>
          <Link to={url}><i className={icon}></i> {navli}</Link>
        </Col>
      );
    });
  },

  _renderUserInfo(isCurrentUser, user, isFollowed) {
    return (
      <div className="">
        <h3 className="user-name"> {user.username}</h3>
        {isCurrentUser && <div className="user-btn"></div>}
        {!isCurrentUser &&
          <div className="user-btn">
            {!isFollowed &&
              <Button className="follow-btn" onClick={this.onFollowThisUser.bind(this, user)} >
                <Glyphicon glyph="heart" /> Follow
              </Button>}
            {isFollowed &&
              <Button className="cancel-follow-btn" onClick={this.onCancelFollowThisUser.bind(this, user)} >
                <Glyphicon glyph="heart" /> Following
              </Button>}
            <Button className="message-btn" >
              <Glyphicon glyph="send" /> Message
            </Button>
          </div>
        }
      </div>
    );
  },

  _renderUserImage(isCurrentUser, user, currentUser) {
    const defaultImageUrl = '/images/users/default-user.png';
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
    const { isCurrentUser, user } = this.props;
    const { currentUploadedImage, isUploaded, currentUser } = this.state;
    const isFollowed = this.isFollowedThisUser(currentUser, user);
    const displayUser = isCurrentUser ? currentUser : user;
    const userBackground = {
      backgroundImage: `url(${user.background_image_url})`
    };
    return (
      <div className="user-bar">
        <div className="user-background" style={userBackground}>
        <Row className="user-img">
          {this._renderUserImage(isCurrentUser, user, currentUser)}
        </Row>
        <Row className="user-info">
          {this._renderUserInfo(isCurrentUser, user, isFollowed)}
        </Row>
        <Row className="nav">
          {this._renderUserBarNavs(isCurrentUser, displayUser)}
        </Row>
        </div>

        {currentUploadedImage && (
          <UserImageEditor
            show={currentUploadedImage !== null}
            image={currentUploadedImage}
            onSave={this.onUploadImage}
            onCancel={this.onCancelUpload}
            isUploaded={isUploaded}
          />
        )}
      </div>
    );
  }
});

export default UserBar;
