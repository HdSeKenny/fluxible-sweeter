'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var areIntlLocalesSupported = require('intl-locales-supported');

var localesMyAppSupports = [
  /* list locales here */
];

var _globalObject = {};
if ((typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object') {
  _globalObject = global;
} else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
  _globalObject = window;
}

if (_globalObject.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  _globalObject.Intl = require('intl');
}