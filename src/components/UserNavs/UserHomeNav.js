import React from 'react';
import { routerShape, Link } from 'react-router';
import { Row, Col } from '../UI/Layout';
import { animations } from '../../utils';

const UserHomeNav = React.createClass({

  displayName: 'UserHomeNav',

  contextTypes: {
    router: routerShape.isRequired,
    executeAction: React.PropTypes.func
  },

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

  componentDidMount() {
    animations.fixed_left_nav('.isNotCurrentUser');
  },

  isActive(route) {
    return route === this.props.path ? 'active' : '';
  },

  goToUserPages(str) {
    this.context.router.push(str);
  },

  _renderUserInfo(isCurrentUser, user) {
    const { firstName, lastName, email, phone, birthday, profession, description } = user;
    return (
      <div className="isNotCurrentUser">
        <Row className="basic-info">
          <p className="text">Personal Information<span className="more">{!isCurrentUser ? 'more' : 'edit'}</span></p>
        </Row>
        <Row><i className="fa fa-user" /> <span className="info-field">{firstName} {lastName}</span></Row>
        <Row><i className="fa fa-envelope" /> <span className="info-field">{email}</span></Row>
        <Row><i className="fa fa-phone" /> <span className="info-field">{phone || 'No phone'}</span></Row>
        <Row><i className="fa fa-birthday-cake" /> <span className="info-field">{birthday || 'No birthday'}</span></Row>
        <Row><i className="fa fa-briefcase" /> <span className="info-field">{profession || 'No profession'}</span></Row>
        <Row><i className="fa fa-book" /> <span className="info-field">{description || 'No description'}</span></Row>
      </div>
    );
  },

  render() {
    const { user, displayBlogs, currentUser, isCurrentUser } = this.props;
    const displayUser = user || currentUser;
    const { username, fans, focuses } = displayUser;
    return (
      <div className="user-home-left">
        <Row className="blog-tips">
          <Col size="4 tip-li p-0" >
            <p onClick={this.goToUserPages.bind(this, `/${username}/blogs`)}>{displayBlogs.length}</p><span>Blogs</span>
          </Col>
          <Col size="4 tip-li p-0">
            <p onClick={this.goToUserPages.bind(this, `/${username}/follows`)}>{fans.length}</p><span>Fans</span>
          </Col>
          <Col size="4 tip-li p-0">
            <p onClick={this.goToUserPages.bind(this, `/${username}/follows`)}>{focuses.length}</p><span>Focus</span>
          </Col>
        </Row>
        <Row className="user-info">
          {this._renderUserInfo(isCurrentUser, displayUser)}
        </Row>
        <Row className="others">

        </Row>
      </div>
    );
  }
});

export default UserHomeNav;

