import React from 'react';
import dateFormat from 'dateformat';
import { routerShape } from 'react-router';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { BlogStore } from '../../stores';
import { Comments } from '../Pages';

const Details = React.createClass({

  displayName: 'Details',

  contextTypes: {
    router: routerShape.isRequired,
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

  },

  render() {
    const { blog } = this.state;
    const date = blog.created_at.toString();
    const blogDate = dateFormat(date);
    const commentRefer = blog.comments.length > 1 ? 'comments' : 'comment';
    return (
      <article className="details-page">
        <section className="details">
          <section className="title">
            <p>{blog.title}</p>
          </section>
          <section classMame="info">
            <field className="info-left">
              {blog.author.username}
            </field>
            <field className="info-right">
              {blogDate}
            </field>
          </section>
          <section className="content">
            <p>{blog.text}</p>
          </section>
          <div className="comments">
            <hr />
            <h3>{blog.comments.length} {commentRefer}</h3>
            <Comments blog={blog} isBlogsWell={false} />
          </div>
        </section>
      </article>
    );
  }
});

export default Details;
