'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _configs = require('../../configs');

var _configs2 = _interopRequireDefault(_configs);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable all, no-param-reassign, no-shadow, camelcase */
var ObjectID = _mongodb2.default.ObjectID;
var MongoUrl = _configs2.default.mongo.sweeter.url;

exports.default = {

  name: 'users',

  loadUsers: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, resource, params, config, callback) {
      var _db, User, Blog, allUsers, allBlogs, _loop, i;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _db = void 0;
              _context.prev = 1;
              _context.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              _db = _context.sent;
              User = _db.collection('users');
              Blog = _db.collection('blogs');
              _context.next = 9;
              return User.find().toArray();

            case 9:
              allUsers = _context.sent;
              _context.next = 12;
              return Blog.find().toArray();

            case 12:
              allBlogs = _context.sent;

              _loop = function _loop(i) {
                var _user = allUsers[i];
                var _userBlogs = _user.blogs;
                var _userFans = _user.fans;
                var _userFocuses = _user.focuses;

                if (_userBlogs.length) {
                  var _loop2 = function _loop2(bIdx) {
                    _userBlogs[bIdx] = allBlogs.find(function (b) {
                      return b.id_str === _userBlogs[bIdx];
                    });
                  };

                  for (var bIdx = 0; bIdx < _userBlogs.length; bIdx++) {
                    _loop2(bIdx);
                  }
                }

                if (_userFans.length) {
                  var _loop3 = function _loop3(faIdx) {
                    _userFans[faIdx] = allUsers.find(function (u) {
                      return u.id_str === _userFans[faIdx];
                    });
                  };

                  for (var faIdx = 0; faIdx < _userFans.length; faIdx++) {
                    _loop3(faIdx);
                  }
                }

                if (_userFocuses.length) {
                  var _loop4 = function _loop4(foIdx) {
                    _userFocuses[foIdx] = allUsers.find(function (u) {
                      return u.id_str === _userFocuses[foIdx];
                    });
                  };

                  for (var foIdx = 0; foIdx < _userFocuses.length; foIdx++) {
                    _loop4(foIdx);
                  }
                }
              };

              for (i = 0; i < allUsers.length; i++) {
                _loop(i);
              }

              _db.close();
              callback(null, allUsers);
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](1);

              if (_db) _db.close();
              callback(_context.t0, null);

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 19]]);
    }));

    return function loadUsers(_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }(),

  loadKennyUser: function loadKennyUser(req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl).then(function (db) {
      return db.collection('users').findOne({ _id: ObjectID('583ff3d6a193d70f6946948e') }).then(function (kenny) {
        db.close();
        callback(null, kenny);
      });
    }).catch(function (err) {
      callback(err, null);
    });
  },


  register: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, resource, params, body, config, callback) {
      var _db, User, exitUser, newBody, insertResult, insertedUser;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _db = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              _db = _context2.sent;
              User = _db.collection('users');
              _context2.next = 8;
              return User.findOne({ email: body.email });

            case 8:
              exitUser = _context2.sent;

              if (!exitUser) {
                _context2.next = 14;
                break;
              }

              _db.close();
              callback(null, { user: null, msg: 'This email is already in use !', stat: false });
              _context2.next = 26;
              break;

            case 14:
              newBody = _controller2.default.setDefaultUserParams(body);
              _context2.next = 17;
              return User.insert(newBody);

            case 17:
              insertResult = _context2.sent;
              insertedUser = insertResult.ops[0];

              insertedUser.id_str = insertedUser._id.toString();
              _context2.next = 22;
              return User.save(insertedUser);

            case 22:

              req.session.userId = insertedUser._id;
              req.session.authenticated = true;

              _db.close();
              callback(null, { user: insertedUser, stat: true, msg: 'Create account success !' });

            case 26:
              _context2.next = 32;
              break;

            case 28:
              _context2.prev = 28;
              _context2.t0 = _context2['catch'](1);

              if (_db) _db.close();
              callback(_context2.t0, null);

            case 32:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[1, 28]]);
    }));

    return function register(_x6, _x7, _x8, _x9, _x10, _x11) {
      return _ref2.apply(this, arguments);
    };
  }(),

  login: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, resource, params, body, config, callback) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _mongodb2.default.connect(MongoUrl).then(function (db) {
                var User = db.collection('users');
                var ecryptedPassword = (0, _md2.default)(body.password);
                return User.findOne({ email: body.email }).then(function (user) {
                  var auth = { msg: '', stat: false };
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
                  req.session.authenticated = auth.stat;

                  db.close();
                  callback(null, { user: user, auth: auth });
                });
              }).catch(function (err) {
                callback(err, { msg: '', stat: false });
              });

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function login(_x12, _x13, _x14, _x15, _x16, _x17) {
      return _ref3.apply(this, arguments);
    };
  }(),

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
    _mongodb2.default.connect(MongoUrl).then(function (db) {
      var User = db.collection('users');
      User.findOne({ email: body.email }).then(function (user) {
        if (user) {
          db.close();
          callback(null, user.image_url);
        } else {
          db.close();
          callback(null, null);
        }
      });
    }).catch(function (err) {
      callback(err, null);
    });
  },


  readCurrentUser: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, resource, params, config, callback) {
      var _db, User, Blog, allUsers, allBlogs, auth, sessionUser;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _db = void 0;
              _context4.prev = 1;
              _context4.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              _db = _context4.sent;
              User = _db.collection('users');
              Blog = _db.collection('blogs');
              _context4.next = 9;
              return User.find().toArray();

            case 9:
              allUsers = _context4.sent;
              _context4.next = 12;
              return Blog.find().toArray();

            case 12:
              allBlogs = _context4.sent;
              auth = { stat: false, msg: '' };
              _context4.next = 16;
              return User.findOne({ _id: ObjectID(req.session.userId) });

            case 16:
              sessionUser = _context4.sent;

              if (!sessionUser) {
                req.session.userId = null;
                req.session.authenticated = false;
                auth.msg = 'Authenticated fail !';
                sessionUser = null;
              } else {
                (function () {
                  auth.stat = true;
                  auth.msg = 'Authenticated success !';
                  var _userBlogs = sessionUser.blogs;
                  var _userFans = sessionUser.fans;
                  var _userFocuses = sessionUser.focuses;

                  if (_userBlogs.length) {
                    var _loop5 = function _loop5(bIdx) {
                      _userBlogs[bIdx] = allBlogs.find(function (b) {
                        return b.id_str === _userBlogs[bIdx];
                      });
                    };

                    for (var bIdx = 0; bIdx < _userBlogs.length; bIdx++) {
                      _loop5(bIdx);
                    }
                  }

                  if (_userFans.length) {
                    var _loop6 = function _loop6(faIdx) {
                      _userFans[faIdx] = allUsers.find(function (u) {
                        return u.id_str === _userFans[faIdx];
                      });
                    };

                    for (var faIdx = 0; faIdx < _userFans.length; faIdx++) {
                      _loop6(faIdx);
                    }
                  }

                  if (_userFocuses.length) {
                    var _loop7 = function _loop7(foIdx) {
                      _userFocuses[foIdx] = allUsers.find(function (u) {
                        return u.id_str === _userFocuses[foIdx];
                      });
                    };

                    for (var foIdx = 0; foIdx < _userFocuses.length; foIdx++) {
                      _loop7(foIdx);
                    }
                  }
                })();
              }

              _db.close();
              callback(null, { user: sessionUser, auth: auth });
              _context4.next = 26;
              break;

            case 22:
              _context4.prev = 22;
              _context4.t0 = _context4['catch'](1);

              if (_db) _db.close();
              callback(_context4.t0, { user: null, auth: { stat: false, msg: '' } });

            case 26:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 22]]);
    }));

    return function readCurrentUser(_x18, _x19, _x20, _x21, _x22) {
      return _ref4.apply(this, arguments);
    };
  }(),

  updateUserInfo: function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, resource, params, body, config, callback) {
      var _db;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _db = void 0;
              _context6.prev = 1;
              return _context6.delegateYield( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
                var User, allUsers, currentUser, bodyKeys, newUser, _userFans, _userFocuses, _loop8, faIdx, _loop9, foIdx;

                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _mongodb2.default.connect(MongoUrl);

                      case 2:
                        _db = _context5.sent;
                        User = _db.collection('users');
                        _context5.next = 6;
                        return User.find().toArray();

                      case 6:
                        allUsers = _context5.sent;
                        _context5.next = 9;
                        return User.findOne({ _id: ObjectID(body._id) });

                      case 9:
                        currentUser = _context5.sent;
                        bodyKeys = (0, _keys2.default)(body);

                        bodyKeys.forEach(function (key) {
                          currentUser[key] = body[key];
                        });
                        _context5.next = 14;
                        return User.save(currentUser);

                      case 14:
                        _context5.next = 16;
                        return User.findOne({ _id: ObjectID(body._id) });

                      case 16:
                        newUser = _context5.sent;
                        _userFans = newUser.fans;
                        _userFocuses = newUser.focuses;


                        if (_userFans.length) {
                          _loop8 = function _loop8(faIdx) {
                            _userFans[faIdx] = allUsers.find(function (u) {
                              return u.id_str === _userFans[faIdx];
                            });
                          };

                          for (faIdx = 0; faIdx < _userFans.length; faIdx++) {
                            _loop8(faIdx);
                          }
                        }

                        if (_userFocuses.length) {
                          _loop9 = function _loop9(foIdx) {
                            _userFocuses[foIdx] = allUsers.find(function (u) {
                              return u.id_str === _userFocuses[foIdx];
                            });
                          };

                          for (foIdx = 0; foIdx < _userFocuses.length; foIdx++) {
                            _loop9(foIdx);
                          }
                        }

                        _db.close();
                        callback(null, newUser);

                      case 23:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              })(), 't0', 3);

            case 3:
              _context6.next = 9;
              break;

            case 5:
              _context6.prev = 5;
              _context6.t1 = _context6['catch'](1);

              if (_db) _db.close();
              callback(_context6.t1, null);

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[1, 5]]);
    }));

    return function updateUserInfo(_x23, _x24, _x25, _x26, _x27, _x28) {
      return _ref5.apply(this, arguments);
    };
  }(),

  changeUserPassword: function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, resource, params, body, config, callback) {
      var _db, User, currentUser;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _db = void 0;
              _context7.prev = 1;
              _context7.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              _db = _context7.sent;
              User = _db.collection('users');
              _context7.next = 8;
              return User.findOne({ _id: ObjectID(body.userId) });

            case 8:
              currentUser = _context7.sent;

              if (!((0, _md2.default)(body.oldPassword) !== currentUser.password)) {
                _context7.next = 13;
                break;
              }

              callback(null, { stat: false, msg: 'Incorrect password !' });
              _context7.next = 20;
              break;

            case 13:
              currentUser.password = (0, _md2.default)(body.newPassword);
              _context7.next = 16;
              return User.save(currentUser);

            case 16:
              _context7.next = 18;
              return req.session.regenerate();

            case 18:

              _db.close();
              callback(null, { stat: true, msg: 'Change password successfully please login again!' });

            case 20:
              _context7.next = 26;
              break;

            case 22:
              _context7.prev = 22;
              _context7.t0 = _context7['catch'](1);

              if (_db) _db.close();
              callback(_context7.t0, null);

            case 26:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[1, 22]]);
    }));

    return function changeUserPassword(_x29, _x30, _x31, _x32, _x33, _x34) {
      return _ref6.apply(this, arguments);
    };
  }(),

  followThisUser: function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, resource, params, body, config, callback) {
      var _db, User, thisUser, currentUser;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _db = void 0;
              _context8.prev = 1;
              _context8.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              _db = _context8.sent;
              User = _db.collection('users');
              _context8.next = 8;
              return User.findOne({ _id: ObjectID(body.thisUserId) });

            case 8:
              thisUser = _context8.sent;

              thisUser.fans.push(body.currentUserId);
              _context8.next = 12;
              return User.save(thisUser);

            case 12:
              _context8.next = 14;
              return User.findOne({ _id: ObjectID(body.currentUserId) });

            case 14:
              currentUser = _context8.sent;

              currentUser.focuses.push(body.thisUserId);
              if (!currentUser.focuses_list) {
                currentUser.focuses_list = {
                  no_groups: [],
                  friends: [],
                  special_focuses: []
                };
              }
              currentUser.focuses_list.no_groups.push(body.thisUserId);
              _context8.next = 20;
              return User.save(currentUser);

            case 20:

              _db.close();
              callback(null, { thisUser: thisUser, currentUser: currentUser });
              _context8.next = 28;
              break;

            case 24:
              _context8.prev = 24;
              _context8.t0 = _context8['catch'](1);

              if (_db) _db.close();
              callback(_context8.t0, null);

            case 28:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[1, 24]]);
    }));

    return function followThisUser(_x35, _x36, _x37, _x38, _x39, _x40) {
      return _ref7.apply(this, arguments);
    };
  }(),

  cancelFollowThisUser: function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, resource, params, body, config, callback) {
      var _db, User, thisUser, faIdx, currentUser, foIdx, _currentUser$focuses_, no_groups, friends, special_focuses, new_no_groups, new_friends, new_special_focuses;

      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _db = void 0;
              _context9.prev = 1;
              _context9.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              _db = _context9.sent;
              User = _db.collection('users');
              _context9.next = 8;
              return User.findOne({ _id: ObjectID(body.thisUserId) });

            case 8:
              thisUser = _context9.sent;
              faIdx = thisUser.fans.findIndex(function (fan) {
                return fan === body.currentUserId;
              });

              thisUser.fans.splice(faIdx, 1);
              _context9.next = 13;
              return User.save(thisUser);

            case 13:
              _context9.next = 15;
              return User.findOne({ _id: ObjectID(body.currentUserId) });

            case 15:
              currentUser = _context9.sent;
              foIdx = currentUser.focuses.findIndex(function (fo) {
                return fo === body.thisUserId;
              });

              currentUser.focuses.splice(foIdx, 1);

              _currentUser$focuses_ = currentUser.focuses_list, no_groups = _currentUser$focuses_.no_groups, friends = _currentUser$focuses_.friends, special_focuses = _currentUser$focuses_.special_focuses;
              new_no_groups = no_groups.filter(function (id_str) {
                return id_str !== body.thisUserId;
              });
              new_friends = friends.filter(function (id_str) {
                return id_str !== body.thisUserId;
              });
              new_special_focuses = special_focuses.filter(function (id_str) {
                return id_str !== body.thisUserId;
              });


              currentUser.focuses_list = {
                no_groups: new_no_groups,
                friends: new_friends,
                special_focuses: new_special_focuses
              };
              _context9.next = 25;
              return User.save(currentUser);

            case 25:

              _db.close();
              callback(null, { thisUser: thisUser, currentUser: currentUser });
              _context9.next = 33;
              break;

            case 29:
              _context9.prev = 29;
              _context9.t0 = _context9['catch'](1);

              if (_db) _db.close();
              callback(_context9.t0, null);

            case 33:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[1, 29]]);
    }));

    return function cancelFollowThisUser(_x41, _x42, _x43, _x44, _x45, _x46) {
      return _ref8.apply(this, arguments);
    };
  }(),

  addMessageConnection: function () {
    var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, resource, params, body, config, callback) {
      var _db, User, currentUser, recentConnections, connectionIndex, connection;

      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _db = void 0;
              _context10.prev = 1;
              _context10.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              _db = _context10.sent;
              User = _db.collection('users');
              _context10.next = 8;
              return User.findOne({ _id: ObjectID(body.myId) });

            case 8:
              currentUser = _context10.sent;

              if (!currentUser.recent_chat_connections) {
                currentUser.recent_chat_connections = [];
              }

              recentConnections = currentUser.recent_chat_connections;
              connectionIndex = recentConnections.findIndex(function (c) {
                return c.this_user_id === body.thisUserId;
              });
              connection = void 0;

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
              _context10.next = 16;
              return User.save(currentUser);

            case 16:

              _db.close();
              callback(null, connection);
              _context10.next = 24;
              break;

            case 20:
              _context10.prev = 20;
              _context10.t0 = _context10['catch'](1);

              if (_db) _db.close();
              callback(_context10.t0, null);

            case 24:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined, [[1, 20]]);
    }));

    return function addMessageConnection(_x47, _x48, _x49, _x50, _x51, _x52) {
      return _ref9.apply(this, arguments);
    };
  }(),

  deleteMessageConnection: function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, resource, params, body, config, callback) {
      var _db, User, currentUser, connecttions;

      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _db = void 0;
              _context11.prev = 1;
              _context11.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              _db = _context11.sent;
              User = _db.collection('users');
              _context11.next = 8;
              return User.findOne({ _id: ObjectID(body.myId) });

            case 8:
              currentUser = _context11.sent;
              connecttions = currentUser.recent_chat_connections.filter(function (c) {
                return c.this_user_id !== body.thisUserId;
              });

              currentUser.recent_chat_connections = connecttions;
              _context11.next = 13;
              return User.save(currentUser);

            case 13:

              _db.close();
              callback(null, connecttions);
              _context11.next = 21;
              break;

            case 17:
              _context11.prev = 17;
              _context11.t0 = _context11['catch'](1);

              if (_db) _db.close();
              callback(_context11.t0, null);

            case 21:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined, [[1, 17]]);
    }));

    return function deleteMessageConnection(_x53, _x54, _x55, _x56, _x57, _x58) {
      return _ref10.apply(this, arguments);
    };
  }()
};
module.exports = exports['default'];