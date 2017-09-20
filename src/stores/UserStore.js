import createStore from 'fluxible/addons/createStore';
import _ from 'lodash';
import { env } from '../utils';
import store from '../utils/indexedDB';

const UserStore = createStore({

  storeName: 'UserStore',

  handlers: {
    'USER_REGISTER_SUCCESS': 'registerSuccess',
    'USER_REGISTER_FAIL': 'registerFail',
    'USER_LOGIN_SUCCESS': 'loginSuccess',
    'USER_LOGIN_FAIL': 'loginFail',
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
    'GET_LOGIN_USER_IMAGE_SUCCESS': 'getLoginUserImageSuccess',
    'ADD_MESSAGE_CONNECTION_SUCCESS': 'addMessageConnectionSuccess',
    'DELETE_MESSAGE_CONNECTION_SUCCESS': 'deleteMessageConnectionSuccess'
  },

  initialize() {
    this.users = [];
    this.kenny = null;
    this.currentUser = null;
    this.currentUploadedImage = null;
    this.authenticated = false;
    this.loginUserImage = null;
  },

  loadKennySuccess(res) {
    this.kenny = res.data;
    this.emitChange();
  },

  getKennyUser() {
    return this.kenny;
  },

  loadUsersSuccess(res) {
    this.users = res.data;
    this.emitChange();
  },

  getUsernames() {
    return this.users.map(user => user.username);
  },

  registerSuccess(res) {
    this.currentUser = res.user;
    this.authenticated = true;
    this.users.push(res.user);

    this.updateIndexedDB();
    this.setCurrentUserConnection();
    this.emitChange({
      msg: 'USER_REGISTER_SUCCESS',
      stat: res.msg,
      user: res.user
    });
  },

  registerFail(res) {
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange({
      msg: 'USER_REGISTER_FAIL',
      stat: res.msg,
      user: res.user
    });
  },

  loginSuccess(res) {
    this.currentUser = res.user;
    this.authenticated = true;
    this.setCurrentUserConnection();
    this.emitChange({
      msg: 'USER_LOGIN_SUCCESS'
    });
  },

  loginFail(res) {
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange({
      msg: 'USER_LOGIN_FAIL',
      errorMsg: res.auth.msg
    });
  },

  logoutSuccess() {
    this.currentUser = null;
    this.authenticated = false;
    this.clearUserConnection();
    this.emitChange({
      resCode: 200,
      msg: 'LOGOUT_SUCCESS'
    });
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

  updateUserSuccess(res) {
    this.currentUser = res;
    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
    this.emitChange({
      msg: 'UPDATE_USER_SUCCESS'
    });
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
    const thisUserIndex = this.users.findIndex(u => u.id_str === res.thisUser.id_str);

    this.users[thisUserIndex].fans.push(res.currentUser);
    this.currentUser.focuses.push(res.thisUser);
    if (this.currentUser.focuses_list) {
      this.currentUser.focuses_list.no_groups.push(res.thisUser);
    }

    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
    this.emitChange({
      msg: 'FOLLOW_USER_SUCCESS'
    });
  },

  cancelFollowUserSuccess(res) {
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

    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
    this.emitChange({
      msg: 'CANCEL_FOLLOW_USER_SUCCESS',
      currentUser: res.currentUser,
      user: res.thisUser
    });
  },

  getLoginUserImageSuccess(res) {
    this.loginUserImage = res;
    this.emitChange({
      msg: 'LOAD_LOGIN_USER_IMAGE_SUCCESS'
    });
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
    this.currentUploadedImage = image;
    this.emitChange({
      msg: 'EDIT_IMAGE_SUCCESS'
    });
  },

  cancelEditUserImage() {
    this.currentUploadedImage = null;
    this.emitChange({
      msg: 'CANCEL_IMAGE_SUCCESS'
    });
  },

  uploadImageSuccess(newuser) {
    this.currentUser.image_url = newuser.image_url;
    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
    this.emitChange({
      msg: 'UPLOAD_IMAGE_SUCCESS'
    });
  },


  addMessageConnectionSuccess(connection) {
    const connections = this.currentUser.recent_chat_connections;
    const isNotExist = connections.findIndex(c => c.this_user_id === connection.this_user_id) < 0;

    if (!connections) {
      this.currentUser.recent_chat_connections = [];
    }

    if (isNotExist) {
      this.currentUser.recent_chat_connections.push(connection);
    }

    this.setCurrentUserConnection(connection.this_user_id);
    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
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

    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
    this.emitChange({
      msg: 'DELETE_MESSAGE_CONNECTION_SUCCESS',
      connections: res.connections
    });
  },

  getNewMessagesNumSum(showMessages) {
    if (!env.is_client) return 0;
    let newMessageSum = 0;
    if (this.currentUser) {
      const localChatString = localStorage.getItem('current_user_connection');
      const localChat = JSON.parse(localChatString);
      const connections = localChat.recent_chat_connections;
      const activeUser = localChat.active_user;
      const activeUserConnect = connections.find(c => c.this_user_id === activeUser);
      if (showMessages) {
        activeUserConnect.new_messages_number = 0;
        this.setUserConnection(localChat);
      }
      connections.forEach(c => {
        newMessageSum += c.new_messages_number;
      });
    }
    return newMessageSum;
  },

  getActiveUserId() {
    if (!env.is_client) {
      return '';
    }
    const connection = localStorage.getItem('current_user_connection');
    const conObj = JSON.parse(connection);
    return conObj ? conObj.active_user : '';
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
    const thisUserConnect = parsedConection.recent_chat_connections.find(rcc => rcc.this_user_id === thisUserId);
    parsedConection.active_user = thisUserId;
    thisUserConnect.new_messages_number = 0;
    localStorage.setItem('current_user_connection', JSON.stringify(parsedConection));
    this.emitChange({
      msg: 'SET_ACTIVE_USER_SUCCESS'
    });
  },

  setUserConnection(connection) {
    if (!env.is_client) {
      return '';
    }

    localStorage.setItem('current_user_connection', JSON.stringify(connection));
    this.emitChange({
      msg: 'SET_USER_CONNECTION_SUCCESS'
    });
  },

  initialConnection() {
    const KENNY = this.getUserByUsername('Kenny');
    const firstMessage = {
      content: 'My name is Kenny, the developer of this website. If you have any questions, ask me please!',
      date: new Date(),
      user_to: this.currentUser.id_str,
      user_from: KENNY.id_str,
      class: 'you'
    };
    const firstConnection = {
      this_user_id: KENNY.id_str,
      connect_date: new Date(),
      messages: this.currentUser.username === 'Kenny' ? [] : [firstMessage]
    };

    return {
      firstConnection,
      firstMessage
    };
  },

  setCurrentUserConnection(thisUserId) {
    const { id_str, recent_chat_connections } = this.currentUser;
    let firstConnection = recent_chat_connections[0];
    const localConnection = {
      current_user: id_str,
      active_user: thisUserId,
      recent_chat_connections
    };
    const initialConnection = this.initialConnection();

    if (!thisUserId) {
      if (!firstConnection) {
        firstConnection = initialConnection.firstConnection;
        localConnection.recent_chat_connections[0] = firstConnection;
      }

      localConnection.active_user = firstConnection.this_user_id;

      if (!firstConnection.messages.length) {
        firstConnection.messages.push(initialConnection.firstMessage);
      }
    }

    this.setUserConnection(localConnection);
  },

  clearUserConnection() {
    // TODO
  },

  updateCurrentUserIntoUsers() {
    this.users.forEach((user, idx) => {
      if (user.id_str === this.currentUser.id_str) {
        this.users[idx] = this.currentUser;
      }
    });
  },

  updateIndexedDB() {
    store.set('users', this.users);
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
