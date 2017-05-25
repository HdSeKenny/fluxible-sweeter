import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { routerShape } from 'react-router';
import { sweetAlert } from '../../utils';
import { BlogActions } from '../../actions';
import { BlogStore, UserStore } from '../../stores';
import { DraftEditor } from '../../plugins';
import { Row, Col } from '../UI/Layout';

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
      sweetAlert.success(res.msg, () => {
        this.context.router.push(`${res.id_str}/details`);
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
      return sweetAlert.alertErrorMessage('Please enter title !');
    }

    if (!plainText.trim()) {
      return sweetAlert.alertErrorMessage('Please enter content !');
    }

    if (!tags.length) {
      return sweetAlert.alertErrorMessage('Please choose a tag !');
    }

    const newBlog = {
      type: 'article',
      title: `${title.trim()}`,
      content: editorContent,
      plainText,
      author: currentUser.id_str,
      tags,
      created_at: now
    };

    this.executeAction(BlogActions.AddBlog, newBlog);
  },

  _renderArticleTitle(title) {
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-xs-3">
            <select className="form-control">
              <option>IT</option>
              <option>Sport</option>
              <option>Life</option>
              <option>Story</option>
            </select>
          </div>
          <div className="col-xs-9">
            <input
              type="text"
              ref="blogTitle"
              className="form-control"
              value={title}
              placeholder="Write title here.."
              onChange={this.updateTitle}
              autoFocus
            />
          </div>
        </div>
      </div>
    );
  },

  render() {
    const { user, currentUser, isCurrentUser, title, content, tags } = this.state;
    const { pathname } = this.props.location;
    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },

      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },

      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },

      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },

      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ];



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
