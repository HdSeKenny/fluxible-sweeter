import React, { PropTypes } from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import sweetAlert from '../../utils/sweetAlert';
import { Link, routerShape } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import { UserStore } from '../../stores';
import { UserActions } from '../../actions';

const Navbar = React.createClass({

    displayName: 'Navbar',

    contextTypes: {
      router: routerShape.isRequired,
      config: PropTypes.object,
      executeAction: React.PropTypes.func.isRequired
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
      if (res.resMsg === 'LOGOUT_SUCCESS') {
        sweetAlert.alertSuccessMessage(res.resMsg);
        this.setState(this.getStateFromStores());
        this.context.router.push('/login');
      }

      if (res.resMsg === 'USER_LOGIN_SUCCESS') {
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

    render() {
      const { authenticated, currentUser } = this.state;
      return (
        <div className="fixed-top-menuzord">
          <div id="menuzord" className="menuzord">
             <Link to="/" className={`menuzord-brand ${this.isActive('/')}`}>Kenny's Blog</Link>
             <ul className="menuzord-menu menuzord-right">
                {!authenticated && <li className={this.isActive('/login')}><Link to="/login">Login</Link></li>}
                {!authenticated && <li className={this.isActive('/register')}><Link to="/register">Register</Link></li>}
                {authenticated &&
                  <li className="user-img">
                    <Link to=''><img src={currentUser.image_url} /></Link>
                    <ul className="dropdown">
                      <li>
                        <Link to={`/user-home/${currentUser.strId}/home`}>
                          <span className="user-span">{currentUser.username}</span>
                          <br />{currentUser.email}
                        </Link>
                      </li>
                      <li onClick={this.handleLogout} ><Link to="" onClick={e => e.preventDefault()}>Logout</Link></li>
                    </ul>
                  </li>
                }
             </ul>
          </div>
        </div>
      );
    }
});

export default Navbar;
