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
const ObjectID = _mongodb2.default.ObjectID;
const MongoUrl = _configs2.default.mongo.sweeter.url;

exports.default = {

  name: 'blogs',

  read: function (req, resource, params, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, config, callback);
  },
  create: function (req, resource, params, body, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, body, config, callback);
  },
  loadBlogs: function (req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, (dbErr, db) => {
      const Blog = db.collection('blogs');
      const User = db.collection('users');
      const Comment = db.collection('comments');
      Blog.find().toArray((blogErr, blogs) => {
        const allPromises = [];
        blogs.forEach(blog => {
          if (blog.comments.length > 0) {
            blog.comments.forEach((commentId, cIndex) => {
              allPromises.push(getCommentPromiseWrapper(blog, commentId, cIndex));
            });
          }
          allPromises.push(getUserPromiseWrapper(blog));
        });
        Promise.all(allPromises.map(ap => ap())).then(() => {
          callback(null, blogs);
        }).catch(err => {
          callback(err, null);
        });
      });

      const getCommentPromise = (blog, commentId, cIndex) => new Promise((resolve, reject) => {
        Comment.findOne({ _id: ObjectID(commentId) }, (err, comment) => {
          if (err) {
            return reject(err);
          } else {
            blog.comments[cIndex] = comment;
          }
          db.close();
          resolve();
        });
      });

      const getUserPromise = blog => new Promise((resolve, reject) => {
        User.findOne({ _id: ObjectID(blog.author) }, (err, user) => {
          if (err) {
            return reject(err);
          } else {
            blog.author = user;
          }
          db.close();
          resolve();
        });
      });

      const getCommentPromiseWrapper = (blog, commentId, cIndex) => {
        return () => {
          return getCommentPromise(blog, commentId, cIndex);
        };
      };

      const getUserPromiseWrapper = blog => {
        return () => {
          return getUserPromise(blog);
        };
      };
    });
  },
  addBlog: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const Blog = db.collection('blogs');
      const User = db.collection('users');
      body.author = ObjectID(body.author);
      body.show_comments = false;
      body.likers = [];
      body.comments = [];
      body.images = ['/styles/images/sliders/great-frontend.png'];
      body.tag = body.tag || body.type;
      Blog.insert(body, (err, result) => {
        if (result) {
          const blog = result.ops[0];
          blog.id_str = blog._id.toString();
          Blog.save(blog);
          User.findOne({ '_id': blog.author }, (err, user) => {
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
  thumbsUpBlog: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const Blog = db.collection('blogs');
      Blog.findOne({ _id: ObjectID(body.blogId) }, (err, blog) => {
        if (err) {
          console.log(`***** Find blog err: ${err}`);
        }
        if (blog) {
          blog.likers.push(body.currentUserId);
          Blog.save(blog, (err, result) => {
            Blog.findOne({ _id: blog._id }, (err, newBlog) => {
              db.close();
              callback(err, newBlog);
            });
          });
        }
      });
    });
  },
  cancelThumbsUpBlog: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const Blog = db.collection('blogs');
      Blog.findOne({ _id: ObjectID(body.blogId) }, (err, blog) => {
        if (err) {
          console.log(`***** Find blog err: ${err}`);
        }
        if (blog) {
          blog.likers = blog.likers.filter(liker => liker !== body.currentUserId);
          Blog.save(blog, (err, result) => {
            Blog.findOne({ _id: blog._id }, (err, newBlog) => {
              callback(err, newBlog);
            });
          });
        }
      });
    });
  },
  delete: function (req, resource, params, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const Blog = db.collection('blogs');
      const User = db.collection('users');
      Blog.remove({ _id: ObjectID(params._id) }, (err, result) => {
        User.findOne({ _id: ObjectID(params.author._id) }, (err, user) => {
          if (user) {
            user.blogs = user.blogs.filter(blog => blog !== params._id);
            User.save(user, (err, result) => {
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
  update: function (req, resource, params, body, config, callback) {
    _mongodb2.default.connect(MongoUrl, (err, db) => {
      const Blog = db.collection('blogs');
      const User = db.collection('users');
      if (body._id) {
        body._id = ObjectID(body._id);
        Blog.updateOne({ '_id': body._id }, { $set: body }, (err, result) => {
          Blog.findOne({ '_id': body._id }, (err, newBlog) => {
            User.findOne({ '_id': ObjectID(newBlog.author) }, (err, author) => {
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
