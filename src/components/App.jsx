import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { concurrent } from 'contra';
import { FullScreen } from './UI';
import { UserStore, BlogStore } from '../stores';
import { BlogActions, UserActions } from '../actions';
import { Navbar, Footer } from './UserControls';

const App = React.createClass({

  displayName: 'App',

  contextTypes: {
    executeAction: React.PropTypes.func.isRequired
  },

  propTypes: {
    location: React.PropTypes.object,
    children: React.PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore, BlogStore],
    fetchData(context, params, query, done) {
      concurrent([
        context.executeAction.bind(context, UserActions.LoadUsers, params),
        context.executeAction.bind(context, BlogActions.LoadBlogs, params)
      ], done);
    }
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    return { currentUser: this.getStore(UserStore).getCurrentUser() };
  },

  onChange() {
    this.setState(this.getStatesFromStores());
  },

  render() {
    const route = this.props.location.pathname;
    const child = React.cloneElement(this.props.children);
    const { currentUser } = this.state;
    return (
      <FullScreen id="app">
        <Navbar route={route} currentUser={currentUser} />
        <div className="content-pages">
          {child}
        </div>
        <Footer />
      </FullScreen>
    );
  }
});

export default App;
