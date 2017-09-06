'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stores = require('../../../stores');

var _actions = require('../../../actions');

var _Layout = require('../../UI/Layout');

var _plugins = require('../../../plugins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ChatBox component - Kenny
 *
 * @export
 * @class ChatBox
 * @extends {React.Component}
 */
class ChatBox extends _react2.default.Component {

  constructor(props, context) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.UserStore = context.getStore(_stores.UserStore);
    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    this.UserStore.addChangeListener(this._onStoreChange);
    this.jumpToMessagsBottom();
  }

  componentWillUnmount() {
    this.UserStore.removeChangeListener(this._onStoreChange);
  }

  componentDidUpdate() {
    this.jumpToMessagsBottom();
  }

  _onStoreChange() {}

  onMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  jumpToMessagsBottom() {
    let chatScrollTop = $('.chat')[0].scrollTop;
    const chatScrollHeight = $('.chat')[0].scrollHeight;

    if (chatScrollTop !== chatScrollHeight) {
      chatScrollTop = chatScrollHeight;
    }
  }

  toggleChatBox() {
    this.props.hideMessages();
  }

  setActiveUser(thisUserId) {
    this.UserStore.setActiveUser(thisUserId);
    $('.chat')[0].scrollTop = $('.chat')[0].scrollHeight;
  }

  getActiveUser() {
    this.UserStore.getActiveUserId();
  }

  hasActiveUser(connections, activeUserId) {
    return connections.findIndex(c => c.this_user_id === activeUserId) >= 0;
  }

  closeUserConnection(thisUserId) {
    this.context.executeAction(_actions.UserActions.closeUserConnection, {
      myId: this.props.currentUser.id_str,
      thisUserId: thisUserId
    });
  }

  onSubmitMessage(e) {
    e.preventDefault();
    this.sendMessage();
  }

  sendMessage() {
    const msg = this.state.message.trim();
    const now = new Date();
    const { activeUser: activeUser, localChat: localChat, currentUser: currentUser } = this.props;
    if (!msg) {
      return _plugins.swal.warning('Invalid message!');
    }
    const newMessage = {
      content: msg,
      date: now,
      user_to: activeUser,
      user_from: currentUser.id_str,
      class: 'me'
    };

    const connections = localChat.recent_chat_connections;
    const thisUserConnect = connections.find(c => c.this_user_id === activeUser);
    thisUserConnect.messages.push(newMessage);

    this.setState({ message: '' }, () => {
      this.UserStore.setUserConnection(localChat);
      socket.emit('message:send', newMessage);
    });
  }

  _renderConnectionMessage(currentUser, activeUserId, localChat) {
    const connections = localChat.recent_chat_connections;
    const currentConnect = connections.find(c => c.this_user_id === activeUserId);
    const thisUser = this.UserStore.getUserById(activeUserId);
    const { connect_date: connect_date, messages: messages } = currentConnect;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _Layout.Row,
        { className: 'top' },
        _react2.default.createElement(
          _Layout.Col,
          { size: '8 p-0' },
          _react2.default.createElement(
            'h4',
            { className: 'm-0' },
            _react2.default.createElement(
              'i',
              null,
              thisUser.username
            )
          )
        ),
        _react2.default.createElement(
          _Layout.Col,
          { size: '4 tar p-0' },
          _react2.default.createElement(
            'span',
            { className: 'close-box', onClick: () => this.toggleChatBox() },
            '\xD7'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'chat' },
        _react2.default.createElement(
          'div',
          { className: 'conversation-start' },
          _react2.default.createElement(
            'span',
            null,
            connect_date
          )
        ),
        messages.map((msg, idx) => _react2.default.createElement(
          'div',
          { className: `bubble ${msg.class}`, key: idx },
          msg.content
        ))
      )
    );
  }

  _renderPeopleList(currentUser, activeUserId, localChat) {
    const connections = localChat.recent_chat_connections;
    if (!connections.length) return null;
    const hasActiveUser = this.hasActiveUser(connections, activeUserId);
    return _react2.default.createElement(
      'ul',
      { className: 'people' },
      connections.map((connection, index) => {
        const thisUserId = connection.this_user_id;
        const thisUser = this.UserStore.getUserById(thisUserId);
        const { username: username, last_msg_date: last_msg_date, image_url: image_url } = thisUser;
        const isActive = activeUserId === thisUserId;
        const isAdmin = thisUser.role === 'admin';
        let classes = isActive ? 'person active' : 'person';
        if (!hasActiveUser && index === 0) {
          classes = 'person active';
          this.setActiveUser(thisUserId);
        }
        return _react2.default.createElement(
          _Layout.Row,
          { className: classes, key: index },
          _react2.default.createElement(
            _Layout.Col,
            { size: '10 p-0', onClick: () => this.setActiveUser(thisUserId) },
            _react2.default.createElement(
              _Layout.Col,
              { size: '4 p-0' },
              _react2.default.createElement('img', { src: image_url, alt: 'chat-user', width: '30' })
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '8 p-0' },
              _react2.default.createElement(
                _Layout.Row,
                { className: 'name' },
                _react2.default.createElement(
                  'span',
                  null,
                  username
                )
              ),
              _react2.default.createElement(
                _Layout.Row,
                { className: 'time' },
                _react2.default.createElement(
                  'span',
                  null,
                  last_msg_date
                )
              )
            )
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '2 p-0 tar' },
            _react2.default.createElement(
              _Layout.Row,
              { className: isAdmin ? 'close-connect admin' : 'close-connect user' },
              _react2.default.createElement(
                'span',
                { onClick: () => this.closeUserConnection(thisUserId) },
                '\xD7'
              )
            )
          )
        );
      })
    );
  }

  render() {
    const { currentUser: currentUser, activeUser: activeUser, localChat: localChat } = this.props;
    const { message: message } = this.state;

    if (!currentUser) return null;
    return _react2.default.createElement(
      'div',
      { className: 'chat-box' },
      _react2.default.createElement(
        'div',
        { className: 'wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'left' },
          _react2.default.createElement(
            'div',
            { className: 'top' },
            _react2.default.createElement('input', { type: 'text' })
          ),
          this._renderPeopleList(currentUser, activeUser, localChat)
        ),
        _react2.default.createElement(
          'div',
          { className: 'right' },
          this._renderConnectionMessage(currentUser, activeUser, localChat),
          _react2.default.createElement(
            'div',
            { className: 'write' },
            _react2.default.createElement(
              _Layout.Row,
              { className: '' },
              _react2.default.createElement(
                _Layout.Col,
                { size: '9 p-0' },
                _react2.default.createElement(
                  'form',
                  { onSubmit: this.onSubmitMessage.bind(this) },
                  _react2.default.createElement('input', { onChange: e => this.onMessageChange(e), value: message })
                )
              ),
              _react2.default.createElement(
                _Layout.Col,
                { size: '3 p-0 tar' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-info send', onClick: () => this.sendMessage() },
                  _react2.default.createElement('i', { className: 'fa fa-paper-plane mr-5', 'aria-hidden': 'true' }),
                  'Send'
                )
              )
            )
          )
        )
      )
    );
  }
}
exports.default = ChatBox;
ChatBox.displayName = 'ChatBox';
ChatBox.contextTypes = {
  getStore: _propTypes2.default.func,
  executeAction: _propTypes2.default.func
};
ChatBox.propTypes = {
  currentUser: _propTypes2.default.object,
  hideMessages: _propTypes2.default.func,
  activeUser: _propTypes2.default.string,
  localChat: _propTypes2.default.object
};
module.exports = exports['default'];
