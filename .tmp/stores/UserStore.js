'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createStore = require('fluxible/addons/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserStore = (0, _createStore2.default)({

  storeName: 'UserStore',

  handlers: {
    'USER_REGISTER_SUCCESS': 'registerSuccess',
    'USER_REGISTER_FAIL': 'registerFail',
    'USER_LOGIN_SUCCESS': 'loginSuccess',
    'USER_LOGIN_FAIL': 'loginFail',
    'LOGOUT_SUCCESS': 'logoutSuccess',
    'LOGOUT_FAIL': 'logoutFail',
    'LOAD_SESSION_USER_SUCCESS': 'loadSessionUserSuccess',
    'LOAD_SESSION_USER_FAIL': 'loadSessionUserFail',
    'LOAD_USERS_SUCCESS': 'loadUsersSuccess',
    'LOAD_USERS_FAIL': 'loadUsersFail',
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
    'GET_LOGIN_USER_IMAGE_SUCCESS': 'getLoginUserImageSuccess'
  },

  initialize: function () {
    this.users = null;
    this.kenny = null;
    this.currentUser = null;
    this.currentUploadedImage = null;
    this.authenticated = false;
    this.loginUserImage = null;
  },
  loadKennySuccess: function (res) {
    this.kenny = res;
    this.emitChange();
  },
  getKennyUser: function () {
    return this.kenny;
  },
  loadUsersSuccess: function (res) {
    this.users = res;
    this.emitChange();
  },
  loadUsersFail: function () {
    const resObj = {
      resCode: 404,
      resMsg: 'LOAD_USERS_FAIL'
    };
    this.users = null;
    this.emitChange(resObj);
  },
  registerSuccess: function (res) {
    this.currentUser = res.user;
    this.users.push(res.user);
    this.authenticated = true;
    this.emitChange(res);
  },
  registerFail: function (res) {
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(res);
  },
  loginSuccess: function (res) {
    const resObj = {
      resMsg: 'USER_LOGIN_SUCCESS'
    };
    this.currentUser = res.user;
    this.authenticated = true;
    this.emitChange(resObj);
  },
  loginFail: function (res) {
    const resObj = {
      resMsg: 'USER_LOGIN_FAIL',
      errorMsg: res.auth.msg
    };
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(resObj);
  },
  logoutSuccess: function (res) {
    const resObj = {
      resCode: 200,
      resMsg: 'LOGOUT_SUCCESS'
    };
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(resObj);
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
  loadSessionUserFail: function (res) {
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(res.auth.stat);
  },
  updateUserSuccess: function (res) {
    const resObj = { resMsg: 'UPDATE_USER_SUCCESS' };
    this.currentUser = res;
    this.emitChange(resObj);
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
  getUserById: function (userId) {
    return this.users.find(user => user.strId === userId);
  },
  isThumbedUp: function (blog) {
    return blog.likers.indexOf(this.currentUser.strId) !== -1;
  },
  isCurrentUser: function (userId) {
    let flag = false;
    if (this.currentUser && userId) {
      flag = this.currentUser.strId === userId;
    } else {
      if (this.currentUser) {
        flag = true;
      }
    }
    return flag;
  },
  followUserSuccess: function (res) {
    const resObj = {
      resMsg: 'FOLLOW_USER_SUCCESS'
    };
    this.users.forEach((user, index) => {
      if (user.strId === res.thisUser.strId) {
        this.users[index].fans.push(res.currentUser);
      }
      if (user.strId === res.currentUser.strId) {
        this.users[index].focuses.push(res.thisUser);
        this.currentUser.focuses.push(res.thisUser);
      }
    });

    this.emitChange(resObj);
  },
  cancelFollowUserSuccess: function (res) {
    const resObj = {
      resMsg: 'CANCEL_FOLLOW_USER_SUCCESS'
    };
    this.users.forEach((user, index) => {
      if (user.strId === res.thisUser.strId) {
        this.users[index].fans.forEach((fan, faIdx) => {
          if (fan.strId === res.currentUser.strId) {
            this.users[index].fans.splice(faIdx, 1);
          }
        });
      }
      if (user.strId === res.currentUser.strId) {
        this.users[index].focuses.forEach((focus, fsIdx) => {
          if (focus.strId === res.thisUser.strId) {
            this.users[index].focuses.splice(fsIdx, 1);
          }
        });
        this.currentUser.focuses.forEach((focus, fsIdx) => {
          if (focus.strId === res.thisUser.strId) {
            this.currentUser.focuses.splice(fsIdx, 1);
          }
        });
      }
    });

    this.emitChange(resObj);
  },
  followUserWithSuccess: function (res) {
    const resObj = { resMsg: 'FOLLOW_USER_SUCCESS' };
    const usrIdx = this.users.findIndex(user => user.strId === this.currentUser.strId);
    this.currentUser.focuses.push(res.thisUser);
    this.users[usrIdx] = this.currentUser;
    this.emitChange(resObj);
  },
  cancelFollowUserWithSuccess: function (res) {
    const resObj = { resMsg: 'CANCEL_FOLLOW_USER_SUCCESS' };
    const usrIdx = this.users.findIndex(user => user.strId === this.currentUser.strId);
    this.currentUser.focuses.forEach((focus, fsIdx) => {
      if (focus.strId === res.thisUser.strId) {
        this.currentUser.focuses.splice(fsIdx, 1);
      }
    });
    this.users[usrIdx] = this.currentUser;
    this.emitChange(resObj);
  },
  getLoginUserImageSuccess: function (res) {
    const resObj = {
      resMsg: 'LOAD_LOGIN_USER_IMAGE_SUCCESS'
    };
    this.loginUserImage = res;
    this.emitChange(resObj);
  },
  getLoginUserloginUserImage: function () {
    return this.loginUserImage;
  },
  getCommenter: function (userId) {
    return this.users ? this.users.find(user => user.strId === userId) : null;
  },
  getCurrentUploadedImage: function () {
    return this.currentUploadedImage;
  },
  editUserImage: function (image) {
    const resObj = {
      resMsg: 'EDIT_IMAGE_SUCCESS'
    };
    this.currentUploadedImage = image;
    this.emitChange(resObj);
  },
  cancelEditUserImage: function () {
    const resObj = {
      resMsg: 'CANCEL_IMAGE_SUCCESS'
    };
    this.currentUploadedImage = null;
    this.emitChange(resObj);
  },
  uploadImageSuccess: function (newuser) {
    const resObj = {
      resMsg: 'UPLOAD_IMAGE_SUCCESS'
    };
    this.currentUploadedImage = null;
    this.currentUser.image_url = newuser.image_url;
    this.emitChange(resObj);
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
