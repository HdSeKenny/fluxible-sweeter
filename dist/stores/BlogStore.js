'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createStore = require('fluxible/addons/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _indexedDB = require('../utils/indexedDB');

var _indexedDB2 = _interopRequireDefault(_indexedDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import store from '../utils/sessionStorage';
var BlogStore = (0, _createStore2.default)({

  storeName: 'BlogStore',

  handlers: {
    'LOAD_BLOGS_SUCCESS': 'loadBlogsSuccess',
    'DELETE_BLOG_SUCCESS': 'deleteBlogSuccess',
    'ADD_BLOG_SUCCESS': 'addBlogSuccess',
    'EDIT_BLOG': 'editBlog',
    'CANCEL_EDIT_BLOG': 'cancelEditBlog',
    'UPDATE_BLOG_SUCCESS': 'updateBlogSuccess',
    'CONFIRM_DELETE_BLOG': 'confirmDeleteBlog',
    'CANCEL_DELETE_BLOG': 'cancelDeleteBlog',
    'THUMBS_UP_BLOG_SUCCESS': 'thumbsUpBlogSuccess',
    'CANCEL_THUMBS_UP_BLOG_SUCCESS': 'cancelThumbsUpBlogSuccess',
    'ADD_COMMENT_SUCCESS': 'addCommentSuccess',
    'DELETE_COMMENT_SUCCESS': 'deleteCommentSuccess',
    'UPLOAD_IAMGE_SUCCESS': 'uploadImageSuccess'
  },

  initialize: function initialize() {
    this.blogs = null;
    this.comments = null;
    this.currentBlog = null;
    this.deletedBlog = null;
    this.showLoading = true;
    this.isUpdated = false;
    this.isThumbedUp = false;
  },
  findBlogIndexById: function findBlogIndexById(id) {
    return this.blogs.findIndex(function (b) {
      return b.id_str === id;
    });
  },
  loadBlogsSuccess: function loadBlogsSuccess(res) {
    this.blogs = res.data;
    this.emitChange();
  },


  // Blogs comments
  addCommentSuccess: function addCommentSuccess(res) {
    var idx = this.findBlogIndexById(res.blogId);
    this.blogs[idx].comments.push(res);

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'COMMENT_SUCCESS',
      newBlog: this.blogs[idx]
    });
  },
  deleteCommentSuccess: function deleteCommentSuccess(res) {
    var deletedCommentBlog = this.blogs.find(function (b) {
      return b.id_str === res.blogId;
    });
    var deletedCommentIndex = deletedCommentBlog.comments.findIndex(function (c) {
      return c.id_str === res.deletedCommentId;
    });
    deletedCommentBlog.comments.splice(deletedCommentIndex, 1);

    var idx = this.blogs.findIndex(function (b) {
      return b.id_str === res.blogId;
    });
    this.blogs[idx] = deletedCommentBlog;

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'DELETE_COMMENT_SUCCESS',
      newBlog: deletedCommentBlog
    });
  },
  getAllComments: function getAllComments() {
    return this.comments;
  },

  /* Blogs comments end*/

  addBlogSuccess: function addBlogSuccess(res) {
    this.blogs.push(res);
    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'CREATE_BLOG_SUCCESS',
      newBlog: res
    });
  },
  getAllBlogs: function getAllBlogs() {
    return this.blogs;
  },
  getBlogsWithUsername: function getBlogsWithUsername(currentUser, username) {
    var _this = this;

    var displayBlogs = [];
    var isCurrentUser = currentUser ? currentUser.username === username : false;

    if (isCurrentUser && currentUser) {
      var currentUserBlogs = this.blogs.filter(function (blog) {
        return blog.author.id_str === currentUser.id_str;
      });
      displayBlogs = displayBlogs.concat(currentUserBlogs);
      currentUser.focuses.forEach(function (focuse) {
        var focuseUserBlogs = _this.blogs.filter(function (blog) {
          return blog.author.id_str === focuse.id_str;
        });
        displayBlogs = displayBlogs.concat(focuseUserBlogs);
      });
    } else {
      displayBlogs = this.blogs.filter(function (blog) {
        return blog.author.username === username;
      });
    }

    return displayBlogs;
  },
  getCurrentUserBlogs: function getCurrentUserBlogs(isCurrentUser, currentUser) {
    var blogs = [];
    if (isCurrentUser && currentUser) {
      this.blogs.forEach(function (blog) {
        if (blog.author.id_str === currentUser.id_str) {
          blogs.push(blog);
        }
      });
    }

    return blogs;
  },
  changeShowCommentsState: function changeShowCommentsState(blog) {
    var _this2 = this;

    this.blogs.forEach(function (b, idx) {
      if (b.id_str === blog.id_str) {
        _this2.blogs[idx].show_comments = blog.show_comments;
      }
    });
    this.emitChange();
  },
  getBlogsByUserId: function getBlogsByUserId(userId) {
    var displayUserBlogs = [];
    if (this.blogs) {
      this.blogs.forEach(function (blog) {
        if (blog.author.id_str === userId) {
          displayUserBlogs.push(blog);
        }
      });
    }
    return displayUserBlogs;
  },
  deleteBlogSuccess: function deleteBlogSuccess(res) {
    this.blogs = this.blogs.filter(function (blog) {
      return blog.id_str !== res.deletedBlogId;
    });
    this.deletedBlog = null;

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'DELETE_BLOG_SUCCESS'
    });
  },
  getBlogById: function getBlogById(blogId) {
    return this.blogs.find(function (blog) {
      return blog.id_str === blogId;
    });
  },
  getSearchedBlogs: function getSearchedBlogs(searchText) {
    var searchedBlogs = [];
    this.blogs.forEach(function (blog) {
      if (blog.title) {
        if (blog.title.toLocaleLowerCase().indexOf(searchText) !== -1 || blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
          searchedBlogs.push(blog);
        }
      } else if (blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
        searchedBlogs.push(blog);
      }
    });
    return searchedBlogs;
  },
  getSearchedBlogsWithUser: function getSearchedBlogsWithUser(searchText, user) {
    var searchedBlogs = [];
    this.blogs.forEach(function (blog) {
      if (blog.author.id_str === user.id_str) {
        if (blog.title) {
          if (blog.title.toLocaleLowerCase().indexOf(searchText) !== -1 || blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
            searchedBlogs.push(blog);
          }
        } else if (blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
          searchedBlogs.push(blog);
        }
      }
    });

    return searchedBlogs;
  },
  getSortedBlogs: function getSortedBlogs(sortText) {
    return sortText === 'all blogs' ? this.blogs : this.blogs.filter(function (blog) {
      return blog.type === sortText;
    });
  },
  getSortedBlogsWithUser: function getSortedBlogsWithUser(sortText, user) {
    var thisUserBlogs = this.blogs.filter(function (blog) {
      return blog.author.id_str === user.id_str;
    });
    var sortedBlogs = this.blogs.filter(function (blog) {
      return blog.type === sortText && blog.author.id_str === user.id_str;
    });
    return sortText === 'all blogs' ? thisUserBlogs : sortedBlogs;
  },
  editBlog: function editBlog(blog) {
    var currentBlog = this.getBlogById(blog.id_str);
    this.currentBlog = currentBlog;
    this.deletedBlog = null;
    this.emitChange({
      msg: 'EDIT_BLOG'
    });
  },
  cancelEditBlog: function cancelEditBlog() {
    this.currentBlog = null;
    this.emitChange({
      msg: 'CANCEL_EDIT_BLOG'
    });
  },
  getCurrentBlog: function getCurrentBlog() {
    return this.currentBlog;
  },
  getDeletedBlog: function getDeletedBlog() {
    return this.deletedBlog;
  },
  getIsUpdated: function getIsUpdated() {
    return this.isUpdated;
  },
  updateBlogSuccess: function updateBlogSuccess(newBlog) {
    var idx = this.findBlogIndexById(newBlog.id_str);
    this.blogs[idx] = newBlog;
    this.currentBlog = null;
    this.isUpdated = true;

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      blogs: this.blogs,
      msg: 'UPDATE_BLOG_SUCCESS'
    });
  },
  confirmDeleteBlog: function confirmDeleteBlog(blog) {
    this.deletedBlog = blog;
    this.emitChange({
      msg: 'CONFIRM_DELETE_BLOG'
    });
  },
  cancelDeleteBlog: function cancelDeleteBlog() {
    this.deletedBlog = null;
    this.emitChange({
      msg: 'CANCEL_DELETE_BLOG'
    });
  },
  thumbsUpBlogSuccess: function thumbsUpBlogSuccess(res) {
    var idx = this.findBlogIndexById(res.id_str);
    this.blogs[idx].likers = res.likers;
    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'THUMBS_UP_BLOG_SUCCESS',
      newBlog: this.blogs[idx]
    });
  },
  cancelThumbsUpBlogSuccess: function cancelThumbsUpBlogSuccess(res) {
    var idx = this.findBlogIndexById(res.id_str);
    this.blogs[idx].likers = res.likers;

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'CANCEL_THUMBS_UP_BLOG_SUCCESS',
      newBlog: this.blogs[idx]
    });
  },
  uploadImageSuccess: function uploadImageSuccess(newUser) {
    var _this3 = this;

    this.blogs.forEach(function (blog, idx) {
      if (blog.author.id_str === newUser.id_str) {
        _this3.blogs[idx].author.image_url = newUser.image_url;
      }
    });

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'BLOG_CHANGE_IMAGE_SUCCESS'
    });
  },
  updateBlogsIntoIndexedDB: function updateBlogsIntoIndexedDB() {
    _indexedDB2.default.set('blogs', this.blogs);
  },
  dehydrate: function dehydrate() {
    return {
      blogs: this.blogs,
      currentBlog: this.currentBlog,
      deletedBlog: this.deletedBlog,
      isUpdated: this.isUpdated,
      isThumbedUp: this.isThumbedUp,
      comments: this.comments
    };
  },
  rehydrate: function rehydrate(state) {
    this.blogs = state.blogs;
    this.currentBlog = state.currentBlog;
    this.deletedBlog = state.deletedBlog;
    this.isUpdated = state.isUpdated;
    this.isThumbedUp = state.isThumbedUp;
    this.comments = state.comments;
  }
});

exports.default = BlogStore;
module.exports = exports['default'];