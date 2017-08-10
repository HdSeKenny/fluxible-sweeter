import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { Row, Col } from '../../UI/Layout';
import { UserStore } from '../../../stores';
import { UserActions } from '../../../actions';
import { swal } from '../../../plugins';
import schema from './schema';


export default class RightTabs extends React.Component {

  static displayName = 'RightTabs';

  static contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
  };

  static propTypes = {
    currentUser: PropTypes.object,
    user: PropTypes.object,
    query: PropTypes.object,
    isCurrentUser: PropTypes.bool
  };

  constructor(props, context) {

    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      currentUser: context.getStore(UserStore).getCurrentUser()
    };
  }

  focus = () => {
    this.editor.focus();
  };

  componentDidMount() {
    this.context.getStore(UserStore).addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    this.context.getStore(UserStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    if (res.msg === 'CANCEL_FOLLOW_USER_SUCCESS') {
      // this.setState({});
    }
  }

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

  isFollowedThisUser(currentUser, user) {
    let isFollowed = false;
    if (currentUser && user) {
      const fIdx = currentUser.focuses.findIndex(f => f.id_str === user.id_str);
      isFollowed = fIdx >= 0;
    }

    return isFollowed;
  }

  followThisUser(currentUser, user) {
    if (!currentUser) {
      return swal.warning('Login first please!');
    }

    const followObj = {
      thisUserId: user.id_str,
      currentUserId: currentUser.id_str
    };

    this.context.executeAction(UserActions.FollowThisUser, followObj);
  }

  unfollowThisUser(currentUser, user) {
    if (!currentUser) {
      return swal.warning('Login first please!');
    }

    swal.confirm('Are you sure', 'Yes, cancel follow!', () => {
      this.context.executeAction(UserActions.CancelFollowThisUser, {
        thisUserId: user.id_str,
        currentUserId: currentUser.id_str
      });
    });
  }

  convertTabRows(user, group, query) {
    let personArr = user[group.default_source] || [];
    if (query.tab) {
      personArr = user[query.title] ? user[query.title][query.tab] : [];
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

  getGroupSourceNumber(user, group) {
    const { query } = this.props;
    let num = 0;
    if (query.tab) {
      num = user[query.title] ? user[query.title][query.tab].length : 0;
    }
    else {
      num = user[group.default_source] ? user[group.default_source].length : 0;
    }

    return num;
  }

  isActive(title) {
    const { query } = this.props;
    // eslint-disable-next-line
    return query.title ? (query.title === title ? 'active' : '') : '';
  }

  onClickTabTitle(pathname, title) {
    browserHistory.push({
      pathname,
      query: {
        title
      }
    });
  }

  moveToOtherGroup() {

  }

  _renderUserFollowsInfo(p) {
    return (
      <div>
        <Link to={`/${p.username}`}><h4 className="m-0 mb-5"><strong>{p.username}</strong></h4></Link>
        <Row>
          <Col size="4 p-0"><p><strong>Focuses</strong>
            <span className="f-value">{p.focuses.length}</span></p>
          </Col>
          <Col size="4 p-0"><p><strong>Fans</strong>
            <span className="f-value">{p.fans.length}</span></p>
          </Col>
          <Col size="4 p-0"><p><strong>Blogs</strong>
            <span className="f-value">{p.blogs.length}</span></p>
          </Col>
        </Row>
        <Row><strong>Signature:</strong> {p.signature}</Row>
        <Row><strong>Profession:</strong> {p.profession}</Row>
      </div>
    );
  }

  _renderUserRowBtns(displayUser, p) {
    const isFollowed = this.isFollowedThisUser(displayUser, p);
    const { query, isCurrentUser } = this.props;
    return (
      <div className="row-btns">
        {isFollowed ?
          <button
            className="btn btn-success"
            data-balloon="Click to unfollow user!"
            data-balloon-pos="top"
            onClick={() => this.unfollowThisUser(displayUser, p)}>
            <i className="fa fa-check mr-5" aria-hidden="true" />Followed
          </button> :
          <button
            className="btn btn-info"
            data-balloon="Follow this user!"
            data-balloon-pos="top"
            onClick={() => this.followThisUser(displayUser, p)}>
            <i className="fa fa-plus mr-5" aria-hidden="true" />Follow
          </button>
        }

        <button
          className="btn btn-warning ml-5 options"
          data-toggle="dropdown"
          data-balloon="Options"
          data-balloon-pos="top">
          <i className="fa fa-cog mr-5" aria-hidden="true" />Options
        </button>

        <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
          {query.title !== 'fans_list' && isCurrentUser &&
            <li><a href="javascript:void(0)" onClick={this.moveToOtherGroup}>Move to</a></li>
          }
          <li><a href="javascript:void(0)">Message</a></li>
          <li><a href="javascript:void(0)">Report</a></li>
        </ul>
      </div>
    );
  }

  _renderUserRows(user, currentUser, rows) {
    if (rows.length) {
      return rows.map((p, index) =>
        <Row key={index} className="tab-row mb-15">
          <Col size="1 u-img pl-0 mb-10 mt-5"><Link to={`/${p.username}`}><img alt="user" src={p.image_url} /></Link></Col>
          <Col size="7">{this._renderUserFollowsInfo(p)}</Col>
          <Col size="4 tar pr-0">{currentUser.id_str !== p.id_str && this._renderUserRowBtns(user, p)}</Col>
        </Row>
      );
    }
    else {
      return <div className="tac pt-30"><h3>Not data here ...</h3></div>;
    }
  }

  render() {
    const { currentUser, query, isCurrentUser, user, pathname } = this.props;

    const navGroups = schema.navGroups;
    const group = navGroups[query.title];
    const displayUser = isCurrentUser ? currentUser : user;
    const rows = this.convertTabRows(displayUser, group, query);
    const tabValue = this.getGroupSourceNumber(displayUser, group);
    return (
      <div className="right-tabs">
        {isCurrentUser ?
          <h5 className="tab-value pb-10"><strong>{this.convertTabTitle(group, query)} {tabValue}</strong></h5>
          :
          <Row className="tab-choose mb-20">
            <div className={`col-xs-2 tac mr-10 ${this.isActive('focuses_list')}`} onClick={() => this.onClickTabTitle(pathname, 'focuses_list')}>
              <h5>His Focuses</h5>
            </div>
            <div className={`col-xs-2 tac ${this.isActive('fans_list')}`} onClick={() => this.onClickTabTitle(pathname, 'fans_list')}>
              <h5>His Fans</h5>
            </div>
          </Row>
        }
        <div className="tab-rows">
          {this._renderUserRows(displayUser, currentUser, rows)}
        </div>
      </div>
    );
  }
}