import createStore from 'fluxible/addons/createStore';
import _ from 'lodash';

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
    'GET_LOGIN_USER_IMAGE_SUCCESS': 'getLoginUserImageSuccess'
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

    this.emitChange(response);
  },

  cancelFollowUserSuccess(res) {
    const response = {
      msg: 'CANCEL_FOLLOW_USER_SUCCESS'
    };

    this.users.forEach((user, index) => {
      if (user.id_str === res.thisUser.id_str) {
        this.users[index].fans.forEach((fan, faIdx) => {
          if (fan.id_str === res.currentUser.id_str) {
            this.users[index].fans.splice(faIdx, 1);
          }
        });
      }
      if (user.id_str === res.currentUser.id_str) {
        this.users[index].focuses.forEach((focus, fsIdx) => {
          if (focus.id_str === res.thisUser.id_str) {
            this.users[index].focuses.splice(fsIdx, 1);
          }
        });
        this.currentUser.focuses.forEach((focus, fsIdx) => {
          if (focus.id_str === res.thisUser.id_str) {
            this.currentUser.focuses.splice(fsIdx, 1);
          }
        });
      }
    });

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
