import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { UserStore } from '../../stores';
import UserBar from './UserBar';

const UserMessages = CreateReactClass({

  displayName: 'UserMessages',

  contextTypes: {
    executeAction: PropTypes.func,
  },

  propTypes: {
    params: PropTypes.object,
    location: PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { username } = this.props.params;
    const store = this.getStore(UserStore);
    return {
      currentUser: store.getCurrentUser(),
      user: store.getUserByUsername(username),
      isCurrentUser: store.isCurrentUser(),
      loaded: false
    };
  },

  onChange() {
    this.setState(this.getStatesFromStores());
  },

  render() {
    const { pathname } = this.props.location;
    const { currentUser, user, isCurrentUser } = this.state;
    return (
      <div className="user-messages">
        <UserBar path={pathname} user={user} isCurrentUser={isCurrentUser} currentUser={currentUser} />
        <div className="messages-content">

        </div>
      </div>
    );
  }
});

export default UserMessages;

