import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { routerShape } from 'react-router';
import { Row, Col, Page } from '../UI/Layout';
import { jsUtils } from '../../utils';
import { ModalsFactory } from '../UI';
import { BlogModal } from '../UserControls';


export default class HomeRightNav extends React.Component {

  static displayName = 'HomeRightNav';

  static contextTypes = {
    router: routerShape.isRequired,
    executeAction: PropTypes.func
  };

  static propTypes = {
    location: PropTypes.object,
    path: PropTypes.string,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      showCreateModal: false
    };
  }

  isActive(routes) {
    const path = jsUtils.splitUrlBySlash(this.props.path, routes.length);
    const isActive = _.isEqual(routes.sort(), path.sort());
    return isActive ? 'on' : '';
  }

  hideCreateModal() {
    this.setState({ showCreateModal: false });
  }

  openCreateBlogModal() {
    if (!this.state.showCreateModal) {
      this.setState({ showCreateModal: true });
    }
    $('#createBlogModal').on('hidden.bs.modal', () => {
      // eslint-disable-next-line
      this.hideCreateModal && this.hideCreateModal();
    });

    ModalsFactory.show('createBlogModal');
  }

  goToThisUserPages(str) {
    const { currentUser } = this.state;
    this.context.router.push(`/${currentUser.username}${str}`);
  }

  render() {
    const { currentUser, showCreateModal } = this.state;
    const { isCurrentUser, user } = this.props;
    const username = user ? user.username : '';
    const isCreateArticlePage = this.isActive(['create', username]);
    const momentClasses = `btn btn-default ${this.isActive([username])}`;
    const mineClasses = `btn btn-default ${this.isActive(['mine', username])}`;
    const createClass = `btn btn-default ${isCreateArticlePage}`;
    return (
      <div className="home-right-nav mb-10">
        <Row>
          <Col size="6 pl-0 home-nav-lis">
            <button className={momentClasses} onClick={() => this.goToThisUserPages('')}>Moments</button>
            {isCurrentUser &&
              <button className={mineClasses} onClick={() => this.goToThisUserPages('/mine')}>Mine</button>
            }
            {isCurrentUser &&
              <button className={createClass} onClick={() => this.goToThisUserPages('/create')}>Add article</button>
            }
          </Col>
          <Col size="3 pl-0 home-search">
            <input type="text" className="form-control" />
          </Col>
          <Col size="3 pr-0 tar">
            <button className="btn btn-info sweet-btn" onClick={() => this.openCreateBlogModal()}>Sweet</button>
            {!isCreateArticlePage &&
              <button className="btn btn-primary sweet-btn ml-10" onClick={() => this.goToThisUserPages('/create')}>Article</button>
            }
          </Col>
        </Row>
        <Page>
          <ModalsFactory
            modalref="createBlogModal"
            title="Create a sweet !"
            ModalComponent={BlogModal}
            size="modal-md"
            showHeaderAndFooter={false}
            showModal={showCreateModal}
            currentUser={currentUser} />
        </Page>
      </div>
    );
  }
}

