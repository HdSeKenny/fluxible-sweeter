'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _configs = require('../configs');

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectID = _mongodb2.default.ObjectID; /* eslint-disable all, no-param-reassign, no-shadow */

var MongoUrl = _configs2.default.mongo.sweeter.url;

var getFansPromise = function getFansPromise(user, fanId, faIdx) {
  return new Promise(function (resolve, reject) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID(fanId) }, function (err, fan) {
        if (err) {
          return reject(err);
        } else {
          user.fans[faIdx] = fan;
        }
        // db.close();
        resolve();
      });
    });
  });
};

var getFocusesPromise = function getFocusesPromise(user, focusId, fsIdx) {
  return new Promise(function (resolve, reject) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID(focusId) }, function (err, focus) {
        if (err) {
          return reject(err);
        } else {
          user.focuses[fsIdx] = focus;
        }
        // db.close();
        resolve();
      });
    });
  });
};

var getBlogsPromise = function getBlogsPromise(user, blogId, bgIdx) {
  return new Promise(function (resolve, reject) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Blog = db.collection('blogs');
      Blog.findOne({ _id: ObjectID(blogId) }, function (err, blog) {
        if (err) {
          return reject(err);
        } else {
          user.blogs[bgIdx] = blog;
        }
        // db.close();
        resolve();
      });
    });
  });
};

var getFansPromiseWrapper = function getFansPromiseWrapper(user, fanId, faIdx) {
  return function () {
    return getFansPromise(user, fanId, faIdx);
  };
};

var getFocusesPromiseWrapper = function getFocusesPromiseWrapper(user, focusId, fsIdx) {
  return function () {
    return getFocusesPromise(user, focusId, fsIdx);
  };
};

var getBlogsPromiseWrapper = function getBlogsPromiseWrapper(user, blogId, bgIdx) {
  return function () {
    return getBlogsPromise(user, blogId, bgIdx);
  };
};

exports.default = {

  name: 'users',

  loadUsers: function loadUsers(req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (connectErr, db) {
      var User = db.collection('users');
      User.find().toArray(function (loadUsersErr, users) {
        var allPromises = [];
        users.forEach(function (user) {
          if (user.fans.length) {
            user.fans.forEach(function (fanId, faIdx) {
              allPromises.push(getFansPromiseWrapper(user, fanId, faIdx));
            });
          }
          if (user.focuses.length) {
            user.focuses.forEach(function (focusId, fsIdx) {
              allPromises.push(getFocusesPromiseWrapper(user, focusId, fsIdx));
            });
          }
          if (user.blogs.length) {
            user.blogs.forEach(function (blogId, bgIdx) {
              allPromises.push(getBlogsPromiseWrapper(user, blogId, bgIdx));
            });
          }
        });

        Promise.all(allPromises.map(function (ap) {
          return ap();
        })).then(function () {
          callback(null, users);
        }).catch(function (loadUsersPromiseErr) {
          callback(loadUsersPromiseErr, null);
        });
      });
    });
  },
  loadKennyUser: function loadKennyUser(req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID('583ff3d6a193d70f6946948e') }, function (err, kenny) {
        callback(err, kenny);
      });
    });
  },
  register: function register(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ email: body.email }, function (err, user) {
        if (user) {
          callback(err, {
            user: null,
            msg: 'This email is already in use !',
            stat: false
          });
        } else {
          body.password = (0, _md2.default)(body.password);
          body.image_url = '/styles/images/users/default-user.svg';
          body.background_image_url = '/styles/images/users/user-center-bg.jpg';
          body.lq_background_url = '/styles/images/lqip/users/user-center-bg.jpg';
          body.fans = [];
          body.focuses = [];
          body.blogs = [];

          User.insert(body, function (err, res) {
            var insertedUser = res.ops[0];
            insertedUser.id_str = insertedUser._id.toString();
            User.save(insertedUser);
            // db.close();

            req.session.userId = insertedUser._id;
            req.session.authenticated = true;
            callback(err, {
              user: insertedUser,
              stat: true,
              msg: 'Create account success !'
            });
          });
        }
      });
    });
  },
  login: function login(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      var ecryptedPassword = (0, _md2.default)(body.password);
      User.findOne({ email: body.email }, function (err, user) {
        var auth = { msg: '', stat: false };
        if (err) {
          auth.msg = err;
        }
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
        // db.close();
        req.session.authenticated = auth.stat;
        callback(err, { user: user, auth: auth });
      });
    });
  },
  read: function read(req, resource, params, config, callback) {
    var endPoint = resource.replace(this.name + '.', '');
    this[endPoint](req, resource, params, config, callback);
  },
  create: function create(req, resource, params, body, config, callback) {
    var endPoint = resource.replace(this.name + '.', '');
    this[endPoint](req, resource, params, body, config, callback);
  },
  delete: function _delete(req, resource, params, config, callback) {
    req.session.regenerate(function (err) {
      callback(err, {
        msg: 'LOGOUT_SUCCCESS'
      });
    });
  },
  getLoginUserImage: function getLoginUserImage(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ email: body.email }, function (err, user) {
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
  readCurrentUser: function readCurrentUser(req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      var auth = { stat: false, msg: '' };
      User.findOne({ _id: ObjectID(req.session.userId) }).then(function (user) {
        var allPromises = [];
        if (!user) {
          req.session.userId = null;
          req.session.authenticated = false;
          auth.msg = 'Authenticated fail !';
          user = null;
        } else {
          auth.stat = true;
          auth.msg = 'Authenticated success !';
          if (user.fans.length) {
            user.fans.forEach(function (fanId, faIdx) {
              allPromises.push(getFansPromiseWrapper(user, fanId, faIdx));
            });
          }
          if (user.focuses.length) {
            user.focuses.forEach(function (focusId, fsIdx) {
              allPromises.push(getFocusesPromiseWrapper(user, focusId, fsIdx));
            });
          }
          if (user.blogs.length) {
            user.blogs.forEach(function (blogId, bgIdx) {
              allPromises.push(getBlogsPromiseWrapper(user, blogId, bgIdx));
            });
          }
        }
        Promise.all(allPromises.map(function (ap) {
          return ap();
        })).then(function () {
          callback(null, { user: user, auth: auth });
        }).catch(function (err) {
          callback(err, { user: null, auth: auth });
        });
      }).catch(function (err) {
        return callback(err, { user: null, auth: auth });
      });
    });
  },
  updateUserInfo: function updateUserInfo(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID(body._id) }, function (err, user) {
        var keys = Object.keys(body);
        keys.forEach(function (key) {
          user[key] = body[key];
        });
        User.save(user, function (err, result) {
          User.findOne({ '_id': ObjectID(body._id) }, function (err, newUser) {
            var allPromises = [];
            if (newUser) {
              if (newUser.fans.length) {
                newUser.fans.forEach(function (fanId, faIdx) {
                  allPromises.push(getFansPromiseWrapper(newUser, fanId, faIdx));
                });
              }
              if (newUser.focuses.length) {
                newUser.focuses.forEach(function (focusId, fsIdx) {
                  allPromises.push(getFocusesPromiseWrapper(newUser, focusId, fsIdx));
                });
              }
              Promise.all(allPromises.map(function (ap) {
                return ap();
              })).then(function () {
                callback(null, newUser);
              }).catch(function (err) {
                callback(err, null);
              });
            }
          });
        });
      });
    });
  },
  changeUserPassword: function changeUserPassword(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID(body.userId) }, function (err, user) {
        if (user) {
          if ((0, _md2.default)(body.oldPassword) !== user.password) {
            callback(err, { stat: false, msg: 'Incorrect password !' });
          } else {
            user.password = (0, _md2.default)(body.newPassword);
            User.save(user, function (err, result) {
              req.session.regenerate(function (err) {
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
  followThisUser: function followThisUser(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID(body.thisUserId) }, function (err, thisUser) {
        if (thisUser) {
          thisUser.fans.push(body.currentUserId);
          User.save(thisUser, function (err) {
            User.findOne({ _id: ObjectID(body.currentUserId) }, function (err, currentUser) {
              if (currentUser) {
                currentUser.focuses.push(body.thisUserId);
                if (!currentUser.focuses_list) {
                  currentUser.focuses_list = {
                    no_groups: [],
                    friends: [],
                    special_focuses: []
                  };
                }
                currentUser.focuses_list.no_groups.push(body.thisUserId);
                User.save(currentUser, function (err) {
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
  cancelFollowThisUser: function cancelFollowThisUser(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID(body.thisUserId) }, function (err, thisUser) {
        if (thisUser) {
          thisUser.fans.forEach(function (fan, index) {
            if (fan === body.currentUserId) {
              thisUser.fans.splice(index, 1);
            }
          });
          User.save(thisUser, function (err) {
            User.findOne({ _id: ObjectID(body.currentUserId) }, function (err, currentUser) {
              if (currentUser) {
                currentUser.focuses.forEach(function (focus, index) {
                  if (focus === body.thisUserId) {
                    currentUser.focuses.splice(index, 1);
                  }
                });
                var _currentUser$focuses_ = currentUser.focuses_list,
                    no_groups = _currentUser$focuses_.no_groups,
                    friends = _currentUser$focuses_.friends,
                    special_focuses = _currentUser$focuses_.special_focuses;

                var new_no_groups = no_groups.filter(function (id_str) {
                  return id_str !== body.thisUserId;
                });
                var new_friends = friends.filter(function (id_str) {
                  return id_str !== body.thisUserId;
                });
                var new_special_focuses = special_focuses.filter(function (id_str) {
                  return id_str !== body.thisUserId;
                });

                currentUser.focuses_list = {
                  no_groups: new_no_groups,
                  friends: new_friends,
                  special_focuses: new_special_focuses
                };

                User.save(currentUser, function (err) {
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
  addMessageConnection: function addMessageConnection(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID(body.myId) }).then(function (currentUser) {
        if (!currentUser.recent_chat_connections) {
          currentUser.recent_chat_connections = [];
        }

        var recentConnections = currentUser.recent_chat_connections;
        var connectionIndex = recentConnections.findIndex(function (c) {
          return c.this_user_id === body.thisUserId;
        });

        var connection = void 0;
        if (connectionIndex < 0) {
          connection = {
            this_user_id: body.thisUserId,
            connect_date: body.connectDate,
            messages: []
          };
          currentUser.recent_chat_connections.push(connection);
        } else {
          connection = currentUser.recent_chat_connections[connectionIndex];
        }

        User.save(currentUser).then(function () {
          callback(err, connection);
        });
      });
    });
  },
  deleteMessageConnection: function deleteMessageConnection(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var User = db.collection('users');
      User.findOne({ _id: ObjectID(body.myId) }).then(function (currentUser) {
        var connecttions = currentUser.recent_chat_connections.filter(function (c) {
          return c.this_user_id !== body.thisUserId;
        });

        currentUser.recent_chat_connections = connecttions;
        User.save(currentUser).then(function () {
          callback(err, connecttions);
        });
      });
    });
  }
};
module.exports = exports['default'];