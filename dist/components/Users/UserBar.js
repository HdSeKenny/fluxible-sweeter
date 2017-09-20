'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouter = require('react-router');

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _utils = require('../../utils');

var _actions = require('../../actions');

var _stores = require('../../stores');

var _UserControls = require('../UserControls');

var _Layout = require('../UI/Layout');

var _UI = require('../UI');

var _plugins = require('../../plugins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserBar = (0, _createReactClass2.default)({

  displayName: 'UserBar',

  contextTypes: {
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    path: _propTypes2.default.string,
    user: _propTypes2.default.object
  },

  mixins: [_fluxibleAddonsReact.FluxibleMixin],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    const store = this.getStore(_stores.UserStore);
    return {
      currentUser: store.getCurrentUser(),
      showImageModal: false,
      defaultUserImageUrl: '/styles/images/users/default-user.svg'
    };
  },
  onChange: function (res) {
    const barMessages = ['FOLLOW_USER_SUCCESS', 'CANCEL_FOLLOW_USER_SUCCESS', 'UPLOAD_IMAGE_SUCCESS'];

    const store = this.getStore(_stores.UserStore);
    const newState = {};

    if (barMessages.includes(res.msg)) {
      _plugins.swal.success(res.msg);
      if (res.msg === 'UPLOAD_IMAGE_SUCCESS') {
        _UI.ModalsFactory.hide('uploadModal');
        newState.showImageModal = false;
      }
    }

    if (!res.msg || res.msg && res.msg !== 'LOGOUT_SUCCESS') {
      newState.currentUser = store.getCurrentUser();
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  },
  componentDidMount: function () {
    const imgDefer = document.getElementsByTagName('img');
    for (let i = 0; i < imgDefer.length; i++) {
      if (imgDefer[i].getAttribute('data-src')) {
        imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
      }
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

    $('#uploadModal').on('hidden.bs.modal', () => {
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
      return _plugins.swal.warning('Login first please!');
    }

    const followObj = {
      thisUserId: user.id_str,
      currentUserId: currentUser.id_str
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
  openChatConnection: function (user) {
    if (!this.state.currentUser) {
      return _plugins.swal.warning('Login first!');
    }
    const connection = {
      myId: this.state.currentUser.id_str,
      thisUserId: user.id_str,
      connectDate: new Date()
    };

    this.executeAction(_actions.UserActions.openChatConnection, connection);
  },
  onCancelFollowThisUser: function (user) {
    const { currentUser: currentUser } = this.state;
    if (!currentUser) {
      return _plugins.swal.warning('Login first please!');
    }

    const cancelFollowObj = {
      thisUserId: user.id_str,
      currentUserId: currentUser.id_str
    };

    _plugins.swal.confirm('Are you sure', 'Yes, cancel follow!', () => {
      this.executeAction(_actions.UserActions.CancelFollowThisUser, cancelFollowObj);
    });
  },
  _renderUserBarNavs: function (isCurrentUser, user) {
    const { username: username } = user;
    const navs = {
      Home: { label: 'Home', icon: 'fa fa-home' },
      Follows: { label: 'Follows', icon: 'fa fa-heart' },
      Photos: { label: 'Photos', icon: 'fa fa-picture-o' },
      Personal: {
        label: isCurrentUser ? 'Settings' : 'Personal',
        icon: isCurrentUser ? 'fa fa-cogs' : 'fa fa-user'
      }
    };
    const colSize = '2';
    const navKeys = Object.keys(navs);

    return navKeys.map((navli, index) => {
      const lowcaseNav = navli.toLowerCase();
      const isHome = lowcaseNav === 'home';
      let isActive = false;
      if (isHome) {
        isActive = this.isActive([username]) || this.isActive(['create', username]) || this.isActive(['mine', username]);
      } else {
        isActive = this.isActive([lowcaseNav, username]);
      }

      const classes = `${colSize} bar-nav ${isActive}`;
      const url = isHome ? `/${username}` : `/${username}/${lowcaseNav}`;
      const query = lowcaseNav === 'follows' ? { title: 'focuses_list' } : '';
      const icon = navs[navli].icon;
      const label = navs[navli].label;
      return _react2.default.createElement(
        _Layout.Col,
        { size: classes, key: index },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: { pathname: url, query: query } },
          _react2.default.createElement('i', { className: icon }),
          ' ',
          label
        )
      );
    });
  },
  _renderUserInfo: function (isCurrentUser, user, isFollowed) {
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'user-info mt-0' },
      user && _react2.default.createElement(
        'p',
        { className: 'user-name' },
        user.username
      ),
      !isCurrentUser && user && _react2.default.createElement(
        'div',
        { className: 'user-btn mt-10' },
        !isFollowed ? _react2.default.createElement(
          'button',
          { className: 'follow-btn', onClick: this.onFollowThisUser.bind(this, user) },
          _react2.default.createElement('i', { className: 'fa fa-plus mr-5' }),
          ' Follow'
        ) : _react2.default.createElement(
          'button',
          { className: 'cancel-follow-btn', onClick: this.onCancelFollowThisUser.bind(this, user) },
          _react2.default.createElement('i', { className: 'fa fa-check mr-5' }),
          'Followed'
        ),
        _react2.default.createElement(
          'button',
          { className: 'message-btn', onClick: () => this.openChatConnection(user) },
          ' Message'
        )
      )
    );
  },
  _renderUserImage: function (isCurrentUser, user, currentUser) {
    const defaultImageUrl = this.state.defaultUserImageUrl;
    const hasChangedImage = currentUser ? currentUser.image_url === defaultImageUrl : false;
    const imageClass = isCurrentUser ? 'image-tooltip' : '';
    return _react2.default.createElement(
      _Layout.Row,
      { className: 'user-img' },
      isCurrentUser && _react2.default.createElement(
        'form',
        { accept: 'multipart/form-data', className: imageClass, 'data-balloon': 'Upload an image!', 'data-balloon-pos': 'right' },
        _react2.default.createElement('img', { alt: 'user', className: 'current-user', src: currentUser.image_url, onClick: this.onEditUserImage }),
        hasChangedImage && _react2.default.createElement(
          'span',
          { className: 'tooltiptext' },
          'Click to change image'
        ),
        !isCurrentUser && user && _react2.default.createElement('img', { alt: 'user', className: 'user-image', src: user.image_url })
      ),
      !isCurrentUser && _react2.default.createElement(
        'form',
        { accept: 'multipart/form-data', className: imageClass },
        user && _react2.default.createElement('img', { alt: 'user', className: 'user-image', src: user.image_url })
      )
    );
  },
  render: function () {
    const { user: user } = this.props;
    const { currentUser: currentUser, showImageModal: showImageModal } = this.state;
    const isCurrentUser = currentUser ? user.id_str === currentUser.id_str : false;
    const isFollowed = this.isFollowedThisUser(currentUser, user);
    const displayUser = isCurrentUser ? currentUser : user;
    const background = user ? user.background_image_url : '';
    const background_lq = user ? user.lq_background_url : '';

    return _react2.default.createElement(
      'div',
      { className: 'user-bar mb-20' },
      _react2.default.createElement(
        'div',
        { className: 'user-background' },
        _react2.default.createElement('img', { alt: 'user-bg', src: background_lq, 'data-src': background, className: 'background' }),
        this._renderUserImage(isCurrentUser, user, currentUser),
        this._renderUserInfo(isCurrentUser, user, isFollowed)
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: `nav ${isCurrentUser ? 'mine' : 'their'}` },
        user && this._renderUserBarNavs(isCurrentUser, displayUser)
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
