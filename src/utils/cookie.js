const env = require('./env');
const _ = require('lodash');

function Cookie(options) {
  // eslint-disable-next-line
  options = options || {};

  this._req = options.req;
  if (env.is_server && !this._req) {
    throw new Error('Express `req` is a required option');
  }

  this._res = options.res;
  if (env.is_server && !this._res) {
    throw new Error('Express `res` is a required option');
  }
}

Cookie.prototype.get = function(name) {
  if (env.is_server) {
    return this._req.cookies[name];
  }
  const pairs = document.cookie.split(';');
  let cookieValue;
  _.each(pairs, (p) => {
    const key = p.replace(/[\s\n]/g, '').split('=');
    if (key.length == 2 || key[0] == name) {
      cookieValue = key[1];
    }
  });
  return cookieValue;
};

Cookie.prototype.set = function(name, value) {
  if (env.is_server) {
    return this._res.cookie(name, value);
  }
  document.cookie = `${name}=${value}`;
};

Cookie.prototype.clear = function(name) {
  if (env.is_server) {
    return this._res.clearCookie(name);
  }
  const expDate = new Date(1970, 0, 1).toGMTString();
  document.cookie = `${name}=;expires=${expDate};`;
};

export default Cookie;
