'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable all, no-param-reassign */

/**
 * native javascript isNaN is not accurate enough, so we need to define a more complex funtion to do this
 * 1) http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
 * 2) http://run.plnkr.co/plunks/93FPpacuIcXqqKMecLdk/
 * @param  {number|string}
 * @return {Boolean}
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

function isUnEmptyString(str) {
  return str && isString(str);
}

/**
 * @str the string to be splitted
 * @separator the seprator, such as ',', '|', or ';'
 * @defaultValue the defaultValue when str is invalid
 */
function strToArray(str, separator, defaultValue) {
  return isUnEmptyString(str) ? str.split(separator) : defaultValue;
}

function upperFirst(value) {
  var str = value.split('');
  str[0] = str[0].toUpperCase();
  return str.join('');
}

function shorten(s, n) {
  return s.length > n ? s.substr(0, n - 1) + ' ...' : s;
}

/**
 * Receive an url and split it with '/', the number is how many params returned,
 * for example, url = '/kuanlu/home' number = 1, returned path will be ['home'],
 * if number is 2, the returned path will be ['kuanlu', 'home']
 *
 * @param  {string} url
 * @param  {number} number
 * @return {array} path
 */
function splitUrlBySlash(url, number) {
  var params = url.split('/');
  var path = [];
  var tmpNumer = 0;
  var targetNumber = params.length;

  if (number && isNumeric(number)) {
    targetNumber = number;
  } else {
    return path;
  }

  if (params.length) {
    for (var i = params.length - 1; i >= 0; i--) {
      if (tmpNumer < targetNumber) {
        path.push(params[i]);
        tmpNumer++;
      }
    }
  }

  return path;
}

/**
 * [blobToFile description]
 * @param  {[type]} blob [description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function blobToFile(blob, name) {
  blob.lastModifiedDate = new Date();
  blob.name = name;
  return blob;
}

/**
 * [createBlob description]
 * @param  {[type]} data     [description]
 * @param  {[type]} mimeType [description]
 * @return {[type]}          [description]
 */
function createBlob(data, mimeType) {
  var BB = window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;

  if (BB) {
    var bb = new BB();
    bb.append(data);
    return bb.getBlob(mimeType);
  }

  // eslint-disable-next-line
  return new Blob([data], { type: mimeType });
}

/* eslint-disable */
function getExtensionByMimeType(mimetype) {
  var type = void 0;
  var MimeTypes = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'jpe': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp'
  };

  for (ty in mimetype) {
    if (!MimeTypes.hasOwnProperty(ty)) {
      continue;
    }
    if (MimeTypes[type] === mimetype) {
      return type;
    }
  }
  return mimetype;
}

/**
 * [leftPad description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function leftPad(value) {
  var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (padding + value).slice(-padding.length);
}

/**
 * [getDateString description]
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
function getDateString(date) {
  var fullYear = date.getFullYear();
  var leftPadMonth = leftPad(date.getMonth() + 1, '00');
  var leftPadDate = leftPad(date.getDate(), '00');
  var leftPadHours = leftPad(date.getHours(), '00');
  var leftPadMinutes = leftPad(date.getMinutes(), '00');
  var leftPadSeconds = leftPad(date.getSeconds(), '00');
  return fullYear + '-' + leftPadMonth + '-' + leftPadDate + '_' + leftPadHours + '-' + leftPadMinutes + '-' + leftPadSeconds;
}

/**
 * [getMimeTypeFromDataURI description]
 * @param  {[type]} dataUri [description]
 * @return {[type]}         [description]
 */
function getMimeTypeFromDataURI(dataUri) {
  if (!dataUri) {
    return null;
  }
  var matches = dataUri.substr(0, 16).match(/^.+;/);
  if (matches.length) {
    return matches[0].substring(5, matches[0].length - 1);
  }
  return null;
}

/**
 * [base64ToByteString description]
 * @param  {[type]} dataURI [description]
 * @return {[type]}         [description]
 */
function base64ToByteString(dataURI) {
  // get data part of string (remove data:image/jpeg...,)
  var dataPart = dataURI.split(',')[1];
  // remove any whitespace as that causes InvalidCharacterError in IE
  var dataPartCleaned = dataPart.replace(/\s/g, '');
  // eslint-disable-next-line
  return atob(dataPartCleaned);
}

/**
 * [base64ToBlob description]
 * @param  {[type]} dataURI  [description]
 * @param  {[type]} filename [description]
 * @return {[type]}          [description]
 */
function base64ToBlob(dataURI, filename) {
  var byteString = base64ToByteString(dataURI);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var mimeType = getMimeTypeFromDataURI(dataURI);
  if (typeof filename === 'undefined') {
    // eslint-disable-next-line
    filename = getDateString(new Date()) + '.' + getExtensionByMimeType(mimeType);
  }

  return blobToFile(createBlob(ab, mimeType), filename);
}

function sortByDate(arr) {
  if (Array.isArray(arr)) {
    return arr.sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  } else {
    return [];
  }
}

function searchFromArray(arr, text) {
  var searched = [];
  if (Array.isArray(arr)) {
    arr.forEach(function (a) {
      var textLowerCase = a.text.toLocaleLowerCase().replace(/\s/g, '');
      if (a.title) {
        var titleLowerCase = a.title.toLocaleLowerCase().replace(/\s/g, '');
        if (titleLowerCase.includes(text) || textLowerCase.includes(text)) {
          searched.push(a);
        }
      } else if (textLowerCase.includes(text)) {
        searched.push(a);
      }
    });
  }

  return searched;
}

exports.default = {
  isNumeric: isNumeric,
  isString: isString,
  isUnEmptyString: isUnEmptyString,
  upperFirst: upperFirst,
  strToArray: strToArray,
  shorten: shorten,
  splitUrlBySlash: splitUrlBySlash,
  base64ToBlob: base64ToBlob,
  sortByDate: sortByDate,
  searchFromArray: searchFromArray
};
module.exports = exports['default'];