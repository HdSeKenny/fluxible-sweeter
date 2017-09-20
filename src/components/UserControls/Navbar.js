import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import PropTypes from 'prop-types';
import _ from 'lodash';
import CreateReactClass from 'create-react-class';
import { Link, routerShape } from 'react-router';
import { animations, jsUtils } from '../../utils';
import { UserStore } from '../../stores';
import { UserActions } from '../../actions';
import { ModalsFactory, Layout } from '../UI';
import { Login, Signup } from '../Pages';

const Navbar = CreateReactClass({

  displayName: 'Navbar',

  contextTypes: {
    router: routerShape.isRequired,
    config: PropTypes.object,
    executeAction: PropTypes.func
  },

  propTypes: {
    route: PropTypes.string
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      authenticated: this.getStore(UserStore).isAuthenticated(),
      brandImage: '/styles/images/sweeter.png',
      showLoginModal: false,
      showSignupModal: false,
      switchModal: {
        modalRef: '',
        state: false
      }
    };
  },

  onChange(res) {
    const accountMessages = [
      'USER_LOGIN_SUCCESS',
      'LOGOUT_SUCCESS',
      'USER_REGISTER_FAIL',
      'USER_REGISTER_SUCCESS',
      'UPLOAD_IMAGE_SUCCESS'
    ];

    if (accountMessages.includes(res.msg)) {
      this.setState(this.getStateFromStores());
    }

    if (res.msg === 'LOGOUT_SUCCESS') {
      this.context.router.push('/');
    }
  },

  isActive(routes) {
    // if (this.props.route && this.props.route === routes) return 'active';
    const path = jsUtils.splitUrlBySlash(this.props.route, routes.length);
    const isActive = _.isEqual(routes.sort(), path.sort());
    return isActive ? 'active' : '';
  },

  userCenterActive(username) {
    const path = jsUtils.splitUrlBySlash(this.props.route);
    const isActive = path.includes(username);
    return isActive ? 'active' : '';
  },

  getRouteSlashPosition(string, word, index) {
    return string.split(word, index).join(word).length;
  },

  handleLogout() {
    this.executeAction(UserActions.Logout);
  },

  componentDidMount() {
    animations.sticky_header('.sweet-nav');
  },

  openNavbarModals(modalRef) {
    const isLoginModal = modalRef === 'loginModal';
    const isSignupModal = modalRef === 'signupModal';
    const { showLoginModal, showSignupModal } = this.state;
    if (isLoginModal && !showLoginModal) {
      this.setState({ showLoginModal: true });
    }

    if (isSignupModal && !showSignupModal) {
      this.setState({ showSignupModal: true });
    }

    ModalsFactory.show(modalRef);

    $(`#${modalRef}`).on('hidden.bs.modal', () => {
      const { switchModal } = this.state;
      if (this.hideNavbarModals) {
        this.hideNavbarModals(modalRef);
      }
      if (switchModal.state) {
        if (switchModal.modalRef === 'loginModal') {
          this.setState({ showLoginModal: true });
        }

        if (switchModal.modalRef === 'signupModal') {
          this.setState({ showSignupModal: true });
        }

        this.openNavbarModals(switchModal.modalRef);
        this.setState({ switchModal: { modalRef: '', state: false } });
      }
    });
  },

  hideNavbarModals(modalRef) {
    const isLoginModal = modalRef === 'loginModal';
    const isSignupModal = modalRef === 'signupModal';
    if (isLoginModal) {
      this.setState({ showLoginModal: false });
    }

    if (isSignupModal) {
      this.setState({ showSignupModal: false });
    }
  },

  switchOpenModal(modalRef) {
    this.setState({ switchModal: { modalRef, state: true } });
  },

  goTo(route) {
    this.context.router.push(route);
  },

  render() {
    const { authenticated, currentUser, brandImage, showLoginModal, showSignupModal } = this.state;
    return (
      <section className="menuzord-section">
        <header id="menuzord" className="sweet-nav blue">
          <div className="sweet-nav-wrap">
            <Link to="/" className="sweet-nav-brand"><img src={brandImage} alt="brand" height="26" /></Link>
            <ul className="sweet-nav-menu sweet-nav-left">
              <li className="search">
                <form className="iconic-input">
                  <i className="fa fa-search"></i>
                  <input type="text" className="form-control search-input" name="keyword" placeholder="Search blog..." />
                </form>
              </li>
            </ul>
            <ul className="sweet-nav-menu sweet-nav-right">
              <li className={this.isActive([''])}><Link to="/">Home</Link></li>
              <li className={this.isActive(['list'])}><a href="/list">List</a></li>
              <li className={this.isActive(['about'])}><Link to="/about">About</Link></li>
              {authenticated && <li><Link to="/about"><i className="fa fa-2x fa-bell-o m-r-lg m-b-lg" /></Link></li>}
              {!authenticated && <li><span onClick={() => this.openNavbarModals('loginModal')}>Log in</span></li>}
              {!authenticated && <li className="mr-0 pr-0"><span onClick={() => this.openNavbarModals('signupModal')}>Sign up</span></li>}
              {authenticated &&
                <li className="mr-0 pr-0">
                  <a className="m-0" href={`/${currentUser.username}`}>
                    <img alt="currentUser" src={currentUser.image_url} />
                  </a>
                  <ul className="dropdown">
                    <li><a href={`/${currentUser.username}`}>User center</a></li>
                    <li><a href={`/${currentUser.username}/personal`}>Settings</a></li>
                    <li><span onClick={this.handleLogout}>Logout</span></li>
                  </ul>
                </li>
              }
            </ul>
          </div>
        </header>

        <Layout.Page>
          <ModalsFactory
            modalref="loginModal"
            title="Login to account"
            ModalComponent={Login}
            size="modal-md"
            showHeaderAndFooter={true}
            showModal={showLoginModal}
            openNavbarModals={this.openNavbarModals}
            hideNavbarModals={this.hideNavbarModals}
            switchOpenModal={this.switchOpenModal} />
          <ModalsFactory
            modalref="signupModal"
            title="Create an account"
            ModalComponent={Signup}
            size="modal-md"
            showHeaderAndFooter={true}
            showModal={showSignupModal}
            openNavbarModals={this.openNavbarModals}
            hideNavbarModals={this.hideNavbarModals}
            switchOpenModal={this.switchOpenModal} />
        </Layout.Page>
      </section>
    );
  }
});

export default Navbar;
