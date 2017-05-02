'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _server = require('../configs/server');

var _server2 = _interopRequireDefault(_server);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectID = _mongodb2.default.ObjectID;
const MongoUrl = _server2.default.mongo.sweeter.url;

exports.default = {

  name: 'users',

  loadUsers: function (req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.find().toArray((err, users) => {
        const allPromises = [];
        users.forEach(user => {
          if (user.fans.length > 0) {
            user.fans.forEach((fanId, faIdx) => {
              allPromises.push(getFansPromiseWrapper(user, fanId, faIdx));
            });
          }
          if (user.focuses.length > 0) {
            user.focuses.forEach((focusId, fsIdx) => {
              allPromises.push(getFocusesPromiseWrapper(user, focusId, fsIdx));
            });
          }
        });

        Promise.all(allPromises.map(ap => ap())).then(data => {
          callback(null, users);
        }).catch(err => {
          callback(err, null);
        });
      });
    });
  },
  loadKennyUser: function (req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID('583ff3d6a193d70f6946948e') }, (err, kenny) => {
        callback(err, kenny);
      });
    });
  },
  register: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ email: body.email }, (err, user) => {
        if (user) {
          callback(err, {
            user: null,
            msg: 'This email is already in use !',
            stat: false
          });
        } else {
          body.password = (0, _md2.default)(body.password);
          body.image_url = '/images/users/default-user.png';
          body.background_image_url = '/images/users/user-center-bg.jpg';
          body.fans = [];
          body.focuses = [];
          body.blogs = [];
          User.insert(body, (err, res) => {
            let user = res.ops[0];
            user.strId = user._id.toString();
            User.save(user);
            db.close();

            req.session.userId = user._id;
            req.session.authenticated = true;
            callback(err, {
              user: user,
              stat: true,
              msg: 'Create account success !'
            });
          });
        }
      });
    });
  },
  login: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      const ecryptedPassword = (0, _md2.default)(body.password);
      User.findOne({ email: body.email }, (err, user) => {
        let auth = { msg: '', stat: false };
        if (err) {
          auth.msg = err;
        };
        if (user) {
          if (ecryptedPassword === user.password) {
            auth.msg = 'Login success !';
            auth.stat = true;
            req.session.userId = user._id;
          } else {
            auth.msg = 'The password is incorrect !';
            user = null;
          }
        } else {
          auth.msg = 'This email is not registered !';
          user = null;
        }
        db.close();
        req.session.authenticated = auth.stat;
        callback(err, { user: user, auth: auth });
      });
    });
  },
  read: function (req, resource, params, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, config, callback);
  },
  create: function (req, resource, params, body, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, body, config, callback);
  },
  delete: function (req, resource, params, config, callback) {
    req.session.regenerate(err => {
      callback(err, {
        msg: 'LOGOUT_SUCCCESS'
      });
    });
  },
  getLoginUserImage: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ email: body.email }, (err, user) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (user) {
          callback(null, user.image_url);
        } else {
          callback(null, null);
        }
      });
    });
  },
  readCurrentUser: function (req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      let auth = { stat: false, msg: '' };
      User.findOne({ _id: ObjectID(req.session.userId) }).then(user => {
        const allPromises = [];
        if (!user) {
          req.session.userId = null;
          req.session.authenticated = false;
          auth.msg = 'Authenticated fail !';
          user = null;
        } else {
          auth.stat = true;
          auth.msg = 'Authenticated success !';
          if (user.fans.length > 0) {
            user.fans.forEach((fanId, faIdx) => {
              allPromises.push(getFansPromiseWrapper(user, fanId, faIdx));
            });
          }
          if (user.focuses.length > 0) {
            user.focuses.forEach((focusId, fsIdx) => {
              allPromises.push(getFocusesPromiseWrapper(user, focusId, fsIdx));
            });
          }
        }
        Promise.all(allPromises.map(ap => ap())).then(data => {
          callback(null, { user: user, auth: auth });
        }).catch(err => {
          callback(err, { user: null, auth: auth });
        });
      }).catch(err => callback(err, { user: null, auth: auth }));
    });
  },
  updateUserInfo: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body._id) }, (err, user) => {
        const keys = Object.keys(body);
        keys.forEach(key => {
          user[key] = body[key];
        });
        User.save(user, (err, result) => {
          User.findOne({ '_id': ObjectID(body._id) }, (err, newUser) => {
            const allPromises = [];
            if (newUser) {
              if (newUser.fans.length > 0) {
                newUser.fans.forEach((fanId, faIdx) => {
                  allPromises.push(getFansPromiseWrapper(newUser, fanId, faIdx));
                });
              }
              if (newUser.focuses.length > 0) {
                newUser.focuses.forEach((focusId, fsIdx) => {
                  allPromises.push(getFocusesPromiseWrapper(newUser, focusId, fsIdx));
                });
              }
              Promise.all(allPromises.map(ap => ap())).then(data => {
                callback(null, newUser);
              }).catch(err => {
                callback(err, null);
              });
            }
          });
        });
      });
    });
  },
  changeUserPassword: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body.userId) }, (err, user) => {
        if (user) {
          if ((0, _md2.default)(body.oldPassword) !== user.password) {
            callback(err, { stat: false, msg: 'Incorrect password !' });
          } else {
            user.password = (0, _md2.default)(body.newPassword);
            User.save(user, (err, result) => {
              req.session.regenerate(err => {
                callback(err, {
                  stat: true,
                  msg: 'Change password successfully please login again!'
                });
              });
            });
          }
        }
      });
    });
  },
  followThisUser: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body.thisUserId) }, (err, thisUser) => {
        if (thisUser) {
          thisUser.fans.push(body.currentUserId);
          User.save(thisUser, (err, thisUserResult) => {
            User.findOne({ _id: ObjectID(body.currentUserId) }, (err, currentUser) => {
              if (currentUser) {
                currentUser.focuses.push(body.thisUserId);
                User.save(currentUser, (err, currentUserResult) => {
                  callback(err, { thisUser: thisUser, currentUser: currentUser });
                });
              } else {
                callback(err, null);
              }
            });
          });
        } else {
          callback(err, null);
        }
      });
    });
  },
  cancelFollowThisUser: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body.thisUserId) }, (err, thisUser) => {
        if (thisUser) {
          thisUser.fans.forEach((fan, index) => {
            if (fan === body.currentUserId) {
              thisUser.fans.splice(index, 1);
            }
          });
          User.save(thisUser, (err, thisUserResult) => {
            User.findOne({ _id: ObjectID(body.currentUserId) }, (err, currentUser) => {
              if (currentUser) {
                currentUser.focuses.forEach((focus, index) => {
                  if (focus === body.thisUserId) {
                    currentUser.focuses.splice(index, 1);
                  }
                });
                User.save(currentUser, (err, currentUserResult) => {
                  callback(err, { thisUser: thisUser, currentUser: currentUser });
                });
              } else {
                callback(err, null);
              }
            });
          });
        } else {
          callback(err, null);
        }
      });
    });
  }
};


const getFansPromise = (user, fanId, faIdx) => new Promise((resolve, reject) => {
  _mongodb2.default.connect(MongoUrl, (err, db) => {
    const User = db.collection('users');
    User.findOne({ _id: ObjectID(fanId) }, (err, fan) => {
      if (err) {
        return reject(err);
      } else {
        user.fans[faIdx] = fan;
      }
      db.close();
      resolve();
    });
  });
});

const getFocusesPromise = (user, focusId, fsIdx) => new Promise((resolve, reject) => {
  _mongodb2.default.connect(MongoUrl, (err, db) => {
    const User = db.collection('users');
    User.findOne({ _id: ObjectID(focusId) }, (err, focus) => {
      if (err) {
        return reject(err);
      } else {
        user.focuses[fsIdx] = focus;
      }
      db.close();
      resolve();
    });
  });
});

const getFansPromiseWrapper = (user, fanId, faIdx) => {
  return () => {
    return getFansPromise(user, fanId, faIdx);
  };
};

const getFocusesPromiseWrapper = (user, focusId, fsIdx) => {
  return () => {
    return getFocusesPromise(user, focusId, fsIdx);
  };
};
module.exports = exports['default'];
