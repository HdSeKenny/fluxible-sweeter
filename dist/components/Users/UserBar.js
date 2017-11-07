'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserBar = (0, _createReactClass2.default)({

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

  getInitialState: function getInitialState() {
    return this.getStateFromStores();
  },
  getStateFromStores: function getStateFromStores() {
    var store = this.getStore(_stores.UserStore);
    return {
      currentUser: store.getCurrentUser(),
      showImageModal: false,
      defaultUserImageUrl: '/images/users/default-user.svg'
    };
  },
  onChange: function onChange(res) {
    var barMessages = ['FOLLOW_USER_SUCCESS', 'CANCEL_FOLLOW_USER_SUCCESS', 'UPLOAD_IMAGE_SUCCESS'];

    var store = this.getStore(_stores.UserStore);
    var newState = {};

    if (barMessages.includes(res.msg)) {
      _UI.Swal.success(res.msg);
      if (res.msg === 'UPLOAD_IMAGE_SUCCESS') {
        _UI.ModalsFactory.hide('uploadModal');
        newState.showImageModal = false;
      }
    }

    if (!res.msg || res.msg && res.msg !== 'LOGOUT_SUCCESS') {
      newState.currentUser = store.getCurrentUser();
    }

    if ((0, _keys2.default)(newState).length) {
      this.setState(newState);
    }
  },
  componentDidMount: function componentDidMount() {
    var imgDefer = document.getElementsByTagName('img');
    for (var i = 0; i < imgDefer.length; i++) {
      if (imgDefer[i].getAttribute('data-src')) {
        imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
      }
    }
  },
  isActive: function isActive(routes) {
    var path = _utils.jsUtils.splitUrlBySlash(this.props.path, routes.length);
    var isActive = _lodash2.default.isEqual(routes.sort(), path.sort());
    return isActive ? 'active' : '';
  },
  onEditUserImage: function onEditUserImage() {
    var _this2 = this;

    var showImageModal = this.state.showImageModal;


    if (!showImageModal) {
      this.setState({ showImageModal: true });
    }

    $('#uploadModal').on('hidden.bs.modal', function () {
      // eslint-disable-next-line
      _this2.hideImageModal && _this2.hideImageModal();
    });

    _UI.ModalsFactory.show('uploadModal');
  },
  hideImageModal: function hideImageModal() {
    this.setState({ showImageModal: false });
  },
  onUploadImage: function onUploadImage(newImage) {
    // eslint-disable-next-line
    var formData = new FormData();
    formData.append('file', newImage.file);
    var _this = this;

    $.ajax({
      url: '/api/' + newImage.userId + '/changeProfileImage',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function success(newUser) {
        _this.executeAction(_actions.UserActions.UploadImageSuccess, newUser);
        _this.executeAction(_actions.BlogActions.UploadImageSuccess, newUser);
        _this.executeAction(_actions.UserActions.LoadSessionUser);
      }
    });
  },
  onCancelUpload: function onCancelUpload() {
    this.executeAction(_actions.UserActions.CancelEditUserImage);
  },
  onFollowThisUser: function onFollowThisUser(user) {
    var currentUser = this.state.currentUser;

    if (!currentUser) {
      return _UI.Swal.warning('Login first please!');
    }

    var followObj = {
      thisUserId: user.id_str,
      currentUserId: currentUser.id_str
    };

    this.executeAction(_actions.UserActions.FollowThisUser, followObj);
  },
  isFollowedThisUser: function isFollowedThisUser(currentUser, user) {
    var isFollowed = false;
    if (currentUser && user) {
      user.fans.forEach(function (fan) {
        if (fan.id_str === currentUser.id_str) {
          isFollowed = true;
        }
      });
    }
    return isFollowed;
  },
  openChatConnection: function openChatConnection(user) {
    if (!this.state.currentUser) {
      return _UI.Swal.warning('Login first!');
    }
    var connection = {
      myId: this.state.currentUser.id_str,
      thisUserId: user.id_str,
      connectDate: new Date()
    };

    this.executeAction(_actions.UserActions.openChatConnection, connection);
  },
  onCancelFollowThisUser: function onCancelFollowThisUser(user) {
    var _this3 = this;

    var currentUser = this.state.currentUser;

    if (!currentUser) {
      return _UI.Swal.warning('Login first please!');
    }

    var cancelFollowObj = {
      thisUserId: user.id_str,
      currentUserId: currentUser.id_str
    };

    _UI.Swal.confirm('Are you sure', 'Yes, cancel follow!', function () {
      _this3.executeAction(_actions.UserActions.CancelFollowThisUser, cancelFollowObj);
    });
  },
  _renderUserBarNavs: function _renderUserBarNavs(isCurrentUser, user) {
    var _this4 = this;

    var username = user.username;

    var navs = {
      Home: { label: 'Home', icon: 'fa fa-home' },
      Follows: { label: 'Follows', icon: 'fa fa-heart' },
      Photos: { label: 'Photos', icon: 'fa fa-picture-o' },
      Personal: {
        label: isCurrentUser ? 'Settings' : 'Personal',
        icon: isCurrentUser ? 'fa fa-cogs' : 'fa fa-user'
      }
    };
    var colSize = '2';
    var navKeys = (0, _keys2.default)(navs);

    return navKeys.map(function (navli, index) {
      var lowcaseNav = navli.toLowerCase();
      var isHome = lowcaseNav === 'home';
      var isActive = false;
      if (isHome) {
        isActive = _this4.isActive([username]) || _this4.isActive(['create', username]) || _this4.isActive(['mine', username]);
      } else {
        isActive = _this4.isActive([lowcaseNav, username]);
      }

      var classes = colSize + ' bar-nav ' + isActive;
      var url = isHome ? '/' + username : '/' + username + '/' + lowcaseNav;
      var query = lowcaseNav === 'follows' ? { title: 'focuses_list' } : '';
      var icon = navs[navli].icon;
      var label = navs[navli].label;
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
  _renderUserInfo: function _renderUserInfo(isCurrentUser, user, isFollowed) {
    var _this5 = this;

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
          { className: 'message-btn', onClick: function onClick() {
              return _this5.openChatConnection(user);
            } },
          ' Message'
        )
      )
    );
  },
  _renderUserImage: function _renderUserImage(isCurrentUser, user, currentUser) {
    var defaultImageUrl = this.state.defaultUserImageUrl;
    var hasChangedImage = currentUser ? currentUser.image_url === defaultImageUrl : false;
    var imageClass = isCurrentUser ? 'image-tooltip' : '';
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
  render: function render() {
    var user = this.props.user;
    var _state = this.state,
        currentUser = _state.currentUser,
        showImageModal = _state.showImageModal;

    var isCurrentUser = currentUser ? user.id_str === currentUser.id_str : false;
    var isFollowed = this.isFollowedThisUser(currentUser, user);
    var displayUser = isCurrentUser ? currentUser : user;
    var background = user ? user.background_image_url : '';
    var backgroundLQ = user ? user.lq_background_url : '';

    return _react2.default.createElement(
      'div',
      { className: 'user-bar mb-20' },
      _react2.default.createElement(
        'div',
        { className: 'user-background' },
        _react2.default.createElement('img', { alt: 'user-bg', src: backgroundLQ, 'data-src': background, className: 'background' }),
        this._renderUserImage(isCurrentUser, user, currentUser),
        this._renderUserInfo(isCurrentUser, user, isFollowed)
      ),
      _react2.default.createElement(
        _Layout.Row,
        { className: 'nav ' + (isCurrentUser ? 'mine' : 'their') },
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