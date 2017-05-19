import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { routerShape } from 'react-router';
import { BlogStore, UserStore } from '../../stores';
import { Comments } from '../Pages';
import { format } from '../../utils';

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
    storeListeners: [BlogStore, UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { blogId } = this.props.params;
    return {
      blog: this.getStore(BlogStore).getBlogById(blogId),
      currentUser: this.getStore(UserStore).getCurrentUser()
    };
  },

  onChange(res) {

  },

  render() {
    const { blog, currentUser } = this.state;
    const fromNow = format.fromNow(blog.created_at);
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
              {fromNow}
            </field>
          </section>
          <section className="content">
            <p>{blog.text}</p>
          </section>
          <div className="comments">
            <hr />
            <h3>{blog.comments.length} {commentRefer}</h3>
            <Comments blog={blog} currentUser={currentUser} />
          </div>
        </section>
      </article>
    );
  }
});

export default Details;
