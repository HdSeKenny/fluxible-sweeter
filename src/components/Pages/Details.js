import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { BlogStore, UserStore } from '../../stores';
import { Comments } from '../Pages';
import { format } from '../../utils';

const Details = CreateReactClass({

  displayName: 'Details',

  contextTypes: {
    executeAction: PropTypes.func
  },

  propTypes: {
    params: PropTypes.object
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
      currentUser: this.getStore(UserStore).getCurrentUser(),
      styleMap: {
        CODE: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
          fontSize: 16,
          padding: 2,
        },
      }
    };
  },

  onChange() {

  },

  render() {
    const { blog, currentUser, styleMap } = this.state;
    const fromNow = format.fromNow(blog.created_at);
    const commentRefer = blog.comments.length > 1 ? 'comments' : 'comment';
    const parsedContent = convertFromRaw(blog.content);

    return (
      <article className="details-page">
        <section className="details">
          <section className="title"><p>{blog.title}</p></section>
          <section className="info">
            <field className="info-left">{blog.author.username}</field>
            <field className="info-right">{fromNow}</field>
          </section>
          <section className="content"><p>{blog.text}</p></section>
          <div className="comments">
            <hr />
            <h3>{blog.comments.length} {commentRefer}</h3>
            <Comments blog={blog} currentUser={currentUser} />
          </div>

          <Editor editorState={EditorState.createWithContent(parsedContent)} customStyleMap={styleMap} readOnly={true} />
        </section>
      </article>
    );
  }
});

export default Details;
