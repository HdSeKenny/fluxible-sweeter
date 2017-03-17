import React from 'react';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import sweetAlert from '../../utils/sweetAlert';
import { UserActions, BlogActions } from '../../actions';
import { UserStore } from '../../stores';
import { UserImageEditor } from '../UserControls';

const UserBar = React.createClass({

  displayName: 'UserBar',

  contextTypes: {
    executeAction: React.PropTypes.func,
  },

  propTypes: {
    path: React.PropTypes.object,
    isCurrentUser: React.PropTypes.object,
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
    if (res.resMsg === 'FOLLOW_USER_SUCCESS') {
      sweetAlert.alertSuccessMessage(res.resMsg);
    }

    if (res.resMsg === 'CANCEL_FOLLOW_USER_SUCCESS') {
      sweetAlert.alertSuccessMessage(res.resMsg);
    }

    if (['UPLOAD_IMAGE_SUCCESS', 'EDIT_IMAGE_SUCCESS', 'CANCEL_IMAGE_SUCCESS'].includes(res.resMsg)) {
      if (res.resMsg === 'UPLOAD_IMAGE_SUCCESS') {
        sweetAlert.alertSuccessMessage(res.resMsg);
      }
      this.setState(this.getStateFromStores());
    }
  },

  isActive(route) {
    const currentRoute = this.props.path;
    const secondSlash = this.getRouteSlashPosition(currentRoute, '/', 2);
    return route === currentRoute.substring(1, secondSlash) ? 'active' : '';
  },

  getRouteSlashPosition(string, word, index) {
    return string.split(word, index).join(word).length;
  },

  onEditUserImage(user) {
    const image = { userId: user._id, imageUrl: user.image_url };
    this.executeAction(UserActions.EditUserImage, image);
  },

  onUploadImage(newImage) {
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
        if (fan.strId === currentUser.strId) {
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

  _renderCurrentUserNav(currentUser) {
    return (
      <div className="row nav">
        <div className={`col-md-2 col-xs-2 well user-home-well ${this.isActive('user-home')}`}>
          <Link to={`/user-home/${currentUser.strId}/home`}><i className="fa fa-home"></i> Home</Link>
        </div>
        <div className={`col-md-2 col-xs-2 well ${this.isActive('user-blogs')}`}>
          <Link to={`/user-blogs/${currentUser.strId}/list`}><i className="fa fa-book"></i> Blogs</Link>
        </div>
        <div className={`col-md-2 col-xs-2 well ${this.isActive('user-follows')}`}>
          <Link to={`/user-follows/${currentUser.strId}`}><i className="fa fa-flag"></i> Following</Link>
        </div>
        <div className={`col-md-2 col-xs-2 well ${this.isActive('user-messages')}`}>
          <Link to={`/user-messages/${currentUser.strId}`}><i className="fa fa-comment"></i> Messages</Link>
        </div>
        <div className={`col-md-2 col-xs-2 well ${this.isActive('user-settings')}`}>
          <Link to={`/user-settings/${currentUser.strId}/info`}><i className="fa fa-cogs"></i> Settings</Link>
        </div>
        <div className={`col-md-2 col-xs-2 well ${this.isActive('user-more')}`}>
          <Link to={`/user-more/${currentUser.strId}`}><i className="fa fa-ellipsis-h"></i> More</Link>
        </div>
      </div>
    );
  },

  _renderOtherUsersNav(user) {
    return (
      <div className="row nav">
        <div className={`col-md-3 col-xs-3 well user-home-well ${this.isActive('user-home')}`}>
          <Link to={`/user-home/${user.strId}/home`}><i className="fa fa-home"></i> Home</Link>
        </div>
        <div className={`col-md-3 col-xs-3 well ${this.isActive('user-blogs')}`}>
          <Link to={`/user-blogs/${user.strId}/list`}><i className="fa fa-book"></i> Blogs</Link>
        </div>
        <div className={`col-md-3 col-xs-3 well ${this.isActive('user-follows')}`}>
          <Link to={`/user-follows/${user.strId}`}><i className="fa fa-flag"></i> Following</Link>
        </div>
        <div className={`col-md-3 col-xs-3 well ${this.isActive('user-more')}`}>
          <Link to={`/user-more/${user.strId}`}><i className="fa fa-ellipsis-h"></i> More</Link>
        </div>
      </div>
    );
  },

  _renderUserInfo(isCurrentUser, user, isFollowed) {
    return (
      <div className="row user-info">
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
    const hasChangedImage = currentUser ? currentUser.image_url === defaultImageUrl : false;
    return (
      <div className="row user-img">
        {isCurrentUser &&
          <form accept="multipart/form-data" className="image-tooltip">
            <img
              alt="user"
              className="current-user-image"
              src={currentUser.image_url}
              onClick={this.onEditUserImage.bind(this, currentUser)}
            />
            {hasChangedImage && <span className="tooltiptext">Click to change image</span>}
          </form>
        }
        {!isCurrentUser &&
          <form accept="multipart/form-data">
            <img alt="user" className="user-image" src={user.image_url} />
          </form>
        }
      </div>
    );
  },

  render() {
    const { isCurrentUser, user } = this.props;
    const { currentUploadedImage, isUploaded, currentUser } = this.state;
    const isFollowed = this.isFollowedThisUser(currentUser, user);
    const userBackground = {
      backgroundImage: `url(${user.background_image_url})`
    };
    return (
      <div className="user-bar">
        <div className="user-background" style={userBackground}></div>
        {this._renderUserImage(isCurrentUser, user, currentUser)}
        {this._renderUserInfo(isCurrentUser, user, isFollowed)}
        {isCurrentUser && this._renderCurrentUserNav(currentUser)}
        {!isCurrentUser && this._renderOtherUsersNav(user)}
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
