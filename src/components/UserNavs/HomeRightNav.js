import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { routerShape } from 'react-router';
import { Row, Col } from '../UI/Layout';
import { jsUtils } from '../../utils';

export default class HomeRightNav extends React.Component {

  static displayName = 'HomeRightNav';

  static contextTypes = {
    router: routerShape.isRequired,
    executeAction: PropTypes.func
  };

  static propTypes = {
    location: PropTypes.object,
    path: PropTypes.string,
    currentUser: PropTypes.object,
    user: PropTypes.object,
    isCurrentUser: PropTypes.bool,
    onSearchBlogs: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    };
  }

  isActive(routes) {
    const path = jsUtils.splitUrlBySlash(this.props.path, routes.length);
    const isActive = _.isEqual(routes.sort(), path.sort());
    return isActive ? 'on' : '';
  }

  goToThisUserPages(str) {
    const { user } = this.props;
    this.context.router.push(`/${user.username}${str}`);
  }

  onSearchBlogs(e) {
    const searchText = e.target.value.toLocaleLowerCase();
    const trimedTextWithoutSpace = searchText ? searchText.trim().replace(/\s/g, '') : '';
    this.props.onSearchBlogs(trimedTextWithoutSpace);
  }

  render() {
    const { isCurrentUser, user } = this.props;
    const username = user ? user.username : '';
    const isCreateArticlePage = this.isActive(['create', username]);
    const momentClasses = `btn btn-default ${this.isActive([username])}`;
    const mineClasses = `btn btn-default ${this.isActive(['mine', username])}`;
    const createClass = `btn btn-default ${isCreateArticlePage}`;

    return (
      <div className="home-right-nav mb-10">
        <Row>
          <Col size="9 pl-0 home-nav-lis">
            <button className={momentClasses} onClick={() => this.goToThisUserPages('')}>Moments</button>
            {isCurrentUser &&
              <div className="current-user-link">
                <button className={mineClasses} onClick={() => this.goToThisUserPages('/mine')}>Mine</button>
                <button className={createClass} onClick={() => this.goToThisUserPages('/create')}>Add article</button>
              </div>
            }
          </Col>
          {!isCreateArticlePage &&
            <div className="">
              <Col size="3 p-0 home-search"><input type="text" className="form-control" onChange={(e) => this.onSearchBlogs(e)} /></Col>
              {false &&
                <Col size="2 p-0 tar">
                  <select className="home-select form-control">
                    <option>life</option>
                  </select>
                </Col>
              }
            </div>
          }
        </Row>
      </div>
    );
  }
}

