import React from 'react';
import PropTypes from 'prop-types';
import { FullScreen, MainSliders } from './UI';
import { BlogActions, UserActions } from '../actions';
import { Navbar, Footer } from './UserControls';

export default class App extends React.Component {

  static displayName = 'App';

  static contextTypes = {
    executeAction: PropTypes.func
  };

  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object
  };

  fetchData = (context, params, query, done) => {
    Promise.all([
      context.executeAction(UserActions.LoadUsers, params),
      context.executeAction(BlogActions.LoadBlogs, params)
    ]).then(() => {
      done();
    });
  };

  componentDidMount() {
    $(document).ready(() => {
      $('.loading').addClass('hide');
    });
  }

  render() {
    const route = this.props.location.pathname;
    const child = React.cloneElement(this.props.children);
    const showMainSliders = child.type.displayName === 'Home';
    return (
      <FullScreen id="app">
        <Navbar route={route} />
        {showMainSliders && <MainSliders show={showMainSliders} />}
        <div className="content-pages">
          {child}
        </div>
        <Footer />
      </FullScreen>
    );
  }
}
