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
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserById(this.props.params.userId),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(this.props.params.userId),
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
          <div className="well">
            <center><h2>Messages - Not Finished !</h2></center>
          </div>
        </div>
      </div>
    );
  }
});

export default UserMessages;

