/* eslint-disable all, no-param-reassign, no-shadow, camelcase */
import md5 from 'md5';
import MongoClient from 'mongodb';
import serverConfig from '../../configs';
import controller from './controller';

const ObjectID = MongoClient.ObjectID;
const MongoUrl = serverConfig.mongo.sweeter.url;

export default {

  name: 'users',

  loadUsers: async (req, resource, params, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');
      const Blog = _db.collection('blogs');
      const allUsers = await User.find().toArray();
      const allBlogs = await Blog.find().toArray();

      for (let i = 0; i < allUsers.length; i++) {
        const _user = allUsers[i];
        const _userBlogs = _user.blogs;
        const _userFans = _user.fans;
        const _userFocuses = _user.focuses;

        if (_userBlogs.length) {
          for (let bIdx = 0; bIdx < _userBlogs.length; bIdx++) {
            _userBlogs[bIdx] = allBlogs.find(b => b.id_str === _userBlogs[bIdx]);
          }
        }

        if (_userFans.length) {
          for (let faIdx = 0; faIdx < _userFans.length; faIdx++) {
            _userFans[faIdx] = allUsers.find(u => u.id_str === _userFans[faIdx]);
          }
        }

        if (_userFocuses.length) {
          for (let foIdx = 0; foIdx < _userFocuses.length; foIdx++) {
            _userFocuses[foIdx] = allUsers.find(u => u.id_str === _userFocuses[foIdx]);
          }
        }
      }

      _db.close();
      callback(null, allUsers);
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  loadKennyUser(req, resource, params, config, callback) {
    MongoClient.connect(MongoUrl)
      .then(db => {
        return db
          .collection('users')
          .findOne({ _id: ObjectID('583ff3d6a193d70f6946948e') })
          .then(kenny => {
            db.close();
            callback(null, kenny);
          });
      })
      .catch(err => {
        callback(err, null);
      });
  },

  register: async (req, resource, params, body, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');
      const exitUser = await User.findOne({ email: body.email });
      if (exitUser) {
        _db.close();
        callback(null, { user: null, msg: 'This email is already in use !', stat: false });
      } else {
        const newBody = controller.setDefaultUserParams(body);
        const insertResult = await User.insert(newBody);
        const insertedUser = insertResult.ops[0];
        insertedUser.id_str = insertedUser._id.toString();
        await User.save(insertedUser);

        req.session.userId = insertedUser._id;
        req.session.authenticated = true;

        _db.close();
        callback(null, { user: insertedUser, stat: true, msg: 'Create account success !' });
      }
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  login: async (req, resource, params, body, config, callback) => {
    MongoClient.connect(MongoUrl)
      .then(db => {
        const User = db.collection('users');
        const ecryptedPassword = md5(body.password);
        return User.findOne({ email: body.email })
          .then(user => {
            const auth = { msg: '', stat: false };
            if (user) {
              if (ecryptedPassword === user.password) {
                auth.msg = 'Login success !';
                auth.stat = true;
                req.session.userId = user._id;
              } else {
                auth.msg = 'The password is incorrect !';
                user = null;
              }
            } else {
              auth.msg = 'This email is not registered !';
              user = null;
            }
            req.session.authenticated = auth.stat;

            db.close();
            callback(null, { user, auth });
          });
      }).catch(err => {
        callback(err, { msg: '', stat: false });
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
    MongoClient.connect(MongoUrl)
      .then(db => {
        const User = db.collection('users');
        User.findOne({ email: body.email })
          .then(user => {
            if (user) {
              db.close();
              callback(null, user.image_url);
            } else {
              db.close();
              callback(null, null);
            }
          });
      }).catch(err => {
        callback(err, null);
      });
  },

  readCurrentUser: async (req, resource, params, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');
      const Blog = _db.collection('blogs');
      const allUsers = await User.find().toArray();
      const allBlogs = await Blog.find().toArray();

      const auth = { stat: false, msg: '' };
      let sessionUser = await User.findOne({ _id: ObjectID(req.session.userId) });
      if (!sessionUser) {
        req.session.userId = null;
        req.session.authenticated = false;
        auth.msg = 'Authenticated fail !';
        sessionUser = null;
      } else {
        auth.stat = true;
        auth.msg = 'Authenticated success !';
        const _userBlogs = sessionUser.blogs;
        const _userFans = sessionUser.fans;
        const _userFocuses = sessionUser.focuses;

        if (_userBlogs.length) {
          for (let bIdx = 0; bIdx < _userBlogs.length; bIdx++) {
            _userBlogs[bIdx] = allBlogs.find(b => b.id_str === _userBlogs[bIdx]);
          }
        }

        if (_userFans.length) {
          for (let faIdx = 0; faIdx < _userFans.length; faIdx++) {
            _userFans[faIdx] = allUsers.find(u => u.id_str === _userFans[faIdx]);
          }
        }

        if (_userFocuses.length) {
          for (let foIdx = 0; foIdx < _userFocuses.length; foIdx++) {
            _userFocuses[foIdx] = allUsers.find(u => u.id_str === _userFocuses[foIdx]);
          }
        }
      }

      _db.close();
      callback(null, { user: sessionUser, auth });
    } catch (error) {
      if (_db) _db.close();
      callback(error, { user: null, auth: { stat: false, msg: '' } });
    }
  },

  updateUserInfo: async (req, resource, params, body, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');
      const allUsers = await User.find().toArray();

      const currentUser = await User.findOne({ _id: ObjectID(body._id) });
      const bodyKeys = Object.keys(body);
      bodyKeys.forEach(key => {
        currentUser[key] = body[key];
      });
      await User.save(currentUser);

      const newUser = await User.findOne({ _id: ObjectID(body._id) });
      const _userFans = newUser.fans;
      const _userFocuses = newUser.focuses;

      if (_userFans.length) {
        for (let faIdx = 0; faIdx < _userFans.length; faIdx++) {
          _userFans[faIdx] = allUsers.find(u => u.id_str === _userFans[faIdx]);
        }
      }

      if (_userFocuses.length) {
        for (let foIdx = 0; foIdx < _userFocuses.length; foIdx++) {
          _userFocuses[foIdx] = allUsers.find(u => u.id_str === _userFocuses[foIdx]);
        }
      }

      _db.close();
      callback(null, newUser);
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  changeUserPassword: async (req, resource, params, body, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');
      const currentUser = await User.findOne({ _id: ObjectID(body.userId) });

      if (md5(body.oldPassword) !== currentUser.password) {
        callback(null, { stat: false, msg: 'Incorrect password !' });
      } else {
        currentUser.password = md5(body.newPassword);
        await User.save(currentUser);
        await req.session.regenerate();

        _db.close();
        callback(null, { stat: true, msg: 'Change password successfully please login again!' });
      }
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  followThisUser: async (req, resource, params, body, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');

      const thisUser = await User.findOne({ _id: ObjectID(body.thisUserId) });
      thisUser.fans.push(body.currentUserId);
      await User.save(thisUser);

      const currentUser = await User.findOne({ _id: ObjectID(body.currentUserId) });
      currentUser.focuses.push(body.thisUserId);
      if (!currentUser.focuses_list) {
        currentUser.focuses_list = {
          no_groups: [],
          friends: [],
          special_focuses: []
        };
      }
      currentUser.focuses_list.no_groups.push(body.thisUserId);
      await User.save(currentUser);

      _db.close();
      callback(null, { thisUser, currentUser });
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  cancelFollowThisUser: async (req, resource, params, body, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');

      const thisUser = await User.findOne({ _id: ObjectID(body.thisUserId) });
      const faIdx = thisUser.fans.findIndex(fan => fan === body.currentUserId);
      thisUser.fans.splice(faIdx, 1);
      await User.save(thisUser);

      const currentUser = await User.findOne({ _id: ObjectID(body.currentUserId) });
      const foIdx = currentUser.focuses.findIndex(fo => fo === body.thisUserId);
      currentUser.focuses.splice(foIdx, 1);

      const { no_groups, friends, special_focuses } = currentUser.focuses_list;
      const new_no_groups = no_groups.filter(id_str => id_str !== body.thisUserId);
      const new_friends = friends.filter(id_str => id_str !== body.thisUserId);
      const new_special_focuses = special_focuses.filter(id_str => id_str !== body.thisUserId);

      currentUser.focuses_list = {
        no_groups: new_no_groups,
        friends: new_friends,
        special_focuses: new_special_focuses
      };
      await User.save(currentUser);

      _db.close();
      callback(null, { thisUser, currentUser });
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  addMessageConnection: async (req, resource, params, body, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');
      const currentUser = await User.findOne({ _id: ObjectID(body.myId) });
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
      } else {
        connection = currentUser.recent_chat_connections[connectionIndex];
      }
      await User.save(currentUser);

      _db.close();
      callback(null, connection);
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  },

  deleteMessageConnection: async (req, resource, params, body, config, callback) => {
    let _db;
    try {
      _db = await MongoClient.connect(MongoUrl);
      const User = _db.collection('users');
      const currentUser = await User.findOne({ _id: ObjectID(body.myId) });
      const connecttions = currentUser.recent_chat_connections.filter((c) => {
        return c.this_user_id !== body.thisUserId;
      });
      currentUser.recent_chat_connections = connecttions;
      await User.save(currentUser);

      _db.close();
      callback(null, connecttions);
    } catch (error) {
      if (_db) _db.close();
      callback(error, null);
    }
  }
};