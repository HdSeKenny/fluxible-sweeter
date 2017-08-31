import React from 'react';
import PropTypes from 'prop-types';
import { UserStore } from '../../../stores';
import { Row, Col } from '../../UI/Layout';
import ChatBox from './ChatBox';

/**
 * User messages component
 *
 * @export
 * @class Messages
 * @extends {React.Component}
 */
export default class Messages extends React.Component {

  static displayName = 'Messages';

  static contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
  };

  static propTypes = {
    hideMessages: PropTypes.func,
    showMessages: PropTypes.bool
  };

  constructor(props, context) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.context = context;
    this.UserStore = context.getStore(UserStore);
    this.state = {
      currentUser: this.UserStore.getCurrentUser(),
      activeUser: this.UserStore.getActiveUserId(),
      localChat: this.UserStore.getUserConnection()
    };
  }

  componentDidMount() {
    this.UserStore.addChangeListener(this._onStoreChange);

    // Chat socket receive messages from server
    socket.on('message:receive', (messageObj) => this._recieveMessages(messageObj));
  }

  componentWillUnmount() {
    this.UserStore.removeChangeListener(this._onStoreChange);
  }

  _recieveMessages(messageObj) {
    const { currentUser, localChat } = this.state;
    const { user_from, user_to } = messageObj;
    if (user_to === currentUser.id_str) {
      const connections = localChat.recent_chat_connections;
      const thisUserConnect = connections.find(c => c.this_user_id === user_from);
      thisUserConnect.messages.push(messageObj);
      this.setState({ localChat }, () => {
        this.UserStore.setUserConnection(localChat);
      });
    }
  }

  _onStoreChange(res) {
    const authMessages = ['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS'];
    const connectMessages = [
      'ADD_MESSAGE_CONNECTION_SUCCESS',
      'SET_ACTIVE_USER_SUCCESS',
      'DELETE_MESSAGE_CONNECTION_SUCCESS',
      'SET_USER_CONNECTION_SUCCESS'
    ];

    const result = {};
    if (connectMessages.includes(res.msg)) {
      result.activeUser = this.UserStore.getActiveUserId();
      result.localChat = this.UserStore.getUserConnection();
    }

    if (authMessages.includes(res.msg)) {
      result.currentUser = this.UserStore.getCurrentUser();
    }

    if (Object.keys(result).length > 0) {
      this.setState(result);
    }
  }

  hideMessages() {
    this.props.hideMessages();
  }

  render() {
    const { currentUser, localChat, activeUser } = this.state;
    const { showMessages } = this.props;
    if (!currentUser) return null;

    return (
      <div className="messages">
        {!showMessages &&
          <Row className="small-chat-box">
            <Col size="2 p-0 msg-event"><i className="fa fa-envelope" /></Col>
            <Col size="8 p-0 msg-event"><p>Chat Messages 0</p></Col>
            <Col size="2 pr-0 msg-event"><i className="fa fa-cog" /></Col>
          </Row>
        }

        {showMessages &&
          <ChatBox
            hideMessages={() => this.hideMessages()}
            currentUser={currentUser}
            localChat={localChat}
            activeUser={activeUser}
          />
        }
      </div>
    );
  }
}
