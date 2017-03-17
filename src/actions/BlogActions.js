import fetchClientConfig from '../utils/fetchClientConfig';

const BlogActions = {
  LoadBlogs: (context, payload, done) => {
    context.service.read('blogs.loadBlogs', payload, fetchClientConfig, (err, res) => {
      if (err) {
        console.log(`Load blogs error: ${err}`);
      } else {
        context.dispatch('LOAD_BLOGS_SUCCESS', res);
      }
      done();
    });
  },

  AddBlog: (context, payload, done) => {
    context.service.create('blogs.addBlog', {}, payload, fetchClientConfig, (err, res) => {
      if (err) {
        console.log(`Create blog error: ${err}`);
      } else {
        context.dispatch('ADD_BLOG_SUCCESS', res);
      }
      done();
    });
  },

  EditBlog: (context, payload, done) => {
    context.dispatch('EDIT_BLOG', payload);
    done();
  },

  CancelEditBlog: (context, payload, done) => {
    context.dispatch('CANCEL_EDIT_BLOG');
    done();
  },

  DeleteBlog: (context, payload, done) => {
    context.service.delete('blogs', payload, fetchClientConfig, (err, res) => {
      if (err) {
        context.dispatch('DELETE_BLOG_FAIL', err);
      } else {
        context.dispatch('DELETE_BLOG_SUCCESS', res);
      }
    });
    done();
  },

  ConfirmDeleteBlog: (context, payload, done) => {
    context.dispatch('CONFIRM_DELETE_BLOG', payload);
    done();
  },

  CancelDeleteBlog: (context, payload, done) => {
    context.dispatch('CANCEL_DELETE_BLOG');
    done();
  },

  UpdateBlog: (context, payload, done) => {
    context.service.update('blogs', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('UPDATE_BLOG_SUCCESS', res);
    });
    done();
  },

  UpdateCurrentBlogId: (context, payload, done) => {
    context.dispatch('UPDATE_BLOG_ID', payload.id);
    done();
  },

  ThumbsUpBlog: (context, payload, done) => {
    context.service.create('blogs.thumbsUpBlog', {}, payload, fetchClientConfig, (err, res) => {
      if (err) {
        console.log(`ThumbsUpBlog callback err: ${err}`);
      } else {
        context.dispatch('THUMBS_UP_BLOG_SUCCESS', res);
      }
      done();
    });
  },

  CancelThumbsUpBlog: (context, payload, done) => {
    context.service.create('blogs.cancelThumbsUpBlog', {}, payload, fetchClientConfig, (err, res) => {
      if (err) {
        console.log(`CancelThumbsUpBlog callback err: ${err}`);
      } else {
        context.dispatch('CANCEL_THUMBS_UP_BLOG_SUCCESS', res);
      }
      done();
    });
  },

  AddBlogComment: (context, payload, done) => {
    context.service.create('comments.addBlogComment', {}, payload, fetchClientConfig, (err, res) => {
      if (err) {
        console.log(`Add comment err: ${err}`);
      } else {
        context.dispatch('ADD_COMMENT_SUCCESS', res);
      }
      done();
    });
  },

  DeleteBlogComment: (context, payload, done) => {
    context.service.delete('comments', payload, fetchClientConfig, (err, res) => {
      if (err) {
        console.log(`Delete comment err: ${err}`);
      } else {
        context.dispatch('DELETE_COMMENT_SUCCESS', res);
      }
      done();
    });
  },

  UploadImageSuccess: (context, payload, done) => {
    context.dispatch('UPLOAD_IAMGE_SUCCESS', payload);
    done();
  }
};

export default BlogActions;
