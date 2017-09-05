'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

class App extends _react2.default.Component {

  constructor(props, context) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.context = context;
    this.state = {
      showMessages: false,
      usernames: context.getStore(_stores.UserStore).getUsernames()
    };
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.loading').addClass('hide');
    });

    this.context.getStore(_stores.UserStore).addChangeListener(this._onStoreChange);
    socket.emit('users', this.state.usernames);
  }

  componentWillUnmount() {
    this.context.getStore(_stores.UserStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    if (res.msg === 'ADD_MESSAGE_CONNECTION_SUCCESS') {
      this.setState({ showMessages: true });
    }
  }

  hideMessages() {
    this.setState({ showMessages: false });
  }

  onAppClick(e) {
    const isInsideChatBox = $(e.target).parents('.chat-box').size() !== 0;
    const isInsideSmallBox = $(e.target).parents('.small-chat-box').size() !== 0;
    const chatBox = document.getElementsByClassName('chat-box');
    const smallChatBox = document.getElementsByClassName('small-chat-box');
    const messageBtn = document.getElementsByClassName('message-btn');
    const hasMessagBox = document.documentElement.contains(chatBox[0]);
    const hasSmallBoxx = document.documentElement.contains(smallChatBox[0]);
    const isUserBarMessageBtn = e.target === messageBtn[0];
    if (hasMessagBox && !isInsideChatBox && !isUserBarMessageBtn) {
      this.setState({ showMessages: false });
    }

    if (hasSmallBoxx && isInsideSmallBox) {
      this.setState({ showMessages: true });
    }
  }

  render() {
    const route = this.props.location.pathname;
    const child = _react2.default.cloneElement(this.props.children, { location: this.props.location });
    const showMainSliders = child.type.displayName === 'Home';
    return _react2.default.createElement(
      _UI.FullScreen,
      { id: 'app', onClick: e => this.onAppClick(e) },
      _react2.default.createElement(_UserControls.Navbar, { route: route }),
      showMainSliders && _react2.default.createElement(_UI.MainSliders, { show: showMainSliders }),
      _react2.default.createElement(
        'div',
        { className: 'content-pages' },
        child
      ),
      _react2.default.createElement(_Users.Messages, { showMessages: this.state.showMessages, hideMessages: () => this.hideMessages() }),
      _react2.default.createElement(_UserControls.Footer, null)
    );
  }
}
exports.default = App;
App.displayName = 'App';
App.contextTypes = {
  getStore: _propTypes2.default.func
};
App.propTypes = {
  location: _propTypes2.default.object,
  children: _propTypes2.default.object
};

App.fetchData = (context, params, query, done) => {
  Promise.all([context.executeAction(_actions.UserActions.LoadUsers, params), context.executeAction(_actions.BlogActions.LoadBlogs, params)]).then(() => {
    done();
  });
};

module.exports = exports['default'];
