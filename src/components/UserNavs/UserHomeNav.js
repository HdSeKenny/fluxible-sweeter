import React from 'react';
import PropTypes from 'prop-types';
import { routerShape, browserHistory } from 'react-router';
import { Row, Col } from '../UI/Layout';
import { animations } from '../../utils';

export default class UserHomeNav extends React.Component {

  static displayName = 'UserHomeNav';

  static contextTypes = {
    router: routerShape.isRequired,
    executeAction: PropTypes.func
  };

  static propTypes = {
    path: PropTypes.string,
    user: PropTypes.object,
    displayBlogs: PropTypes.array,
    currentUser: PropTypes.object
  };

  componentDidMount() {
    animations.fixed_left_nav('.user-info-others');
  }

  isActive(route) {
    return route === this.props.path ? 'active' : '';
  }

  goToUserPages(str, qt) {
    if (qt) {
      browserHistory.push({
        pathname: str,
        query: {
          title: qt
        }
      });
    } else {
      this.context.router.push(str);
    }
  }

  _renderUserInfo(user) {
    const { firstName, lastName, email, phone, birthday, profession, description } = user;
    const { currentUser } = this.props;
    const isCurrentUser = currentUser ? user.id_str === currentUser.id_str : false;
    const displayUserName = isCurrentUser ? currentUser.username : user.username;
    return (
      <div className="isNotCurrentUser">
        <Row className="basic-info">
          <p className="text">Personal Information
            <span className="more" onClick={() => this.goToUserPages(`/${displayUserName}/personal`)}>
              {!isCurrentUser ? 'more' : 'edit'}
            </span>
          </p>
        </Row>
        <Row><i className="fa fa-user" /> <span className="info-field">{firstName} {lastName}</span></Row>
        <Row><i className="fa fa-envelope" /> <span className="info-field">{email}</span></Row>
        <Row><i className="fa fa-phone" /> <span className="info-field">{phone || 'No phone'}</span></Row>
        <Row><i className="fa fa-birthday-cake" /> <span className="info-field">{birthday || 'No birthday'}</span></Row>
        <Row><i className="fa fa-briefcase" /> <span className="info-field">{profession || 'No profession'}</span></Row>
        <Row><i className="fa fa-book" /> <span className="info-field">{description || 'No description'}</span></Row>
      </div>
    );
  }

  render() {
    const { user, displayBlogs, currentUser } = this.props;
    const displayUser = user || currentUser;
    const { username, fans, focuses } = displayUser;

    if (!displayUser) return swal.info('You need login');

    return (
      <div className="user-home-left">
        <Row className="blog-tips">
          <Col size="4 tip-li p-0">
            <p onClick={() => this.goToUserPages(`/${username}`)}>{displayBlogs.length}</p>
            <span>Blogs</span>
          </Col>
          <Col size="4 tip-li p-0">
            <p onClick={() => this.goToUserPages(`/${username}/follows`, 'focuses_list')}>{fans.length}</p>
            <span>Fans</span>
          </Col>
          <Col size="4 tip-li p-0">
            <p onClick={() => this.goToUserPages(`/${username}/follows`, 'focuses_list')}>{focuses.length}</p>
            <span>Focus</span>
          </Col>
        </Row>
        <div className="user-info-others">
          <Row className="user-info">{this._renderUserInfo(displayUser)}</Row>
          <Row className="others">
          </Row>
        </div>
      </div>
    );
  }
}
