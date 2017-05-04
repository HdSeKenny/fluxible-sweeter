'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('../configs/server');

var _server2 = _interopRequireDefault(_server);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ObjectID = _mongodb2.default.ObjectID;
const MongoUrl = _server2.default.mongo.sweeter.url;

exports.default = {

  name: 'comments',

  read: function (req, resource, params, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, config, callback);
  },
  create: function (req, resource, params, body, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, body, config, callback);
  },
  delete: function (req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const Comment = db.collection('comments');
      const Blog = db.collection('blogs');
      Comment.remove({ _id: ObjectID(params._id) }, (err, result) => {
        Blog.findOne({ _id: ObjectID(params.blogId) }, (err, blog) => {
          if (blog) {
            blog.comments = blog.comments.filter(comment => comment !== params._id);
            Blog.save(blog, (err, result) => {
              db.close();
              callback(err, { deletedCommentId: params._id, blogId: blog._id, result: result });
            });
          } else {
            db.close();
            callback(err, { deletedCommentId: params._id, result: result });
          }
        });
      });
    });
  },
  loadComments: function (req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const Comment = db.collection('comments');
      const User = db.collection('users');
      Comment.find().toArray((err, comments) => {
        if (comments.length > 0) {
          comments.forEach((comment, index) => {
            User.findOne({ _id: ObjectID(comment.commenter) }, (err, user) => {
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
  addBlogComment: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const Comment = db.collection('comments');
      const Blog = db.collection('blogs');
      const User = db.collection('users');
      body.replies = [];
      body.likers = [];
      body.show_replies = false;
      Comment.insert(body, (err, result) => {
        const newComment = result.ops[0];
        newComment.strId = result.ops[0]._id.toString();
        Comment.save(newComment);
        Blog.findOne({ _id: ObjectID(newComment.blogId) }, (err, blog) => {
          blog.comments.push(newComment._id.toString());
          Blog.save(blog, (err, result) => {
            db.close();
            callback(err, newComment);
          });
        });
      });
    });
  }
};
module.exports = exports['default'];
