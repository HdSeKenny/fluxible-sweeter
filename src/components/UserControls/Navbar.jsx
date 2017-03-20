import React, { PropTypes } from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { Link, routerShape } from 'react-router';
import $ from 'jquery';
import { UserStore } from '../../stores';
import { UserActions } from '../../actions';
import sweetAlert from '../../utils/sweetAlert';
import menuzord from '../../utils/menuzord';
import { Modals } from '../UI';

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
      authenticated: this.getStore(UserStore).isAuthenticated()
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

  handleLogout(e) {
    e.preventDefault();
    this.executeAction(UserActions.Logout);
  },

  componentDidMount() {
    menuzord($('#menuzord'), {});
  },

  componentDidUpdate() {
    menuzord($('#menuzord'), {});
  },

  componentWillUnmount() {
    Modals.hide('loginModal');
  },

  openLoginModal() {
    Modals.show('loginModal');
  },

  openSignupModal() {

  },

  GoToUserCenter(currentUser) {
    this.context.router.push(`/user-home/${currentUser.strId}/home`);
  },

  render() {
    const { authenticated, currentUser } = this.state;
    return (
      <section className="menuzord-section">
        <header id="menuzord" className="menuzord blue">
          <Link to="/" className={`menuzord-brand ${this.isActive('/')}`}>K.Blog</Link>
          <ul className="menuzord-menu menuzord-right">
            {!authenticated &&
              <li className={`${this.isActive('/signup')}`}>
                <span onClick={this.openSignupModal}>Sign up</span>
              </li>
            }
            {!authenticated &&
              <li className={`${this.isActive('/login')}`}>
                <span onClick={this.openLoginModal}>Log in</span>
              </li>
            }
            {authenticated &&
              <li onClick={this.GoToUserCenter.bind(this, currentUser)}>
                <img alt="currentUser" src={currentUser.image_url} />
                <ul className="dropdown">
                  <li><Link to={`/user-home/${currentUser.strId}/home`}>User center</Link></li>
                  <li><span>Settings</span></li>
                  <li onClick={this.handleLogout} ><span>Logout</span></li>
                </ul>
              </li>
            }
          </ul>
        </header>
        <Modals />
      </section>
    );
  }
});

export default Navbar;
