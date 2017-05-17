'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('../../utils');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _UserControls = require('../UserControls');

var _Layout = require('../UI/Layout');

var _UI = require('../UI');

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
    const store = this.getStore(_stores.UserStore);
    const currentUploadedImage = store.getCurrentUploadedImage();
    // const showImageModal = currentUploadedImage !== null;
    // const currentUser =  store.getCurrentUser();
    return {
      currentUploadedImage: currentUploadedImage,
      currentUser: store.getCurrentUser(),
      showImageModal: false
    };
  },
  componentDidMount: function () {},
  onChange: function (res) {
    if (res.msg === 'FOLLOW_USER_SUCCESS') {
      _utils.sweetAlert.success(res.msg);
    }

    if (res.msg === 'CANCEL_FOLLOW_USER_SUCCESS') {
      _utils.sweetAlert.success(res.msg);
    }

    if (['UPLOAD_IMAGE_SUCCESS', 'EDIT_IMAGE_SUCCESS', 'CANCEL_IMAGE_SUCCESS'].includes(res.msg)) {
      if (res.msg === 'UPLOAD_IMAGE_SUCCESS') {
        _utils.sweetAlert.success(res.msg);
        _UI.ModalsFactory.hide('uploadModal');
      }
      this.setState(this.getStateFromStores());
    }
  },
  isActive: function (routes) {
    const path = _utils.jsUtils.splitUrlBySlash(this.props.path, routes.length);
    const isActive = _lodash2.default.isEqual(routes.sort(), path.sort());
    return isActive ? 'active' : '';
  },
  onEditUserImage: function () {
    const { showImageModal: showImageModal } = this.state;

    if (!showImageModal) {
      this.setState({ showImageModal: true });
    }

    (0, _jquery2.default)('#uploadModal').on('hidden.bs.modal', () => {
      // eslint-disable-next-line
      this.hideImageModal && this.hideImageModal();
    });

    _UI.ModalsFactory.show('uploadModal');
  },
  hideImageModal: function () {
    this.setState({ showImageModal: false });
  },
  onUploadImage: function (newImage) {
    // eslint-disable-next-line
    const formData = new FormData();
    formData.append('file', newImage.file);
    const _this = this;

    _jquery2.default.ajax({
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
        if (fan.id_str === currentUser.id_str) {
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
    _utils.sweetAlert.alertWarningMessage('Login first please!');
  },
  _renderUserBarNavs: function (isCurrentUser, user) {
    const { username: username } = user;

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
      return _react2.default.createElement(
        _Layout.Col,
        { size: classes, key: index },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: url },
          _react2.default.createElement('i', { className: icon }),
          ' ',
          navli
        )
      );
    });
  },
  _renderUserInfo: function (isCurrentUser, user, isFollowed) {
    return _react2.default.createElement(
      'div',
      { className: 'mt-10' },
      _react2.default.createElement(
        'p',
        { className: 'user-name' },
        user.username
      ),
      isCurrentUser && _react2.default.createElement('div', { className: 'user-btn' }),
      !isCurrentUser && _react2.default.createElement(
        'div',
        { className: 'user-btn mt-10' },
        !isFollowed && _react2.default.createElement(
          'button',
          { className: 'follow-btn', onClick: this.onFollowThisUser.bind(this, user) },
          _react2.default.createElement('i', { className: 'fa fa-plus' }),
          ' Follow'
        ),
        isFollowed && _react2.default.createElement(
          'button',
          { className: 'cancel-follow-btn', onClick: this.onCancelFollowThisUser.bind(this, user) },
          'Following'
        ),
        _react2.default.createElement(
          'button',
          { className: 'message-btn' },
          ' Message'
        )
      )
    );
  },
  _renderUserImage: function (isCurrentUser, user, currentUser) {
    const defaultImageUrl = '/styles/images/users/default-user.png';
    const hasChangedImage = currentUser ? currentUser.image_url === defaultImageUrl : false;
    const imageClass = isCurrentUser ? 'image-tooltip' : '';
    return _react2.default.createElement(
      'form',
      { accept: 'multipart/form-data', className: imageClass },
      isCurrentUser && _react2.default.createElement('img', { alt: 'user', className: 'current-user', src: currentUser.image_url, onClick: this.onEditUserImage }),
      isCurrentUser && hasChangedImage && _react2.default.createElement(
        'span',
        { className: 'tooltiptext' },
        'Click to change image'
      ),
      !isCurrentUser && _react2.default.createElement('img', { alt: 'user', className: 'user-image', src: user.image_url })
    );
  },
  render: function () {
    const { isCurrentUser: isCurrentUser, user: user } = this.props;
    const { currentUser: currentUser, showImageModal: showImageModal } = this.state;
    const isFollowed = this.isFollowedThisUser(currentUser, user);
    const displayUser = isCurrentUser ? currentUser : user;
    const userBackground = {
      backgroundImage: `url(${user.background_image_url})`
    };

    return _react2.default.createElement(
      'div',
      { className: 'user-bar' },
      _react2.default.createElement(
        'div',
        { className: 'user-background', style: userBackground },
        _react2.default.createElement(
          _Layout.Row,
          { className: 'user-img' },
          this._renderUserImage(isCurrentUser, user, currentUser)
        ),
        _react2.default.createElement(
          _Layout.Row,
          { className: 'user-info' },
          this._renderUserInfo(isCurrentUser, user, isFollowed)
        )
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: 'nav' },
        this._renderUserBarNavs(isCurrentUser, displayUser)
      ),
      _react2.default.createElement(
        _Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'uploadModal',
          title: 'Upload an image !',
          ModalComponent: _UserControls.UserImageEditor,
          size: 'modal-md',
          showHeaderAndFooter: true,
          showModal: showImageModal,
          currentUser: currentUser })
      )
    );
  }
});

exports.default = UserBar;
module.exports = exports['default'];
