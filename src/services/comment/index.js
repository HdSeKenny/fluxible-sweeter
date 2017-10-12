/* eslint-disable all, no-param-reassign */
import MongoClient from 'mongodb';
import serverConfig from '../../configs';

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

  delete: async (req, resource, params, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const Comment = _db.collection('comments');
      const Blog = _db.collection('blogs');

      const removeResult = await Comment.remove({ _id: ObjectID(params._id) });
      const thisBlog = await Blog.findOne({ _id: ObjectID(params.blogId) });
      thisBlog.comments = thisBlog.comments.filter(comment => comment !== params._id);
      await Blog.save(thisBlog);

      _db.close();
      callback(null, {
        deletedCommentId: params.id_str,
        blogId: thisBlog._id,
        result: removeResult
      });
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  loadComments: async (req, resource, params, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const Comment = _db.collection('comments');
      const User = _db.collection('users');
      const comments = await Comment.find().toArray();
      const users = await User.find().toArray();
      if (comments.length) {
        for (let i = 0; i < comments.length; i++) {
          comments[i].commenter = users.find(u => u.id_str === comments[i].commenter);
        }
      }

      _db.close();
      callback(null, comments);
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  addBlogComment: async (req, resource, params, body, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const Comment = _db.collection('comments');
      const Blog = _db.collection('blogs');
      body.replies = [];
      body.likers = [];
      body.show_replies = false;

      const insertResult = await Comment.insert(body);
      const newComment = insertResult.ops[0];
      newComment.id_str = insertResult.ops[0]._id.toString();
      await Comment.save(newComment);

      const thisBlog = await Blog.findOne({ _id: ObjectID(newComment.blogId) });
      thisBlog.comments.push(newComment._id.toString());
      await Blog.save(thisBlog);

      _db.close();
      callback(null, newComment);
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  }
};
