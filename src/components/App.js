import React from 'react';
import PropTypes from 'prop-types';
import { FullScreen, MainSliders } from './UI';
import { BlogActions, UserActions } from '../actions';
import { UserStore } from '../stores';
import { Navbar, Footer } from './UserControls';
import { Messages } from './Users';

export default class App extends React.Component {

  static displayName = 'App';

  static contextTypes = {
    getStore: PropTypes.func
  };

  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object
  };

  static fetchData = (context, params, query, done) => {
    Promise.all([
      context.executeAction(UserActions.LoadUsers, params),
      context.executeAction(BlogActions.LoadBlogs, params)
    ]).then(() => {
      done();
    });
  };

  constructor(props, context) {
    super(props);
    this._onStoreChange = this._onStoreChange.bind(this);
    this.context = context;
    this.state = {
      showMessages: false,
      usernames: context.getStore(UserStore).getUsernames()
    };
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.loading').addClass('hide');
    });

    this.context.getStore(UserStore).addChangeListener(this._onStoreChange);
    socket.emit('users', this.state.usernames);
  }

  componentWillUnmount() {
    this.context.getStore(UserStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange(res) {
    if (res.msg === 'ADD_MESSAGE_CONNECTION_SUCCESS') {
      this.setState({ showMessages: true });
    }


  }

  hideMessages() {
    this.setState({ showMessages: false });
  }

  onAppClick(e) {
    const isInsideChatBox = $(e.target).parents('.chat-box').size() !== 0;
    const isInsideSmallBox = $(e.target).parents('.small-chat-box').size() !== 0;
    const chatBox = document.getElementsByClassName('chat-box');
    const smallChatBox = document.getElementsByClassName('small-chat-box');
    const messageBtn = document.getElementsByClassName('message-btn');
    const hasMessagBox = document.documentElement.contains(chatBox[0]);
    const hasSmallBoxx = document.documentElement.contains(smallChatBox[0]);
    const isUserBarMessageBtn = e.target === messageBtn[0];
    if (hasMessagBox && !isInsideChatBox && !isUserBarMessageBtn) {
      this.setState({ showMessages: false });
    }

    if (hasSmallBoxx && isInsideSmallBox) {
      this.setState({ showMessages: true });
    }
  }

  render() {
    const route = this.props.location.pathname;
    const child = React.cloneElement(this.props.children, { location: this.props.location });
    const showMainSliders = child.type.displayName === 'Home';
    return (
      <FullScreen id="app" onClick={(e) => this.onAppClick(e)}>
        <Navbar route={route} />
        {showMainSliders && <MainSliders show={showMainSliders} />}
        <div className="content-pages">{child}</div>
        <Messages showMessages={this.state.showMessages} hideMessages={() => this.hideMessages()} />
        <Footer />
      </FullScreen>
    );
  }
}
