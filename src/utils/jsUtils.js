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
  return (typeof str === 'string') || (str instanceof String);
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
  const str = value.split('');
  str[0] = str[0].toUpperCase();
  return str.join('');
}

function shorten(s, n) {
  return (s.length > n) ? `${s.substr(0, n - 1)} ...` : s;
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
  const params = url.split('/');
  const path = [];
  let tmpNumer = 0;
  let targetNumber = 1;

  if (number && isNumeric(number)) {
    targetNumber = number;
  }

  if (params.length) {
    for (let i = params.length - 1; i >= 0; i--) {
      if (tmpNumer < targetNumber) {
        path.push(params[i]);
        tmpNumer++;
      }
    }
  }

  return path;
}

export default {
  isNumeric,
  isString,
  isUnEmptyString,
  upperFirst,
  strToArray,
  shorten,
  splitUrlBySlash
};
