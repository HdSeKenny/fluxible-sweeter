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
    user: PropTypes.object,
    query: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      defaultTabs: [
        { tag: 'ng', value: 'No groups', title: 'focuses' },
        { tag: 'mf', value: 'Friends', title: 'focuses' },
        { tag: 'sf', value: 'Special focus', title: 'focuses' },
        { tag: 'fans', value: 'Fans', title: 'fans' },
        { tag: 'gp', value: 'Groups', title: 'groups' },
        { tag: 'bl', value: 'Black list', title: 'blacklist' },
      ]
    };
  }

  _renderNoGroupFocus() {

  }

  _renderFriendFocus() {

  }

  _renderSpecialFocus() {

  }

  render() {
    const { currentUser, user, query } = this.props;
    const { defaultTabs } = this.state;
    const currentTab = defaultTabs.find(dTab => dTab.tag === query.tag);
    return (
      <div className="right-tabs">
        <h5 className="tab-value pb-10"><strong>{currentTab.value}</strong></h5>
      </div>
    );
  }
}