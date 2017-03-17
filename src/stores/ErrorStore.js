import createStore from 'fluxible/addons/createStore';
import { isString } from '../utils/jsUtils';
import _ from 'lodash';

function _getPropFromErrorObject(error, prop) {
  let result;
  if (error) {
    result = error[prop] // browser side error object
      || _.get(error, `body.${prop}`) // ajax API error object
      || _.get(error, `output.${prop}`); // server side API error object
  }
  return result;
}

const ErrorStore = createStore({

  storeName: 'ErrorStore',

  handlers: {
    ERROR_OCCURRED: 'errorOccurred',
  },

  initialize() {
    this.errors = [];
    this.error = null;
    this.isNotHistoryBack = false;
    this.isInfoMessage = false;
  },

  errorOccurred(error) {
    let errorMessage, isNotHistoryBack, isInfoMessage;
    if (isString(error)) {
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

  clearError() {
    this.error = null;
    this.isNotHistoryBack = false;
    this.isInfoMessage = false;
  },

  getError() {
    return this.error;
  },

  getIsNotHistoryBack() {
    return this.isNotHistoryBack;
  },

  getIsInfoMessage() {
    return this.isInfoMessage;
  },

  getErrors() {
    return this.errors;
  },
  
  dehydrate() {
    return {
      error: this.error,
      errors: this.errors,
      isNotHistoryBack: this.isNotHistoryBack,
      isInfoMessage: this.isInfoMessage
    };
  },
  rehydrate(state) {
    this.error = state.error;
    this.errors = state.errors;
    this.isNotHistoryBack = state.isNotHistoryBack;
    this.isInfoMessage = state.isInfoMessage;
  }
});

module.exports = ErrorStore;
