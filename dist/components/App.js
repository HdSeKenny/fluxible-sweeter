'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UI = require('./UI');

var _actions = require('../actions');

var _stores = require('../stores');

var _UserControls = require('./UserControls');

var _Users = require('./Users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_React$Component) {
  (0, _inherits3.default)(App, _React$Component);

  function App(props, context) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

    _this._onStoreChange = _this._onStoreChange.bind(_this);
    _this.context = context;
    _this.state = {
      showMessages: false,
      usernames: context.getStore(_stores.UserStore).getUsernames()
    };
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        $('.loading').addClass('hide');
      });

      this.context.getStore(_stores.UserStore).addChangeListener(this._onStoreChange);
      socket.emit('users', this.state.usernames);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.getStore(_stores.UserStore).removeChangeListener(this._onStoreChange);
    }
  }, {
    key: '_onStoreChange',
    value: function _onStoreChange(res) {
      if (res.msg === 'ADD_MESSAGE_CONNECTION_SUCCESS') {
        this.setState({ showMessages: true });
      }
    }
  }, {
    key: 'hideMessages',
    value: function hideMessages() {
      this.setState({ showMessages: false });
    }
  }, {
    key: 'onAppClick',
    value: function onAppClick(e) {
      var isInsideChatBox = $(e.target).parents('.chat-box').size() !== 0;
      var isInsideSmallBox = $(e.target).parents('.small-chat-box').size() !== 0;
      var chatBox = document.getElementsByClassName('chat-box');
      var smallChatBox = document.getElementsByClassName('small-chat-box');
      var messageBtn = document.getElementsByClassName('message-btn');
      var hasMessagBox = document.documentElement.contains(chatBox[0]);
      var hasSmallBoxx = document.documentElement.contains(smallChatBox[0]);
      var isUserBarMessageBtn = e.target === messageBtn[0];
      if (hasMessagBox && !isInsideChatBox && !isUserBarMessageBtn) {
        this.setState({ showMessages: false });
      }

      if (hasSmallBoxx && isInsideSmallBox) {
        this.setState({ showMessages: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var route = this.props.location.pathname;
      var child = _react2.default.cloneElement(this.props.children, { location: this.props.location });
      var routerName = child.type.displayName;
      var hideNavbarAndFooter = routerName === 'Signup' || routerName === 'Login';
      return _react2.default.createElement(
        _UI.FullScreen,
        { id: 'app', onClick: function onClick(e) {
            return _this2.onAppClick(e);
          } },
        !hideNavbarAndFooter && _react2.default.createElement(_UserControls.Navbar, { route: route }),
        _react2.default.createElement(
          'div',
          { className: 'content-pages' },
          child
        ),
        _react2.default.createElement(_Users.Messages, { showMessages: this.state.showMessages, hideMessages: function hideMessages() {
            return _this2.hideMessages();
          } }),
        !hideNavbarAndFooter && _react2.default.createElement(_UserControls.Footer, null)
      );
    }
  }]);
  return App;
}(_react2.default.Component);

App.displayName = 'App';
App.contextTypes = {
  getStore: _propTypes2.default.func
};
App.propTypes = {
  location: _propTypes2.default.object,
  children: _propTypes2.default.object
};

App.fetchData = function (context, params, query, done) {
  _promise2.default.all([context.executeAction(_actions.UserActions.LoadUsers, params), context.executeAction(_actions.BlogActions.LoadBlogs, params)]).then(function () {
    done();
  });
};

exports.default = App;
module.exports = exports['default'];