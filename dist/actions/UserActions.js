'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mode = require('../configs/mode');

var _mode2 = _interopRequireDefault(_mode);

var _fetchClientConfig = require('../utils/fetchClientConfig');

var _fetchClientConfig2 = _interopRequireDefault(_fetchClientConfig);

var _indexedDB = require('../utils/indexedDB');

var _indexedDB2 = _interopRequireDefault(_indexedDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPublic = _mode2.default.isPublic; /* eslint-disable all, no-param-reassign */

var endpoint = 'users';

exports.default = {
  LoadKennyUser: function LoadKennyUser(context, payload, done) {
    var callback = function callback(err, res, save) {
      context.dispatch('LOAD_KENNY_SUCCESS', { data: res, save: save });
      done();
    };

    _indexedDB2.default.retrieve('administrator', payload, callback, function (saveCallback, saveOptions) {
      context.service.read('users.loadKennyUser', payload, _fetchClientConfig2.default, function (err, res) {
        saveCallback(res);
        callback(err, res, saveOptions);
      });
    });
  },
  LoadUsers: function LoadUsers(context, payload, done) {
    var callback = function callback(err, res, save) {
      context.dispatch('LOAD_USERS_SUCCESS', { data: res, save: save });
      done();
    };

    _indexedDB2.default.retrieve(endpoint, payload, callback, function (saveCallback, saveOptions) {
      context.service.read('users.loadUsers', payload, _fetchClientConfig2.default, function (err, res) {
        saveCallback(res);
        callback(err, res, saveOptions);
      });
    });
  },
  Login: function Login(context, payload, done) {
    context.service.create('users.login', {}, payload, _fetchClientConfig2.default, function (err, res) {
      if (res.user) {
        context.dispatch('USER_LOGIN_SUCCESS', res);
      } else {
        context.dispatch('USER_LOGIN_FAIL', res);
      }
      done();
    });
  },
  Logout: function Logout(context, payload, done) {
    context.service.delete('users', payload, _fetchClientConfig2.default, function (err, res) {
      context.dispatch('LOGOUT_SUCCESS', res);
      done();
    });
  },
  UserRegister: function UserRegister(context, payload, done) {
    context.service.create('users.register', {}, payload, _fetchClientConfig2.default, function (err, res) {
      if (res.user) {
        context.dispatch('USER_REGISTER_SUCCESS', res);
      } else {
        context.dispatch('USER_REGISTER_FAIL', res);
      }
      done();
    });
  },
  LoadSessionUser: function LoadSessionUser(context, payload, done) {
    if (isPublic) {
      done();
      return;
    }
    context.service.read('users.readCurrentUser', payload, _fetchClientConfig2.default, function (err, res) {
      if (res.user) {
        context.dispatch('LOAD_SESSION_USER_SUCCESS', res);
      }
      done();
    });
  },
  UpdateUserInfo: function UpdateUserInfo(context, payload, done) {
    context.service.create('users.updateUserInfo', {}, payload, _fetchClientConfig2.default, function (err, res) {
      context.dispatch('UPDATE_USER_SUCCESS', res);
      done();
    });
  },
  ChangeUserPassword: function ChangeUserPassword(context, payload, done) {
    context.service.create('users.changeUserPassword', {}, payload, _fetchClientConfig2.default, function (err, res) {
      context.dispatch('CHANGE_PASSWORD_SUCCESS', res);
      done();
    });
  },
  FollowThisUser: function FollowThisUser(context, payload, done) {
    context.service.create('users.followThisUser', {}, payload, _fetchClientConfig2.default, function (err, res) {
      context.dispatch('FOLLOW_USER_SUCCESS', res);
      done();
    });
  },
  CancelFollowThisUser: function CancelFollowThisUser(context, payload, done) {
    context.service.create('users.cancelFollowThisUser', {}, payload, _fetchClientConfig2.default, function (err, res) {
      context.dispatch('CANCEL_FOLLOW_USER_SUCCESS', res);
      done();
    });
  },
  EditUserImage: function EditUserImage(context, payload, done) {
    context.dispatch('EDIT_USER_IMAGE', payload);
    done();
  },
  CancelEditUserImage: function CancelEditUserImage(context, payload, done) {
    context.dispatch('CANCEL_EDIT_USER_IMAGE');
    done();
  },
  UploadImageSuccess: function UploadImageSuccess(context, payload, done) {
    context.dispatch('UPLOAD_IMAGE_SUCCESS', payload);
    done();
  },
  GetLoginUserImage: function GetLoginUserImage(context, payload, done) {
    context.service.create('users.getLoginUserImage', {}, payload, _fetchClientConfig2.default, function (err, res) {
      context.dispatch('GET_LOGIN_USER_IMAGE_SUCCESS', res);
      done();
    });
  },
  openChatConnection: function openChatConnection(context, payload, done) {
    context.service.create('users.addMessageConnection', {}, payload, _fetchClientConfig2.default, function (err, res) {
      context.dispatch('ADD_MESSAGE_CONNECTION_SUCCESS', res);
      done();
    });
  },
  closeUserConnection: function closeUserConnection(context, payload, done) {
    context.service.create('users.deleteMessageConnection', {}, payload, _fetchClientConfig2.default, function (err, res) {
      context.dispatch('DELETE_MESSAGE_CONNECTION_SUCCESS', {
        connections: res,
        thisUserId: payload.thisUserId
      });
      done();
    });
  }
};
module.exports = exports['default'];