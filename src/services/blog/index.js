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

        Promise.all([
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
        })
        .catch(err => {
          db.close();
          callback(err, null);
        });
      })
      .catch(err => {
        callback(err, null);
      });
  },

  addBlog(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl)
      .then(db => {
        const BlogCollection = db.collection('blogs');
        const UserCollection = db.collection('users');
        const blog = controller.setDefaultBlog(body);

        BlogCollection.insert(blog)
          .then(result => {
            const newBlog = result.ops[0];
            newBlog.id_str = newBlog._id.toString();

            Promise.all([
              BlogCollection.save(newBlog),
              UserCollection.findOne({ _id: newBlog.author })
            ]).then(async (res) => {
              const user = res[1];
              if (user) {
                newBlog.author = user;
                user.blogs.push(newBlog.id_str);
                await UserCollection.save(user);
              }
              db.close();
              callback(null, newBlog);
            })
            .catch(err => {
              db.close();
              callback(err, null);
            });
          })
          .catch(err => {
            db.close();
            callback(err, null);
          });
      })
      .catch(err => {
        callback(err, null);
      });
  },

  thumbsUpBlog(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const Blog = db.collection('blogs');
      Blog.findOne({ _id: ObjectID(body.blogId) }, (err, blog) => {
        if (err) { console.log(`***** Find blog err: ${err}`); }
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

  cancelThumbsUpBlog(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const Blog = db.collection('blogs');
      Blog.findOne({ _id: ObjectID(body.blogId) }, (err, blog) => {
        if (err) { console.log(`***** Find blog err: ${err}`); }
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

  delete(req, resource, params, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const Blog = db.collection('blogs');
      const User = db.collection('users');
      Blog.remove({ _id: ObjectID(params._id) }, (err, result) => {
        User.findOne({ _id: ObjectID(params.author._id) }, (err, user) => {
          if (user) {
            user.blogs = user.blogs.filter(blog => blog !== params._id);
            User.save(user, (err, result) => {
              db.close();
              callback(err, { deletedBlogId: params._id, result });
            });
          } else {
            db.close();
            callback(err, { deletedBlogId: params._id, result });
          }
        });
      });
    });
  },

  update(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
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
  },
};
