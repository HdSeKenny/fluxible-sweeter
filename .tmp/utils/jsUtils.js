'use strict';

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
  let str = value.split('');
  str[0] = str[0].toUpperCase();
  return str.join('');
}

module.exports = {
  isNumeric: isNumeric,
  isString: isString,
  isUnEmptyString: isUnEmptyString,
  upperFirst: upperFirst,
  strToArray: strToArray
};
