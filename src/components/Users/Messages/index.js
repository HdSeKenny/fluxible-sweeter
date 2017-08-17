import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FluxibleMixin } from 'fluxible-addons-react';
import { format, jsUtils } from '../../../utils';
import { swal } from '../../../plugins';
import { BlogActions } from '../../../actions';
import { UserStore } from '../../../stores';
import { Row, Col } from '../../UI/Layout';
import ChatBox from './ChatBox';

export default class Messages extends React.Component {

  static displayName = 'Messages';

  static contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
  };

  static propTypes = {
    currentUser: PropTypes.object,
    user: PropTypes.object,
    query: PropTypes.object,
    isCurrentUser: PropTypes.bool
  };

  constructor(props, context) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      currentUser: context.getStore(UserStore).getCurrentUser(),
      showChatBox: false
    };
  }

  focus = () => {
    this.editor.focus();
  };

  componentDidMount() {
    this.context.getStore(UserStore).addChangeListener(this._onStoreChange);
  }

  componentWillUnmount() {
    this.context.getStore(UserStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    const authMessages = ['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS', 'ADD_MESSAGE_CONNECTION_SUCCESS'];
    const currentUser = this.context.getStore(UserStore).getCurrentUser();
    const result = {
      currentUser
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
    const { currentUser, showChatBox } = this.state;
    if (!currentUser) return null;

    return (
      <div className="messages">
        {!showChatBox &&
          <Row className="small-chat-box">
            <Col size="2 p-0 msg-event" onClick={() => this.toggleChatBox()}><i className="fa fa-envelope" /></Col>
            <Col size="8 p-0 msg-event" onClick={() => this.toggleChatBox()}><p>Chat Messages 0</p></Col>
            <Col size="2 pr-0 msg-event"><i className="fa fa-cog" /></Col>
          </Row>
        }

        {showChatBox &&
          <ChatBox
            toggleChatBox={() => this.toggleChatBox()}
            currentUser={currentUser}
          />
        }
      </div>
    );
  }
}
