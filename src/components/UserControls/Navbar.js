import React, { PropTypes } from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Link, routerShape } from 'react-router';
import { sweetAlert, animations } from '../../utils';
import { UserStore } from '../../stores';
import { UserActions } from '../../actions';
import { ModalsFactory, Layout } from '../UI';
import { Login, Signup } from '../Pages';

const Navbar = React.createClass({

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
      grayUserImageUrl: '/styles/images/users/gray-user.png',
      brandImage: 'styles/images/sweeter.png'
    };
  },

  onChange(res) {
    if (['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS'].includes(res.resMsg)) {
      sweetAlert.alertSuccessMessage(res.resMsg);
      this.setState(this.getStateFromStores());
    }
  },

  isActive(route) {
    return (route === this.props.route) ? 'active' : '';
  },

  isHomeActive(route) {
    const currentRoute = this.props.route;
    const secondSlash = this.getRouteSlashPosition(currentRoute, '/', 2);
    return route === currentRoute.substring(secondSlash + 1) ? 'active' : '';
  },

  getRouteSlashPosition(string, word, index) {
    return string.split(word, index).join(word).length;
  },

  handleLogout(e) {
    e.preventDefault();
    this.executeAction(UserActions.Logout);
  },

  componentDidMount() {
    animations.sticky_header('.sweet-nav');
  },

  componentDidUpdate() {

  },

  componentWillUnmount() {
    ModalsFactory.hide('loginModal');
    ModalsFactory.hide('signupModal');
  },

  openLoginModal() {
    ModalsFactory.show('loginModal');
  },

  openSignupModal() {
    ModalsFactory.show('signupModal');
  },

  render() {
    const { authenticated, currentUser, grayUserImageUrl, brandImage } = this.state;
    return (
      <section className="menuzord-section">
        <header className="hidden-header" />
        <header id="menuzord" className="sweet-nav blue">
          <div className="sweet-nav-wrap">
            <Link to="/" className="sweet-nav-brand">
              <img src={brandImage} alt="brand" height="26" />
            </Link>
            <ul className="sweet-nav-menu sweet-nav-left">
              <li className={`${this.isActive('/list')}`}>
                <Link to="/list">Moments</Link>
              </li>
              {authenticated &&
                <li className={this.isHomeActive('home')}>
                  <Link to={`/${currentUser.username}/home`}>Personal</Link>
                </li>
              }
            </ul>
            <ul className="sweet-nav-menu sweet-nav-right">
              <li className={this.isActive('about')}>
                <Link to="/about">About</Link>
              </li>
              <li className={this.isHomeActive('contact')}>
                <Link to="/contact">Contact</Link>
              </li>
              {!authenticated &&
                <li className="mr-0">
                  <img alt="gray-user" src={grayUserImageUrl} />
                  <ul className="dropdown">
                    <li><span onClick={this.openLoginModal}>Log in</span></li>
                    <li><span onClick={this.openSignupModal}>Sign up</span></li>
                  </ul>
                </li>
              }

              {authenticated &&
                <li className="mr-0">
                  <img alt="currentUser" src={currentUser.image_url} />
                  <ul className="dropdown">
                    <li><Link to={`/${currentUser.username}/home`}>User center</Link></li>
                    <li><span>Settings</span></li>
                    <li onClick={this.handleLogout}><span>Logout</span></li>
                  </ul>
                </li>
              }
            </ul>
          </div>
        </header>
        <Layout.Page>
          <ModalsFactory modalref="loginModal" title="Login to account" ModalComponent={Login} size="modal-md" showHeaderAndFooter={true} />
          <ModalsFactory modalref="signupModal" title="Sign up" ModalComponent={Signup} size="modal-md" showHeaderAndFooter={true} />
        </Layout.Page>
      </section>
    );
  }
});

export default Navbar;
