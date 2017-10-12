'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _configs = require('../../configs');

var _configs2 = _interopRequireDefault(_configs);

var _env = require('../../utils/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Designed by Kenny - 9/5/2017
var dbHelper = {
  version: _configs2.default.indexedDB.version,
  name: _configs2.default.indexedDB.name,
  expired: 30
};

var indexedStore = void 0;
if (_env2.default.is_client) {
  var _window = window,
      indexedDB = _window.indexedDB,
      mozIndexedDB = _window.mozIndexedDB,
      webkitIndexedDB = _window.webkitIndexedDB,
      msIndexedDB = _window.msIndexedDB;

  indexedStore = indexedDB || mozIndexedDB || webkitIndexedDB || msIndexedDB;
}

var store = {

  indexedDBHelper: dbHelper,

  init: function init() {
    return new _promise2.default(function (resolve, reject) {
      if (indexedStore) {
        // Init indexedDB for Sweeter, the version is 1
        var open = indexedStore.open(dbHelper.name, dbHelper.version);

        // Init tables in the Sweeter indexedDB
        open.onupgradeneeded = function (event) {
          var _db = event.target.result;
          _db.createObjectStore(dbHelper.name, { keyPath: 'key' });
        };

        open.onsuccess = function (event) {
          dbHelper.db = event.target.result;
          var transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
          var _objectStore = transaction.objectStore(dbHelper.name);
          _objectStore.getAllKeys().onsuccess = function (e) {
            var result = e.target.result;

            if (!result.includes(_configs2.default.indexedDB.dateKey)) {
              // Put new date for indexedDB at first time.
              _objectStore.put({ key: _configs2.default.indexedDB.dateKey, value: new Date() });
            }

            resolve();
          };
        };
      } else {
        reject('Client did not support indexedDB');
      }
    });
  },

  /**
   * Used to get data from indexedDB if the data is avaliable
   * If avaliable, get the data, execute the success function
   * else execute the fail callback to get data from API
   * @param  {string} endpoint
   * @param  {object} payload
   * @param  {function} success
   * @param  {function} fail
   * @return {}
   */
  retrieve: function retrieve(endpoint, payload, success, fail) {
    var _this = this;

    var save = { key: endpoint, expired: dbHelper.expired };
    if (dbHelper.db) {
      var transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      var _objectStore = transaction.objectStore(dbHelper.name);
      var request = _objectStore.get(endpoint);
      request.onsuccess = function (event) {
        var result = event.target.result;
        // Put new date for indexedDB

        _objectStore.put({ key: _configs2.default.indexedDB.dateKey, value: new Date() });

        if (result) {
          // Execute actions callback to put data into react store
          success(null, result.value, save);
        } else {
          // Execute actions callback to get data from API
          fail(function (res) {
            _this.set(endpoint, res, dbHelper.expired);
          }, save);
        }
      };

      request.onerror = function (event) {
        var errorCode = event.target.errorCode;
        // eslint-disable-next-line no-console

        console.log('Sweeter indexedDB error on retrieve.', errorCode);
      };
    } else {
      fail(function () {}, save);
    }
  },


  /**
   * Set value into indexedDB
   *
   * @param {any} key
   * @param {any} value
   */
  set: function set(key, value) {
    if (dbHelper.db) {
      var transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      var _objectStore = transaction.objectStore(dbHelper.name);
      _objectStore.put({ key: key, value: value });
    }
  },


  /**
   * Get data from indexedDB
   *
   * @param {any} key
   * @returns
   */
  get: function get(key) {
    return new _promise2.default(function (resolve, reject) {
      if (!dbHelper.db) {
        return reject('IndexedDB is not available now.');
      }

      var transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      var _objectStore = transaction.objectStore(dbHelper.name);
      var request = _objectStore.get(key);
      request.onsuccess = function (event) {
        // Put new date for indexedDB
        _objectStore.put({ key: _configs2.default.indexedDB.dateKey, value: new Date() });

        var result = event.target.result;

        if (result) {
          return resolve(result);
        }
        // return the default value
        return resolve(null);
      };

      request.onerror = function (event) {
        var errorCode = event.target.errorCode;
        // eslint-disable-next-line no-console

        console.log('Sweeter indexedDB error on checkIndexedDBClear.', errorCode);
      };
    });
  },

  /**
   * Clear the indexedDB
   */
  clear: function clear() {
    if (dbHelper.db) {
      var transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      var _objectStore = transaction.objectStore(dbHelper.name);
      var request = _objectStore.clear();
      request.onsuccess = function () {
        // eslint-disable-next-line no-console
        console.log('Sweeter indexedDB clear success');
      };

      request.onerror = function (event) {
        var errorCode = event.target.errorCode;
        // eslint-disable-next-line no-console

        console.log('Sweeter indexedDB error on clear.', errorCode);
      };
    }
  },
  checkIndexedDBClear: function checkIndexedDBClear() {
    var _this2 = this;

    if (dbHelper.db) {
      var transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      var _objectStore = transaction.objectStore(dbHelper.name);
      var request = _objectStore.get(_configs2.default.indexedDB.dateKey);
      request.onsuccess = function (event) {
        var result = event.target.result;

        if (result) {
          var diff = new Date() - result.value;
          var expired = _configs2.default.indexedDB.expired;

          if (diff > expired) {
            _this2.clear();
          }
        }
      };

      request.onerror = function (event) {
        var errorCode = event.target.errorCode;
        // eslint-disable-next-line no-console

        console.log('Sweeter indexedDB error on checkIndexedDBClear.', errorCode);
      };
    }
  }
};

/**
 * Check and update fluxible stores from indexedDB
 * @param  {array} fluxibleStores
 * @return {}
 */
dbHelper._syncDataBetweenTabs = function (fluxibleStores) {
  if (dbHelper.db) {
    var transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    var _objectStore = transaction.objectStore(dbHelper.name);
    _objectStore.getAll().onsuccess = function (event) {
      var result = event.target.result;

      if (result && result.length) {
        // const versionIndexedStore = result.find(db => db.value.name === 'versions');
        // const versionFluxStore = fluxibleStores.find(db => store.name === 'versions');

        result.forEach(function (idxedStore) {
          var _idxedStore$value = idxedStore.value,
              name = _idxedStore$value.name,
              updatedNumber = _idxedStore$value.updatedNumber,
              save = _idxedStore$value.save;

          var fluxStore = fluxibleStores.find(function (fStore) {
            return fStore.name === name;
          });
          if (fluxStore && fluxStore.updatedNumber !== updatedNumber) {
            fluxStore.syncDataFromIndexedDB({ data: idxedStore.value, save: save, isSync: true });
          }
        });
      }
    };

    _objectStore.getAll().onerror = function (event) {
      var errorCode = event.target.errorCode;
      // eslint-disable-next-line no-console

      console.log('Sweeter indexedDB error on _syncDataBetweenTabs.', errorCode);
    };
  }
};

/**
 * If user open multiple tabs and update data in
 * one tab, other tabs should be updated too
 * @param  {object} store
 * @return {}
 */
dbHelper.initEventListenersBetweenTabs = function (fluxibleStores) {
  if (!dbHelper.db) {
    return;
  }

  var hidden = void 0,
      visibilityChange = void 0;
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  // update data after tab was actived
  document.addEventListener(visibilityChange, function () {
    if (document[hidden]) {
      return;
    }
    dbHelper._syncDataBetweenTabs(fluxibleStores);
  }, false);

  // switch between windows
  window.addEventListener('focus', function () {
    dbHelper._syncDataBetweenTabs(fluxibleStores);
  }, false);
};

exports.default = store;
module.exports = exports['default'];