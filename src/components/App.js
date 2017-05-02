import React, { Component, PropTypes } from 'react';
import { FullScreen } from './UI';
import { BlogActions, UserActions } from '../actions';
import { Navbar, Footer } from './UserControls';

export default class App extends Component {

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

  render() {
    const route = this.props.location.pathname;
    const child = React.cloneElement(this.props.children);
    return (
      <FullScreen id="app">
        <Navbar route={route} />
        <div className="content-pages">
          {child}
        </div>
        <Footer />
      </FullScreen>
    );
  }
}
