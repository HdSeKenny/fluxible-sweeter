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
    _mongodb2.default.connect(MongoUrl, function (dbErr, db) {
      var Blog = db.collection('blogs');
      var User = db.collection('users');
      var Comment = db.collection('comments');
      Blog.find().toArray(function (blogErr, blogs) {
        var allPromises = [];
        blogs.forEach(function (blog) {
          if (blog.comments.length > 0) {
            blog.comments.forEach(function (commentId, cIndex) {
              allPromises.push(getCommentPromiseWrapper(blog, commentId, cIndex));
            });
          }
          allPromises.push(getUserPromiseWrapper(blog));
        });
        Promise.all(allPromises.map(function (ap) {
          return ap();
        })).then(function () {
          callback(null, blogs);
        }).catch(function (err) {
          callback(err, null);
        });
      });

      var getCommentPromise = function getCommentPromise(blog, commentId, cIndex) {
        return new Promise(function (resolve, reject) {
          Comment.findOne({ _id: ObjectID(commentId) }, function (err, comment) {
            if (err) {
              return reject(err);
            } else {
              blog.comments[cIndex] = comment;
            }
            db.close();
            resolve();
          });
        });
      };

      var getUserPromise = function getUserPromise(blog) {
        return new Promise(function (resolve, reject) {
          User.findOne({ _id: ObjectID(blog.author) }, function (err, user) {
            if (err) {
              return reject(err);
            } else {
              blog.author = user;
            }
            db.close();
            resolve();
          });
        });
      };

      var getCommentPromiseWrapper = function getCommentPromiseWrapper(blog, commentId, cIndex) {
        return function () {
          return getCommentPromise(blog, commentId, cIndex);
        };
      };

      var getUserPromiseWrapper = function getUserPromiseWrapper(blog) {
        return function () {
          return getUserPromise(blog);
        };
      };
    });
  },
  addBlog: function addBlog(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Blog = db.collection('blogs');
      var User = db.collection('users');
      body.author = ObjectID(body.author);
      body.show_comments = false;
      body.likers = [];
      body.comments = [];
      body.images = ['/styles/images/sliders/great-frontend.png'];
      body.tag = body.tag || body.type;
      Blog.insert(body, function (err, result) {
        if (result) {
          var blog = result.ops[0];
          blog.id_str = blog._id.toString();
          Blog.save(blog);
          User.findOne({ '_id': blog.author }, function (err, user) {
            if (user) {
              blog.author = user;
              user.blogs.push(blog.id_str);
              User.save(user);
            }
            db.close();
            callback(err, blog);
          });
        } else {
          callback(err, null);
        }
      });
    });
  },
  thumbsUpBlog: function thumbsUpBlog(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Blog = db.collection('blogs');
      Blog.findOne({ _id: ObjectID(body.blogId) }, function (err, blog) {
        if (err) {
          console.log('***** Find blog err: ' + err);
        }
        if (blog) {
          blog.likers.push(body.currentUserId);
          Blog.save(blog, function (err, result) {
            Blog.findOne({ _id: blog._id }, function (err, newBlog) {
              db.close();
              callback(err, newBlog);
            });
          });
        }
      });
    });
  },
  cancelThumbsUpBlog: function cancelThumbsUpBlog(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Blog = db.collection('blogs');
      Blog.findOne({ _id: ObjectID(body.blogId) }, function (err, blog) {
        if (err) {
          console.log('***** Find blog err: ' + err);
        }
        if (blog) {
          blog.likers = blog.likers.filter(function (liker) {
            return liker !== body.currentUserId;
          });
          Blog.save(blog, function (err, result) {
            Blog.findOne({ _id: blog._id }, function (err, newBlog) {
              callback(err, newBlog);
            });
          });
        }
      });
    });
  },
  delete: function _delete(req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Blog = db.collection('blogs');
      var User = db.collection('users');
      Blog.remove({ _id: ObjectID(params._id) }, function (err, result) {
        User.findOne({ _id: ObjectID(params.author._id) }, function (err, user) {
          if (user) {
            user.blogs = user.blogs.filter(function (blog) {
              return blog !== params._id;
            });
            User.save(user, function (err, result) {
              db.close();
              callback(err, { deletedBlogId: params._id, result: result });
            });
          } else {
            db.close();
            callback(err, { deletedBlogId: params._id, result: result });
          }
        });
      });
    });
  },
  update: function update(req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, function (err, db) {
      var Blog = db.collection('blogs');
      var User = db.collection('users');
      if (body._id) {
        body._id = ObjectID(body._id);
        Blog.updateOne({ '_id': body._id }, { $set: body }, function (err, result) {
          Blog.findOne({ '_id': body._id }, function (err, newBlog) {
            User.findOne({ '_id': ObjectID(newBlog.author) }, function (err, author) {
              if (author) {
                newBlog.author = author;
              }
              db.close();
              callback(err, newBlog);
            });
          });
        });
      }
    });
  }
};
module.exports = exports['default'];