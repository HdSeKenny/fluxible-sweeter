'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchClientConfig = require('../utils/fetchClientConfig');

var _fetchClientConfig2 = _interopRequireDefault(_fetchClientConfig);

var _indexedDB = require('../utils/indexedDB');

var _indexedDB2 = _interopRequireDefault(_indexedDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const endpoint = 'blogs';

exports.default = {
  LoadBlogs: function (context, payload, done) {
    const callback = (err, res, save) => {
      context.dispatch('LOAD_BLOGS_SUCCESS', { data: res, save: save });
      done();
    };
    _indexedDB2.default.retrieve(endpoint, payload, callback, (saveCallback, saveOptions) => {
      context.service.read('blogs.loadBlogs', payload, _fetchClientConfig2.default, (err, res) => {
        saveCallback(res);
        callback(err, res, saveOptions);
      });
    });
  },
  AddBlog: function (context, payload, done) {
    context.service.create('blogs.addBlog', {}, payload, _fetchClientConfig2.default, (err, res) => {
      context.dispatch('ADD_BLOG_SUCCESS', res);
      done();
    });
  },
  EditBlog: function (context, payload, done) {
    context.dispatch('EDIT_BLOG', payload);
    done();
  },
  CancelEditBlog: function (context, payload, done) {
    context.dispatch('CANCEL_EDIT_BLOG');
    done();
  },
  DeleteBlog: function (context, payload, done) {
    context.service.delete('blogs', payload, _fetchClientConfig2.default, (err, res) => {
      context.dispatch('DELETE_BLOG_SUCCESS', res);
    });
    done();
  },
  ConfirmDeleteBlog: function (context, payload, done) {
    context.dispatch('CONFIRM_DELETE_BLOG', payload);
    done();
  },
  CancelDeleteBlog: function (context, payload, done) {
    context.dispatch('CANCEL_DELETE_BLOG');
    done();
  },
  UpdateBlog: function (context, payload, done) {
    context.service.update('blogs', {}, payload, _fetchClientConfig2.default, (err, res) => {
      context.dispatch('UPDATE_BLOG_SUCCESS', res);
    });
    done();
  },
  UpdateCurrentBlogId: function (context, payload, done) {
    context.dispatch('UPDATE_BLOG_ID', payload.id);
    done();
  },
  ThumbsUpBlog: function (context, payload, done) {
    context.service.create('blogs.thumbsUpBlog', {}, payload, _fetchClientConfig2.default, (err, res) => {
      context.dispatch('THUMBS_UP_BLOG_SUCCESS', res);
      done();
    });
  },
  CancelThumbsUpBlog: function (context, payload, done) {
    context.service.create('blogs.cancelThumbsUpBlog', {}, payload, _fetchClientConfig2.default, (err, res) => {
      context.dispatch('CANCEL_THUMBS_UP_BLOG_SUCCESS', res);
      done();
    });
  },
  AddBlogComment: function (context, payload, done) {
    context.service.create('comments.addBlogComment', {}, payload, _fetchClientConfig2.default, (err, res) => {
      context.dispatch('ADD_COMMENT_SUCCESS', res);
      done();
    });
  },
  DeleteBlogComment: function (context, payload, done) {
    context.service.delete('comments', payload, _fetchClientConfig2.default, (err, res) => {
      context.dispatch('DELETE_COMMENT_SUCCESS', res);
      done();
    });
  },
  UploadImageSuccess: function (context, payload, done) {
    context.dispatch('UPLOAD_IAMGE_SUCCESS', payload);
    done();
  }
};
module.exports = exports['default'];
