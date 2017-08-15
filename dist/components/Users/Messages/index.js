'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _fluxibleAddonsReact = require('fluxible-addons-react');

var _utils = require('../../../utils');

var _plugins = require('../../../plugins');

var _actions = require('../../../actions');

var _stores = require('../../../stores');

var _Layout = require('../../UI/Layout');

var _ChatBox = require('./ChatBox');

var _ChatBox2 = _interopRequireDefault(_ChatBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Messages extends _react2.default.Component {

  constructor(props, context) {
    super(props);

    this.focus = () => {
      this.editor.focus();
    };

    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      currentUser: context.getStore(_stores.UserStore).getCurrentUser(),
      showChatBox: false
    };
  }

  componentDidMount() {
    this.context.getStore(_stores.UserStore).addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    this.context.getStore(_stores.UserStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    const authMessages = ['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS', 'ADD_MESSAGE_CONNECTION_SUCCESS'];
    const currentUser = this.context.getStore(_stores.UserStore).getCurrentUser();
    const result = {
      currentUser: currentUser
    };

    if (authMessages.includes(res.msg)) {
      if (res.msg === 'ADD_MESSAGE_CONNECTION_SUCCESS') {
        result.showChatBox = true;
      }

      this.setState(result);
    }
  }

  toggleChatBox() {
    this.setState({ showChatBox: !this.state.showChatBox });
  }

  render() {
    const { currentUser: currentUser, showChatBox: showChatBox } = this.state;
    if (!currentUser) return null;

    return _react2.default.createElement(
      'div',
      { className: 'messages' },
      !showChatBox && _react2.default.createElement(
        _Layout.Row,
        null,
        _react2.default.createElement(
          _Layout.Col,
          { size: '2 p-0 msg-event', onClick: () => this.toggleChatBox() },
          _react2.default.createElement('i', { className: 'fa fa-envelope' })
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '8 p-0 msg-event', onClick: () => this.toggleChatBox() },
          _react2.default.createElement(
            'p',
            null,
            'Chat Messages 0'
          )
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '2 pr-0 msg-event' },
          _react2.default.createElement(
            'p',
            { className: 'close-message' },
            '\xD7'
          )
        )
      ),
      showChatBox && _react2.default.createElement(_ChatBox2.default, {
        toggleChatBox: () => this.toggleChatBox(),
        currentUser: currentUser
      })
    );
  }
}
exports.default = Messages;
Messages.displayName = 'Messages';
Messages.contextTypes = {
  getStore: _propTypes2.default.func,
  executeAction: _propTypes2.default.func
};
Messages.propTypes = {
  currentUser: _propTypes2.default.object,
  user: _propTypes2.default.object,
  query: _propTypes2.default.object,
  isCurrentUser: _propTypes2.default.bool
};
module.exports = exports['default'];
