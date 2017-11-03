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

var Navbar = (0, _createReactClass2.default)({

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

  getInitialState: function getInitialState() {
    return this.getStateFromStores();
  },
  getStateFromStores: function getStateFromStores() {
    return {
      currentUser: this.getStore(_stores.UserStore).getCurrentUser(),
      authenticated: this.getStore(_stores.UserStore).isAuthenticated(),
      brandImage: '/images/sweeter.png',
      showLoginModal: false,
      showSignupModal: false,
      switchModal: {
        modalRef: '',
        state: false
      }
    };
  },
  onChange: function onChange(res) {
    var accountMessages = ['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS', 'USER_REGISTER_FAIL', 'USER_REGISTER_SUCCESS', 'UPLOAD_IMAGE_SUCCESS'];

    if (accountMessages.includes(res.msg)) {
      this.setState(this.getStateFromStores());
    }

    if (res.msg === 'LOGOUT_SUCCESS') {
      this.context.router.push('/');
    }
  },
  isActive: function isActive(routes) {
    // if (this.props.route && this.props.route === routes) return 'active';
    var path = _utils.jsUtils.splitUrlBySlash(this.props.route, routes.length);
    var isActive = _lodash2.default.isEqual(routes.sort(), path.sort());
    return isActive ? 'active' : '';
  },
  userCenterActive: function userCenterActive(username) {
    var path = _utils.jsUtils.splitUrlBySlash(this.props.route);
    var isActive = path.includes(username);
    return isActive ? 'active' : '';
  },
  getRouteSlashPosition: function getRouteSlashPosition(string, word, index) {
    return string.split(word, index).join(word).length;
  },
  handleLogout: function handleLogout() {
    this.executeAction(_actions.UserActions.Logout);
  },
  componentDidMount: function componentDidMount() {
    _utils.animations.sticky_header('.sweet-nav');
  },
  openNavbarModals: function openNavbarModals(modalRef) {
    var _this = this;

    var isLoginModal = modalRef === 'loginModal';
    var isSignupModal = modalRef === 'signupModal';
    var _state = this.state,
        showLoginModal = _state.showLoginModal,
        showSignupModal = _state.showSignupModal;

    if (isLoginModal && !showLoginModal) {
      this.setState({ showLoginModal: true });
    }

    if (isSignupModal && !showSignupModal) {
      this.setState({ showSignupModal: true });
    }

    _UI.ModalsFactory.show(modalRef);

    $('#' + modalRef).on('hidden.bs.modal', function () {
      var switchModal = _this.state.switchModal;

      if (_this.hideNavbarModals) {
        _this.hideNavbarModals(modalRef);
      }
      if (switchModal.state) {
        if (switchModal.modalRef === 'loginModal') {
          _this.setState({ showLoginModal: true });
        }

        if (switchModal.modalRef === 'signupModal') {
          _this.setState({ showSignupModal: true });
        }

        _this.openNavbarModals(switchModal.modalRef);
        _this.setState({ switchModal: { modalRef: '', state: false } });
      }
    });
  },
  hideNavbarModals: function hideNavbarModals(modalRef) {
    var isLoginModal = modalRef === 'loginModal';
    var isSignupModal = modalRef === 'signupModal';
    if (isLoginModal) {
      this.setState({ showLoginModal: false });
    }

    if (isSignupModal) {
      this.setState({ showSignupModal: false });
    }
  },
  switchOpenModal: function switchOpenModal(modalRef) {
    this.setState({ switchModal: { modalRef: modalRef, state: true } });
  },
  goTo: function goTo(route) {
    this.context.router.push(route);
  },
  render: function render() {
    var _this2 = this;

    var _state2 = this.state,
        authenticated = _state2.authenticated,
        currentUser = _state2.currentUser,
        brandImage = _state2.brandImage,
        showLoginModal = _state2.showLoginModal,
        showSignupModal = _state2.showSignupModal;

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
              { className: 'search' },
              _react2.default.createElement(
                'form',
                { className: 'iconic-input' },
                _react2.default.createElement('i', { className: 'fa fa-search' }),
                _react2.default.createElement('input', { type: 'text', className: 'form-control search-input', name: 'keyword', placeholder: 'Search blog...' })
              )
            )
          ),
          _react2.default.createElement(
            'ul',
            { className: 'sweet-nav-menu sweet-nav-right' },
            _react2.default.createElement(
              'li',
              { className: this.isActive(['']) },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' },
                'Home'
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
            ),
            authenticated && _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/about' },
                _react2.default.createElement('i', { className: 'fa fa-2x fa-bell-o m-r-lg m-b-lg' })
              )
            ),
            !authenticated && _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'span',
                { onClick: function onClick() {
                    return _this2.openNavbarModals('loginModal');
                  } },
                'Log in'
              )
            ),
            !authenticated && _react2.default.createElement(
              'li',
              { className: 'mr-0 pr-0' },
              _react2.default.createElement(
                'span',
                { onClick: function onClick() {
                    return _this2.openNavbarModals('signupModal');
                  } },
                'Sign up'
              )
            ),
            authenticated && _react2.default.createElement(
              'li',
              { className: 'mr-0 pr-0' },
              _react2.default.createElement(
                'a',
                { className: 'm-0', href: '/' + currentUser.username },
                _react2.default.createElement('img', { alt: 'currentUser', src: currentUser.image_url })
              ),
              _react2.default.createElement(
                'ul',
                { className: 'dropdown' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: '/' + currentUser.username },
                    'User center'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'a',
                    { href: '/' + currentUser.username + '/personal' },
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
          isModalLogin: true,
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
          isModal: true,
          openNavbarModals: this.openNavbarModals,
          hideNavbarModals: this.hideNavbarModals,
          switchOpenModal: this.switchOpenModal })
      )
    );
  }
});

exports.default = Navbar;
module.exports = exports['default'];