import React from 'react';
import { Link } from 'react-router';

const UserHomeNav = React.createClass({

  displayName: 'UserHomeNav',

  propTypes: {
    path: React.PropTypes.object,
    isCurrentUser: React.PropTypes.bool,
    user: React.PropTypes.object,
    displayBlogs: React.PropTypes.array,
    currentUser: React.PropTypes.object
  },

  getInitialState() {
    return {};
  },

  isActive(route) {
    return route === this.props.path ? 'active' : '';
  },

  render() {
    const { isCurrentUser, user, displayBlogs, currentUser } = this.props;
    const displayUser = user || currentUser;
    return (
      <div className="user-home-nav">
        {!isCurrentUser &&
          <div className="well first-left-well">
            <div className="row">
              <div className="col-xs-4">
                <p>Blogs</p>
                <Link to={`/user-blogs/${displayUser.strId}/list`}>{displayBlogs.length}</Link>
              </div>
              <div className="col-xs-4">
                <p>Fans</p>
                <Link to={`/user-follows/${displayUser.strId}/list`}>{displayUser.fans.length}</Link>
              </div>
              <div className="col-xs-4">
                <p>Focus</p>
                <Link to={`/user-follows/${displayUser.strId}/list`}>{displayUser.focuses.length}</Link>
              </div>
            </div>
          </div>
        }
        <div className="well second-left-well">
          {isCurrentUser &&
            <div className="isCurrentUser">
              <li className={this.isActive(`/user-home/${displayUser.strId}/home`)}>
                <Link to={`/user-blogs/${displayUser.strId}/list`}><i className="fa fa-star-o"></i> Moments</Link>
              </li>
              <li className="">
                <Link to={`/user-home/${displayUser.strId}/home`}><i className="fa fa-comment"></i> Related Info</Link>
              </li>
              <li><Link to={`/user-home/${displayUser.strId}/home`}><i className="fa fa-ellipsis-h"></i> </Link></li>
              <li><Link to={`/user-home/${displayUser.strId}/home`}><i className="fa fa-ellipsis-h"></i> </Link></li>
            </div>
          }
          {!isCurrentUser &&
            <div className="isNotCurrentUser">
              <div className="basic-info">
                <h5>Basic Information</h5>
              </div>
              <div className="row">
                Name : <span className="info-field">{displayUser.firstName} {displayUser.lastName}</span>
              </div>
              <div className="row">
                Email : <span className="info-field">{displayUser.email}</span>
              </div>
              <div className="row">
                Phone : <span className="info-field">{displayUser.phone}</span>
              </div>
              <div className="row">
                Birthday : <span className="info-field">{displayUser.birthday}</span>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
});

export default UserHomeNav;
