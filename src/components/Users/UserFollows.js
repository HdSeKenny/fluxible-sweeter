import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import UserBar from './UserBar';
import { swal } from '../../plugins';
import { UserFollowsTabs } from '../UI';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';


const UserFollows = CreateReactClass({

  displayName: 'UserFollows',

  contextTypes: {
    executeAction: PropTypes.func,
  },

  propTypes: {
    location: PropTypes.object,
    params: PropTypes.object
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
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserByUsername(username),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(username)
    };
  },

  onChange() {
    this.setState(this.getStatesFromStores());
  },

  onFollowThisUser(followUser) {
    const { currentUser, user } = this.state;
    if (!currentUser) {
      return swal.error('Login first please!');
    }

    const followObj = {
      userId: user._id,
      type: followUser.type,
      thisUserId: followUser.user._id,
      currentUserId: currentUser._id
    };

    this.executeAction(UserActions.FollowThisUserWithFollow, followObj);
  },

  onCancelFollowThisUser(followUser) {
    const { currentUser, user } = this.state;
    if (!currentUser) {
      return swal.error('Login first please!');
    }

    const cancelFollowObj = {
      userId: user._id,
      type: followUser.type,
      thisUserId: followUser.user._id,
      currentUserId: currentUser._id
    };

    this.executeAction(UserActions.CancelFollowThisUserWithFollow, cancelFollowObj);
  },

  render() {
    const { pathname } = this.props.location;
    const { currentUser, user, isCurrentUser } = this.state;
    return (
      <div className="user-follows">
        <UserBar path={pathname} user={user} isCurrentUser={isCurrentUser} currentUser={currentUser} />
        <div className="follows-content">
          <div className="well follows-bg">
            <UserFollowsTabs
              user={user}
              currentUser={currentUser}
              onFollowThisUser={this.onFollowThisUser}
              onCancelFollowThisUser={this.onCancelFollowThisUser}
            />
          </div>
        </div>
      </div>
    );
  }
});

export default UserFollows;

