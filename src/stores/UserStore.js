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
    'LOAD_USERS_FAIL' : 'loadUsersFail',
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

  loadKennySuccess(res){
    this.kenny = res;
    this.emitChange();
  },

  getKennyUser() {
    return this.kenny;
  },

  loadUsersSuccess(res){
    this.users = res;
    this.emitChange();
  },

  loadUsersFail(){
    const resObj = {
      resCode: 404,
      msg:'LOAD_USERS_FAIL'
    }
    this.users = null;
    this.emitChange(resObj)
  },

  registerSuccess(res) {
    this.currentUser = res.user;
    this.users.push(res.user);
    this.authenticated = true;
    this.emitChange(res);
  },

  registerFail(res) {
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(res);
  },

  loginSuccess(res) {
    const resObj = {
      msg: 'USER_LOGIN_SUCCESS'
    }
    this.currentUser = res.user;
    this.authenticated = true;
    this.emitChange(resObj);
  },

  loginFail(res) {
    const resObj = {
      msg: 'USER_LOGIN_FAIL',
      errorMsg: res.auth.msg
    }
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(resObj);
  },

  logoutSuccess(res) {
    const resObj = {
      resCode: 200,
      msg: 'LOGOUT_SUCCESS'
    }
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange(resObj);
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
    const resObj ={msg: 'UPDATE_USER_SUCCESS'};
    this.currentUser = res;
    this.emitChange(resObj);
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

  getUserById(userId) {
    return this.users.find(user => user.strId === userId);
  },

  isThumbedUp(blog){
    return blog.likers.indexOf(this.currentUser.strId) !== -1;
  },

  isCurrentUser(userId){
    let flag = false;
    if (this.currentUser && userId) {
      flag = this.currentUser.strId === userId;
    }
    else{
      if (this.currentUser) {
        flag = true;
      }
    }
    return flag;
  },

  followUserSuccess(res){
    const resObj = {
      msg: 'FOLLOW_USER_SUCCESS'
    }
    this.users.forEach((user, index) => {
      if (user.strId === res.thisUser.strId) {
        this.users[index].fans.push(res.currentUser);
      }
      if (user.strId === res.currentUser.strId) {
        this.users[index].focuses.push(res.thisUser);
        this.currentUser.focuses.push(res.thisUser);
      }
    })

    this.emitChange(resObj);
  },

  cancelFollowUserSuccess(res) {
    const resObj = {
      msg: 'CANCEL_FOLLOW_USER_SUCCESS'
    }
    this.users.forEach((user, index) => {
      if (user.strId === res.thisUser.strId) {
        this.users[index].fans.forEach((fan, faIdx) => {
          if (fan.strId === res.currentUser.strId) {
            this.users[index].fans.splice(faIdx, 1);
          }
        })
      }
      if (user.strId === res.currentUser.strId) {
        this.users[index].focuses.forEach((focus, fsIdx) => {
          if (focus.strId === res.thisUser.strId) {
            this.users[index].focuses.splice(fsIdx, 1);
          }
        })
        this.currentUser.focuses.forEach((focus, fsIdx) => {
          if (focus.strId === res.thisUser.strId) {
            this.currentUser.focuses.splice(fsIdx, 1);
          }
        })
      }
    })

    this.emitChange(resObj);
  },

  followUserWithSuccess(res) {
    const resObj = {msg: 'FOLLOW_USER_SUCCESS'};
    const usrIdx = this.users.findIndex(user => user.strId === this.currentUser.strId);
    this.currentUser.focuses.push(res.thisUser);
    this.users[usrIdx] = this.currentUser;
    this.emitChange(resObj);
  },

  cancelFollowUserWithSuccess(res) {
    const resObj = {msg: 'CANCEL_FOLLOW_USER_SUCCESS'};
    const usrIdx = this.users.findIndex(user => user.strId === this.currentUser.strId);
    this.currentUser.focuses.forEach((focus, fsIdx) => {
      if (focus.strId === res.thisUser.strId) {
        this.currentUser.focuses.splice(fsIdx, 1);
      }
    })
    this.users[usrIdx] = this.currentUser;
    this.emitChange(resObj);
  },

  getLoginUserImageSuccess(res) {
    const resObj= {
      msg: 'LOAD_LOGIN_USER_IMAGE_SUCCESS'
    }
    this.loginUserImage = res;
    this.emitChange(resObj);
  },

  getLoginUserloginUserImage() {
    return this.loginUserImage;
  },

  getCommenter(userId) {
    return this.users ? this.users.find(user => user.id_str === userId) : null;
  },

  getCurrentUploadedImage() {
    return this.currentUploadedImage;
  },

  editUserImage(image) {
    const resObj= {
      msg: 'EDIT_IMAGE_SUCCESS'
    }
    this.currentUploadedImage = image;
    this.emitChange(resObj);
  },

  cancelEditUserImage() {
    const resObj= {
      msg: 'CANCEL_IMAGE_SUCCESS'
    }
    this.currentUploadedImage = null;
    this.emitChange(resObj);
  },

  uploadImageSuccess(newuser) {
    const resObj= {
      msg: 'UPLOAD_IMAGE_SUCCESS'
    }
    this.currentUploadedImage = null;
    this.currentUser.image_url = newuser.image_url;
    this.emitChange(resObj);
  },

  dehydrate() {
    return {
      currentUser: this.currentUser,
      authenticated: this.authenticated,
      currentUploadedImage: this.currentUploadedImage,
      loginUserImage: this.loginUserImage,
      users: this.users,
      kenny: this.kenny,
    }
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
