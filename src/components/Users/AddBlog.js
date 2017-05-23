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
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(username),
      title: '',
      content: '',
      tags: []
    };
  },

  onChange(res) {
    const { currentUser } = this.state;
    if (res.msg === 'CREATE_BLOG_SUCCESS') {
      sweetAlert.alertSuccessMessageWithCallback(res.msg, () => {
        this.context.router.push(`/user-blogs/${currentUser.strId}/list`);
      });
    }
  },

  updateContent(e) {
    this.setState({ content: e.target.value });
  },

  cancelAddBlog() {
    this.setState({ title: '', content: '' });
  },

  onHandleTitle(e) {
    this.setState({ title: e.target.value });
  },

  onHanleTagsChange(val) {
    this.setState({ tagsOptions: val });
  },

  onHandleEditorState(editorState) {

  },

  handleSubmit(e) {
    e.preventDefault();
    const title = this.state.title;
    const content = this.state.content;
    const now = new Date();
    if (!title) {
      sweetAlert.alertErrorMessage('Please enter title !');
      return;
    }

    if (!content) {
      sweetAlert.alertErrorMessage('Please enter content !');
      return;
    }

    const newBlog = {
      type: 'article',
      title: `<< ${title.trim()} >>`,
      content,
      author: this.state.currentUser._id,
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

  _renderArticleContent(content) {
    return (
      <div className="form-group">
        <textarea
          type="text"
          ref="blogContent"
          className="form-control"
          value={content}
          rows="20"
          placeholder="Write content here.."
          onChange={this.updateContent}
          autoFocus
        />
      </div>
    );
  },

  _rednerCreateBtns() {
    return (
      <div className="form-group btns">
        <button type="reset" className="btn btn-default">Reset</button>
        <button className="btn btn-primary">Create</button>
      </div>
    );
  },

  _renderAddBlogContent(title, content) {
    return (
      <div className="content">
        <h3>Write an article</h3>
        <form onSubmit={this.handleSubmit} >
          {this._renderArticleTitle(title)}
          {this._renderArticleContent(content)}
          {this._rednerCreateBtns()}
        </form>
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
                name="form-field-name"
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
          <DraftEditor onHandleEditorState={this.onHandleEditorState} />
        </div>
      </div>
    );
  }
});

export default AddBlog;
