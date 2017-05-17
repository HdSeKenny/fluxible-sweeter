import React from 'react';
// import ReactDOM from 'react-dom';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { routerShape } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import sweetAlert from '../../utils/sweetAlert';
import { BlogActions } from '../../actions';
import { BlogStore, UserStore } from '../../stores';
import { UserBlogsNav } from '../UserNavs';
import UserBar from './UserBar';

const AddBlog = React.createClass({

  displayName: 'AddBlog',

  contextTypes: {
    router: routerShape.isRequired,
    executeAction: React.PropTypes.func
  },

  propTypes: {
    params: React.PropTypes.object,
    location: React.PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore, BlogStore]
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    const { userId } = this.props.params;
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserById(userId),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(userId),
      title: '',
      content: ''
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

  updateTitle(e) {
    this.setState({ title: e.target.value });
  },

  updateContent(e) {
    this.setState({ content: e.target.value });
  },

  cancelAddBlog() {
    this.setState({ title: '', content: '' });
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
        <Button onClick={this.cancelAddBlog} className="cancel-btn">
          <Glyphicon glyph="glyphicon glyphicon-remove" /> Cancel
        </Button>
        <Button type="submit" className="create-btn k-blue">
          <Glyphicon glyph="pencil" /> Create
        </Button>
      </div>
    );
  },

  _renderAddBlogContent(title, content) {
    return (
      <div className="well">
        <div className="create-blog">
          <h3>Write an article</h3>
          <form onSubmit={this.handleSubmit} >
            {this._renderArticleTitle(title)}
            {this._renderArticleContent(content)}
            {this._rednerCreateBtns()}
          </form>
        </div>
      </div>
    );
  },

  render() {
    const { user, currentUser, isCurrentUser, title, content } = this.state;
    const { pathname } = this.props.location;
    return (
      <div className="add-blog-content">
        <UserBar
          path={pathname}
          user={user}
          isCurrentUser={isCurrentUser}
          currentUser={currentUser}
        />
        <div className="content-left">
          <UserBlogsNav path={pathname} user={currentUser} isCurrentUser={isCurrentUser} />
        </div>
        <div className="content-right">
          {this._renderAddBlogContent(title, content)}
        </div>
      </div>
    );
  }
});

export default AddBlog;
