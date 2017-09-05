import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import UserBar from '../UserBar';
import NotFound from '../../NotFound';
import RightTabs from './RightTabs';
import LeftNav from './LeftNav';
import Suggestions from './Suggestions';
import { swal } from '../../../plugins';
import { UserActions } from '../../../actions';
import { UserStore } from '../../../stores';

export default CreateReactClass({

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

  onChange(res) {
    if (res.msg && res.msg !== 'LOGOUT_SUCCESS' || !res.msg) {
      this.setState(this.getStatesFromStores());
    }
  },

  render() {
    const { pathname, query } = this.props.location;
    const { currentUser, user, isCurrentUser } = this.state;

    if (!currentUser) {
      return (
        <div className="user-follows">
          <NotFound />
        </div>
      );
    }

    return (
      <div className="user-follows">
        <UserBar path={pathname} user={user} isCurrentUser={isCurrentUser} currentUser={currentUser} />
        {isCurrentUser ?
          <div>
            <div className="follows-left">
              <LeftNav currentUser={currentUser} user={user} isCurrentUser={isCurrentUser} query={query} pathname={pathname} />
              <Suggestions />
            </div>
            <div className="follows-right">
              <RightTabs currentUser={currentUser} user={user} isCurrentUser={isCurrentUser} query={query} pathname={pathname} />
            </div>
          </div> :
          <div className="follows-center">
            <RightTabs currentUser={currentUser} user={user} isCurrentUser={isCurrentUser} query={query} pathname={pathname} />
          </div>
        }
      </div>
    );
  }
});
