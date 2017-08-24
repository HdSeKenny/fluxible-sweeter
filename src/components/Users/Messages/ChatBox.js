import React from 'react';
import PropTypes from 'prop-types';
import { UserStore } from '../../../stores';
import { UserActions } from '../../../actions';
import { Row, Col } from '../../UI/Layout';
import { swal } from '../../../plugins';

export default class ChatBox extends React.Component {

  static displayName = 'ChatBox';

  static contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
  };

  static propTypes = {
    currentUser: PropTypes.object,
    user: PropTypes.object,
    query: PropTypes.object,
    isCurrentUser: PropTypes.bool,
    toggleChatBox: PropTypes.func,
    activeChatId: PropTypes.string
  };

  constructor(props, context) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.context = context;
    this.state = {
      activeUserId: context.getStore(UserStore).getActiveUserId(),
      message: ''
    };
  }

  focus = () => {
    this.editor.focus();
  };

  componentDidMount() {
    this.context.getStore(UserStore).addChangeListener(this._onStoreChange);

    const chatBox = document.getElementsByClassName('chat')[0];
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  componentWillUnmount() {
    this.context.getStore(UserStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    const connectionMessages = [
      'ADD_MESSAGE_CONNECTION_SUCCESS',
      'DELETE_MESSAGE_CONNECTION_SUCCESS'
    ];

    if (res.msg && connectionMessages.includes(res.msg)) {
      this.setState({
        activeUserId: this.context.getStore(UserStore).getActiveUserId()
      });
    }
  }

  onMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  toggleChatBox() {
    this.props.toggleChatBox(true);
  }

  setActiveUser(thisUserId) {
    this.context.getStore(UserStore).setActiveUserId(thisUserId);
    this.setState({ activeUserId: thisUserId });
  }

  getActiveUser() {
    this.context.getStore(UserStore).getActiveUserId();
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
    if (!msg) {
      return swal.warning('Invalid message!');
    }


  }

  _renderConnectionMessage(currentUser, activeUserId) {
    const connections = currentUser.recent_chat_connections;
    const currentConnect = connections.find(c => c.this_user_id === activeUserId);
    const thisUser = this.context.getStore(UserStore).getUserById(activeUserId);
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
          {messages.map((msg) => <div className={`bubble ${msg.class}`}>{msg.content}</div>)}
        </div>
      </div>
    );
  }

  _renderPeopleList(currentUser, activeUserId) {
    const connections = currentUser.recent_chat_connections;
    if (!connections.length) return null;
    const hasActiveUser = this.hasActiveUser(connections, activeUserId);
    return (
      <ul className="people">
        {connections.map((connection, index) => {
          const thisUserId = connection.this_user_id;
          const thisUser = this.context.getStore(UserStore).getUserById(thisUserId);
          const { username, last_msg_date, image_url } = thisUser;
          const isActive = activeUserId === thisUserId;
          let classes = isActive ? 'person active' : 'person';
          if (!hasActiveUser && index === 0) {
            classes = 'person active';
            this.setActiveUser(thisUserId);
          }
          return (
            <Row className={classes} key={index}>
              <Col size="10 p-0" onClick={() => this.setActiveUser(thisUserId)}>
                <Col size="4 p-0"><img src={image_url} alt="chat-user" width="30" /></Col>
                <Col size="8 p-0">
                  <Row className="name"><span>{username}</span></Row>
                  <Row className="time"><span>{last_msg_date}</span></Row>
                </Col>
              </Col>
              <Col size="2 p-0 tar">
                <Row className="close-connect"><span onClick={() => this.closeUserConnection(thisUserId)}>×</span></Row>
              </Col>
            </Row>
          );
        })}
      </ul>
    );
  }

  render() {
    const { currentUser } = this.props;
    const { activeUserId, message } = this.state;

    if (!currentUser) return null;
    return (
      <div className="chat-box">
        <div className="wrapper">
          <div className="left">
            <div className="top"><input type="text" /></div>
            {this._renderPeopleList(currentUser, activeUserId)}
          </div>
          <div className="right">
            {this._renderConnectionMessage(currentUser, activeUserId)}
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
