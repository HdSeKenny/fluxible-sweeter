import config from '../../configs/server';

const dbHelper = {
  version: config.indexedDB.version,
  name: config.indexedDB.name,
};

dbHelper.init = () => {
  return new Promise((resolve, reject) => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (indexedDB) {
      // Init indexedDB for MetadataExplorer, the version is 1
      const open = indexedDB.open(dbHelper.name, dbHelper.version);

      // Init tables in the MetadataExplorer indexedDB
      open.onupgradeneeded = (event) => {
        const _db = event.target.result;
        _db.createObjectStore(dbHelper.name, { keyPath: 'key' });
      };

      open.onsuccess = (event) => {
        dbHelper.db = event.target.result;
        const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
        const _objectStore = transaction.objectStore(dbHelper.name);
        _objectStore.getAllKeys().onsuccess = (e) => {
          const { result } = e.target;
          if (!result.includes(config.indexedDB.dateKey)) {
            // Put new date for indexedDB at first time.
            _objectStore.put({ key: config.indexedDB.dateKey, value: new Date() });
          }

          resolve();
        };
      };
    } else {
      reject('Client did not support indexedDB');
    }
  });
};

/**
 * Used to get a save key to store data into indexedDB
 * @param  {string} endpoint
 * @param  {object} payload
 * @return {string} saveKey
 */
function getIndexedDBSaveKey(endpoint, payload) {
  let saveKey = endpoint;
  const params = shrinkQuery(endpoint, payload);
  if (params) {
    Object.keys(params).forEach((key) => {
      if (!['isUpLoad', 'version', 'isRevert'].includes(key)) {
        saveKey += ('_' + key + '_' + encodeURIComponent(payload[key]));
      }
    });
  }
  return saveKey;
}

/**
 * Used to put data into indexedDB
 * @param  {string} saveKey
 * @param  {object} data
 * @param  {number} expired
 * @return {}
 */
dbHelper.set = (saveKey, value, expired) => {
  if (dbHelper.db) {
    const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    const _objectStore = transaction.objectStore(dbHelper.name);
    _objectStore.put({ key: saveKey, value });
  }
};

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
dbHelper.retrieve = (endpoint, payload, success, fail) => {
  const saveKey = getIndexedDBSaveKey(endpoint, payload);
  const expired = API[endpoint.toLowerCase()].save.expired;
  const saveOpts = { key: saveKey, expired };

  // Click revert button to revert data
  if (payload.isRevert) {
    return fail((res) => {
      // Used to set isUpdate to false in the corresponding store
      res.isRevert = true; // eslint-disable-line no-param-reassign
      dbHelper.set(saveKey, res, expired);
    }, saveOpts);
  }

  if (dbHelper.db) {
    const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    const _objectStore = transaction.objectStore(dbHelper.name);
    const request = _objectStore.get(saveKey);
    request.onsuccess = (event) => {
      const { result } = event.target;

      // Put new date for indexedDB
      _objectStore.put({ key: config.indexedDB.dateKey, value: new Date() });

      if (result) {
        // Execute actions callback to put data into react store
        success(null, result.value, saveOpts);
      } else {
        // Execute actions callback to get data from API
        fail((res) => {
          dbHelper.set(saveKey, res, expired);
        }, saveOpts);
      }
    };

    request.onerror = (event) => {
      const { errorCode } = event.target;
      // eslint-disable-next-line no-console
      console.log('MetadataExplorer indexedDB error on retrieve.', errorCode);
    };
  } else {
    fail(() => {}, saveOpts);
  }
};

/**
 * get data from indexedDB by th saveKey
 * @param  {string}   key
 * @param  {function} callback
 * @return {object} result
 */
dbHelper.get = (key) => {
  return new Promise((resolve, reject) => {
    if (!dbHelper.db) {
      return reject('IndexedDB is not available now.');
    }

    const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    const _objectStore = transaction.objectStore(dbHelper.name);
    const request = _objectStore.get(key);
    request.onsuccess = (event) => {
      // Put new date for indexedDB
      _objectStore.put({ key: config.indexedDB.dateKey, value: new Date() });

      const { result } = event.target;
      if (result) {
        return resolve(result);
      }
      // return the default value
      return resolve(null);
    };

    request.onerror = (event) => {
      const { errorCode } = event.target;
      // eslint-disable-next-line no-console
      console.log('MetadataExplorer indexedDB error on checkIndexedDBClear.', errorCode);
    };
  });
};

dbHelper.clear = () => {
  if (dbHelper.db) {
    const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    const _objectStore = transaction.objectStore(dbHelper.name);
    const request = _objectStore.clear();
    request.onsuccess = () => {
      // eslint-disable-next-line no-console
      console.log('MetadataExplorer indexedDB clear success');
    };
    request.onerror = (event) => {
      const { errorCode } = event.target;
      // eslint-disable-next-line no-console
      console.log('MetadataExplorer indexedDB error on clear.', errorCode);
    };
  }
};

dbHelper.checkIndexedDBClear = () => {
  if (dbHelper.db) {
    const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    const _objectStore = transaction.objectStore(dbHelper.name);
    const request = _objectStore.get(config.indexedDB.dateKey);
    request.onsuccess = (event) => {
      const { result } = event.target;
      if (result) {
        const diff = new Date() - result.value;
        const { expired } = config.indexedDB;
        if (diff > expired) {
          dbHelper.clear();
        }
      }
    };

    request.onerror = (event) => {
      const { errorCode } = event.target;
      // eslint-disable-next-line no-console
      console.log('MetadataExplorer indexedDB error on checkIndexedDBClear.', errorCode);
    };
  }
};

/**
 * Check and update fluxible stores from indexedDB
 * @param  {array} fluxibleStores
 * @return {}
 */
dbHelper._syncDataBetweenTabs = (fluxibleStores) => {
  if (dbHelper.db) {
    const transaction = dbHelper.db.transaction(dbHelper.name, 'readwrite');
    const _objectStore = transaction.objectStore(dbHelper.name);
    _objectStore.getAll().onsuccess = (event) => {
      const { result } = event.target;
      if (result && result.length) {
        const versionIndexedStore = result.find(store => store.value.name === 'versions');
        const versionFluxStore = fluxibleStores.find(store => store.name === 'versions');

        result.forEach(indexedStore => {
          const fluxStore = fluxibleStores.find(store => store.name === indexedStore.value.name);
          if (fluxStore) {
            const isShouldUpdated = fluxStore.updatedNumber !== indexedStore.value.updatedNumber;
            if (isShouldUpdated) {
              if (versionIndexedStore && versionFluxStore) {
                versionFluxStore.syncDataFromIndexedDB({
                  data: versionIndexedStore.value.versions,
                  save: versionIndexedStore.value.save,
                  isSync: true
                });
              }

              fluxStore.syncDataFromIndexedDB({
                data: indexedStore.value,
                save: indexedStore.value.save,
                isSync: true
              });
            }
          }
        });
      }
    };

    _objectStore.getAll().onerror = (event) => {
      const { errorCode } = event.target;
      // eslint-disable-next-line no-console
      console.log('MetadataExplorer indexedDB error on _syncDataBetweenTabs.', errorCode);
    };
  }
};

/**
 * If user open multiple tabs and update data in
 * one tab, other tabs should be updated too
 * @param  {object} store
 * @return {}
 */
dbHelper.initEventListenersBetweenTabs = (fluxibleStores) => {
  if (!dbHelper.db) {
    return;
  }

  let hidden, visibilityChange;
  if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
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

export default dbHelper;
