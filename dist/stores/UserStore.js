'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createStore = require('fluxible/addons/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserStore = (0, _createStore2.default)({

  storeName: 'UserStore',

  handlers: {
    'USER_REGISTER_SUCCESS': 'registerSuccess',
    'USER_LOGIN_SUCCESS': 'loginSuccess',
    'LOGOUT_SUCCESS': 'logoutSuccess',
    'LOAD_SESSION_USER_SUCCESS': 'loadSessionUserSuccess',
    'LOAD_USERS_SUCCESS': 'loadUsersSuccess',
    'IS_LOGGED_IN': 'isLoggedIn',
    'LOAD_KENNY_SUCCESS': 'loadKennySuccess',
    'UPDATE_USER_SUCCESS': 'updateUserSuccess',
    'CHANGE_PASSWORD_SUCCESS': 'changePasswordSuccess',
    'FOLLOW_USER_SUCCESS': 'followUserSuccess',
    'CANCEL_FOLLOW_USER_SUCCESS': 'cancelFollowUserSuccess',
    'EDIT_USER_IMAGE': 'editUserImage',
    'CANCEL_EDIT_USER_IMAGE': 'cancelEditUserImage',
    'UPLOAD_IMAGE_SUCCESS': 'uploadImageSuccess',
    'FOLLOW_USER_WITH_SUCCESS': 'followUserWithSuccess',
    'CANCEL_FOLLOW_USER_WITH_SUCCESS': 'cancelFollowUserWithSuccess',
    'GET_LOGIN_USER_IMAGE_SUCCESS': 'getLoginUserImageSuccess',
    'ADD_MESSAGE_CONNECTION_SUCCESS': 'addMessageConnectionSuccess',
    'DELETE_MESSAGE_CONNECTION_SUCCESS': 'deleteMessageConnectionSuccess'
  },

  initialize: function () {
    this.users = [];
    this.kenny = null;
    this.currentUser = null;
    this.currentUploadedImage = null;
    this.authenticated = false;
    this.loginUserImage = null;
  },
  loadKennySuccess: function (res) {
    this.kenny = res.data;
    this.emitChange();
  },
  getKennyUser: function () {
    return this.kenny;
  },
  loadUsersSuccess: function (res) {
    this.users = res.data;
    this.save = res.save;
    this.emitChange();
  },
  getUsernames: function () {
    return this.users.map(user => user.username);
  },
  registerSuccess: function (res) {
    this.currentUser = res.user;
    this.users.push(res.user);
    this.authenticated = true;

    this.setCurrentUserConnection();
    this.emitChange({
      msg: 'USER_REGISTER_SUCCESS',
      stat: res.msg,
      user: res.user
    });
  },
  loginSuccess: function (res) {
    this.currentUser = res.user;
    this.authenticated = true;
    this.setCurrentUserConnection();
    this.emitChange({
      msg: 'USER_LOGIN_SUCCESS'
    });
  },
  logoutSuccess: function () {
    const response = {
      resCode: 200,
      msg: 'LOGOUT_SUCCESS'
    };
    this.currentUser = null;
    this.authenticated = false;

    this.clearUserConnection();
    this.emitChange(response);
  },
  isLoggedIn: function () {
    return this.currentUser !== null;
  },
  isAuthenticated: function () {
    return this.authenticated;
  },
  loadSessionUserSuccess: function (res) {
    this.currentUser = res.user;
    this.authenticated = true;
    this.emitChange(res);
  },
  updateUserSuccess: function (res) {
    const response = { msg: 'UPDATE_USER_SUCCESS' };
    this.currentUser = res;
    this.emitChange(response);
  },
  changePasswordSuccess: function (res) {
    if (res.stat) {
      this.authenticated = false;
    }
    this.emitChange(res);
  },
  getCurrentUser: function () {
    return this.currentUser;
  },
  getUserByUsername: function (username) {
    return this.users.find(user => user.username === username);
  },
  getBlogsWithUsername: function (isCurrentUser, username) {
    const displayBlogs = [];
    const users = _lodash2.default.cloneDeep(this.users);
    const currentUser = _lodash2.default.cloneDeep(this.currentUser);
    const thisUser = users.find(user => user.username === username);

    if (isCurrentUser && currentUser) {
      currentUser.blogs.forEach(b => {
        // eslint-disable-next-line no-param-reassign
        b.author = currentUser;
        displayBlogs.push(b);
      });

      currentUser.focuses.forEach(focuse => {
        const focuseUser = users.find(user => user.id_str === focuse.id_str);
        if (focuseUser.blogs.length) {
          focuseUser.blogs.forEach(b => {
            // eslint-disable-next-line no-param-reassign
            b.author = focuseUser;
            displayBlogs.push(b);
          });
        }
      });
    } else if (thisUser) {
      thisUser.blogs.forEach(b => {
        // eslint-disable-next-line no-param-reassign
        b.author = thisUser;
        displayBlogs.push(b);
      });
    }

    return displayBlogs;
  },
  isThumbedUp: function (blog) {
    return blog.likers.indexOf(this.currentUser.id_str) !== -1;
  },
  isCurrentUser: function (username) {
    let flag = false;
    if (this.currentUser && username) {
      flag = this.currentUser.username === username;
    } else if (this.currentUser) {
      flag = true;
    }
    return flag;
  },
  followUserSuccess: function (res) {
    const response = {
      msg: 'FOLLOW_USER_SUCCESS'
    };

    const thisUserIndex = this.users.findIndex(u => u.id_str === res.thisUser.id_str);

    this.users[thisUserIndex].fans.push(res.currentUser);
    this.currentUser.focuses.push(res.thisUser);

    if (this.currentUser.focuses_list) {
      this.currentUser.focuses_list.no_groups.push(res.thisUser);
    }

    this.emitChange(response);
  },
  cancelFollowUserSuccess: function (res) {
    const response = {
      msg: 'CANCEL_FOLLOW_USER_SUCCESS',
      currentUser: res.currentUser,
      user: res.thisUser
    };

    const _thisUserIndex = this.users.findIndex(u => u.id_str === res.thisUser.id_str);
    const new_fans = this.users[_thisUserIndex].fans.filter(f => f.id_str !== res.currentUser.id_str);

    const focuses = this.currentUser.focuses.filter(f => f.id_str !== res.thisUser.id_str);
    const { no_groups: no_groups, friends: friends, special_focuses: special_focuses } = res.currentUser.focuses_list;

    this.users[_thisUserIndex].fans = new_fans;
    this.currentUser.focuses = focuses;
    this.currentUser.focuses_list = {
      no_groups: no_groups,
      friends: friends,
      special_focuses: special_focuses
    };

    this.emitChange(response);
  },
  followUserWithSuccess: function (res) {
    const response = { msg: 'FOLLOW_USER_SUCCESS' };
    const usrIdx = this.users.findIndex(user => user.id_str === this.currentUser.id_str);
    this.currentUser.focuses.push(res.thisUser);
    this.users[usrIdx] = this.currentUser;
    this.emitChange(response);
  },
  cancelFollowUserWithSuccess: function (res) {
    const response = { msg: 'CANCEL_FOLLOW_USER_SUCCESS' };
    const usrIdx = this.users.findIndex(user => user.id_str === this.currentUser.id_str);
    this.currentUser.focuses.forEach((focus, fsIdx) => {
      if (focus.id_str === res.thisUser.id_str) {
        this.currentUser.focuses.splice(fsIdx, 1);
      }
    });
    this.users[usrIdx] = this.currentUser;
    this.emitChange(response);
  },
  getLoginUserImageSuccess: function (res) {
    const response = {
      msg: 'LOAD_LOGIN_USER_IMAGE_SUCCESS'
    };
    this.loginUserImage = res;
    this.emitChange(response);
  },
  getLoginUserloginUserImage: function () {
    return this.loginUserImage;
  },
  getCommenter: function (userId) {
    return this.users ? this.users.find(user => user.id_str === userId) : null;
  },
  getUserById: function (userId) {
    return this.users ? this.users.find(user => user.id_str === userId) : null;
  },
  getCurrentUploadedImage: function () {
    return this.currentUploadedImage;
  },
  editUserImage: function (image) {
    const response = {
      msg: 'EDIT_IMAGE_SUCCESS'
    };
    this.currentUploadedImage = image;
    this.emitChange(response);
  },
  cancelEditUserImage: function () {
    const response = {
      msg: 'CANCEL_IMAGE_SUCCESS'
    };
    this.currentUploadedImage = null;
    this.emitChange(response);
  },
  uploadImageSuccess: function (newuser) {
    const response = {
      msg: 'UPLOAD_IMAGE_SUCCESS'
    };
    this.currentUser.image_url = newuser.image_url;
    this.emitChange(response);
  },
  addMessageConnectionSuccess: function (connection) {
    if (!this.currentUser.recent_chat_connections) {
      this.currentUser.recent_chat_connections = [];
    }

    this.currentUser.recent_chat_connections.push(connection);

    this.setCurrentUserConnection(connection.this_user_id);
    this.emitChange({
      msg: 'ADD_MESSAGE_CONNECTION_SUCCESS',
      connection: connection
    });
  },
  deleteMessageConnectionSuccess: function (res) {
    this.currentUser.recent_chat_connections = res.connections;

    if (res.thisUserId === this.getActiveUserId()) {
      this.setUserConnection({
        current_user: this.currentUser.id_str,
        active_user: res.connections[0].this_user_id,
        recent_chat_connections: this.currentUser.recent_chat_connections
      });
    }

    this.emitChange({
      msg: 'DELETE_MESSAGE_CONNECTION_SUCCESS',
      connections: res.connections
    });
  },
  getActiveUserId: function () {
    if (!_utils.env.is_client) {
      return '';
    }
    const connection = localStorage.getItem('current_user_connection');
    return JSON.parse(connection).active_user;
  },
  getUserConnection: function () {
    if (!_utils.env.is_client) {
      return '';
    }
    const connection = localStorage.getItem('current_user_connection');
    return JSON.parse(connection);
  },
  setActiveUser: function (thisUserId) {
    if (!_utils.env.is_client) {
      return '';
    }
    const connection = localStorage.getItem('current_user_connection');
    const parsedConection = JSON.parse(connection);
    parsedConection.active_user = thisUserId;
    localStorage.setItem('current_user_connection', JSON.stringify(parsedConection));
    this.emitChange({
      msg: 'SET_ACTIVE_USER_SUCCESS'
    });
  },
  setUserConnection: function (connection) {
    if (!_utils.env.is_client) {
      return '';
    }

    localStorage.setItem('current_user_connection', JSON.stringify(connection));
    this.emitChange({
      msg: 'SET_USER_CONNECTION_SUCCESS'
    });
  },
  setCurrentUserConnection: function (thisUserId) {
    this.setUserConnection({
      current_user: this.currentUser.id_str,
      active_user: thisUserId || this.currentUser.recent_chat_connections[0].this_user_id,
      recent_chat_connections: this.currentUser.recent_chat_connections
    });
  },
  clearUserConnection: function () {
    // TODO
  },
  dehydrate: function () {
    return {
      currentUser: this.currentUser,
      authenticated: this.authenticated,
      currentUploadedImage: this.currentUploadedImage,
      loginUserImage: this.loginUserImage,
      users: this.users,
      kenny: this.kenny
    };
  },
  rehydrate: function (state) {
    this.currentUser = state.currentUser;
    this.authenticated = state.authenticated;
    this.users = state.users;
    this.kenny = state.kenny;
    this.currentUploadedImage = state.currentUploadedImage;
    this.loginUserImage = state.loginUserImage;

    window.authenticated = state.authenticated;
  }
});

exports.default = UserStore;
module.exports = exports['default'];
