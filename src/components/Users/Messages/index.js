import React from 'react';
import PropTypes from 'prop-types';
import ChatBox from './ChatBox';
import { UserStore } from '../../../stores';
import { Row, Col } from '../../UI/Layout';
/**
 * User messages component - Kenny
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
      localChat: this.UserStore.getUserConnection(),
      newMessagesNumSum: this.UserStore.getNewMessagesNumSum(this.props.showMessages)
    };
  }

  componentDidMount() {
    this.UserStore.addChangeListener(this._onStoreChange);

    // Chat socket receive messages from server
    socket.on('message:receive', (messageObj) => this._recieveMessages(messageObj));
  }

  componentDidUpdate() {
    this.jumpToMessagsBottom();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showMessages) {
      const newMessagesNumSum = this.UserStore.getNewMessagesNumSum(nextProps.showMessages);
      this.setState({ newMessagesNumSum });
    }
  }

  componentWillUnmount() {
    this.UserStore.removeChangeListener(this._onStoreChange);
  }

  _recieveMessages(messageObj) {
    const { currentUser, localChat, activeUser } = this.state;
    const { user_from, user_to } = messageObj;
    if (user_from !== user_to && user_to === currentUser.id_str) {
      const connections = localChat.recent_chat_connections;
      const thisUserConnect = connections.find(c => c.this_user_id === user_from);
      thisUserConnect.messages.push(messageObj);
      if (activeUser !== user_from) {
        thisUserConnect.new_messages_number += 1;
      }
      else if (!this.props.showMessages) {
        thisUserConnect.new_messages_number += 1;
      }

      this.setState({ localChat }, () => {
        this.UserStore.setUserConnection(localChat);
      });
    }
  }

  jumpToMessagsBottom() {
    if ($('.chat')[0]) {
      $('.chat')[0].scrollTop = $('.chat')[0].scrollHeight;
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
      result.newMessagesNumSum = this.UserStore.getNewMessagesNumSum();
    }

    if (authMessages.includes(res.msg)) {
      result.currentUser = this.UserStore.getCurrentUser();
    }

    if (Object.keys(result).length > 0) this.setState(result);
  }

  hideMessages() {
    this.props.hideMessages();
  }

  render() {
    const { currentUser, localChat, activeUser, newMessagesNumSum } = this.state;
    const { showMessages } = this.props;
    if (!currentUser) return null;

    return (
      <div className="messages">
        {!showMessages &&
          <Row className="small-chat-box">
            <Col size="2 p-0 msg-event"><i className="fa fa-envelope" /></Col>
            <Col size="8 p-0 msg-event">
              <p>Chat Messages {newMessagesNumSum ? <b className="badge bg-danger ml-5">{newMessagesNumSum}</b> : ''}</p>
            </Col>
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
