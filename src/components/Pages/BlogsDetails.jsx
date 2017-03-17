import React from 'react';
import dateFormat from 'dateformat';
// import { Link, Router } from 'react-router';
// import { Button, Glyphicon } from 'react-bootstrap';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { BlogStore } from '../../stores';
import { Comments } from '../Pages';
import sweetAlert from '../../utils/sweetAlert';

const BlogsDetails = React.createClass({

  displayName: 'BlogsDetails',

  contextTypes: {
    executeAction: React.PropTypes.func
  },

  propTypes: {
    params: React.PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [BlogStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { blogId } = this.props.params;
    return {
      blog: this.getStore(BlogStore).getBlogById(blogId)
    };
  },

  onChange(res) {
    if (res.resMsg === 'COMMENT_SUCCESS' || res.resMsg === 'DELETE_COMMENT_SUCCESS') {
      sweetAlert.alertSuccessMessage(res.resMsg);
      this.setState(this.getStatesFromStores());
    }
  },

  render() {
    const { blog } = this.state;
    const date = blog.created_at.toString();
    const blogDate = dateFormat(date);
    const commentRefer = blog.comments.length > 1 ? 'comments' : 'comment';
    return (
      <article className="blog-details-page">
        <section className="blog-details">
          <section className="blog-title">
            <h2>{blog.title}</h2>
          </section>
          <section classMame="blog-info">
            <field className="info-left">
              {blog.author.username}
            </field>
            <field className="info-right">
              {blogDate}
            </field>
          </section>
          <section className="blog-content">
            <p>{blog.content}</p>
          </section>
        </section>
        <div className="blog-comments">
          <hr />
          <h3>{blog.comments.length} {commentRefer}</h3>
          <Comments blog={blog} isBlogsWell={false} />
        </div>
      </article>
    );
  }
});

export default BlogsDetails;
