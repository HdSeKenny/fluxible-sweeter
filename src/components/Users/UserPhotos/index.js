import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FluxibleMixin } from 'fluxible-addons-react';
import { format, jsUtils } from '../../../utils';
import { swal } from '../../../plugins';
import { BlogActions } from '../../../actions';
import { UserStore } from '../../../stores';
import { Row, Col } from '../../UI/Layout';
import UserBar from '../UserBar';

export default CreateReactClass({

  displayName: 'UserPhotos',

  contextTypes: {
    executeAction: PropTypes.func
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
    const userStore = this.getStore(UserStore);
    const user = userStore.getUserByUsername(username);
    const currentUser = userStore.getCurrentUser();
    const isCurrentUser = userStore.isCurrentUser();

    return {
      currentUser,
      user,
      isCurrentUser
    };
  },

  onChange() {

  },

  render() {
    const { isCurrentUser, user, currentUser } = this.state;
    const { pathname } = this.props.location;
    return (
      <div className="user-photos">
        <UserBar path={pathname} user={user} isCurrentUser={isCurrentUser} currentUser={currentUser} />

        <center><h1> User Photos Page...</h1></center>
      </div>
    );
  }
});
