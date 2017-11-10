import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../UI/Layout';

export default class UserList extends React.Component {
  static displayName = 'UserList';
  static propTypes = {
    users: PropTypes.array
  }

  render() {
    const { users } = this.props;
    const sortedUsers = users.sort((a, b) => a.fans - b.fans);
    return (
      <div className="user-list">
        <h3 className="title">Blog Stars</h3>
        {sortedUsers.map((u) => {
          return (
            <Row className="user" key={u.id_str}>
              <Col size="3 pl-0">
                <img src={u.image_url} alt="user" />
              </Col>
              <Col size="9 p-0">
                <h4 className="name">
                  {u.username}
                  {/* <Col size="6 p-0 tar"><button className="follow-btn mid">Follow</button></Col> */}
                </h4>
                <Row>
                  <Col size="6 p-0">Focuses {u.focuses.length}</Col>
                  <Col size="6 p-0">Fans {u.fans.length}</Col>
                </Row>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
