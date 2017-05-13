import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from '../UI/Layout';

const UserHomeNav = React.createClass({

  displayName: 'UserHomeNav',

  propTypes: {
    path: React.PropTypes.string,
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
    const { username, fans, focuses } = displayUser;
    return (
      <div className="user-home-nav">
        <Row className="blog-tips">
          <Col size="4 tip-li"><p>Blogs</p><Link to={`/${username}/list`}>{displayBlogs.length}</Link></Col>
          <Col size="4 tip-li"><p>Fans</p><Link to={`/${username}/list`}>{fans.length}</Link></Col>
          <Col size="4 tip-li"><p>Focus</p><Link to={`/${username}/list`}>{focuses.length}</Link></Col>
        </Row>
      </div>
    );
  }
});

export default UserHomeNav;

        // <div className="well second-left-well">
        //   {isCurrentUser &&
        //     <div className="isCurrentUser">
        //       <li className={this.isActive(`/user-home/${displayUser.strId}/home`)}>
        //         <Link to={`/user-blogs/${displayUser.strId}/list`}><i className="fa fa-star-o"></i> Moments</Link>
        //       </li>
        //       <li className="">
        //         <Link to={`/user-home/${displayUser.strId}/home`}><i className="fa fa-comment"></i> Related Info</Link>
        //       </li>
        //       <li><Link to={`/user-home/${displayUser.strId}/home`}><i className="fa fa-ellipsis-h"></i> </Link></li>
        //       <li><Link to={`/user-home/${displayUser.strId}/home`}><i className="fa fa-ellipsis-h"></i> </Link></li>
        //     </div>
        //   }
        //   {!isCurrentUser &&
        //     <div className="isNotCurrentUser">
        //       <div className="basic-info">
        //         <h5>Basic Information</h5>
        //       </div>
        //       <div className="row">
        //         Name : <span className="info-field">{displayUser.firstName} {displayUser.lastName}</span>
        //       </div>
        //       <div className="row">
        //         Email : <span className="info-field">{displayUser.email}</span>
        //       </div>
        //       <div className="row">
        //         Phone : <span className="info-field">{displayUser.phone}</span>
        //       </div>
        //       <div className="row">
        //         Birthday : <span className="info-field">{displayUser.birthday}</span>
        //       </div>
        //     </div>
        //   }
        // </div>
