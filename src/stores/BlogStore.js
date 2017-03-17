// import store from '../utils/sessionStorage';
import createStore from 'fluxible/addons/createStore';
import _ from 'lodash';

const BlogStore = createStore({

  storeName: 'BlogStore',

  handlers: {
    'LOAD_BLOGS_SUCCESS': 'loadBlogsSuccess',
    'DELETE_BLOG_SUCCESS': 'deleteBlogSuccess',
    'DELETE_BLOG_FAIL': 'deleteBlogFail',
    'ADD_BLOG_SUCCESS': 'addBlogSuccess',
    'ADD_BLOG_FAIL': 'addBlogFail',
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

  initialize() {
    this.blogs = null;
    this.comments = null;
    this.currentBlog = null;
    this.deletedBlog = null;
    this.showLoading = true;
    this.listKeyNumber = 0;
    this.isUpdated = false;
    this.isThumbedUp = false;
  },

  loadBlogsSuccess(res) {
    this.blogs = res;
    this.emitChange();
  },

  /* Blogs comments */
  addCommentSuccess(res) {
    const resObj = { resMsg: 'COMMENT_SUCCESS', blogId: res.blogId }
    this.blogs.forEach((blog, index) => {
      if (blog.strId === res.blogId) {
        this.blogs[index].comments.push(res);
      }
    });
    this.emitChange(resObj);
  },

  deleteCommentSuccess(res) {
    const resObj = { resMsg: 'DELETE_COMMENT_SUCCESS', blogId: res.blogId }
    this.blogs.forEach((blog, bIdx) => {
      if (blog.strId === res.blogId) {
        blog.comments.forEach((comment, cIdx) => {
          if (comment.strId === res.deletedCommentId) {
            this.blogs[bIdx].comments.splice(cIdx, 1);
          }
        })
      }
    });
    this.emitChange(resObj);
  },

  getAllComments() {
    return this.comments;
  },
  /* Blogs comments end*/

  addBlogSuccess(res) {
    const resObj ={
      resMsg: 'CREATE_BLOG_SUCCESS'
    };
    this.blogs.push(res);
    this.emitChange(resObj);
  },

  addBlogFail() {
    const resObj ={
      resMsg: 'ADD_BLOG_FAIL'
    };
    this.emitChange(resObj);
  },

  getAllBlogs() {
    return this.blogs;
  },

  getUserBlogsWithFocuses(isCurrentUser, user) {
    const displayUserBlogs = [];
    if (this.blogs) {
      this.blogs.forEach(blog => {
        if (isCurrentUser) {
          if (user.focuses.length > 0) {
            user.focuses.forEach(focus => {
              if (blog.author.strId === focus.strId) {
                displayUserBlogs.push(blog);
              }
            })
          }
        }
        if (blog.author.strId === user.strId) {
          displayUserBlogs.push(blog);
        }
      })
    }
    return displayUserBlogs;
  },


  changeShowCommentsState(blog) {
    this.blogs.forEach((b, idx) => {
      if (b.strId === blog.strId) {
        this.blogs[idx].show_comments = blog.show_comments;
      }
    });
    this.emitChange();
  },

  getBlogsByUserId(userId) {
    const displayUserBlogs = [];
    if (this.blogs) {
      this.blogs.forEach(blog => {
        if (blog.author.strId === userId) {
          displayUserBlogs.push(blog);
        }
      })
    }
    return displayUserBlogs;
  },

  deleteBlogSuccess(res) {
    const resObj = {
      resCode: 200,
      resMsg: 'DELETE_BLOG_SUCCESS'
    }
    this.blogs = this.blogs.filter(blog => blog.strId !== res.deletedBlogId);
    this.deletedBlog = null;
    this.emitChange(resObj);
  },

  deleteBlogFail: function(err) {
    this.emitChange(err);
  },

  getBlogById: function(blogId) {
    return this.blogs.find(blog => blog.strId === blogId);
  },

  getSearchedBlogs(searchText) {
    const searchedBlogs = [];
    this.blogs.forEach(blog => {
      if (blog.title) {
        if (blog.title.toLocaleLowerCase().indexOf(searchText) !== -1
            || blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
          searchedBlogs.push(blog);
        }
      } else {
        if (blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
          searchedBlogs.push(blog);
        }
      }
    })
    return searchedBlogs;
  },

  getSearchedBlogsWithUser(searchText, user) {
    const searchedBlogs = [];
    this.blogs.forEach(blog => {
      if (blog.author.strId === user.strId) {
        if (blog.title) {
          if (blog.title.toLocaleLowerCase().indexOf(searchText) !== -1
              || blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
            searchedBlogs.push(blog);
          }
        } else {
          if (blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
            searchedBlogs.push(blog);
          }
        }
      }
    })

    return searchedBlogs;
  },

  getSortedBlogs(sortText) {
    return sortText === 'all blogs' ? this.blogs : this.blogs.filter(blog => blog.type === sortText);
  },

  getSortedBlogsWithUser(sortText, user) {
    const thisUserBlogs = this.blogs.filter(blog => blog.author.strId === user.strId);
    const sortedBlogs = this.blogs.filter(blog => blog.type === sortText && blog.author.strId === user.strId);
    return sortText === 'all blogs' ? thisUserBlogs : sortedBlogs;
  },

  editBlog(blog) {
    const resObj = {
      resMsg: 'EDIT_BLOG'
    }
    let currentBlog = _.find(this.blogs, (item) => {
      return _.isEqual(item.strId, blog.strId);
    });
    this.currentBlog = currentBlog;
    this.deletedBlog = null;
    this.listKeyNumber += 1;
    this.emitChange(resObj);
  },

  cancelEditBlog() {
    const resObj = {
      resMsg: 'CANCEL_EDIT_BLOG'
    }
    this.currentBlog = null;
    this.emitChange(resObj);
  },

  getCurrentBlog() {
    return this.currentBlog;
  },

  getDeletedBlog() {
    return this.deletedBlog;
  },

  getIsUpdated() {
    return this.isUpdated;
  },

  updateBlogSuccess(newBlog) {
    const blogs = _.cloneDeep(this.blogs);
    blogs.forEach((item, index) => {
      if (_.isEqual(item.strId, newBlog.strId)) {
        blogs[index] = newBlog;
      }
    });
    const resObj = {
      blogs: blogs,
      resMsg: 'UPDATE_BLOG_SUCCESS'
    }
    this.currentBlog = null;
    this.blogs = blogs;
    this.isUpdated = true;
    this.emitChange(resObj);
  },

  confirmDeleteBlog(blog) {
    const resObj= {
      resMsg: 'CONFIRM_DELETE_BLOG'
    }
    this.deletedBlog = blog;
    this.emitChange(resObj);
  },

  cancelDeleteBlog() {
    const resObj= {
      resMsg: 'CANCEL_DELETE_BLOG'
    }
    this.deletedBlog = null;
    this.emitChange(resObj);
  },

  thumbsUpBlogSuccess(newBlog) {
    const resObj = {
      resMsg: 'THUMBS_UP_BLOG_SUCCESS'
    }
    this.blogs.forEach((blog, index) => {
      if (blog.strId === newBlog.strId) {
        this.blogs[index].likers = newBlog.likers;
      }
    })
    this.emitChange(resObj);
  },

  cancelThumbsUpBlogSuccess(newBlog) {
    const resObj = {
      resMsg: 'CANCEL_THUMBS_UP_BLOG_SUCCESS'
    }
    this.blogs.forEach((blog, index) => {
      if (blog.strId === newBlog.strId) {
        this.blogs[index].likers = newBlog.likers;
      }
    })
    this.emitChange(resObj);
  },

  uploadImageSuccess(newUser) {
    this.blogs.forEach((blog, idx) => {
      if (blog.author.strId === newUser.strId) {
        this.blogs[idx].author.image_url = newUser.image_url; 
      }
    });
    this.emitChange();
  },

  dehydrate() {
    return {
      blogs: this.blogs,
      currentBlog: this.currentBlog,
      deletedBlog: this.deletedBlog,
      isUpdated: this.isUpdated,
      isThumbedUp: this.isThumbedUp,
      comments: this.comments
    };
  },

  rehydrate(state) {
    this.blogs = state.blogs;
    this.currentBlog = state.currentBlog;
    this.deletedBlog = state.deletedBlog;
    this.isUpdated = state.isUpdated;
    this.isThumbedUp = state.isThumbedUp;
    this.comments = state.comments;
  }
});

export default BlogStore;
