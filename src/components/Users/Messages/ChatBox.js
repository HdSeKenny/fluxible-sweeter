import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FluxibleMixin } from 'fluxible-addons-react';
import { format, jsUtils } from '../../../utils';
import { swal } from '../../../plugins';
import { BlogActions } from '../../../actions';
import { UserStore } from '../../../stores';
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
    isCurrentUser: PropTypes.bool
  };

  constructor(props, context) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.state = {
      currentUser: context.getStore(UserStore).getCurrentUser()
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
    const authMessages = ['USER_LOGIN_SUCCESS', 'LOGOUT_SUCCESS'];
    if (authMessages.includes(res.msg)) {
      this.setState({ currentUser: this.context.getStore(UserStore).getCurrentUser() });
    }
  }

  render() {
    const { currentUser } = this.state;
    // const { pathname } = this.props.location;

    if (!currentUser) return null;

    return (
      <div className="chat-box">
        <div className="wrapper">
          <div className="left">
            <div className="top">
              <input type="text" />
              <button className="btn btn-default btn-sm">+</button>
            </div>
            <ul className="people">
              <Row className="person" data-chat="person2">
                <Col size="3 p-0"><img src="https://s3.postimg.org/yf86x7z1r/img2.jpg" alt="" /></Col>
                <Col size="9 pr-0 pl-10">
                  <Row className="name"><span>Dog Woofson</span></Row>
                  <Row className="time"><span>1:44 PM</span></Row>
                </Col>
              </Row>
            </ul>
          </div>
          <div className="right">
            <div className="top"><h4 className="m-0"><i>TDog Woofson</i></h4></div>
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
