import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '../UI/Layout';

export default class FollowsRightTabs extends React.Component {

  static displayName = 'FollowsLeftNav';

  static contextTypes = {
    executeAction: PropTypes.func
  };

  static propTypes = {
    currentUser: PropTypes.object,
    user: PropTypes.object
  };

  _renderNoGroupFocus() {

  }

  _renderFriendFocus() {

  }

  _renderSpecialFocus() {

  }

  render() {
    const { currentUser, user, query } = this.props;

    return (
      <div className="right-tabs">

      </div>
    );
  }
}