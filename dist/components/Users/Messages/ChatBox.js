'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stores = require('../../../stores');

var _Layout = require('../../UI/Layout');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ChatBox extends _react2.default.Component {

  constructor(props, context) {
    super(props);

    this.focus = () => {
      this.editor.focus();
    };

    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      activeUserId: context.getStore(_stores.UserStore).getActiveUserId()
    };
  }

  componentDidMount() {
    this.context.getStore(_stores.UserStore).addChangeListener(this._onStoreChange);

    const chatBox = document.getElementsByClassName('chat')[0];
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  componentWillUnmount() {
    this.context.getStore(_stores.UserStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    if (res.msg && res.msg === 'ADD_MESSAGE_CONNECTION_SUCCESS') {
      this.setState({
        activeUserId: res.connection.this_user_id
      });
    }
  }

  toggleChatBox() {
    this.props.toggleChatBox();
  }

  setActiveUser(thisUserId) {
    this.context.getStore(_stores.UserStore).setActiveUserId(thisUserId);
    this.setState({ activeUserId: thisUserId });
  }

  getActiveUser() {
    this.context.getStore(_stores.UserStore).getActiveUserId();
  }

  hasActiveUser(connections, activeUserId) {
    const idx = connections.findIndex(c => c.this_user_id === activeUserId);
    return idx >= 0;
  }

  _renderPeopleList(currentUser, activeUserId) {
    const connections = currentUser.recent_chat_connections;
    if (!connections.length) return null;
    const hasActiveUser = this.hasActiveUser(connections, activeUserId);
    return _react2.default.createElement(
      'ul',
      { className: 'people' },
      connections.map((connection, index) => {
        const thisUserId = connection.this_user_id;
        const thisUser = this.context.getStore(_stores.UserStore).getUserById(thisUserId);
        const { username: username, last_msg_date: last_msg_date, image_url: image_url } = thisUser;
        const isActive = activeUserId === thisUserId;
        let classes = isActive ? 'person active' : 'person';
        if (!hasActiveUser && index === 0) {
          classes = 'person active';
          this.setActiveUser(thisUserId);
        }
        return _react2.default.createElement(
          _Layout.Row,
          { className: classes, key: index, onClick: () => this.setActiveUser(thisUserId) },
          _react2.default.createElement(
            _Layout.Col,
            { size: '3 p-0' },
            _react2.default.createElement('img', { src: image_url, alt: 'chat-user', width: '40' })
          ),
          _react2.default.createElement(
            _Layout.Col,
            { size: '9 pr-0 pl-10' },
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
        );
      })
    );
  }

  render() {
    const { currentUser: currentUser } = this.props;
    const { activeUserId: activeUserId } = this.state;
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
            _react2.default.createElement('input', { type: 'text' }),
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default btn-sm' },
              '\u5341'
            )
          ),
          this._renderPeopleList(currentUser, activeUserId)
        ),
        _react2.default.createElement(
          'div',
          { className: 'right' },
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
                  'TDog Woofson'
                )
              )
            ),
            _react2.default.createElement(
              _Layout.Col,
              { size: '4 msg-event tar p-0' },
              _react2.default.createElement(
                'span',
                { className: 'close-box', onClick: () => this.toggleChatBox() },
                '\xD7'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'chat', 'data-chat': 'person2' },
            _react2.default.createElement(
              'div',
              { className: 'conversation-start' },
              _react2.default.createElement(
                'span',
                null,
                'Today, 5:38 PM'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'Hello, can you hear me?'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'I\'m in California dreaming'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble me' },
              '... about who we used to be.'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble me' },
              'Are you serious?'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'When we were younger and free...'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'I\'ve forgotten how it felt before'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'I\'ve forgotten how it felt before'
            ),
            _react2.default.createElement(
              'div',
              { className: 'bubble you' },
              'I\'ve forgotten how it felt before'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'write' },
            _react2.default.createElement(
              _Layout.Row,
              { className: 'icons' },
              _react2.default.createElement(
                'span',
                { className: 'emoji' },
                _react2.default.createElement('i', { className: 'fa fa-smile-o fa-lg', 'aria-hidden': 'true' })
              )
            ),
            _react2.default.createElement('textarea', { rows: '1' })
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
  user: _propTypes2.default.object,
  query: _propTypes2.default.object,
  isCurrentUser: _propTypes2.default.bool,
  toggleChatBox: _propTypes2.default.func,
  activeChatId: _propTypes2.default.string
};
module.exports = exports['default'];
