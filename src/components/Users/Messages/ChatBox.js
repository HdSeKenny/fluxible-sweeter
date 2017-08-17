import React from 'react';
import PropTypes from 'prop-types';
import { UserStore } from '../../../stores';
import { UserActions } from '../../../actions';
import { Row, Col } from '../../UI/Layout';

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
      activeUserId: context.getStore(UserStore).getActiveUserId()
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

  toggleChatBox() {
    this.props.toggleChatBox();
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
                <Col size="4 p-0"><img src={image_url} alt="chat-user" width="40" /></Col>
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
    const { activeUserId } = this.state;
    if (!currentUser) return null;

    return (
      <div className="chat-box">
        <div className="wrapper">
          <div className="left">
            <div className="top">
              <input type="text" />
              <button className="btn btn-default btn-sm">十</button>
            </div>
            {this._renderPeopleList(currentUser, activeUserId)}
          </div>
          <div className="right">
            <Row className="top">
              <Col size="8 p-0">
                <h4 className="m-0"><i>TDog Woofson</i></h4>
              </Col>
              <Col size="4 tar p-0">
                <span className="close-box" onClick={() => this.toggleChatBox()}>×</span>
              </Col>
            </Row>
            <div className="chat" data-chat="person2">
              <div className="conversation-start">
                <span>Today, 5:38 PM</span>
              </div>
              <div className="bubble you">
                Hello, can you hear me?
              </div>
              <div className="bubble you">
                I'm in California dreaming
              </div>
              <div className="bubble me">
                ... about who we used to be.
              </div>
              <div className="bubble me">
                Are you serious?
              </div>
              <div className="bubble you">
                When we were younger and free...
              </div>
              <div className="bubble you">
                I've forgotten how it felt before
              </div>
              <div className="bubble you">
                I've forgotten how it felt before
              </div>
              <div className="bubble you">
                I've forgotten how it felt before
              </div>
            </div>
            <div className="write">
              <Row className="icons">
                <span className="emoji"><i className="fa fa-smile-o fa-lg" aria-hidden="true" /></span>
              </Row>
              <textarea rows="1"></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
