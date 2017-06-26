'use strict';

var _createStore = require('fluxible/addons/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _jsUtils = require('../utils/jsUtils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getPropFromErrorObject(error, prop) {
  let result;
  if (error) {
    result = error[prop] // browser side error object
    || _lodash2.default.get(error, `body.${prop}` // ajax API error object
    ) || _lodash2.default.get(error, `output.${prop}`); // server side API error object
  }
  return result;
}

const ErrorStore = (0, _createStore2.default)({

  storeName: 'ErrorStore',

  handlers: {
    ERROR_OCCURRED: 'errorOccurred'
  },

  initialize: function () {
    this.errors = [];
    this.error = null;
    this.isNotHistoryBack = false;
    this.isInfoMessage = false;
  },
  errorOccurred: function (error) {
    let errorMessage, isNotHistoryBack, isInfoMessage;
    if ((0, _jsUtils.isString)(error)) {
      errorMessage = error;
    } else {
      errorMessage = _getPropFromErrorObject(error, 'message') || JSON.stringify(error);
      isNotHistoryBack = _getPropFromErrorObject(error, 'isNotHistoryBack') || false;
      isInfoMessage = _getPropFromErrorObject(error, 'isInfoMessage') || false;
    }
    this.errors.push(errorMessage);
    this.error = errorMessage;
    this.isNotHistoryBack = isNotHistoryBack;
    this.isInfoMessage = isInfoMessage;
    this.emitChange();
  },
  clearError: function () {
    this.error = null;
    this.isNotHistoryBack = false;
    this.isInfoMessage = false;
  },
  getError: function () {
    return this.error;
  },
  getIsNotHistoryBack: function () {
    return this.isNotHistoryBack;
  },
  getIsInfoMessage: function () {
    return this.isInfoMessage;
  },
  getErrors: function () {
    return this.errors;
  },
  dehydrate: function () {
    return {
      error: this.error,
      errors: this.errors,
      isNotHistoryBack: this.isNotHistoryBack,
      isInfoMessage: this.isInfoMessage
    };
  },
  rehydrate: function (state) {
    this.error = state.error;
    this.errors = state.errors;
    this.isNotHistoryBack = state.isNotHistoryBack;
    this.isInfoMessage = state.isInfoMessage;
  }
});

module.exports = ErrorStore;
