import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { UserStore } from '../../stores';
import UserBar from './UserBar';

const UserMine = CreateReactClass({

  displayName: 'UserMine',

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
    const store = this.getStore(UserStore);
    const { username } = this.props.params;
    return {
      currentUser: store.getCurrentUser(),
      user: store.getUserByUsername(username),
      isCurrentUser: store.isCurrentUser(username),
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
      <div className="user-more">
        <UserBar path={pathname} user={user} isCurrentUser={isCurrentUser} currentUser={currentUser} />
        <div className="more-content">
          <div className="well">
            <center><h2>More - Not Finished !</h2></center>
          </div>
        </div>
      </div>
    );
  }
});

export default UserMine;

