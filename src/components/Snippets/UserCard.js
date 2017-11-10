/* eslint-disable all, camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, routerShape } from "react-router";
import { Row, Col } from '../UI/Layout';

export default class UserCard extends React.Component {

  static displayName = 'UserCard';

  static propTypes = {
    user: PropTypes.object,
    showSignature: PropTypes.bool,
    showFollow: PropTypes.bool
  };

  static contextTypes = {
    router: routerShape.isRequired
  };

  goToUserPage(username, str) {
    const url = str ? `/${username}/${str}` : `/${username}`;
    this.context.router.push(url);
  }

  render() {
    const {
      image_url,
      username,
      background_image_url,
      focuses,
      fans,
      blogs,
      signature
      // gender
    } = this.props.user;
    const { showSignature, showFollow } = this.props;
    const focusNum = focuses.length;
    const fansNum = fans.length;
    const blogsNum = blogs.length;
    const cardBgImageStyle = {
      height: '50%',
      paddingTop: '13%',
      backgroundImage: `url(${background_image_url})`,
      backgroundSize: 'cover'
    };
    const defaultFocusUrl = 'follows?title=focuses_list';
    const defaultFanUrl = 'follows?title=fans_list';
    return (
      <div className="user-card">
        <div className="uc-bg" style={cardBgImageStyle}>
          <Row className="uc-image">
            <Col size="3 p-0">
              <Link to={`/${username}`}>
                <img src={image_url} alt="user" />
              </Link>
            </Col>
            <Col size="5 pl-0"><h4 className="uc-name">{username}</h4></Col>
            {showFollow && <Col size="4 tar"><button className="follow-btn sm">Follow</button></Col>}
          </Row>
        </div>
        {showSignature && <div className="uc-signature tac"><p>{signature}</p></div>}
        <Row className={`uc-detail ${!showSignature && 'mt-20'}`}>
          <Col size="4 u-info" onClick={() => this.goToUserPage(username, defaultFocusUrl)}>
            <h5 className="title">Focuses</h5>
            <h5 className="number">{focusNum}</h5>
          </Col>
          <Col size="4 u-info" onClick={() => this.goToUserPage(username, defaultFanUrl)}>
            <h5 className="title">Fans</h5>
            <h5 className="number">{fansNum}</h5>
          </Col>
          <Col size="4 u-info" onClick={() => this.goToUserPage(username)}>
            <h5 className="title">Blogs</h5>
            <h5 className="number">{blogsNum}</h5>
          </Col>
        </Row>
      </div>
    );
  }
}