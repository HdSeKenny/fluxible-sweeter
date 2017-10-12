/* eslint-disable all, no-param-reassign */
import MongoClient from 'mongodb';
import serverConfig from '../../configs';
import controller from './controller';

const ObjectID = MongoClient.ObjectID;
const MongoUrl = serverConfig.mongo.sweeter.url;

export default {

  name: 'blogs',

  read(req, resource, params, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, config, callback);
  },

  create(req, resource, params, body, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, body, config, callback);
  },

  loadBlogs(req, resource, params, config, callback) {
    MongoClient.connect(MongoUrl)
      .then(db => {
        const BlogCollection = db.collection('blogs');
        const UserCollection = db.collection('users');
        const CommentCollection = db.collection('comments');

        return Promise.all([
          BlogCollection.find().toArray(),
          UserCollection.find().toArray(),
          CommentCollection.find().toArray()
        ]).then((data) => {
          const blogs = data[0];
          const users = data[1];
          const comments = data[2];

          for (let i = 0; i < blogs.length; i++) {
            const blog = blogs[i];
            const userId = blog.author.toString();
            const user = users.find(u => u.id_str === userId);
            blogs[i].author = user;
            if (blog.comments.length > 0) {
              for (let j = 0; j < blog.comments.length; j++) {
                const commentId = blog.comments[j];
                const comment = comments.find(c => c.id_str === commentId);
                blog.comments[j] = comment;
              }
            }
          }
          db.close();
          callback(null, blogs);
        });
      })
      .catch(err => {
        callback(err, null);
      });
  },

  addBlog: async (req, resource, params, body, config, callback) => {
    let db;
    try {
      db = await MongoClient.connect(MongoUrl);
      const BlogCollection = db.collection('blogs');
      const UserCollection = db.collection('users');

      const blog = controller.setDefaultBlog(body);
      const insertResult = await BlogCollection.insert(blog);
      const newBlog = insertResult.ops[0];
      newBlog.id_str = newBlog._id.toString();

      return Promise.all([
        BlogCollection.save(newBlog),
        UserCollection.findOne({ _id: newBlog.author })
      ]).then(async (res) => {
        const user = res[1];
        newBlog.author = user;
        user.blogs.push(newBlog.id_str);
        await UserCollection.save(user);

        db.close();
        callback(null, newBlog);
      });
    } catch (error) {
      if (db) db.close();
      callback(error, null);
    }
  },

  thumbsUpBlog: async (req, resource, params, body, config, callback) => {
    let db;
    try {
      db = await MongoClient.connect(MongoUrl);
      const BlogCollection = db.collection('blogs');
      const thisBlog = await BlogCollection.findOne({ _id: ObjectID(body.blogId) });
      thisBlog.likers.push(body.currentUserId);
      await BlogCollection.save(thisBlog);

      db.close();
      callback(null, thisBlog);
    } catch (error) {
      if (db) db.close();
      callback(error, null);
    }
  },

  cancelThumbsUpBlog: async (req, resource, params, body, config, callback) => {
    let db;
    try {
      db = await MongoClient.connect(MongoUrl);
      const BlogCollection = db.collection('blogs');
      const thisBlog = await BlogCollection.findOne({ _id: ObjectID(body.blogId) });
      thisBlog.likers = thisBlog.likers.filter(liker => liker !== body.currentUserId);
      await BlogCollection.save(thisBlog);

      db.close();
      callback(null, thisBlog);
    } catch (error) {
      if (db) db.close();
      callback(error, null);
    }
  },

  delete: async (req, resource, params, config, callback) => {
    let db;
    try {
      db = await MongoClient.connect(MongoUrl);
      const BlogCollection = db.collection('blogs');
      await BlogCollection.remove({ _id: ObjectID(params._id) });

      const UserCollection = db.collection('users');
      const blogAuthor = await UserCollection.findOne({ _id: ObjectID(params.author._id) });
      blogAuthor.blogs = blogAuthor.blogs.filter(bId => bId !== params._id);
      const saveResult = await UserCollection.save(blogAuthor);

      db.close();
      callback(null, { deletedBlogId: params._id, result: saveResult });
    } catch (error) {
      if (db) db.close();
      callback(error, null);
    }
  },

  update: async (req, resource, params, body, config, callback) => {
    let db;
    try {
      db = await MongoClient.connect(MongoUrl);
      const BlogCollection = db.collection('blogs');
      const UserCollection = db.collection('users');
      await BlogCollection.updateOne({ _id: body._id }, { $set: body });

      const newBlog = await BlogCollection.findOne({ _id: body._id });
      const author = await UserCollection.findOne({ _id: ObjectID(newBlog.author) });
      newBlog.author = author;

      db.close();
      callback(null, newBlog);
    } catch (error) {
      if (db) db.close();
      callback(error, null);
    }
  }
};
