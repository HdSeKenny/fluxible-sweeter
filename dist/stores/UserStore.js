'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _createStore = require('fluxible/addons/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

var _indexedDB = require('../utils/indexedDB');

var _indexedDB2 = _interopRequireDefault(_indexedDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserStore = (0, _createStore2.default)({

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
    'DELETE_MESSAGE_CONNECTION_SUCCESS': 'deleteMessageConnectionSuccess',
    'USER_AFTER_LOGGED_IN': 'afterLoggedIn',
    'USER_BEFORE_LOGGED_IN': 'beforeLoggedIn'
  },

  initialize: function initialize() {
    this.users = [];
    this.kenny = null;
    this.currentUser = null;
    this.currentUploadedImage = null;
    this.authenticated = false;
    this.loginUserImage = null;
    this.loggedIn = false;
  },
  loadKennySuccess: function loadKennySuccess(res) {
    this.kenny = res.data;
    this.emitChange();
  },
  getKennyUser: function getKennyUser() {
    return this.kenny;
  },
  loadUsersSuccess: function loadUsersSuccess(res) {
    this.users = res.data;
    this.emitChange();
  },
  getUsernames: function getUsernames() {
    return this.users.map(function (user) {
      return user.username;
    });
  },
  registerSuccess: function registerSuccess(res) {
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
  registerFail: function registerFail(res) {
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange({
      msg: 'USER_REGISTER_FAIL',
      stat: res.msg,
      user: res.user
    });
  },
  loginSuccess: function loginSuccess(res) {
    this.currentUser = res.user;
    this.authenticated = true;
    this.setCurrentUserConnection();
    this.emitChange({
      msg: 'USER_LOGIN_SUCCESS'
    });
  },
  afterLoggedIn: function afterLoggedIn() {
    this.loggedIn = true;
    this.emitChange({
      msg: 'AFTER_LOGGED_IN'
    });
  },
  beforeLoggedIn: function beforeLoggedIn() {
    this.emitChange({
      msg: 'BEFORE_LOGGED_IN'
    });
  },
  loginFail: function loginFail(res) {
    this.currentUser = null;
    this.authenticated = false;
    this.emitChange({
      msg: 'USER_LOGIN_FAIL',
      errorMsg: res.auth.msg
    });
  },
  logoutSuccess: function logoutSuccess() {
    this.currentUser = null;
    this.authenticated = false;
    this.clearUserConnection();
    this.emitChange({
      resCode: 200,
      msg: 'LOGOUT_SUCCESS'
    });
  },
  isLoggedIn: function isLoggedIn() {
    return this.currentUser !== null;
  },
  isAuthenticated: function isAuthenticated() {
    return this.authenticated;
  },
  loadSessionUserSuccess: function loadSessionUserSuccess(res) {
    this.currentUser = res.user;
    this.authenticated = true;
    this.emitChange(res);
  },
  updateUserSuccess: function updateUserSuccess(res) {
    this.currentUser = res;
    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
    this.emitChange({
      msg: 'UPDATE_USER_SUCCESS'
    });
  },
  changePasswordSuccess: function changePasswordSuccess(res) {
    if (res.stat) {
      this.authenticated = false;
    }
    this.emitChange(res);
  },
  getCurrentUser: function getCurrentUser() {
    return this.currentUser;
  },
  getUserByUsername: function getUserByUsername(username) {
    return this.users.find(function (user) {
      return user.username === username;
    });
  },
  getBlogsWithUsername: function getBlogsWithUsername(isCurrentUser, username) {
    var displayBlogs = [];
    var users = _lodash2.default.cloneDeep(this.users);
    var currentUser = _lodash2.default.cloneDeep(this.currentUser);
    var thisUser = users.find(function (user) {
      return user.username === username;
    });

    if (isCurrentUser && currentUser) {
      currentUser.blogs.forEach(function (b) {
        // eslint-disable-next-line no-param-reassign
        b.author = currentUser;
        displayBlogs.push(b);
      });

      currentUser.focuses.forEach(function (focuse) {
        var focuseUser = users.find(function (user) {
          return user.id_str === focuse.id_str;
        });
        if (focuseUser.blogs.length) {
          focuseUser.blogs.forEach(function (b) {
            // eslint-disable-next-line no-param-reassign
            b.author = focuseUser;
            displayBlogs.push(b);
          });
        }
      });
    } else if (thisUser) {
      thisUser.blogs.forEach(function (b) {
        // eslint-disable-next-line no-param-reassign
        b.author = thisUser;
        displayBlogs.push(b);
      });
    }

    return displayBlogs;
  },
  isThumbedUp: function isThumbedUp(blog) {
    return blog.likers.indexOf(this.currentUser.id_str) !== -1;
  },
  isCurrentUser: function isCurrentUser(username) {
    var flag = false;
    if (this.currentUser && username) {
      flag = this.currentUser.username === username;
    } else if (this.currentUser) {
      flag = true;
    }
    return flag;
  },
  followUserSuccess: function followUserSuccess(res) {
    var thisUserIndex = this.users.findIndex(function (u) {
      return u.id_str === res.thisUser.id_str;
    });

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
  cancelFollowUserSuccess: function cancelFollowUserSuccess(res) {
    var _thisUserIndex = this.users.findIndex(function (u) {
      return u.id_str === res.thisUser.id_str;
    });
    var new_fans = this.users[_thisUserIndex].fans.filter(function (f) {
      return f.id_str !== res.currentUser.id_str;
    });

    var focuses = this.currentUser.focuses.filter(function (f) {
      return f.id_str !== res.thisUser.id_str;
    });
    var _res$currentUser$focu = res.currentUser.focuses_list,
        no_groups = _res$currentUser$focu.no_groups,
        friends = _res$currentUser$focu.friends,
        special_focuses = _res$currentUser$focu.special_focuses;


    this.users[_thisUserIndex].fans = new_fans;
    this.currentUser.focuses = focuses;
    this.currentUser.focuses_list = {
      no_groups: no_groups,
      friends: friends,
      special_focuses: special_focuses
    };

    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
    this.emitChange({
      msg: 'CANCEL_FOLLOW_USER_SUCCESS',
      currentUser: res.currentUser,
      user: res.thisUser
    });
  },
  getLoginUserImageSuccess: function getLoginUserImageSuccess(res) {
    this.loginUserImage = res;
    this.emitChange({
      msg: 'LOAD_LOGIN_USER_IMAGE_SUCCESS'
    });
  },
  getLoginUserloginUserImage: function getLoginUserloginUserImage() {
    return this.loginUserImage;
  },
  getCommenter: function getCommenter(userId) {
    return this.users ? this.users.find(function (user) {
      return user.id_str === userId;
    }) : null;
  },
  getUserById: function getUserById(userId) {
    return this.users ? this.users.find(function (user) {
      return user.id_str === userId;
    }) : null;
  },
  getCurrentUploadedImage: function getCurrentUploadedImage() {
    return this.currentUploadedImage;
  },
  editUserImage: function editUserImage(image) {
    this.currentUploadedImage = image;
    this.emitChange({
      msg: 'EDIT_IMAGE_SUCCESS'
    });
  },
  cancelEditUserImage: function cancelEditUserImage() {
    this.currentUploadedImage = null;
    this.emitChange({
      msg: 'CANCEL_IMAGE_SUCCESS'
    });
  },
  uploadImageSuccess: function uploadImageSuccess(newuser) {
    this.currentUser.image_url = newuser.image_url;
    this.updateCurrentUserIntoUsers();
    this.updateIndexedDB();
    this.emitChange({
      msg: 'UPLOAD_IMAGE_SUCCESS'
    });
  },
  addMessageConnectionSuccess: function addMessageConnectionSuccess(connection) {
    var connections = this.currentUser.recent_chat_connections;
    var isNotExist = connections.findIndex(function (c) {
      return c.this_user_id === connection.this_user_id;
    }) < 0;

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
      connection: connection
    });
  },
  deleteMessageConnectionSuccess: function deleteMessageConnectionSuccess(res) {
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
  getNewMessagesNumSum: function getNewMessagesNumSum(showMessages) {
    if (!_utils.env.is_client) return 0;
    var newMessageSum = 0;
    if (this.currentUser) {
      var localChatString = localStorage.getItem('current_user_connection');
      var localChat = JSON.parse(localChatString);
      var connections = localChat.recent_chat_connections;
      var activeUser = localChat.active_user;
      var activeUserConnect = connections.find(function (c) {
        return c.this_user_id === activeUser;
      });
      if (showMessages) {
        activeUserConnect.new_messages_number = 0;
        this.setUserConnection(localChat);
      }
      connections.forEach(function (c) {
        newMessageSum += c.new_messages_number;
      });
    }
    return newMessageSum;
  },
  getActiveUserId: function getActiveUserId() {
    if (!_utils.env.is_client) {
      return '';
    }
    var connection = localStorage.getItem('current_user_connection');
    var conObj = JSON.parse(connection);
    return conObj ? conObj.active_user : '';
  },
  getUserConnection: function getUserConnection() {
    if (!_utils.env.is_client) {
      return '';
    }
    var connection = localStorage.getItem('current_user_connection');
    return JSON.parse(connection);
  },
  setActiveUser: function setActiveUser(thisUserId) {
    if (!_utils.env.is_client) {
      return '';
    }
    var connection = localStorage.getItem('current_user_connection');
    var parsedConection = JSON.parse(connection);
    var thisUserConnect = parsedConection.recent_chat_connections.find(function (rcc) {
      return rcc.this_user_id === thisUserId;
    });
    parsedConection.active_user = thisUserId;
    thisUserConnect.new_messages_number = 0;
    localStorage.setItem('current_user_connection', (0, _stringify2.default)(parsedConection));
    this.emitChange({
      msg: 'SET_ACTIVE_USER_SUCCESS'
    });
  },
  setUserConnection: function setUserConnection(connection) {
    if (!_utils.env.is_client) {
      return '';
    }

    localStorage.setItem('current_user_connection', (0, _stringify2.default)(connection));
    this.emitChange({
      msg: 'SET_USER_CONNECTION_SUCCESS'
    });
  },
  initialConnection: function initialConnection() {
    var KENNY = this.getUserByUsername('Kenny');
    var firstMessage = {
      content: 'My name is Kenny, the developer of this website. If you have any questions, ask me please!',
      date: new Date(),
      user_to: this.currentUser.id_str,
      user_from: KENNY.id_str,
      class: 'you'
    };
    var firstConnection = {
      this_user_id: KENNY.id_str,
      connect_date: new Date(),
      messages: this.currentUser.username === 'Kenny' ? [] : [firstMessage]
    };

    return {
      firstConnection: firstConnection,
      firstMessage: firstMessage
    };
  },
  setCurrentUserConnection: function setCurrentUserConnection(thisUserId) {
    var _currentUser = this.currentUser,
        id_str = _currentUser.id_str,
        recent_chat_connections = _currentUser.recent_chat_connections;

    var firstConnection = recent_chat_connections[0];
    var localConnection = {
      current_user: id_str,
      active_user: thisUserId,
      recent_chat_connections: recent_chat_connections
    };
    var initialConnection = this.initialConnection();

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
  clearUserConnection: function clearUserConnection() {
    // TODO
  },
  updateCurrentUserIntoUsers: function updateCurrentUserIntoUsers() {
    var _this = this;

    this.users.forEach(function (user, idx) {
      if (user.id_str === _this.currentUser.id_str) {
        _this.users[idx] = _this.currentUser;
      }
    });
  },
  updateIndexedDB: function updateIndexedDB() {
    _indexedDB2.default.set('users', this.users);
  },
  dehydrate: function dehydrate() {
    return {
      currentUser: this.currentUser,
      authenticated: this.authenticated,
      currentUploadedImage: this.currentUploadedImage,
      loginUserImage: this.loginUserImage,
      users: this.users,
      kenny: this.kenny
    };
  },
  rehydrate: function rehydrate(state) {
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