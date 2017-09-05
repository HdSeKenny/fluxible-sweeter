/* eslint-disable all, no-param-reassign */
import MongoClient from 'mongodb';
import serverConfig from '../configs';

const ObjectID = MongoClient.ObjectID;
const MongoUrl = serverConfig.mongo.sweeter.url;

export default {

  name: 'comments',

  read(req, resource, params, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, config, callback);
  },

  create(req, resource, params, body, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, body, config, callback);
  },

  delete(req, resource, params, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const Comment = db.collection('comments');
      const Blog = db.collection('blogs');
      Comment.remove({ _id: ObjectID(params._id) }, (err, result) => {
        Blog.findOne({ _id: ObjectID(params.blogId) }, (err, blog) => {
          if (blog) {
            blog.comments = blog.comments.filter(comment => comment !== params._id);
            Blog.save(blog, (err, result) => {
              db.close();
              callback(err, { deletedCommentId: params.id_str, blogId: blog._id, result });
            });
          }
          else {
            db.close();
            callback(err, { deletedCommentId: params.id_str, result });
          }
        });
      });
    });
  },

  loadComments(req, resource, params, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
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

  addBlogComment(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const Comment = db.collection('comments');
      const Blog = db.collection('blogs');
      const User = db.collection('users');
      body.replies = [];
      body.likers = [];
      body.show_replies = false;
      Comment.insert(body, (err, result) => {
        const newComment = result.ops[0];
        newComment.id_str = result.ops[0]._id.toString();
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
  },
};
