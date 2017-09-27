'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props, context) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this._onStoreChange = _this._onStoreChange.bind(_this);
    _this.context = context;
    _this.state = {
      showMessages: false,
      usernames: context.getStore(_stores.UserStore).getUsernames()
    };
    return _this;
  }

  _createClass(App, [{
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
      var showMainSliders = child.type.displayName === 'Home';
      return _react2.default.createElement(
        _UI.FullScreen,
        { id: 'app', onClick: function onClick(e) {
            return _this2.onAppClick(e);
          } },
        _react2.default.createElement(_UserControls.Navbar, { route: route }),
        showMainSliders && _react2.default.createElement(_UI.MainSliders, { show: showMainSliders }),
        _react2.default.createElement(
          'div',
          { className: 'content-pages' },
          child
        ),
        _react2.default.createElement(_Users.Messages, { showMessages: this.state.showMessages, hideMessages: function hideMessages() {
            return _this2.hideMessages();
          } }),
        _react2.default.createElement(_UserControls.Footer, null)
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
  Promise.all([context.executeAction(_actions.UserActions.LoadUsers, params), context.executeAction(_actions.BlogActions.LoadBlogs, params)]).then(function () {
    done();
  });
};

exports.default = App;
module.exports = exports['default'];