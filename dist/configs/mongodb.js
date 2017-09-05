'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

require('colors');

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

var _seed = require('./seed');

var _seed2 = _interopRequireDefault(_seed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { mongo: mongo } = _configs2.default;

const insertDefaultData = (url, db) => {
  if (url === mongo.sweeter.url) {
    db.collection('users').insert(_seed2.default.user, err => {
      _assert2.default.equal(null, err);
      db.close();
    });

    db.collection('blogs').insert(_seed2.default.blogs, err => {
      _assert2.default.equal(null, err);
      db.close();
    });
  } else {
    db.collection('test').insert({ 'test': 'test' }, err => {
      _assert2.default.equal(null, err);
      db.close();
    });
  }

  console.log(`${'==>'.green} Finish insert default data... `);
};

const connectMongodbPromise = url => new Promise((resolve, reject) => {
  _mongodb2.default.connect(url, (connectErr, db) => {
    if (connectErr) {
      return reject('Database connectErr, please check your database');
    }

    db.listCollections().toArray((err, items) => {
      if (items.length == 0) {
        console.log(`${'==>'.gray} Database unavaliable: ${url}`);
        insertDefaultData(url, db);
      } else {
        console.log(`${'==>'.green} Database avaliable: ${url.cyan}`);
      }

      db.close();
      resolve();
    });
  });
});

exports.default = () => {
  const mongodbPromises = [];
  mongodbPromises.push(connectMongodbPromise(mongo.sweeter.url), connectMongodbPromise(mongo.session.url));

  console.log(`${'==>'.green} Start to check database......`);

  return mongodbPromises;
};

module.exports = exports['default'];
