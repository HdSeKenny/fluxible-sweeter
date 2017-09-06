/* eslint-disable all, no-param-reassign, no-shadow */
import md5 from 'md5';
import MongoClient from 'mongodb';
import serverConfig from '../configs';

const ObjectID = MongoClient.ObjectID;
const MongoUrl = serverConfig.mongo.sweeter.url;

const getFansPromise = (user, fanId, faIdx) => new Promise((resolve, reject) => {
  MongoClient.connect(MongoUrl, (err, db) => {
    const User = db.collection('users');
    User.findOne({ _id: ObjectID(fanId) }, (err, fan) => {
      if (err) {
        return reject(err);
      }
      else {
        user.fans[faIdx] = fan;
      }
      // db.close();
      resolve();
    });
  });
});

const getFocusesPromise = (user, focusId, fsIdx) => new Promise((resolve, reject) => {
  MongoClient.connect(MongoUrl, (err, db) => {
    const User = db.collection('users');
    User.findOne({ _id: ObjectID(focusId) }, (err, focus) => {
      if (err) {
        return reject(err);
      }
      else {
        user.focuses[fsIdx] = focus;
      }
      // db.close();
      resolve();
    });
  });
});

const getBlogsPromise = (user, blogId, bgIdx) => new Promise((resolve, reject) => {
  MongoClient.connect(MongoUrl, (err, db) => {
    const Blog = db.collection('blogs');
    Blog.findOne({ _id: ObjectID(blogId) }, (err, blog) => {
      if (err) {
        return reject(err);
      }
      else {
        user.blogs[bgIdx] = blog;
      }
      // db.close();
      resolve();
    });
  });
});

const getFansPromiseWrapper = (user, fanId, faIdx) => {
  return () => {
    return getFansPromise(user, fanId, faIdx);
  };
};

const getFocusesPromiseWrapper = (user, focusId, fsIdx) => {
  return () => {
    return getFocusesPromise(user, focusId, fsIdx);
  };
};

const getBlogsPromiseWrapper = (user, blogId, bgIdx) => {
  return () => {
    return getBlogsPromise(user, blogId, bgIdx);
  };
};


export default {

  name: 'users',

  loadUsers(req, resource, params, config, callback) {
    MongoClient.connect(MongoUrl, (connectErr, db) => {
      const User = db.collection('users');
      User.find().toArray((loadUsersErr, users) => {
        const allPromises = [];
        users.forEach(user => {
          if (user.fans.length) {
            user.fans.forEach((fanId, faIdx) => {
              allPromises.push(getFansPromiseWrapper(user, fanId, faIdx));
            });
          }
          if (user.focuses.length) {
            user.focuses.forEach((focusId, fsIdx) => {
              allPromises.push(getFocusesPromiseWrapper(user, focusId, fsIdx));
            });
          }
          if (user.blogs.length) {
            user.blogs.forEach((blogId, bgIdx) => {
              allPromises.push(getBlogsPromiseWrapper(user, blogId, bgIdx));
            });
          }
        });

        Promise.all(allPromises.map(ap => ap())).then(() => {
          callback(null, users);
        })
        .catch(loadUsersPromiseErr => {
          callback(loadUsersPromiseErr, null);
        });
      });
    });
  },

  loadKennyUser(req, resource, params, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID('583ff3d6a193d70f6946948e') }, (err, kenny) => {
        callback(err, kenny);
      });
    });
  },

  register(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ email: body.email }, (err, user) => {
        if (user) {
          callback(err, {
            user: null,
            msg: 'This email is already in use !',
            stat: false
          });
        } else {
          body.password = md5(body.password);
          body.image_url = '/styles/images/users/default-user.svg';
          body.background_image_url = '/styles/images/users/user-center-bg.jpg';
          body.lq_background_url = '/styles/images/lqip/users/user-center-bg.jpg';
          body.fans = [];
          body.focuses = [];
          body.blogs = [];

          User.insert(body, (err, res) => {
            const insertedUser = res.ops[0];
            insertedUser.id_str = insertedUser._id.toString();
            User.save(insertedUser);
            // db.close();

            req.session.userId = insertedUser._id;
            req.session.authenticated = true;
            callback(err, {
              user: insertedUser,
              stat: true,
              msg: 'Create account success !'
            });
          });
        }
      });
    });
  },

  login(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      const ecryptedPassword = md5(body.password);
      User.findOne({ email: body.email }, (err, user) => {
        const auth = { msg: '', stat: false };
        if (err) { auth.msg = err; }
        if (user) {
          if (ecryptedPassword === user.password) {
            auth.msg = 'Login success !';
            auth.stat = true;
            req.session.userId = user._id;
          }
          else {
            auth.msg = 'The password is incorrect !';
            user = null;
          }
        }
        else {
          auth.msg = 'This email is not registered !';
          user = null;
        }
        // db.close();
        req.session.authenticated = auth.stat;
        callback(err, { user, auth });
      });
    });
  },

  read(req, resource, params, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, config, callback);
  },

  create(req, resource, params, body, config, callback) {
    const endPoint = resource.replace(`${this.name}.`, '');
    this[endPoint](req, resource, params, body, config, callback);
  },

  delete(req, resource, params, config, callback) {
    req.session.regenerate(err => {
      callback(err, {
        msg: 'LOGOUT_SUCCCESS'
      });
    });
  },

  getLoginUserImage(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ email: body.email }, (err, user) => {
        if (err) {
          callback(err, null);
          return;
        }
        if (user) {
          callback(null, user.image_url);
        } else {
          callback(null, null);
        }
      });
    });
  },

  readCurrentUser(req, resource, params, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      const auth = { stat: false, msg: '' };
      User.findOne({ _id: ObjectID(req.session.userId) })
        .then(user => {
          const allPromises = [];
          if (!user) {
            req.session.userId = null;
            req.session.authenticated = false;
            auth.msg = 'Authenticated fail !';
            user = null;
          }
          else {
            auth.stat = true;
            auth.msg = 'Authenticated success !';
            if (user.fans.length) {
              user.fans.forEach((fanId, faIdx) => {
                allPromises.push(getFansPromiseWrapper(user, fanId, faIdx));
              });
            }
            if (user.focuses.length) {
              user.focuses.forEach((focusId, fsIdx) => {
                allPromises.push(getFocusesPromiseWrapper(user, focusId, fsIdx));
              });
            }
            if (user.blogs.length) {
              user.blogs.forEach((blogId, bgIdx) => {
                allPromises.push(getBlogsPromiseWrapper(user, blogId, bgIdx));
              });
            }
          }
          Promise.all(allPromises.map(ap => ap())).then(() => {
            callback(null, { user, auth });
          })
          .catch(err => {
            callback(err, { user: null, auth });
          });
        })
        .catch(err => callback(err, { user: null, auth }));
    });
  },

  updateUserInfo(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body._id) }, (err, user) => {
        const keys = Object.keys(body);
        keys.forEach(key => {
          user[key] = body[key];
        });
        User.save(user, (err, result) => {
          User.findOne({ '_id': ObjectID(body._id) }, (err, newUser) => {
            const allPromises = [];
            if (newUser) {
              if (newUser.fans.length) {
                newUser.fans.forEach((fanId, faIdx) => {
                  allPromises.push(getFansPromiseWrapper(newUser, fanId, faIdx));
                });
              }
              if (newUser.focuses.length) {
                newUser.focuses.forEach((focusId, fsIdx) => {
                  allPromises.push(getFocusesPromiseWrapper(newUser, focusId, fsIdx));
                });
              }
              Promise.all(allPromises.map(ap => ap())).then(() => {
                callback(null, newUser);
              })
              .catch(err => {
                callback(err, null);
              });
            }
          });
        });
      });
    });
  },

  changeUserPassword(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body.userId) }, (err, user) => {
        if (user) {
          if (md5(body.oldPassword) !== user.password) {
            callback(err, { stat: false, msg: 'Incorrect password !' });
          }
          else {
            user.password = md5(body.newPassword);
            User.save(user, (err, result) => {
              req.session.regenerate(err => {
                callback(err, {
                  stat: true,
                  msg: 'Change password successfully please login again!'
                });
              });
            });
          }
        }
      });
    });
  },

  followThisUser(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body.thisUserId) }, (err, thisUser) => {
        if (thisUser) {
          thisUser.fans.push(body.currentUserId);
          User.save(thisUser, (err) => {
            User.findOne({ _id: ObjectID(body.currentUserId) }, (err, currentUser) => {
              if (currentUser) {
                currentUser.focuses.push(body.thisUserId);
                if (!currentUser.focuses_list) {
                  currentUser.focuses_list = {
                    no_groups: [],
                    friends: [],
                    special_focuses: []
                  };
                }
                currentUser.focuses_list.no_groups.push(body.thisUserId);
                User.save(currentUser, (err) => {
                  callback(err, { thisUser, currentUser });
                });
              }
              else {
                callback(err, null);
              }
            });
          });
        }
        else {
          callback(err, null);
        }
      });
    });
  },

  cancelFollowThisUser(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body.thisUserId) }, (err, thisUser) => {
        if (thisUser) {
          thisUser.fans.forEach((fan, index) => {
            if (fan === body.currentUserId) {
              thisUser.fans.splice(index, 1);
            }
          });
          User.save(thisUser, (err) => {
            User.findOne({ _id: ObjectID(body.currentUserId) }, (err, currentUser) => {
              if (currentUser) {
                currentUser.focuses.forEach((focus, index) => {
                  if (focus === body.thisUserId) {
                    currentUser.focuses.splice(index, 1);
                  }
                });
                const { no_groups, friends, special_focuses } = currentUser.focuses_list;
                const new_no_groups = no_groups.filter(id_str => id_str !== body.thisUserId);
                const new_friends = friends.filter(id_str => id_str !== body.thisUserId);
                const new_special_focuses = special_focuses.filter(id_str => id_str !== body.thisUserId);

                currentUser.focuses_list = {
                  no_groups: new_no_groups,
                  friends: new_friends,
                  special_focuses: new_special_focuses
                };

                User.save(currentUser, (err) => {
                  callback(err, { thisUser, currentUser });
                });
              }
              else {
                callback(err, null);
              }
            });
          });
        }
        else {
          callback(err, null);
        }
      });
    });
  },

  addMessageConnection(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body.myId) })
        .then((currentUser) => {
          if (!currentUser.recent_chat_connections) {
            currentUser.recent_chat_connections = [];
          }

          const recentConnections = currentUser.recent_chat_connections;
          const connectionIndex = recentConnections.findIndex(c => c.this_user_id === body.thisUserId);

          let connection;
          if (connectionIndex < 0) {
            connection = {
              this_user_id: body.thisUserId,
              connect_date: body.connectDate,
              messages: []
            };
            currentUser.recent_chat_connections.push(connection);
          }
          else {
            connection = currentUser.recent_chat_connections[connectionIndex];
          }

          User.save(currentUser).then(() => {
            callback(err, connection);
          });
        });
    });
  },

  deleteMessageConnection(req, resource, params, body, config, callback) {
    MongoClient.connect(MongoUrl, (err, db) => {
      const User = db.collection('users');
      User.findOne({ _id: ObjectID(body.myId) })
        .then((currentUser) => {
          const connecttions = currentUser.recent_chat_connections.filter((c) => {
            return c.this_user_id !== body.thisUserId;
          });

          currentUser.recent_chat_connections = connecttions;
          User.save(currentUser).then(() => {
            callback(err, connecttions);
          });
        });
    });
  }
};