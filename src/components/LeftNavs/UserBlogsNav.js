import React from 'react';
import { Link } from 'react-router';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { UserStore } from '../../stores';

const UserBlogsNav = React.createClass({

  displayName: 'UserBlogsNav',

  mixins: [FluxibleMixin],

  getInitialState() {
    return {
      currentUser: this.getStore(UserStore).getCurrentUser()
    };
  },

  isActive(route) {
    return route === this.props.path ? 'active' : '';
  },

  render() {
    const { currentUser } = this.state;
    const { displayBlogs } = this.props;
    return (
      <div className="user-blog-nav">
        <div className="well second-left-well">
          <li className={this.isActive(`/user-blogs/${currentUser.strId}/list`)}>
            <Link to={`/user-blogs/${currentUser.strId}/list`}>
              <i className="fa fa-book"></i> Manage blogs
            </Link>
          </li>
          <li className={this.isActive(`/user-blogs/${currentUser.strId}/add`)}>
            <Link to={`/user-blogs/${currentUser.strId}/add`}>
              <i className="fa fa-pencil"></i> Write article
            </Link>
          </li>
          <li><Link to=''><i className="fa fa-ellipsis-h"></i></Link></li>
          <li><Link to=''><i className="fa fa-ellipsis-h"></i></Link></li>
        </div>
      </div>
    );
  }
})

export default UserBlogsNav;