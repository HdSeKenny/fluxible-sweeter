'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * create custom Error object
 * @param  {string} key     validator key, same as api endpoint usually
 * @param  {string} message error message
 * @return {Error}
 */
var createError = (key, message) => {
  var errMsg = `DataValidator: ${key}: ${message}`;
  return new Error(errMsg);
};

/**
 * validate the data fetched from mongodb
 */
class DataValidator {
  constructor() {
    this.validators = {};
  }

  /**
   * add validator
   * @param {string} key validator key
   * @param {func} validator a function to do validator
   */
  add(key, validator) {
    this.validators[key] = function (data) {
      return validator(key, data);
    };
  }

  /**
   * run validate by given validator key
   * @param  {string} key  validator key
   * @param  {object} data object to be validate
   * @return {Error} return null if no error
   */
  doValidate(key, data) {
    var validator = this.validators[key];
    var result = validator(data);
    if (result && typeof result === 'string') {
      return createError(key, result);
    } else {
      return null;
    }
  }
}

var dataValidator = new DataValidator();

dataValidator.add('reportmeta', (key, reports) => {
  if (!Array.isArray(reports)) {
    return '[reports] is should be an array.';
  }

  if (reports.length === 0) {
    return '[reports] is empty.';
  }

  return null;
});

dataValidator.add('domains', (key, domains) => {
  if (!Array.isArray(domains)) {
    return '[domains] is should be an array.';
  }

  if (domains.length === 0) {
    return '[domains] is empty.';
  }

  return null;
});

dataValidator.add('updateuser', (key, res) => {
  if (res) {
    return null;
  } else {
    return 'update user failure.';
  }
});

dataValidator.add('adduser', (key, res) => {
  if (res) {
    return null;
  } else {
    return 'add user failure.';
  }
});

dataValidator.add('versions', (key, versions) => {
  if (!Array.isArray(versions)) {
    return '[versions] is should be an array.';
  }

  if (!_lodash2.default.find(versions, { _id: 'Domains' })) {
    return 'Domain version is missing.';
  }

  if (!_lodash2.default.find(versions, { _id: 'Reports' })) {
    return 'Report version is missing.';
  }

  return null;
});

exports.default = dataValidator;
module.exports = exports['default'];
