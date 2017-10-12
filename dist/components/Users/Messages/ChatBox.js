'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _stores = require('../../../stores');

var _actions = require('../../../actions');

var _Layout = require('../../UI/Layout');

var _plugins = require('../../../plugins');

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ChatBox component - Kenny
 *
 * @export
 * @class ChatBox
 * @extends {React.Component}
 */
var ChatBox = function (_React$Component) {
  (0, _inherits3.default)(ChatBox, _React$Component);

  function ChatBox(props, context) {
    (0, _classCallCheck3.default)(this, ChatBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChatBox.__proto__ || (0, _getPrototypeOf2.default)(ChatBox)).call(this, props));

    _this._onStoreChange = _this._onStoreChange.bind(_this);
    _this.UserStore = context.getStore(_stores.UserStore);
    _this.state = {
      message: ''
    };
    return _this;
  }

  (0, _createClass3.default)(ChatBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.UserStore.addChangeListener(this._onStoreChange);
      this.jumpToMessagsBottom();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.UserStore.removeChangeListener(this._onStoreChange);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.jumpToMessagsBottom();
    }
  }, {
    key: '_onStoreChange',
    value: function _onStoreChange() {}
  }, {
    key: 'onMessageChange',
    value: function onMessageChange(e) {
      this.setState({ message: e.target.value });
    }
  }, {
    key: 'jumpToMessagsBottom',
    value: function jumpToMessagsBottom() {
      if ($('.chat')[0]) $('.chat')[0].scrollTop = $('.chat')[0].scrollHeight;
    }
  }, {
    key: 'toggleChatBox',
    value: function toggleChatBox() {
      this.props.hideMessages();
    }
  }, {
    key: 'setActiveUser',
    value: function setActiveUser(thisUserId) {
      this.UserStore.setActiveUser(thisUserId);
    }
  }, {
    key: 'getActiveUser',
    value: function getActiveUser() {
      this.UserStore.getActiveUserId();
    }
  }, {
    key: 'hasActiveUser',
    value: function hasActiveUser(connections, activeUserId) {
      return connections.findIndex(function (c) {
        return c.this_user_id === activeUserId;
      }) >= 0;
    }
  }, {
    key: 'closeUserConnection',
    value: function closeUserConnection(thisUserId) {
      this.context.executeAction(_actions.UserActions.closeUserConnection, {
        myId: this.props.currentUser.id_str,
        thisUserId: thisUserId
      });
    }
  }, {
    key: 'onSubmitMessage',
    value: function onSubmitMessage(e) {
      e.preventDefault();
      this.sendMessage();
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage() {
      var _this2 = this;

      var msg = this.state.message.trim();
      var now = new Date();
      var _props = this.props,
          activeUser = _props.activeUser,
          localChat = _props.localChat,
          currentUser = _props.currentUser;

      if (!msg) {
        return _plugins.swal.warning('Invalid message!');
      }
      var newMessage = {
        content: msg,
        date: now,
        user_to: activeUser,
        user_from: currentUser.id_str,
        class: 'me'
      };

      var connections = localChat.recent_chat_connections;
      var thisUserConnect = connections.find(function (c) {
        return c.this_user_id === activeUser;
      });
      thisUserConnect.messages.push(newMessage);

      this.setState({ message: '' }, function () {
        _this2.UserStore.setUserConnection(localChat);
        socket.emit('message:send', newMessage);
      });
    }
  }, {
    key: '_renderConnectionMessage',
    value: function _renderConnectionMessage(currentUser, activeUserId, localChat) {
      var _this3 = this;

      var connections = localChat.recent_chat_connections;
      var currentConnect = connections.find(function (c) {
        return c.this_user_id === activeUserId;
      });
      var thisUser = this.UserStore.getUserById(activeUserId);
      var connect_date = currentConnect.connect_date,
          messages = currentConnect.messages;

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
              { className: 'close-box', onClick: function onClick() {
                  return _this3.toggleChatBox();
                } },
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
          messages.map(function (msg, idx) {
            return _react2.default.createElement(
              'div',
              { className: 'bubble ' + msg.class, key: idx },
              msg.content
            );
          })
        )
      );
    }
  }, {
    key: '_renderPeopleList',
    value: function _renderPeopleList(currentUser, activeUserId, localChat) {
      var _this4 = this;

      var connections = localChat.recent_chat_connections;
      if (!connections.length) return null;
      var hasActiveUser = this.hasActiveUser(connections, activeUserId);
      return _react2.default.createElement(
        'ul',
        { className: 'people' },
        connections.map(function (connection, index) {
          var thisUserId = connection.this_user_id;
          var newNumber = connection.new_messages_number;
          var thisUser = _this4.UserStore.getUserById(thisUserId);
          var username = thisUser.username,
              image_url = thisUser.image_url;

          var isActive = activeUserId === thisUserId;
          var isAdmin = thisUser.role === 'admin';
          var classes = isActive ? 'person active' : 'person';
          if (!hasActiveUser && index === 0) {
            classes = 'person active';
            _this4.setActiveUser(thisUserId);
          }

          return _react2.default.createElement(
            _Layout.Row,
            { className: classes, key: index },
            _react2.default.createElement(
              _Layout.Col,
              { size: '10 p-0', onClick: function onClick() {
                  return _this4.setActiveUser(thisUserId);
                } },
              _react2.default.createElement(
                _Layout.Col,
                { size: '4 p-0' },
                _react2.default.createElement('img', { src: image_url, alt: 'chat-user', width: '30' })
              ),
              _react2.default.createElement(
                _Layout.Col,
                { size: '7 p-0' },
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
                    _utils.format.fromNow(connection.connect_date)
                  )
                )
              ),
              _react2.default.createElement(
                _Layout.Col,
                { size: '1 p-0' },
                newNumber > 0 && _react2.default.createElement(
                  'b',
                  { className: 'badge bg-danger' },
                  newNumber
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
                  { onClick: function onClick() {
                      return _this4.closeUserConnection(thisUserId);
                    } },
                  '\xD7'
                )
              )
            )
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props2 = this.props,
          currentUser = _props2.currentUser,
          activeUser = _props2.activeUser,
          localChat = _props2.localChat;
      var message = this.state.message;


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
                    _react2.default.createElement('input', { onChange: function onChange(e) {
                        return _this5.onMessageChange(e);
                      }, value: message })
                  )
                ),
                _react2.default.createElement(
                  _Layout.Col,
                  { size: '3 p-0 tar' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-info send', onClick: function onClick() {
                        return _this5.sendMessage();
                      } },
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
  }]);
  return ChatBox;
}(_react2.default.Component);

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
exports.default = ChatBox;
module.exports = exports['default'];