'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _configs = require('../../configs');

var _configs2 = _interopRequireDefault(_configs);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectID = _mongodb2.default.ObjectID; /* eslint-disable all, no-param-reassign */

var MongoUrl = _configs2.default.mongo.sweeter.url;

exports.default = {

  name: 'blogs',

  read: function read(req, resource, params, config, callback) {
    var endPoint = resource.replace(this.name + '.', '');
    this[endPoint](req, resource, params, config, callback);
  },
  create: function create(req, resource, params, body, config, callback) {
    var endPoint = resource.replace(this.name + '.', '');
    this[endPoint](req, resource, params, body, config, callback);
  },
  loadBlogs: function loadBlogs(req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl).then(function (db) {
      var BlogCollection = db.collection('blogs');
      var UserCollection = db.collection('users');
      var CommentCollection = db.collection('comments');

      return _promise2.default.all([BlogCollection.find().toArray(), UserCollection.find().toArray(), CommentCollection.find().toArray()]).then(function (data) {
        var blogs = data[0];
        var users = data[1];
        var comments = data[2];

        var _loop = function _loop(i) {
          var blog = blogs[i];
          var userId = blog.author.toString();
          var user = users.find(function (u) {
            return u.id_str === userId;
          });
          blogs[i].author = user;
          if (blog.comments.length > 0) {
            var _loop2 = function _loop2(j) {
              var commentId = blog.comments[j];
              var comment = comments.find(function (c) {
                return c.id_str === commentId;
              });
              blog.comments[j] = comment;
            };

            for (var j = 0; j < blog.comments.length; j++) {
              _loop2(j);
            }
          }
        };

        for (var i = 0; i < blogs.length; i++) {
          _loop(i);
        }
        db.close();
        callback(null, blogs);
      });
    }).catch(function (err) {
      callback(err, null);
    });
  },


  addBlog: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, resource, params, body, config, callback) {
      var db, BlogCollection, UserCollection, _blog, insertResult, newBlog;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              db = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              db = _context2.sent;
              BlogCollection = db.collection('blogs');
              UserCollection = db.collection('users');
              _blog = _controller2.default.setDefaultBlog(body);
              _context2.next = 10;
              return BlogCollection.insert(_blog);

            case 10:
              insertResult = _context2.sent;
              newBlog = insertResult.ops[0];

              newBlog.id_str = newBlog._id.toString();

              return _context2.abrupt('return', _promise2.default.all([BlogCollection.save(newBlog), UserCollection.findOne({ _id: newBlog.author })]).then(function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(res) {
                  var user;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          user = res[1];

                          newBlog.author = user;
                          user.blogs.push(newBlog.id_str);
                          _context.next = 5;
                          return UserCollection.save(user);

                        case 5:

                          db.close();
                          callback(null, newBlog);

                        case 7:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x7) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2['catch'](1);

              if (db) db.close();
              callback(_context2.t0, null);

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[1, 16]]);
    }));

    return function addBlog(_x, _x2, _x3, _x4, _x5, _x6) {
      return _ref.apply(this, arguments);
    };
  }(),

  thumbsUpBlog: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, resource, params, body, config, callback) {
      var db, BlogCollection, thisBlog;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              db = void 0;
              _context3.prev = 1;
              _context3.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              db = _context3.sent;
              BlogCollection = db.collection('blogs');
              _context3.next = 8;
              return BlogCollection.findOne({ _id: ObjectID(body.blogId) });

            case 8:
              thisBlog = _context3.sent;

              thisBlog.likers.push(body.currentUserId);
              _context3.next = 12;
              return BlogCollection.save(thisBlog);

            case 12:

              db.close();
              callback(null, thisBlog);
              _context3.next = 20;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3['catch'](1);

              if (db) db.close();
              callback(_context3.t0, null);

            case 20:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[1, 16]]);
    }));

    return function thumbsUpBlog(_x8, _x9, _x10, _x11, _x12, _x13) {
      return _ref3.apply(this, arguments);
    };
  }(),

  cancelThumbsUpBlog: function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, resource, params, body, config, callback) {
      var db, BlogCollection, thisBlog;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              db = void 0;
              _context4.prev = 1;
              _context4.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              db = _context4.sent;
              BlogCollection = db.collection('blogs');
              _context4.next = 8;
              return BlogCollection.findOne({ _id: ObjectID(body.blogId) });

            case 8:
              thisBlog = _context4.sent;

              thisBlog.likers = thisBlog.likers.filter(function (liker) {
                return liker !== body.currentUserId;
              });
              _context4.next = 12;
              return BlogCollection.save(thisBlog);

            case 12:

              db.close();
              callback(null, thisBlog);
              _context4.next = 20;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4['catch'](1);

              if (db) db.close();
              callback(_context4.t0, null);

            case 20:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 16]]);
    }));

    return function cancelThumbsUpBlog(_x14, _x15, _x16, _x17, _x18, _x19) {
      return _ref4.apply(this, arguments);
    };
  }(),

  delete: function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, resource, params, config, callback) {
      var db, BlogCollection, UserCollection, blogAuthor, saveResult;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              db = void 0;
              _context5.prev = 1;
              _context5.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              db = _context5.sent;
              BlogCollection = db.collection('blogs');
              _context5.next = 8;
              return BlogCollection.remove({ _id: ObjectID(params._id) });

            case 8:
              UserCollection = db.collection('users');
              _context5.next = 11;
              return UserCollection.findOne({ _id: ObjectID(params.author._id) });

            case 11:
              blogAuthor = _context5.sent;

              blogAuthor.blogs = blogAuthor.blogs.filter(function (bId) {
                return bId !== params._id;
              });
              _context5.next = 15;
              return UserCollection.save(blogAuthor);

            case 15:
              saveResult = _context5.sent;


              db.close();
              callback(null, { deletedBlogId: params._id, result: saveResult });
              _context5.next = 24;
              break;

            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5['catch'](1);

              if (db) db.close();
              callback(_context5.t0, null);

            case 24:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[1, 20]]);
    }));

    return function _delete(_x20, _x21, _x22, _x23, _x24) {
      return _ref5.apply(this, arguments);
    };
  }(),

  update: function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, resource, params, body, config, callback) {
      var db, BlogCollection, UserCollection, newBlog, author;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              db = void 0;
              _context6.prev = 1;
              _context6.next = 4;
              return _mongodb2.default.connect(MongoUrl);

            case 4:
              db = _context6.sent;
              BlogCollection = db.collection('blogs');
              UserCollection = db.collection('users');
              _context6.next = 9;
              return BlogCollection.updateOne({ _id: body._id }, { $set: body });

            case 9:
              _context6.next = 11;
              return BlogCollection.findOne({ _id: body._id });

            case 11:
              newBlog = _context6.sent;
              _context6.next = 14;
              return UserCollection.findOne({ _id: ObjectID(newBlog.author) });

            case 14:
              author = _context6.sent;

              newBlog.author = author;

              db.close();
              callback(null, newBlog);
              _context6.next = 24;
              break;

            case 20:
              _context6.prev = 20;
              _context6.t0 = _context6['catch'](1);

              if (db) db.close();
              callback(_context6.t0, null);

            case 24:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[1, 20]]);
    }));

    return function update(_x25, _x26, _x27, _x28, _x29, _x30) {
      return _ref6.apply(this, arguments);
    };
  }()
};
module.exports = exports['default'];