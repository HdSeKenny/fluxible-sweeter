/* eslint-disable all, no-param-reassign */
import Mode from '../configs/mode';
import fetchClientConfig from '../utils/fetchClientConfig';
import store from '../utils/indexedDB';

const { isPublic } = Mode;
const endpoint = 'users';

export default {

  LoadKennyUser(context, payload, done) {
    const callback = (err, res, save) => {
      context.dispatch('LOAD_KENNY_SUCCESS', { data: res, save });
      done();
    };

    store.retrieve('administrator', payload, callback, (saveCallback, saveOptions) => {
      context.service.read('users.loadKennyUser', payload, fetchClientConfig, (err, res) => {
        saveCallback(res);
        callback(err, res, saveOptions);
      });
    });
  },

  LoadUsers(context, payload, done) {
    const callback = (err, res, save) => {
      context.dispatch('LOAD_USERS_SUCCESS', { data: res, save });
      done();
    };

    store.retrieve(endpoint, payload, callback, (saveCallback, saveOptions) => {
      context.service.read('users.loadUsers', payload, fetchClientConfig, (err, res) => {
        saveCallback(res);
        callback(err, res, saveOptions);
      });
    });
  },

  Login(context, payload, done) {
    context.service.create('users.login', {}, payload, fetchClientConfig, (err, res) => {
      if (res.user) {
        context.dispatch('USER_LOGIN_SUCCESS', res);
      } else {
        context.dispatch('USER_LOGIN_FAIL', res);
      }
      done();
    });
  },

  Logout(context, payload, done) {
    context.service.delete('users', payload, fetchClientConfig, (err, res) => {
      context.dispatch('LOGOUT_SUCCESS', res);
      done();
    });
  },

  UserRegister(context, payload, done) {
    context.service.create('users.register', {}, payload, fetchClientConfig, (err, res) => {
      if (res.user) {
        context.dispatch('USER_REGISTER_SUCCESS', res);
      } else {
        context.dispatch('USER_REGISTER_FAIL', res);
      }
      done();
    });
  },

  LoadSessionUser(context, payload, done) {
    if (isPublic) {
      done();
      return;
    }
    context.service.read('users.readCurrentUser', payload, fetchClientConfig, (err, res) => {
      if (res.user) {
        context.dispatch('LOAD_SESSION_USER_SUCCESS', res);
      }
      done();
    });
  },

  UpdateUserInfo(context, payload, done) {
    context.service.create('users.updateUserInfo', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('UPDATE_USER_SUCCESS', res);
      done();
    });
  },

  ChangeUserPassword(context, payload, done) {
    context.service.create('users.changeUserPassword', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('CHANGE_PASSWORD_SUCCESS', res);
      done();
    });
  },

  FollowThisUser(context, payload, done) {
    context.service.create('users.followThisUser', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('FOLLOW_USER_SUCCESS', res);
      done();
    });
  },

  CancelFollowThisUser(context, payload, done) {
    context.service.create('users.cancelFollowThisUser', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('CANCEL_FOLLOW_USER_SUCCESS', res);
      done();
    });
  },

  EditUserImage(context, payload, done) {
    context.dispatch('EDIT_USER_IMAGE', payload);
    done();
  },

  CancelEditUserImage(context, payload, done) {
    context.dispatch('CANCEL_EDIT_USER_IMAGE');
    done();
  },

  UploadImageSuccess(context, payload, done) {
    context.dispatch('UPLOAD_IMAGE_SUCCESS', payload);
    done();
  },

  GetLoginUserImage(context, payload, done) {
    context.service.create('users.getLoginUserImage', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('GET_LOGIN_USER_IMAGE_SUCCESS', res);
      done();
    });
  },

  openChatConnection(context, payload, done) {
    context.service.create('users.addMessageConnection', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('ADD_MESSAGE_CONNECTION_SUCCESS', res);
      done();
    });
  },

  closeUserConnection(context, payload, done) {
    context.service.create('users.deleteMessageConnection', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('DELETE_MESSAGE_CONNECTION_SUCCESS', {
        connections: res,
        thisUserId: payload.thisUserId
      });
      done();
    });
  }
};
