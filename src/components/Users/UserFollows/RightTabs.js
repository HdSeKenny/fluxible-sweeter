import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import schema from './schema';
import { Row, Col } from '../../UI/Layout';
import { UserStore } from '../../../stores';
import { UserActions } from '../../../actions';
import { swal } from '../../../plugins';


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

  constructor() {
    super();
    this._onStoreChange = this._onStoreChange.bind(this);
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
    console.log('right-tabs', res);
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

  _renderUserRowBtns(currentUser, p) {
    const isFollowed = this.isFollowedThisUser(currentUser, p);
    return (
      <div>
        {isFollowed &&
          <button className="btn btn-danger btn-sm" onClick={() => this.unfollowThisUser(currentUser, p)}>Unfollow</button>}
        {!isFollowed &&
          <button className="btn btn-info btn-sm" onClick={() => this.followThisUser(currentUser, p)}>
            <i className="fa fa-plus mr-5" />Follow</button>}
        <button className="btn btn-default btn-sm ml-5">Options</button>
      </div>
    );
  }

  _renderUserRows(currentUser, rows) {
    if (rows.length) {
      return rows.map((p, index) =>
        <Row key={index} className="tab-row mb-15">
          <Col size="1 u-img pl-0 mb-10 mt-5"><Link to={`/${p.username}`}><img alt="user" src={p.image_url} /></Link></Col>
          <Col size="7">{this._renderUserFollowsInfo(p)}</Col>
          <Col size="4 tar pr-0">{this._renderUserRowBtns(currentUser, p)}</Col>
        </Row>
      );
    }
    else {
      return <div className="tac pt-30"><h3>Not data here ...</h3></div>;
    }
  }

  render() {
    const { currentUser, query } = this.props;
    const navGroups = schema.navGroups;
    const group = navGroups[query.title];
    const rows = this.convertTabRows(currentUser, group, query);

    return (
      <div className="right-tabs">
        <h5 className="tab-value pb-10"><strong>{this.convertTabTitle(group, query)}</strong></h5>
        <div className="tab-rows">
          {this._renderUserRows(currentUser, rows)}
        </div>
      </div>
    );
  }
}