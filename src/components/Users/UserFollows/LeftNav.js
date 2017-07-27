import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { Row } from '../../UI/Layout';
import schema from './schema';

export default class LeftNav extends React.Component {

  static displayName = 'LeftNav';

  static contextTypes = {
    executeAction: PropTypes.func
  };

  static propTypes = {
    currentUser: PropTypes.object,
    user: PropTypes.object,
    query: PropTypes.object,
    pathname: PropTypes.string
  };

  isActive(title, tab) {
    const { query } = this.props;
    let isActive = false;
    if (tab || query.tab) {
      isActive = query.title === query.title && query.tab === tab;
    }
    else {
      isActive = query.title === title;
    }
    return isActive ? 'active' : '';
  }

  onChooseFollowsNavTitle(title) {
    const { pathname } = this.props;
    browserHistory.push({
      pathname,
      query: {
        title
      }
    });
  }

  isFollowedThisUser(currentUser, user) {
    let isFollowed = false;
    if (currentUser && user) {
      currentUser.focuses.forEach(focus => {
        if (focus.strId === user.strId) {
          isFollowed = true;
        }
      });
    }
    return isFollowed;
  }

  _renderNavGroups(currentUser) {
    const navGroupsKeys = Object.keys(schema.navGroups);
    const pathname = this.props.pathname;
    return navGroupsKeys.map((key, index) => {
      const group = schema.navGroups[key];
      const groupValue = currentUser.key ? currentUser.key.length : 0;
      return (
        <Row className="nav-group" key={index}>
          <h5 className={`nav-title ${this.isActive(key)}`} onClick={() => this.onChooseFollowsNavTitle(key)}>
            <i className={group.icon}></i>{group.value}<span className="ml-5">{groupValue}</span>
          </h5>
          {group.tabs.length > 0 &&
            <div className="nav-list">
              {group.tabs.map((tab, tIdex) => {
                const url = { pathname, query: { title: key, tab: tab.tag } };
                return <li className={this.isActive(key, tab.tag)} key={tIdex}><Link to={url}>{tab.value}</Link></li>;
              })}
            </div>
          }
        </Row>
      );
    });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="follows-navs">
        {this._renderNavGroups(currentUser)}
      </div>
    );
  }
}
