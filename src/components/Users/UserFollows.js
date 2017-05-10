import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import sweetAlert from '../../utils/sweetAlert';
import { UserFollowsTabs } from '../UI';
import { UserActions } from '../../actions';
import { UserStore } from '../../stores';
import UserBar from './UserBar';

const UserFollows = React.createClass({

  displayName: 'UserFollows',

  contextTypes: {
    executeAction: React.PropTypes.func,
  },

  propTypes: {
    location: React.PropTypes.object,
    params: React.PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    const { userId } = this.props.params;
    return {
      currentUser: this.getStore(UserStore).getCurrentUser(),
      user: this.getStore(UserStore).getUserById(userId),
      isCurrentUser: this.getStore(UserStore).isCurrentUser(userId)
    };
  },

  onChange() {
    this.setState(this.getStatesFromStores());
  },

  onFollowThisUser(followUser) {
    const { currentUser, user } = this.state;
    if (!currentUser) {
      sweetAlert.alertErrorMessage('Login first please!');
      return;
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
      sweetAlert.alertErrorMessage('Login first please!');
      return;
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
        <UserBar
          path={pathname}
          user={user}
          isCurrentUser={isCurrentUser}
          currentUser={currentUser}
        />
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

