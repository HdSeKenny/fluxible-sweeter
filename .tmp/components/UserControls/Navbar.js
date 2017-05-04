'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _reactRouter = require('react-router');

var _utils = require('../../utils');

var _stores = require('../../stores');

var _actions = require('../../actions');

var _UI = require('../UI');

var _Pages = require('../Pages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Navbar = _react2.default.createClass({

  displayName: 'Navbar',

  contextTypes: {
    router: _reactRouter.routerShape.isRequired,
    config: _react.PropTypes.object,
    executeAction: _react.PropTypes.func
  },

  propTypes: {
    route: _react.PropTypes.string
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
      grayUserImageUrl: '/styles/images/users/gray-user.png'
    };
  },
  onChange: function (res) {
    if (['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS'].includes(res.resMsg)) {
      _utils.sweetAlert.alertSuccessMessage(res.resMsg);
      this.setState(this.getStateFromStores());
    }
  },
  isActive: function (route) {
    return route === this.props.route ? 'active' : '';
  },
  isHomeActive: function (route) {
    const currentRoute = this.props.route;
    const secondSlash = this.getRouteSlashPosition(currentRoute, '/', 2);
    return route === currentRoute.substring(secondSlash + 1) ? 'active' : '';
  },
  getRouteSlashPosition: function (string, word, index) {
    return string.split(word, index).join(word).length;
  },
  handleLogout: function (e) {
    e.preventDefault();
    this.executeAction(_actions.UserActions.Logout);
  },
  componentDidMount: function () {
    _utils.animations.sticky_header('.sweet-nav');
  },
  componentDidUpdate: function () {},
  componentWillUnmount: function () {
    _UI.ModalsFactory.hide('loginModal');
    _UI.ModalsFactory.hide('signupModal');
  },
  openLoginModal: function () {
    _UI.ModalsFactory.show('loginModal');
  },
  openSignupModal: function () {
    _UI.ModalsFactory.show('signupModal');
  },
  render: function () {
    const { authenticated: authenticated, currentUser: currentUser, grayUserImageUrl: grayUserImageUrl } = this.state;
    return _react2.default.createElement(
      'section',
      { className: 'menuzord-section' },
      _react2.default.createElement('header', { className: 'hidden-header' }),
      _react2.default.createElement(
        'header',
        { id: 'menuzord', className: 'sweet-nav blue' },
        _react2.default.createElement(
          'div',
          { className: 'sweet-nav-wrap' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/', className: `sweet-nav-brand ${this.isActive('/')}` },
            'Sweeter'
          ),
          _react2.default.createElement(
            'ul',
            { className: 'sweet-nav-menu sweet-nav-left' },
            _react2.default.createElement(
              'li',
              { className: `${this.isActive('/list')}` },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/list' },
                'Moments'
              )
            ),
            authenticated && _react2.default.createElement(
              'li',
              { className: `${this.isHomeActive('home')}` },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: `/${currentUser.username}/home` },
                'Personal'
              )
            )
          ),
          _react2.default.createElement(
            'ul',
            { className: 'sweet-nav-menu sweet-nav-right' },
            !authenticated && _react2.default.createElement(
              'li',
              { className: 'mr-0' },
              _react2.default.createElement('img', { alt: 'gray-user', src: grayUserImageUrl }),
              _react2.default.createElement(
                'ul',
                { className: 'dropdown' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    { onClick: this.openLoginModal },
                    'Log in'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    'span',
                    { onClick: this.openSignupModal },
                    'Sign up'
                  )
                )
              )
            ),
            authenticated && _react2.default.createElement(
              'li',
              { className: 'm-0' },
              _react2.default.createElement('img', { alt: 'currentUser', src: currentUser.image_url }),
              _react2.default.createElement(
                'ul',
                { className: 'dropdown' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: `/${currentUser.username}/home` },
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
                  { onClick: this.handleLogout },
                  _react2.default.createElement(
                    'span',
                    null,
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
        _react2.default.createElement(_UI.ModalsFactory, { modalref: 'loginModal', title: 'Login to account', ModalComponent: _Pages.Login, size: 'modal-md', showHeaderAndFooter: true }),
        _react2.default.createElement(_UI.ModalsFactory, { modalref: 'signupModal', title: 'Sign up', ModalComponent: _Pages.signup, size: 'modal-md', showHeaderAndFooter: true })
      )
    );
  }
});

exports.default = Navbar;
module.exports = exports['default'];
