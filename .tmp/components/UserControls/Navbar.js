'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _reactRouter = require('react-router');

var _utils = require('../../utils');

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _Pages = require('../Pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Navbar = (0, _createReactClass2.default)({

  displayName: 'Navbar',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    config: _propTypes2.default.object,
    executeAction: _propTypes2.default.func
  },

  propTypes: {
    route: _propTypes2.default.string
  },

  mixins: [_FluxibleMixin2.default],

  statics: {
    storeListeners: [_stores.UserStore]
  },

  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      authenticated: this.getStore(_stores.UserStore).isAuthenticated(),
      grayUserImageUrl: '/styles/images/users/gray-user.png',
      brandImage: '/styles/images/sweeter.png',
      showLoginModal: false,
      showSignupModal: false,
      switchModal: {
        modalRef: '',
        state: false
      }
    };
  },
  onChange: function (res) {
    const accountMessages = ['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS', 'USER_REGISTER_FAIL', 'USER_REGISTER_SUCCESS', 'UPLOAD_IMAGE_SUCCESS'];

    if (accountMessages.includes(res.msg)) {
      this.setState(this.getStateFromStores());
    }

    if (res.msg === 'LOGOUT_SUCCESS') {
      this.context.router.push('/');
    }
  },
  isActive: function (routes) {
    const path = _utils.jsUtils.splitUrlBySlash(this.props.route, routes.length);
    const isActive = _lodash2.default.isEqual(routes.sort(), path.sort());
    return isActive ? 'active' : '';
  },
  userCenterActive: function (username) {
    const path = _utils.jsUtils.splitUrlBySlash(this.props.route);
    const isActive = path.includes(username);
    return isActive ? 'active' : '';
  },
  getRouteSlashPosition: function (string, word, index) {
    return string.split(word, index).join(word).length;
  },
  handleLogout: function () {
    this.executeAction(_actions.UserActions.Logout);
  },
  componentDidMount: function () {
    _utils.animations.sticky_header('.sweet-nav');
  },
  openNavbarModals: function (modalRef) {
    const isLoginModal = modalRef === 'loginModal';
    const isSignupModal = modalRef === 'signupModal';
    const { showLoginModal: showLoginModal, showSignupModal: showSignupModal } = this.state;
    if (isLoginModal && !showLoginModal) {
      this.setState({ showLoginModal: true });
    }

    if (isSignupModal && !showSignupModal) {
      this.setState({ showSignupModal: true });
    }

    _UI.ModalsFactory.show(modalRef);

    $(`#${modalRef}`).on('hidden.bs.modal', () => {
      const { switchModal: switchModal } = this.state;
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
  hideNavbarModals: function (modalRef) {
    const isLoginModal = modalRef === 'loginModal';
    const isSignupModal = modalRef === 'signupModal';
    if (isLoginModal) {
      this.setState({ showLoginModal: false });
    }

    if (isSignupModal) {
      this.setState({ showSignupModal: false });
    }
  },
  switchOpenModal: function (modalRef) {
    this.setState({ switchModal: { modalRef: modalRef, state: true } });
  },
  render: function () {
    const { authenticated: authenticated, currentUser: currentUser, grayUserImageUrl: grayUserImageUrl, brandImage: brandImage, showLoginModal: showLoginModal, showSignupModal: showSignupModal } = this.state;
    return _react2.default.createElement(
      'section',
      { className: 'menuzord-section' },
      _react2.default.createElement(
        'header',
        { id: 'menuzord', className: 'sweet-nav blue' },
        _react2.default.createElement(
          'div',
          { className: 'sweet-nav-wrap' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/', className: 'sweet-nav-brand' },
            _react2.default.createElement('img', { src: brandImage, alt: 'brand', height: '26' })
          ),
          _react2.default.createElement(
            'ul',
            { className: 'sweet-nav-menu sweet-nav-left' },
            _react2.default.createElement(
              'li',
              { className: this.isActive(['list']) },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/list' },
                'List'
              )
            ),
            authenticated && _react2.default.createElement(
              'li',
              { className: this.userCenterActive(currentUser.username) },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: `/${currentUser.username}` },
                'Personal'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: this.isActive(['about']) },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/about' },
                'About'
              )
            )
          ),
          _react2.default.createElement(
            'ul',
            { className: 'sweet-nav-menu sweet-nav-right' },
            !authenticated && _react2.default.createElement(
              'li',
              { className: 'mr-0 pr-0 pl-20' },
              _react2.default.createElement('img', { alt: 'gray-user', src: grayUserImageUrl }),
              _react2.default.createElement(
                'ul',
                { className: 'dropdown' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    { onClick: () => this.openNavbarModals('loginModal') },
                    'Log in'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    { onClick: () => this.openNavbarModals('signupModal') },
                    'Sign up'
                  )
                )
              )
            ),
            authenticated && _react2.default.createElement(
              'li',
              { className: 'mr-0 pr-0' },
              _react2.default.createElement('img', { alt: 'currentUser', src: currentUser.image_url }),
              _react2.default.createElement(
                'ul',
                { className: 'dropdown' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: `/${currentUser.username}` },
                    'User center'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    null,
                    'Settings'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    { onClick: this.handleLogout },
                    'Logout'
                  )
                )
              )
            )
          )
        )
      ),
      _react2.default.createElement(
        _UI.Layout.Page,
        null,
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'loginModal',
          title: 'Login to account',
          ModalComponent: _Pages.Login,
          size: 'modal-md',
          showHeaderAndFooter: true,
          showModal: showLoginModal,
          openNavbarModals: this.openNavbarModals,
          hideNavbarModals: this.hideNavbarModals,
          switchOpenModal: this.switchOpenModal }),
        _react2.default.createElement(_UI.ModalsFactory, {
          modalref: 'signupModal',
          title: 'Create an account',
          ModalComponent: _Pages.Signup,
          size: 'modal-md',
          showHeaderAndFooter: true,
          showModal: showSignupModal,
          openNavbarModals: this.openNavbarModals,
          hideNavbarModals: this.hideNavbarModals,
          switchOpenModal: this.switchOpenModal })
      )
    );
  }
});

exports.default = Navbar;
module.exports = exports['default'];
