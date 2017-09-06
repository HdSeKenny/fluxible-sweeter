import fetchClientConfig from '../utils/fetchClientConfig';
import store from '../utils/indexedDB';

const endpoint = 'blogs';

export default {

  LoadBlogs(context, payload, done) {
    const callback = (err, res, save) => {
      context.dispatch('LOAD_BLOGS_SUCCESS', { data: res, save });
      done();
    };
    store.retrieve(endpoint, payload, callback, (saveCallback, saveOptions) => {
      context.service.read('blogs.loadBlogs', payload, fetchClientConfig, (err, res) => {
        saveCallback(res);
        callback(err, res, saveOptions);
      });
    });
  },

  AddBlog(context, payload, done) {
    context.service.create('blogs.addBlog', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('ADD_BLOG_SUCCESS', res);
      done();
    });
  },

  EditBlog(context, payload, done) {
    context.dispatch('EDIT_BLOG', payload);
    done();
  },

  CancelEditBlog(context, payload, done) {
    context.dispatch('CANCEL_EDIT_BLOG');
    done();
  },

  DeleteBlog(context, payload, done) {
    context.service.delete('blogs', payload, fetchClientConfig, (err, res) => {
      context.dispatch('DELETE_BLOG_SUCCESS', res);
    });
    done();
  },

  ConfirmDeleteBlog(context, payload, done) {
    context.dispatch('CONFIRM_DELETE_BLOG', payload);
    done();
  },

  CancelDeleteBlog(context, payload, done) {
    context.dispatch('CANCEL_DELETE_BLOG');
    done();
  },

  UpdateBlog(context, payload, done) {
    context.service.update('blogs', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('UPDATE_BLOG_SUCCESS', res);
    });
    done();
  },

  UpdateCurrentBlogId(context, payload, done) {
    context.dispatch('UPDATE_BLOG_ID', payload.id);
    done();
  },

  ThumbsUpBlog(context, payload, done) {
    context.service.create('blogs.thumbsUpBlog', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('THUMBS_UP_BLOG_SUCCESS', res);
      done();
    });
  },

  CancelThumbsUpBlog(context, payload, done) {
    context.service.create('blogs.cancelThumbsUpBlog', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('CANCEL_THUMBS_UP_BLOG_SUCCESS', res);
      done();
    });
  },

  AddBlogComment(context, payload, done) {
    context.service.create('comments.addBlogComment', {}, payload, fetchClientConfig, (err, res) => {
      context.dispatch('ADD_COMMENT_SUCCESS', res);
      done();
    });
  },

  DeleteBlogComment(context, payload, done) {
    context.service.delete('comments', payload, fetchClientConfig, (err, res) => {
      context.dispatch('DELETE_COMMENT_SUCCESS', res);
      done();
    });
  },

  UploadImageSuccess(context, payload, done) {
    context.dispatch('UPLOAD_IAMGE_SUCCESS', payload);
    done();
  }
};