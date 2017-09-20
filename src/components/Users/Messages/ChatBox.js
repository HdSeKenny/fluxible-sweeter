import React from 'react';
import PropTypes from 'prop-types';
import { UserStore } from '../../../stores';
import { UserActions } from '../../../actions';
import { Row, Col } from '../../UI/Layout';
import { swal } from '../../../plugins';
import { format } from '../../../utils';

/**
 * ChatBox component - Kenny
 *
 * @export
 * @class ChatBox
 * @extends {React.Component}
 */
export default class ChatBox extends React.Component {

  static displayName = 'ChatBox';

  static contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
  };

  static propTypes = {
    currentUser: PropTypes.object,
    hideMessages: PropTypes.func,
    activeUser: PropTypes.string,
    localChat: PropTypes.object
  };

  constructor(props, context) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.UserStore = context.getStore(UserStore);
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
    if ($('.chat')[0]) $('.chat')[0].scrollTop = $('.chat')[0].scrollHeight;
  }

  toggleChatBox() {
    this.props.hideMessages();
  }

  setActiveUser(thisUserId) {
    this.UserStore.setActiveUser(thisUserId);
  }

  getActiveUser() {
    this.UserStore.getActiveUserId();
  }

  hasActiveUser(connections, activeUserId) {
    return connections.findIndex(c => c.this_user_id === activeUserId) >= 0;
  }

  closeUserConnection(thisUserId) {
    this.context.executeAction(UserActions.closeUserConnection, {
      myId: this.props.currentUser.id_str,
      thisUserId
    });
  }

  onSubmitMessage(e) {
    e.preventDefault();
    this.sendMessage();
  }

  sendMessage() {
    const msg = this.state.message.trim();
    const now = new Date();
    const { activeUser, localChat, currentUser } = this.props;
    if (!msg) {
      return swal.warning('Invalid message!');
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
    const { connect_date, messages } = currentConnect;
    return (
      <div>
        <Row className="top">
          <Col size="8 p-0"><h4 className="m-0"><i>{thisUser.username}</i></h4></Col>
          <Col size="4 tar p-0">
            <span className="close-box" onClick={() => this.toggleChatBox()}>×</span>
          </Col>
        </Row>
        <div className="chat">
          <div className="conversation-start"><span>{connect_date}</span></div>
          {messages.map((msg, idx) => <div className={`bubble ${msg.class}`} key={idx}>{msg.content}</div>)}
        </div>
      </div>
    );
  }

  _renderPeopleList(currentUser, activeUserId, localChat) {
    const connections = localChat.recent_chat_connections;
    if (!connections.length) return null;
    const hasActiveUser = this.hasActiveUser(connections, activeUserId);
    return (
      <ul className="people">
        {connections.map((connection, index) => {
          const thisUserId = connection.this_user_id;
          const newNumber = connection.new_messages_number;
          const thisUser = this.UserStore.getUserById(thisUserId);
          const { username, image_url } = thisUser;
          const isActive = activeUserId === thisUserId;
          const isAdmin = thisUser.role === 'admin';
          let classes = isActive ? 'person active' : 'person';
          if (!hasActiveUser && index === 0) {
            classes = 'person active';
            this.setActiveUser(thisUserId);
          }

          return (
            <Row className={classes} key={index}>
              <Col size="10 p-0" onClick={() => this.setActiveUser(thisUserId)}>
                <Col size="4 p-0">
                  <img src={image_url} alt="chat-user" width="30" /></Col>
                <Col size="7 p-0">
                  <Row className="name"><span>{username}</span></Row>
                  <Row className="time"><span>{format.fromNow(connection.connect_date)}</span></Row>
                </Col>
                <Col size="1 p-0">
                  {newNumber > 0 && <b className="badge bg-danger">{newNumber}</b>}
                </Col>
              </Col>
              <Col size="2 p-0 tar">
                <Row className={isAdmin ? 'close-connect admin' : 'close-connect user'}>
                  <span onClick={() => this.closeUserConnection(thisUserId)}>×</span>
                </Row>
              </Col>
            </Row>
          );
        })}
      </ul>
    );
  }

  render() {
    const { currentUser, activeUser, localChat } = this.props;
    const { message } = this.state;

    if (!currentUser) return null;
    return (
      <div className="chat-box">
        <div className="wrapper">
          <div className="left">
            <div className="top"><input type="text" /></div>
            {this._renderPeopleList(currentUser, activeUser, localChat)}
          </div>
          <div className="right">
            {this._renderConnectionMessage(currentUser, activeUser, localChat)}
            <div className="write">
              <Row className="">
                <Col size="9 p-0">
                  <form onSubmit={this.onSubmitMessage.bind(this)}>
                    <input onChange={(e) => this.onMessageChange(e)} value={message}></input>
                  </form>
                </Col>
                <Col size="3 p-0 tar">
                  <button className="btn btn-info send" onClick={() => this.sendMessage()}>
                    <i className="fa fa-paper-plane mr-5" aria-hidden="true" />Send
                  </button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}