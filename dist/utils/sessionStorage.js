'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _apiUtils = require('./apiUtils');

var _apiUtils2 = _interopRequireDefault(_apiUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeStorage {
    initialize() {
        this.store = {};
        this.length = 0;
    }

    clear() {}

    getItem() {
        return null;
    }

    removeItem() {}

    setItem() {}
}

var baseStorage = {};
var store = {};
var stringify = JSON.stringify;
var parse = JSON.parse;

if (_env2.default.is_client) {
    baseStorage = window.Storage;
    store = window.sessionStorage;
} else {
    baseStorage = FakeStorage;
    store = new FakeStorage();
}

baseStorage.prototype.set = function (key, value, expired) {
    var wrapped = {
        _data: value
    };
    if (expired) {
        wrapped.expired = new Date().addMinutes(expired).getTime();
    }
    // when sessionStorage is full, clear it.
    try {
        //this.setItem(this.namespace + '_' + key, stringify(wrapped));
    } catch (e) {
        if (e.name == 'QuotaExceededError') {
            //console.log('QuotaExceededError!');
            this.clear();
            this.setItem(this.namespace + '_' + key, stringify(wrapped));
        }
    }
};

baseStorage.prototype.get = function (key) {
    var string = this.getItem(this.namespace + '_' + key);
    var wrapped = parse(string);
    var result = null;
    if (wrapped) {
        if (this._expired(wrapped)) {
            // remove expired item
            this.removeItem(this.namespace + '_' + key);
        } else {
            result = wrapped._data;
        }
    }
    return result;
};

baseStorage.prototype._expired = function (wrapped) {
    var currentTime = new Date().getTime();

    if (wrapped.expired) {
        if (currentTime > wrapped.expired) {
            return true;
        }
    }
    return false;
};

baseStorage.prototype.getSaveKey = function (endpoint, payload) {
    var saveKey = endpoint;
    var params = (0, _apiUtils.shrinkQuery)(endpoint, payload);
    if (params) {
        Object.keys(params).forEach(key => {
            saveKey += '_' + key + '_' + encodeURIComponent(payload[key]);
        });
    }
    return saveKey;
};

baseStorage.prototype.retrieve = function (endpoint, payload, success, fail) {
    var self = this;
    var saveKey = this.getSaveKey(endpoint, payload);
    var data = this.get(saveKey);
    var expired = _apiUtils2.default[endpoint.toLowerCase()].save.expired;

    var saveOpts = {
        key: saveKey,
        expired: expired
    };
    if (data) {
        success(null, data, saveOpts);
    } else {
        fail(function (res) {
            self.set(saveKey, res, expired);
        }, saveOpts);
    }
};

baseStorage.prototype.setNamespace = function (namespace) {
    baseStorage.prototype.namespace = namespace;
};

exports.default = store;
module.exports = exports['default'];
