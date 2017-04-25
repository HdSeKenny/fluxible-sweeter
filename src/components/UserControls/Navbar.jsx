import React, { PropTypes } from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import $ from 'jquery';
import { Link, routerShape } from 'react-router';
import sweetAlert from '../../utils/sweetAlert';
import menuzord from '../../utils/menuzord';
import { UserStore } from '../../stores';
import { UserActions } from '../../actions';
import { ModalsFactory, Layout } from '../UI';
import { Login, signup } from '../Pages';
import BlogModal from './BlogModal';

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
    // menuzord($('#menuzord'), {});
  },

  componentDidUpdate() {
    // menuzord($('#menuzord'), {});
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

  openCreateBlogModal() {
    ModalsFactory.show('createBlogModal');
  },

  GoToUserCenter(currentUser) {
    this.context.router.push(`/user-home/${currentUser.strId}/home`);
  },

  render() {
    const { authenticated, currentUser } = this.state;
    return (
      <section className="menuzord-section">
        <header id="menuzord" className="sweet-nav blue">
          <div className="sweet-nav-wrap">
            <Link to="/" className={`sweet-nav-brand ${this.isActive('/')}`}>Sweeter</Link>
            <ul className="sweet-nav-menu sweet-nav-right">
              <li className="sweet-nav-search">
                <form className="search-content" action="#" method="post">
                  <div className="iconic-input">
                    <i className="fa fa-search"></i>
                    <input type="text" className="form-control" name="keyword" placeholder="Search..." />
                  </div>
                </form>
              </li>
              <li className="sweet-nav-blog">
                <button className="btn btn-info btn-block" onClick={this.openCreateBlogModal}>
                  <i className="fa fa-pencil"></i> Sweet
                </button>
              </li>

              <li className={`${this.isActive('/AllBlogs')}`}>
                <Link to="/AllBlogs">Moments</Link>
              </li>
              <li><a href="javascript:void(0)">Dropdown</a>
                <ul className="dropdown">
                  <li><a href="#">Programming</a></li>
                  <li><a href="#">Hosting</a></li>
                  <li><a href="#">Design</a></li>
                  <li><a href="#">Vectors</a></li>
                  <li><a href="#">Web development</a>
                    <ul className="dropdown">
                      <li><a href="#">.NET</a></li>
                      <li><a href="#">Magento</a></li>
                      <li><a href="#">Joomla</a></li>
                      <li><a href="#">MODX</a></li>
                      <li><a href="#">Wordpress</a></li>
                      <li><a href="#">Ruby on Rails</a></li>
                      <li><a href="#">Mobile</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Folders</a></li>
                  <li><a href="#">Business cards</a></li>
                </ul>
              </li>
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
                <li className="">
                  <img alt="currentUser" src={currentUser.image_url} />
                  <ul className="dropdown">
                    <li><Link to={`/user-home/${currentUser.strId}/home`}>User center</Link></li>
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
          <ModalsFactory modalref="signupModal" title="Sign up" ModalComponent={signup} size="modal-md" showHeaderAndFooter={true} />
          <ModalsFactory modalref="createBlogModal" title="Create a sweet !" ModalComponent={BlogModal} size="modal-md" showHeaderAndFooter={false} />
        </Layout.Page>
      </section>
    );
  }
});

export default Navbar;
