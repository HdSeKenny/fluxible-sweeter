import React from 'react';
import PropTypes from 'prop-types';
import { FullScreen, MainSliders } from './UI';
import { BlogActions, UserActions } from '../actions';
import { Navbar, Footer } from './UserControls';
import { Messages } from './Users';

export default class App extends React.Component {

  static displayName = 'App';

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

  constructor() {
    super();
    this.state = {
      showMessages: true
    };
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.loading').addClass('hide');
    });
  }

  setShowMessages(showMessages) {
    this.setState({ showMessages });
  }

  onAppClick(e) {
    // console.log($(e.target).parents('.chat-box').size());
    const isInsideChatBox = $(e.target).parents('.chat-box').size() !== 0;
    const chatBoxDom = document.getElementsByClassName('chat-box');
    const hasMessagBox = document.documentElement.contains(chatBoxDom[0]);

    if (hasMessagBox && !isInsideChatBox) {
      this.setState({ showMessages: false });
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
        <Messages showMessages={this.state.showMessages} setShowMessages={(showMessages) => this.setShowMessages(showMessages)} />
        <Footer />
      </FullScreen>
    );
  }
}
