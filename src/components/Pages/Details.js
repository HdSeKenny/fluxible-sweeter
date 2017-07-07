import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FluxibleMixin } from 'fluxible-addons-react';
import { routerShape } from 'react-router';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { BlogStore, UserStore } from '../../stores';
import { Comments } from '../Pages';
import { format } from '../../utils';
import { Row, Col } from '../UI/Layout';
import { swal } from '../../plugins';

const Details = CreateReactClass({

  displayName: 'Details',

  contextTypes: {
    router: routerShape.isRequired,
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
      },
      showEditor: false
    };
  },

  onChange(res) {
    const commentMsgs = [
      'COMMENT_SUCCESS',
      'DELETE_COMMENT_SUCCESS'
    ];

    if (commentMsgs.includes(res.msg)) {
      swal.success(res.msg);
      this.setState({
        blog: res.newBlog
      });
    }
  },

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({ showEditor: true });
  },

  goToUserCenter(username) {
    this.context.router.push(`/${username}`);
  },

  downloadToPdf(blog) {
    const data = {
      id_str: blog.id_str,
      html: document.documentElement.outerHTML
    };

    $.post('/api/download', data, () => {

    });
  },

  _renderArticleHeader(blog) {
    return (
      <div className="article-header">
        <Row className="">
          <Col size="11 title p-0"><p>{blog.title}</p></Col>
          <Col size="1 p-0 tar">
            <span className="icon" onClick={() => this.downloadToPdf(blog)}>
              <i className="fa fa-download" aria-hidden="true"></i>
            </span>
          </Col>
        </Row>
      </div>
    );
  },

  _renderDraftEditorContent(blog, styleMap) {
    const isContent = blog.content && typeof blog.content === 'object';
    if (isContent) {
      const parsedContent = convertFromRaw(blog.content);
      const editorState = EditorState.createWithContent(parsedContent);
      return (
        <section className="content RichEditor-editor m-0">
          <Editor editorState={editorState} customStyleMap={styleMap} readOnly={true} />
        </section>
      );
    }
    else {
      return (
        <section className="content"><p>{blog.text}</p></section>
      );
    }
  },

  _renderArticleUserInfo(blog) {
    const { author } = blog;
    const fromNow = format.fromNow(blog.created_at);
    const avatar = React.createElement('img', {
      src: author.image_url,
      alt: 'article-user',
      width: '40',
      height: '40',
      onClick: () => this.goToUserCenter(author.username)
    });

    return (
      <Row className="info mt-10">
        <Col size="6 info-left">
          <Col size="1 p-0">{avatar}</Col>
          <Col size="10">
            <Row className="username">
              <span onClick={() => this.goToUserCenter(author.username)}>
                {author.username}
              </span>
            </Row>
            <Row className="real-name">{author.firstName} {author.lastName}</Row>
          </Col>
        </Col>
        <Col size="6 info-right">{fromNow}</Col>
      </Row>
    );
  },

  _renderArticleComments(blog, currentUser) {
    const commentRefer = blog.comments.length > 1 ? 'comments' : 'comment';
    return (
      <div className="comments">
        <hr /><h3>{blog.comments.length} {commentRefer}</h3>
        <Comments blog={blog} currentUser={currentUser} />
      </div>
    );
  },

  render() {
    const { styleMap, showEditor, blog, currentUser } = this.state;
    return (
      <article className="details-page">
        {this._renderArticleHeader(blog)}
        {this._renderArticleUserInfo(blog)}
        {showEditor && this._renderDraftEditorContent(blog, styleMap)}
        {this._renderArticleComments(blog, currentUser)}
      </article>
    );
  }
});

export default Details;
