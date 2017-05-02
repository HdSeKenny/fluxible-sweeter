'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _sweetAlert = require('../../utils/sweetAlert');

var _sweetAlert2 = _interopRequireDefault(_sweetAlert);

var _actions = require('../../actions');

var _stores = require('../../stores');

var _UserControls = require('../UserControls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserBar = _react2.default.createClass({

  displayName: 'UserBar',

  contextTypes: {
    executeAction: _react2.default.PropTypes.func
  },

  propTypes: {
    path: _react2.default.PropTypes.string,
    isCurrentUser: _react2.default.PropTypes.bool,
    user: _react2.default.PropTypes.object
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      currentUploadedImage: this.getStore(_stores.UserStore).getCurrentUploadedImage(),
      currentUser: this.getStore(_stores.UserStore).getCurrentUser()
    };
  },
  onChange: function (res) {
    if (res.resMsg === 'FOLLOW_USER_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
    }

    if (res.resMsg === 'CANCEL_FOLLOW_USER_SUCCESS') {
      _sweetAlert2.default.alertSuccessMessage(res.resMsg);
    }

    if (['UPLOAD_IMAGE_SUCCESS', 'EDIT_IMAGE_SUCCESS', 'CANCEL_IMAGE_SUCCESS'].includes(res.resMsg)) {
      if (res.resMsg === 'UPLOAD_IMAGE_SUCCESS') {
        _sweetAlert2.default.alertSuccessMessage(res.resMsg);
      }
      this.setState(this.getStateFromStores());
    }
  },
  isActive: function (route) {
    const currentRoute = this.props.path;
    const secondSlash = this.getRouteSlashPosition(currentRoute, '/', 2);
    return route === currentRoute.substring(1, secondSlash) ? 'active' : '';
  },
  getRouteSlashPosition: function (string, word, index) {
    return string.split(word, index).join(word).length;
  },
  onEditUserImage: function (user) {
    const image = { userId: user._id, imageUrl: user.image_url };
    this.executeAction(_actions.UserActions.EditUserImage, image);
  },
  onUploadImage: function (newImage) {
    const formData = new FormData();
    formData.append('file', newImage.file);
    const _this = this;

    $.ajax({
      url: `/api/${newImage.userId}/changeProfileImage`,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: newUser => {
        _this.executeAction(_actions.UserActions.UploadImageSuccess, newUser);
        _this.executeAction(_actions.BlogActions.UploadImageSuccess, newUser);
        _this.executeAction(_actions.UserActions.LoadSessionUser);
      }
    });
  },
  onCancelUpload: function () {
    this.executeAction(_actions.UserActions.CancelEditUserImage);
  },
  onFollowThisUser: function (user) {
    const { currentUser: currentUser } = this.state;
    if (!currentUser) {
      this.checkCurrentUser();
      return;
    }

    const followObj = {
      thisUserId: user._id,
      currentUserId: currentUser._id
    };

    this.executeAction(_actions.UserActions.FollowThisUser, followObj);
  },
  isFollowedThisUser: function (currentUser, user) {
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
  onCancelFollowThisUser: function (user) {
    const { currentUser: currentUser } = this.state;
    if (!currentUser) {
      this.checkCurrentUser();
      return;
    }

    const cancelFollowObj = {
      thisUserId: user._id,
      currentUserId: currentUser._id
    };

    this.executeAction(_actions.UserActions.CancelFollowThisUser, cancelFollowObj);
  },
  checkCurrentUser: function () {
    _sweetAlert2.default.alertWarningMessage('Login first please!');
  },
  _renderCurrentUserNav: function (currentUser) {
    return _react2.default.createElement(
      'div',
      { className: 'row nav' },
      _react2.default.createElement(
        'div',
        { className: `col-md-2 col-xs-2 well user-home-well ${this.isActive('user-home')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-home/${currentUser.strId}/home` },
          _react2.default.createElement('i', { className: 'fa fa-home' }),
          ' Home'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: `col-md-2 col-xs-2 well ${this.isActive('user-blogs')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-blogs/${currentUser.strId}/list` },
          _react2.default.createElement('i', { className: 'fa fa-book' }),
          ' Blogs'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: `col-md-2 col-xs-2 well ${this.isActive('user-follows')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-follows/${currentUser.strId}` },
          _react2.default.createElement('i', { className: 'fa fa-flag' }),
          ' Following'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: `col-md-2 col-xs-2 well ${this.isActive('user-messages')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-messages/${currentUser.strId}` },
          _react2.default.createElement('i', { className: 'fa fa-comment' }),
          ' Messages'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: `col-md-2 col-xs-2 well ${this.isActive('user-settings')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-settings/${currentUser.strId}/info` },
          _react2.default.createElement('i', { className: 'fa fa-cogs' }),
          ' Settings'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: `col-md-2 col-xs-2 well ${this.isActive('user-more')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-more/${currentUser.strId}` },
          _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' }),
          ' More'
        )
      )
    );
  },
  _renderOtherUsersNav: function (user) {
    return _react2.default.createElement(
      'div',
      { className: 'row nav' },
      _react2.default.createElement(
        'div',
        { className: `col-md-3 col-xs-3 well user-home-well ${this.isActive('user-home')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-home/${user.strId}/home` },
          _react2.default.createElement('i', { className: 'fa fa-home' }),
          ' Home'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: `col-md-3 col-xs-3 well ${this.isActive('user-blogs')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-blogs/${user.strId}/list` },
          _react2.default.createElement('i', { className: 'fa fa-book' }),
          ' Blogs'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: `col-md-3 col-xs-3 well ${this.isActive('user-follows')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-follows/${user.strId}` },
          _react2.default.createElement('i', { className: 'fa fa-flag' }),
          ' Following'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: `col-md-3 col-xs-3 well ${this.isActive('user-more')}` },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: `/user-more/${user.strId}` },
          _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' }),
          ' More'
        )
      )
    );
  },
  _renderUserInfo: function (isCurrentUser, user, isFollowed) {
    return _react2.default.createElement(
      'div',
      { className: 'row user-info' },
      _react2.default.createElement(
        'h3',
        { className: 'user-name' },
        ' ',
        user.username
      ),
      isCurrentUser && _react2.default.createElement('div', { className: 'user-btn' }),
      !isCurrentUser && _react2.default.createElement(
        'div',
        { className: 'user-btn' },
        !isFollowed && _react2.default.createElement(
          _reactBootstrap.Button,
          { className: 'follow-btn', onClick: this.onFollowThisUser.bind(this, user) },
          _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'heart' }),
          ' Follow'
        ),
        isFollowed && _react2.default.createElement(
          _reactBootstrap.Button,
          { className: 'cancel-follow-btn', onClick: this.onCancelFollowThisUser.bind(this, user) },
          _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'heart' }),
          ' Following'
        ),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { className: 'message-btn' },
          _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'send' }),
          ' Message'
        )
      )
    );
  },
  _renderUserImage: function (isCurrentUser, user, currentUser) {
    const defaultImageUrl = '/images/users/default-user.png';
    const hasChangedImage = currentUser ? currentUser.image_url === defaultImageUrl : false;
    return _react2.default.createElement(
      'div',
      { className: 'row user-img' },
      isCurrentUser && _react2.default.createElement(
        'form',
        { accept: 'multipart/form-data', className: 'image-tooltip' },
        _react2.default.createElement('img', {
          alt: 'user',
          className: 'current-user-image',
          src: currentUser.image_url,
          onClick: this.onEditUserImage.bind(this, currentUser)
        }),
        hasChangedImage && _react2.default.createElement(
          'span',
          { className: 'tooltiptext' },
          'Click to change image'
        )
      ),
      !isCurrentUser && _react2.default.createElement(
        'form',
        { accept: 'multipart/form-data' },
        _react2.default.createElement('img', { alt: 'user', className: 'user-image', src: user.image_url })
      )
    );
  },
  render: function () {
    const { isCurrentUser: isCurrentUser, user: user } = this.props;
    const { currentUploadedImage: currentUploadedImage, isUploaded: isUploaded, currentUser: currentUser } = this.state;
    const isFollowed = this.isFollowedThisUser(currentUser, user);
    const userBackground = {
      backgroundImage: `url(${user.background_image_url})`
    };
    return _react2.default.createElement(
      'div',
      { className: 'user-bar' },
      _react2.default.createElement('div', { className: 'user-background', style: userBackground }),
      this._renderUserImage(isCurrentUser, user, currentUser),
      this._renderUserInfo(isCurrentUser, user, isFollowed),
      isCurrentUser && this._renderCurrentUserNav(currentUser),
      !isCurrentUser && this._renderOtherUsersNav(user),
      currentUploadedImage && _react2.default.createElement(_UserControls.UserImageEditor, {
        show: currentUploadedImage !== null,
        image: currentUploadedImage,
        onSave: this.onUploadImage,
        onCancel: this.onCancelUpload,
        isUploaded: isUploaded
      })
    );
  }
});

exports.default = UserBar;
module.exports = exports['default'];
