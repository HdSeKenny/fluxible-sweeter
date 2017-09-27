'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _configs = require('../configs');

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
  delete: function _delete(req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Comment = db.collection('comments');
      var Blog = db.collection('blogs');
      Comment.remove({ _id: ObjectID(params._id) }, function (err, result) {
        Blog.findOne({ _id: ObjectID(params.blogId) }, function (err, blog) {
          if (blog) {
            blog.comments = blog.comments.filter(function (comment) {
              return comment !== params._id;
            });
            Blog.save(blog, function (err, result) {
              db.close();
              callback(err, { deletedCommentId: params.id_str, blogId: blog._id, result: result });
            });
          } else {
            db.close();
            callback(err, { deletedCommentId: params.id_str, result: result });
          }
        });
      });
    });
  },
  loadComments: function loadComments(req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Comment = db.collection('comments');
      var User = db.collection('users');
      Comment.find().toArray(function (err, comments) {
        if (comments.length > 0) {
          comments.forEach(function (comment, index) {
            User.findOne({ _id: ObjectID(comment.commenter) }, function (err, user) {
              comment.commenter = user;
              if (index === comments.length - 1) {
                db.close();
                callback(err, comments);
              }
            });
          });
        } else {
          db.close();
          callback(err, comments);
        }
      });
    });
  },
  addBlogComment: function addBlogComment(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Comment = db.collection('comments');
      var Blog = db.collection('blogs');
      var User = db.collection('users');
      body.replies = [];
      body.likers = [];
      body.show_replies = false;
      Comment.insert(body, function (err, result) {
        var newComment = result.ops[0];
        newComment.id_str = result.ops[0]._id.toString();
        Comment.save(newComment);
        Blog.findOne({ _id: ObjectID(newComment.blogId) }, function (err, blog) {
          blog.comments.push(newComment._id.toString());
          Blog.save(blog, function (err, result) {
            db.close();
            callback(err, newComment);
          });
        });
      });
    });
  }
};
module.exports = exports['default'];