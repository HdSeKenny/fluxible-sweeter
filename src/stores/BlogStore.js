// import store from '../utils/sessionStorage';
import createStore from 'fluxible/addons/createStore';
import store from '../utils/indexedDB';

const BlogStore = createStore({

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

  initialize() {
    this.blogs = null;
    this.comments = null;
    this.currentBlog = null;
    this.deletedBlog = null;
    this.showLoading = true;
    this.isUpdated = false;
    this.isThumbedUp = false;
  },

  findBlogIndexById(id) {
    return this.blogs.findIndex(b => b.id_str === id);
  },

  loadBlogsSuccess(res) {
    this.blogs = res.data;
    this.emitChange();
  },

  // Blogs comments
  addCommentSuccess(res) {
    const idx = this.findBlogIndexById(res.blogId);
    this.blogs[idx].comments.push(res);

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'COMMENT_SUCCESS',
      newBlog: this.blogs[idx]
    });
  },

  deleteCommentSuccess(res) {
    const deletedCommentBlog = this.blogs.find(b => b.id_str === res.blogId);
    const deletedCommentIndex = deletedCommentBlog.comments.findIndex(c => c.id_str === res.deletedCommentId);
    deletedCommentBlog.comments.splice(deletedCommentIndex, 1);

    const idx = this.blogs.findIndex(b => b.id_str === res.blogId);
    this.blogs[idx] = deletedCommentBlog;

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'DELETE_COMMENT_SUCCESS',
      newBlog: deletedCommentBlog
    });
  },

  getAllComments() {
    return this.comments;
  },
  /* Blogs comments end*/

  addBlogSuccess(res) {
    this.blogs.push(res);
    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'CREATE_BLOG_SUCCESS',
      newBlog: res
    });
  },

  getAllBlogs() {
    return this.blogs;
  },

  getBlogsWithUsername(currentUser, username) {
    let displayBlogs = [];
    const isCurrentUser = currentUser ? (currentUser.username === username) : false;

    if (isCurrentUser && currentUser) {
      const currentUserBlogs = this.blogs.filter(blog => blog.author.id_str === currentUser.id_str);
      displayBlogs = displayBlogs.concat(currentUserBlogs);
      currentUser.focuses.forEach(focuse => {
        const focuseUserBlogs = this.blogs.filter(blog => blog.author.id_str === focuse.id_str);
        displayBlogs = displayBlogs.concat(focuseUserBlogs);
      });
    } else {
      displayBlogs = this.blogs.filter(blog => blog.author.username === username);
    }

    return displayBlogs;
  },

  getCurrentUserBlogs(isCurrentUser, currentUser) {
    const blogs = [];
    if (isCurrentUser && currentUser) {
      this.blogs.forEach(blog => {
        if (blog.author.id_str === currentUser.id_str) {
          blogs.push(blog);
        }
      });
    }

    return blogs;
  },

  changeShowCommentsState(blog) {
    this.blogs.forEach((b, idx) => {
      if (b.id_str === blog.id_str) {
        this.blogs[idx].show_comments = blog.show_comments;
      }
    });
    this.emitChange();
  },

  getBlogsByUserId(userId) {
    const displayUserBlogs = [];
    if (this.blogs) {
      this.blogs.forEach(blog => {
        if (blog.author.id_str === userId) {
          displayUserBlogs.push(blog);
        }
      });
    }
    return displayUserBlogs;
  },

  deleteBlogSuccess(res) {
    this.blogs = this.blogs.filter(blog => blog.id_str !== res.deletedBlogId);
    this.deletedBlog = null;

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'DELETE_BLOG_SUCCESS'
    });
  },

  getBlogById(blogId) {
    return this.blogs.find(blog => blog.id_str === blogId);
  },

  getSearchedBlogs(searchText) {
    const searchedBlogs = [];
    this.blogs.forEach(blog => {
      if (blog.title) {
        if (blog.title.toLocaleLowerCase().indexOf(searchText) !== -1 ||
          blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
          searchedBlogs.push(blog);
        }
      } else if (blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
        searchedBlogs.push(blog);
      }
    });
    return searchedBlogs;
  },

  getSearchedBlogsWithUser(searchText, user) {
    const searchedBlogs = [];
    this.blogs.forEach(blog => {
      if (blog.author.id_str === user.id_str) {
        if (blog.title) {
          if (blog.title.toLocaleLowerCase().indexOf(searchText) !== -1 ||
            blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
            searchedBlogs.push(blog);
          }
        } else if (blog.content.toLocaleLowerCase().indexOf(searchText) !== -1) {
          searchedBlogs.push(blog);
        }
      }
    });

    return searchedBlogs;
  },

  getSortedBlogs(sortText) {
    return sortText === 'all blogs' ? this.blogs : this.blogs.filter(blog => blog.type === sortText);
  },

  getSortedBlogsWithUser(sortText, user) {
    const thisUserBlogs = this.blogs.filter(blog => blog.author.id_str === user.id_str);
    const sortedBlogs = this.blogs.filter(blog => blog.type === sortText && blog.author.id_str === user.id_str);
    return sortText === 'all blogs' ? thisUserBlogs : sortedBlogs;
  },

  editBlog(blog) {
    const currentBlog = this.getBlogById(blog.id_str);
    this.currentBlog = currentBlog;
    this.deletedBlog = null;
    this.emitChange({
      msg: 'EDIT_BLOG'
    });
  },

  cancelEditBlog() {
    this.currentBlog = null;
    this.emitChange({
      msg: 'CANCEL_EDIT_BLOG'
    });
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
    const idx = this.findBlogIndexById(newBlog.id_str);
    this.blogs[idx] = newBlog;
    this.currentBlog = null;
    this.isUpdated = true;

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      blogs: this.blogs,
      msg: 'UPDATE_BLOG_SUCCESS'
    });
  },

  confirmDeleteBlog(blog) {
    this.deletedBlog = blog;
    this.emitChange({
      msg: 'CONFIRM_DELETE_BLOG'
    });
  },

  cancelDeleteBlog() {
    this.deletedBlog = null;
    this.emitChange({
      msg: 'CANCEL_DELETE_BLOG'
    });
  },

  thumbsUpBlogSuccess(res) {
    const idx = this.findBlogIndexById(res.id_str);
    this.blogs[idx].likers = res.likers;
    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'THUMBS_UP_BLOG_SUCCESS',
      newBlog: this.blogs[idx]
    });
  },

  cancelThumbsUpBlogSuccess(res) {
    const idx = this.findBlogIndexById(res.id_str);
    this.blogs[idx].likers = res.likers;

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'CANCEL_THUMBS_UP_BLOG_SUCCESS',
      newBlog: this.blogs[idx]
    });
  },

  uploadImageSuccess(newUser) {
    this.blogs.forEach((blog, idx) => {
      if (blog.author.id_str === newUser.id_str) {
        this.blogs[idx].author.image_url = newUser.image_url;
      }
    });

    this.updateBlogsIntoIndexedDB();
    this.emitChange({
      msg: 'BLOG_CHANGE_IMAGE_SUCCESS',
    });
  },

  updateBlogsIntoIndexedDB() {
    store.set('blogs', this.blogs);
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
