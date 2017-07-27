import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { Row } from '../UI/Layout';

export default class FollowsLeftNav extends React.Component {

  static displayName = 'FollowsLeftNav';

  static contextTypes = {
    executeAction: PropTypes.func
  };

  static propTypes = {
    currentUser: PropTypes.object,
    user: PropTypes.object,
    query: PropTypes.object,
    pathname: PropTypes.string
  };

  isActive(tag) {
    const { query } = this.props;
    return query.tag === tag ? 'active' : '';
  }

  onChooseFollowsNavTitle(tag) {
    const { query, pathname } = this.props;
    browserHistory.push({
      pathname,
      query: ''
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
    const focusNum = currentUser ? currentUser.focuses.length : 0;
    const fansNum = currentUser ? currentUser.fans.length : 0;
    const blacklist = 0;
    const navGroups = [
      {
        title: { tag: 'focuses', value: 'Focuses' },
        value: focusNum,
        icon: 'fa fa-user-plus mr-10',
        list: [
          { tag: 'ng', value: 'No groups' },
          { tag: 'mf', value: 'Friends' },
          { tag: 'sf', value: 'Special focuses' }
        ]
      },
      {
        title: { tag: 'fans', value: 'Fans' },
        value: fansNum,
        icon: 'fa fa-heart mr-10',
        list: []
      },
      {
        title: { tag: 'gp', value: 'Groups' },
        value: 0,
        icon: 'fa fa-users mr-10',
        list: []
      },
      {
        title: { tag: 'bl', value: 'Black list' },
        value: blacklist,
        icon: 'fa fa-exclamation-circle mr-10',
        list: []
      }
    ];
    const { pathname } = this.props;
    return navGroups.map((group, index) => {
      if (group.list.length) {
        return (
          <Row className="nav-group" key={index}>
            <h5 className="nav-title" onClick={() => this.onChooseFollowsNavTitle(group.title.tag)}>
              <i className={group.icon}></i>{group.title.value}<span className="ml-5">{group.value}</span>
            </h5>
            <div className="nav-list">
              {group.list.map((li, lidx) => {
                const url = { pathname, query: { tag: li.tag } };
                return <li className={this.isActive(li.tag)} key={lidx}><Link to={url}>{li.value}</Link></li>;
              })}
            </div>
          </Row>
        );
      }
      else {
        return (
          <Row className="nav-group" key={index}>
            <h5 className="nav-title" onClick={this.onChooseFollowsNavTitle}>
              <i className={group.icon}></i>{group.title.value}<span className="ml-5">{group.value}</span>
            </h5>
          </Row>
        );
      }
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
