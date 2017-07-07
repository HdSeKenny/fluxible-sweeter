import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FluxibleMixin } from 'fluxible-addons-react';
import { format, jsUtils } from '../../utils';
import { swal } from '../../plugins';
import { BlogActions } from '../../actions';
import { UserStore } from '../../stores';
import { Row, Col } from '../UI/Layout';

const UserBlogs = CreateReactClass({

  displayName: 'UserBlogs',

  contextTypes: {
    executeAction: PropTypes.func
  },

  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { username } = this.props.params;
    const userStore = this.getStore(UserStore);
    const user = userStore.getUserByUsername(username);
    const currentUser = userStore.getCurrentUser();
    const isCurrentUser = userStore.isCurrentUser();

    return {
      currentUser,
      user,
      isCurrentUser
    };
  },

  onChange() {

  },

  onUpdateBlog(blog) {
    if (!blog.title) {
      return swal.error('Please enter title !');
    }

    if (!blog.content) {
      return swal.error('Please enter content');
    }

    this.executeAction(BlogActions.UpdateBlog, blog);
  },

  onDeleteBlog(blog) {
    swal.confirm('Are you sure?', 'Yes, delete it!', () => {
      this.executeAction(BlogActions.DeleteBlog, blog);
    });
  },

  _renderCurrentUserContentRight(displayBlogs) {
    const sortedBlogs = jsUtils.sortByDate(displayBlogs);
    return (
      <div className="list-blogs">
        <div className="tips mb-10">
          <span data-balloon="'A': article, 'S': sweet" data-balloon-pos="right">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </span>
        </div>
        {sortedBlogs.map((blog, index) => {
          const fromNow = format.fromNow(blog.created_at);
          const isArticle = blog.type === 'article';
          const text = jsUtils.shorten(blog.text, 40);
          return (
            <Row key={index} className="mb-10">
              <Col size="1 type">
                {isArticle ? 'A' : 'S'}
              </Col>
              <Col size="7 p-0">
                {isArticle && <p className="title"><Link to={`/${blog.id_str}/details`}>{blog.title}</Link></p>}
                {!isArticle && <p className="text">{text}</p>}
                <p className="date">{fromNow}</p>
              </Col>
              <Col size="4 tar pr-0 option-btns">
                {isArticle &&
                  <button className="btn btn-warning btn-sm" onClick={() => this.onEditBlog(blog)}>
                    <i className="fa fa-pencil" /> Edit
                  </button>
                }
                <button className="btn btn-danger btn-sm ml-10" onClick={() => this.onDeleteBlog(blog)}>
                  <i className="fa fa-trash" /> Delete
                </button>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  },

  render() {
    const { isCurrentUser } = this.state;
    const { displayMineBlogs } = this.props;
    return (
      <div className="">
        {isCurrentUser ?
          <div className="user-blogs-page">{this._renderCurrentUserContentRight(displayMineBlogs)}</div>
            : <div />
        }
      </div>
    );
  }
});

export default UserBlogs;
