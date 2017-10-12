'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _configs = require('../../configs');

var _configs2 = _interopRequireDefault(_configs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable all, no-param-reassign */
var ObjectID = _mongodb2.default.ObjectID;
var MongoUrl = _configs2.default.mongo.sweeter.url;

exports.default = {

  name: 'comments',

  read: function read(req, resource, params, config, callback) {
    var endPoint = resource.replace(this.name + '.', '');
    this[endPoint](req, resource, params, config, callback);
  },
  create: function create(req, resource, params, body, config, callback) {
    var endPoint = resource.replace(this.name + '.', '');
    this[endPoint](req, resource, params, body, config, callback);
  },


  delete: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, resource, params, config, callback) {
      var _db, Comment, Blog, removeResult, thisBlog;

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
              Comment = _db.collection('comments');
              Blog = _db.collection('blogs');
              _context.next = 9;
              return Comment.remove({ _id: ObjectID(params._id) });

            case 9:
              removeResult = _context.sent;
              _context.next = 12;
              return Blog.findOne({ _id: ObjectID(params.blogId) });

            case 12:
              thisBlog = _context.sent;

              thisBlog.comments = thisBlog.comments.filter(function (comment) {
                return comment !== params._id;
              });
              _context.next = 16;
              return Blog.save(thisBlog);

            case 16:

              _db.close();
              callback(null, {
                deletedCommentId: params.id_str,
                blogId: thisBlog._id,
                result: removeResult
              });
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](1);

              if (_db) _db.close();
              callback(_context.t0, null);

            case 24:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 20]]);
    }));

    return function _delete(_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }(),

  loadComments: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, resource, params, config, callback) {
      var _db;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _db = void 0;
              _context3.prev = 1;
              return _context3.delegateYield( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var Comment, User, comments, users, _loop, i;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _mongodb2.default.connect(MongoUrl);

                      case 2:
                        _db = _context2.sent;
                        Comment = _db.collection('comments');
                        User = _db.collection('users');
                        _context2.next = 7;
                        return Comment.find().toArray();

                      case 7:
                        comments = _context2.sent;
                        _context2.next = 10;
                        return User.find().toArray();

                      case 10:
                        users = _context2.sent;

                        if (comments.length) {
                          _loop = function _loop(i) {
                            comments[i].commenter = users.find(function (u) {
                              return u.id_str === comments[i].commenter;
                            });
                          };

                          for (i = 0; i < comments.length; i++) {
                            _loop(i);
                          }
                        }

                        _db.close();
                        callback(null, comments);

                      case 14:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              })(), 't0', 3);

            case 3:
              _context3.next = 9;
              break;

            case 5:
              _context3.prev = 5;
              _context3.t1 = _context3['catch'](1);

              if (_db) _db.close();
              callback(_context3.t1, null);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[1, 5]]);
    }));

    return function loadComments(_x6, _x7, _x8, _x9, _x10) {
      return _ref2.apply(this, arguments);
    };
  }(),

  addBlogComment: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, resource, params, body, config, callback) {
      var _db, Comment, Blog, insertResult, newComment, thisBlog;

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
              Comment = _db.collection('comments');
              Blog = _db.collection('blogs');

              body.replies = [];
              body.likers = [];
              body.show_replies = false;

              _context4.next = 12;
              return Comment.insert(body);

            case 12:
              insertResult = _context4.sent;
              newComment = insertResult.ops[0];

              newComment.id_str = insertResult.ops[0]._id.toString();
              _context4.next = 17;
              return Comment.save(newComment);

            case 17:
              _context4.next = 19;
              return Blog.findOne({ _id: ObjectID(newComment.blogId) });

            case 19:
              thisBlog = _context4.sent;

              thisBlog.comments.push(newComment._id.toString());
              _context4.next = 23;
              return Blog.save(thisBlog);

            case 23:

              _db.close();
              callback(null, newComment);
              _context4.next = 31;
              break;

            case 27:
              _context4.prev = 27;
              _context4.t0 = _context4['catch'](1);

              if (_db) _db.close();
              callback(_context4.t0, null);

            case 31:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 27]]);
    }));

    return function addBlogComment(_x11, _x12, _x13, _x14, _x15, _x16) {
      return _ref3.apply(this, arguments);
    };
  }()
};
module.exports = exports['default'];