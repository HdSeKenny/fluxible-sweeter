import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FluxibleMixin } from 'fluxible-addons-react';
import { routerShape } from 'react-router';
import { BlogActions } from '../../actions';
import { BlogStore, UserStore } from '../../stores';
import { DraftEditor, swal } from '../../plugins';
import { Row, Col } from '../UI/Layout';
import { NotFound } from '..';

const AddBlog = CreateReactClass({

  displayName: 'AddBlog',

  contextTypes: {
    router: routerShape.isRequired,
    executeAction: PropTypes.func
  },

  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore, BlogStore]
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    const { username } = this.props.params;
    const store = this.getStore(UserStore);
    return {
      currentUser: store.getCurrentUser(),
      user: store.getUserByUsername(username),
      isCurrentUser: store.isCurrentUser(username),
      title: '',
      content: '',
      tags: []
    };
  },

  onChange(res) {
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      swal.success(res.msg, () => {
        const newBlogId = res.newBlog.id_str;
        this.context.router.push(`${newBlogId}/details`);
      });
    }
  },

  onHandleTitle(e) {
    this.setState({ title: e.target.value });
  },

  onHanleTagsChange(val) {
    this.setState({ tags: val });
  },

  onCreateArticle(editorState) {
    const { editorContent, plainText } = editorState;
    const { title, tags, currentUser } = this.state;
    const now = new Date();
    if (!title.trim()) {
      return swal.error('Please enter title !');
    }

    if (!plainText.trim()) {
      return swal.error('Please enter content !');
    }

    if (!tags.length) {
      return swal.error('Please choose a tag !');
    }

    const newBlog = {
      type: 'article',
      title: `${title.trim()}`,
      content: editorContent,
      text: plainText,
      author: currentUser.id_str,
      tags,
      created_at: now
    };

    this.executeAction(BlogActions.AddBlog, newBlog);
  },

  render() {
    const { title, tags, currentUser } = this.state;
    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
    ];

    if (!currentUser) return <NotFound classes="create-article-page" />;

    return (
      <div className="create-article-page">
        <div className="draft-options">
          <Row className="mb-10">
            <Col size="7 pl-0 title-input">
              <input
                type="text"
                className="form-control"
                placeholder="Add a title.."
                value={title}
                onChange={this.onHandleTitle} />
            </Col>
            <Col size="5 pr-0">
              <Select
                instanceId="s"
                placeholder="Select or create tags"
                value={tags}
                options={options}
                onChange={(val) => this.onHanleTagsChange(val)}
                multi={true}
                deleteRemoves={false} />
            </Col>
          </Row>
        </div>

        <div className="draft-editor">
          <DraftEditor onCreateArticle={this.onCreateArticle} />
        </div>
      </div>
    );
  }
});

export default AddBlog;
