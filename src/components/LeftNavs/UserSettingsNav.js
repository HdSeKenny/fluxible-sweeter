import React from 'react';
import { Link } from 'react-router';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { UserStore } from '../../stores';

const UserSettingsNav = React.createClass({

  displayName: 'UserSettingsNav',

  contextTypes: {
    executeAction: React.PropTypes.func,
  },

  propTypes: {
    path: React.PropTypes.object,
    isCurrentUser: React.PropTypes.bool,
    user: React.PropTypes.object,
    displayBlogs: React.PropTypes.array,
    currentUser: React.PropTypes.object
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    return {
      currentUser: this.getStore(UserStore).getCurrentUser()
    };
  },

  isActive(route) {
    return route === this.props.path ? 'active' : '';
  },

  onChange() {
    this.setState(this.getStateFromStores());
  },

  render() {
    const { currentUser } = this.state;
    return (
      <div className="well user-setting-nav">
        <li className={this.isActive(`/user-settings/${currentUser.strId}/info`)}>
          <Link to={`/user-settings/${currentUser.strId}/info`}>
            <i className="fa fa-user"></i> Personal Infomation
          </Link>
        </li>
        <li className={this.isActive(`/user-settings/${currentUser.strId}/change-password`)}>
          <Link to={`/user-settings/${currentUser.strId}/change-password`}>
            <i className="fa fa-wrench"></i> Change password
          </Link>
        </li>
        <li><Link to=""><i className="fa fa-ellipsis-h"></i></Link></li>
        <li><Link to=""><i className="fa fa-ellipsis-h"></i></Link></li>
      </div>
    );
  }
});


export default UserSettingsNav;