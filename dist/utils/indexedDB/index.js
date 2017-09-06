'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _configs = require('../../configs');

var _configs2 = _interopRequireDefault(_configs);

var _env = require('../../utils/env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Designed by Kenny - 9/5/2017
const dbHelper = {
  version: _configs2.default.indexedDB.version,
  name: _configs2.default.indexedDB.name,
  expired: 30
};

let indexedStore;
if (_env2.default.is_client) {
  const { indexedDB: indexedDB, mozIndexedDB: mozIndexedDB, webkitIndexedDB: webkitIndexedDB, msIndexedDB: msIndexedDB } = window;
  indexedStore = indexedDB || mozIndexedDB || webkitIndexedDB || msIndexedDB;
}

const store = {

  indexedDBHelper: dbHelper,

  init: () => new Promise((resolve, reject) => {
    if (indexedStore) {
      // Init indexedDB for Sweeter, the version is 1
      const open = indexedStore.open(dbHelper.name, dbHelper.version);

      // Init tables in the Sweeter indexedDB
      open.onupgradeneeded = event => {
        const _db = event.target.result;
        _db.createObjectStore(dbHelper.name, { keyPath: 'key' });
      };

      open.onsuccess = event => {
        dbHelper.db = event.target.result;
        const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
        const _objectStore = transaction.objectStore(dbHelper.name);
        _objectStore.getAllKeys().onsuccess = e => {
          const { result: result } = e.target;
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
  }),

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
  retrieve: function (endpoint, payload, success, fail) {
    const save = { key: endpoint, expired: dbHelper.expired };
    if (dbHelper.db) {
      const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      const _objectStore = transaction.objectStore(dbHelper.name);
      const request = _objectStore.get(endpoint);
      request.onsuccess = event => {
        const { result: result } = event.target;
        // Put new date for indexedDB
        _objectStore.put({ key: _configs2.default.indexedDB.dateKey, value: new Date() });

        if (result) {
          // Execute actions callback to put data into react store
          success(null, result.value, save);
        } else {
          // Execute actions callback to get data from API
          fail(res => {
            this.set(endpoint, res, dbHelper.expired);
          }, save);
        }
      };

      request.onerror = event => {
        const { errorCode: errorCode } = event.target;
        // eslint-disable-next-line no-console
        console.log('Sweeter indexedDB error on retrieve.', errorCode);
      };
    } else {
      fail(() => {}, save);
    }
  },


  /**
   * Set value into indexedDB
   *
   * @param {any} key
   * @param {any} value
   */
  set: function (key, value) {
    if (dbHelper.db) {
      const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      const _objectStore = transaction.objectStore(dbHelper.name);
      _objectStore.put({ key: key, value: value });
    }
  },


  /**
   * Get data from indexedDB
   *
   * @param {any} key
   * @returns
   */
  get: key => new Promise((resolve, reject) => {
    if (!dbHelper.db) {
      return reject('IndexedDB is not available now.');
    }

    const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    const _objectStore = transaction.objectStore(dbHelper.name);
    const request = _objectStore.get(key);
    request.onsuccess = event => {
      // Put new date for indexedDB
      _objectStore.put({ key: _configs2.default.indexedDB.dateKey, value: new Date() });

      const { result: result } = event.target;
      if (result) {
        return resolve(result);
      }
      // return the default value
      return resolve(null);
    };

    request.onerror = event => {
      const { errorCode: errorCode } = event.target;
      // eslint-disable-next-line no-console
      console.log('Sweeter indexedDB error on checkIndexedDBClear.', errorCode);
    };
  }),

  /**
   * Clear the indexedDB
   */
  clear: function () {
    if (dbHelper.db) {
      const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      const _objectStore = transaction.objectStore(dbHelper.name);
      const request = _objectStore.clear();
      request.onsuccess = () => {
        // eslint-disable-next-line no-console
        console.log('Sweeter indexedDB clear success');
      };

      request.onerror = event => {
        const { errorCode: errorCode } = event.target;
        // eslint-disable-next-line no-console
        console.log('Sweeter indexedDB error on clear.', errorCode);
      };
    }
  },
  checkIndexedDBClear: function () {
    if (dbHelper.db) {
      const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
      const _objectStore = transaction.objectStore(dbHelper.name);
      const request = _objectStore.get(_configs2.default.indexedDB.dateKey);
      request.onsuccess = event => {
        const { result: result } = event.target;
        if (result) {
          const diff = new Date() - result.value;
          const { expired: expired } = _configs2.default.indexedDB;
          if (diff > expired) {
            this.clear();
          }
        }
      };

      request.onerror = event => {
        const { errorCode: errorCode } = event.target;
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
dbHelper._syncDataBetweenTabs = fluxibleStores => {
  if (dbHelper.db) {
    const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    const _objectStore = transaction.objectStore(dbHelper.name);
    _objectStore.getAll().onsuccess = event => {
      const { result: result } = event.target;
      if (result && result.length) {
        // const versionIndexedStore = result.find(db => db.value.name === 'versions');
        // const versionFluxStore = fluxibleStores.find(db => store.name === 'versions');

        result.forEach(idxedStore => {
          const { name: name, updatedNumber: updatedNumber, save: save } = idxedStore.value;
          const fluxStore = fluxibleStores.find(fStore => fStore.name === name);
          if (fluxStore && fluxStore.updatedNumber !== updatedNumber) {
            fluxStore.syncDataFromIndexedDB({ data: idxedStore.value, save: save, isSync: true });
          }
        });
      }
    };

    _objectStore.getAll().onerror = event => {
      const { errorCode: errorCode } = event.target;
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
dbHelper.initEventListenersBetweenTabs = fluxibleStores => {
  if (!dbHelper.db) {
    return;
  }

  let hidden, visibilityChange;
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
  document.addEventListener(visibilityChange, () => {
    if (document[hidden]) {
      return;
    }
    dbHelper._syncDataBetweenTabs(fluxibleStores);
  }, false);

  // switch between windows
  window.addEventListener('focus', () => {
    dbHelper._syncDataBetweenTabs(fluxibleStores);
  }, false);
};

exports.default = store;
module.exports = exports['default'];
