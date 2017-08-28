import createStore from 'fluxible/addons/createStore';
import _ from 'lodash';
import { env } from '../utils';

const UserStore = createStore({

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
    'GET_LOGIN_USER_IMAGE_SUCCESS': 'getLoginUserImageSuccess',
    'ADD_MESSAGE_CONNECTION_SUCCESS': 'addMessageConnectionSuccess',
    'DELETE_MESSAGE_CONNECTION_SUCCESS': 'deleteMessageConnectionSuccess'
  },

  initialize() {
    this.users = null;
    this.kenny = null;
    this.currentUser = null;
    this.currentUploadedImage = null;
    this.authenticated = false;
    this.loginUserImage = null;
  },

  loadKennySuccess(res) {
    this.kenny = res;
    this.emitChange();
  },

  getKennyUser() {
    return this.kenny;
  },

  loadUsersSuccess(res) {
    this.users = res;
    this.emitChange();
  },

  loadUsersFail() {
    const response = {
      resCode: 404,
      msg: 'LOAD_USERS_FAIL'
    };
    this.users = null;
    this.emitChange(response);
  },

  registerSuccess(res) {
    const response = {
      msg: 'USER_REGISTER_SUCCESS',
      stat: res.msg,
      user: res.user
    };

    this.currentUser = res.user;
    this.users.push(res.user);
    this.authenticated = true;

    this.setCurrentUserConnection();
    this.emitChange(response);
  },

  registerFail(res) {
    const response = {
      msg: 'USER_REGISTER_FAIL',
      stat: res.msg,
      user: res.user
    };

    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(response);
  },

  loginSuccess(res) {
    const response = {
      msg: 'USER_LOGIN_SUCCESS'
    };

    this.currentUser = res.user;
    this.authenticated = true;

    this.setCurrentUserConnection();
    this.emitChange(response);
  },

  loginFail(res) {
    const response = {
      msg: 'USER_LOGIN_FAIL',
      errorMsg: res.auth.msg
    };
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(response);
  },

  logoutSuccess() {
    const response = {
      resCode: 200,
      msg: 'LOGOUT_SUCCESS'
    };
    this.currentUser = null;
    this.authenticated = false;

    this.clearUserConnection();
    this.emitChange(response);
  },

  isLoggedIn() {
    return this.currentUser !== null;
  },

  isAuthenticated() {
    return this.authenticated;
  },

  loadSessionUserSuccess(res) {
    this.currentUser = res.user;
    this.authenticated = true;
    this.emitChange(res);
  },

  loadSessionUserFail(res) {
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(res.auth.stat);
  },

  updateUserSuccess(res) {
    const response = { msg: 'UPDATE_USER_SUCCESS' };
    this.currentUser = res;
    this.emitChange(response);
  },

  changePasswordSuccess(res) {
    if (res.stat) {
      this.authenticated = false;
    }
    this.emitChange(res);
  },

  getCurrentUser() {
    return this.currentUser;
  },

  getUserByUsername(username) {
    return this.users.find(user => user.username === username);
  },

  getBlogsWithUsername(isCurrentUser, username) {
    const displayBlogs = [];
    const users = _.cloneDeep(this.users);
    const currentUser = _.cloneDeep(this.currentUser);
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
    }
    else if (thisUser) {
      thisUser.blogs.forEach(b => {
        // eslint-disable-next-line no-param-reassign
        b.author = thisUser;
        displayBlogs.push(b);
      });
    }

    return displayBlogs;
  },

  isThumbedUp(blog) {
    return blog.likers.indexOf(this.currentUser.id_str) !== -1;
  },

  isCurrentUser(username) {
    let flag = false;
    if (this.currentUser && username) {
      flag = this.currentUser.username === username;
    } else if (this.currentUser) {
      flag = true;
    }
    return flag;
  },

  followUserSuccess(res) {
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

  cancelFollowUserSuccess(res) {
    const response = {
      msg: 'CANCEL_FOLLOW_USER_SUCCESS',
      currentUser: res.currentUser,
      user: res.thisUser
    };

    const _thisUserIndex = this.users.findIndex(u => u.id_str === res.thisUser.id_str);
    const new_fans = this.users[_thisUserIndex].fans.filter(f => f.id_str !== res.currentUser.id_str);

    const focuses = this.currentUser.focuses.filter(f => f.id_str !== res.thisUser.id_str);
    const { no_groups, friends, special_focuses } = res.currentUser.focuses_list;

    this.users[_thisUserIndex].fans = new_fans;
    this.currentUser.focuses = focuses;
    this.currentUser.focuses_list = {
      no_groups,
      friends,
      special_focuses
    };

    this.emitChange(response);
  },

  followUserWithSuccess(res) {
    const response = { msg: 'FOLLOW_USER_SUCCESS' };
    const usrIdx = this.users.findIndex(user => user.id_str === this.currentUser.id_str);
    this.currentUser.focuses.push(res.thisUser);
    this.users[usrIdx] = this.currentUser;
    this.emitChange(response);
  },

  cancelFollowUserWithSuccess(res) {
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

  getLoginUserImageSuccess(res) {
    const response = {
      msg: 'LOAD_LOGIN_USER_IMAGE_SUCCESS'
    };
    this.loginUserImage = res;
    this.emitChange(response);
  },

  getLoginUserloginUserImage() {
    return this.loginUserImage;
  },

  getCommenter(userId) {
    return this.users ? this.users.find(user => user.id_str === userId) : null;
  },

  getUserById(userId) {
    return this.users ? this.users.find(user => user.id_str === userId) : null;
  },

  getCurrentUploadedImage() {
    return this.currentUploadedImage;
  },

  editUserImage(image) {
    const response = {
      msg: 'EDIT_IMAGE_SUCCESS'
    };
    this.currentUploadedImage = image;
    this.emitChange(response);
  },

  cancelEditUserImage() {
    const response = {
      msg: 'CANCEL_IMAGE_SUCCESS'
    };
    this.currentUploadedImage = null;
    this.emitChange(response);
  },

  uploadImageSuccess(newuser) {
    const response = {
      msg: 'UPLOAD_IMAGE_SUCCESS'
    };
    this.currentUser.image_url = newuser.image_url;
    this.emitChange(response);
  },


  addMessageConnectionSuccess(connection) {
    if (!this.currentUser.recent_chat_connections) {
      this.currentUser.recent_chat_connections = [];
    }

    this.currentUser.recent_chat_connections.push(connection);

    this.setActiveUser(connection.this_user_id);
    this.emitChange({
      msg: 'ADD_MESSAGE_CONNECTION_SUCCESS',
      connection
    });
  },

  deleteMessageConnectionSuccess(res) {
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

  getActiveUserId() {
    if (!env.is_client) {
      return '';
    }
    const connection = localStorage.getItem('current_user_connection');
    return JSON.parse(connection).active_user;
  },

  getUserConnection() {
    if (!env.is_client) {
      return '';
    }
    const connection = localStorage.getItem('current_user_connection');
    return JSON.parse(connection);
  },

  setActiveUser(thisUserId) {
    if (!env.is_client) {
      return '';
    }
    const connection = localStorage.getItem('current_user_connection');
    const parsedConection = JSON.parse(connection);
    parsedConection.active_user = thisUserId;
    localStorage.setItem('current_user_connection', JSON.stringify(parsedConection));
  },

  setUserConnection(connection) {
    if (!env.is_client) {
      return '';
    }

    localStorage.setItem('current_user_connection', JSON.stringify(connection));
  },

  setCurrentUserConnection() {
    this.setUserConnection({
      current_user: this.currentUser.id_str,
      active_user: this.currentUser.recent_chat_connections[0].this_user_id,
      recent_chat_connections: this.currentUser.recent_chat_connections
    });
  },

  clearUserConnection() {
    // TODO
  },

  dehydrate() {
    return {
      currentUser: this.currentUser,
      authenticated: this.authenticated,
      currentUploadedImage: this.currentUploadedImage,
      loginUserImage: this.loginUserImage,
      users: this.users,
      kenny: this.kenny,
    };
  },

  rehydrate(state) {
    this.currentUser = state.currentUser;
    this.authenticated = state.authenticated;
    this.users = state.users;
    this.kenny = state.kenny;
    this.currentUploadedImage = state.currentUploadedImage;
    this.loginUserImage = state.loginUserImage;

    window.authenticated = state.authenticated;
  }
});

export default UserStore;
