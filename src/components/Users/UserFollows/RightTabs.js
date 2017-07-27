import React from 'react';
import PropTypes from 'prop-types';
import schema from './schema';
import { Row, Col } from '../../UI/Layout';
import { UserStore } from '../../../stores';


export default class RightTabs extends React.Component {

  static displayName = 'RightTabs';

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func
  };

  static propTypes = {
    currentUser: PropTypes.object,
    user: PropTypes.object,
    query: PropTypes.object
  };

  convertTabTitle(group, query) {
    let title = group.display_title;
    if (query.tab) {
      const tabName = group.tabs.find(tab => tab.tag === query.tab).value;
      if (tabName) {
        title += ` / ${tabName}`;
      }
    }

    return title;
  }

  convertTabRows(currentUser, group, query) {
    let personArr = currentUser[group.default_source] || [];
    if (query.tab) {
      personArr = currentUser[query.title] ? currentUser[query.title][query.tab] : [];
    }

    if (personArr.length) {
      personArr.forEach((p, index) => {
        if (typeof p === 'string') {
          personArr[index] = this.context.getStore(UserStore).getUserById(p);
        }
      });
    }
    return personArr;
  }

  render() {
    const { currentUser, query } = this.props;
    const navGroups = schema.navGroups;
    const group = navGroups[query.title];
    const followRows = this.convertTabRows(currentUser, group, query);

    return (
      <div className="right-tabs">
        <h5 className="tab-value pb-10"><strong>{this.convertTabTitle(group, query)}</strong></h5>
        {followRows && followRows.length > 0 ?
          followRows.map((p, index) =>
            <Row key={index}>
              {p.username}
            </Row>
          ) : <h1>Nothing</h1>
        }
      </div>
    );
  }
}