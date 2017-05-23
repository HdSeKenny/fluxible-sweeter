import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { UserStore } from '../../stores';
import { Tabs, Pane } from '../UserControls';

const UserFollowsTabs = CreateReactClass({

  displayName: 'UserFollowsTabs',

  contextTypes: {
    executeAction: PropTypes.func
  },

  mixins: [FluxibleMixin],

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    return {};
  },

  onChange(res) {
    this.setState(this.getStatesFromStores());
  },

  isFollowedThisUser(currentUser, user) {
    let isFollowed = false;
    if (currentUser && user) {
      currentUser.focuses.forEach(focus => {
        if (focus.strId === user.strId) {
          isFollowed = true;
        }
      });
    }
    return isFollowed;
  },

  _renderUserFollowing(currentUser, user) {
    return (
      <Tabs>
        <Pane label="Following">
          {this._renderUserFocuses(currentUser, user)}
        </Pane>
        <Pane label="Fans">
          {this._renderUserFans(currentUser, user)}
        </Pane>
        <Pane label="Friends">
          <center><h2>Friends - Not Finished !</h2></center>
        </Pane>
      </Tabs>
    );
  },

  _renderUserFocuses(currentUser, user) {
    if (user.focuses.length > 0) {
      return (
        <div className="">
          {user.focuses.map(focus => {
            const isFollowed = this.isFollowedThisUser(currentUser, focus);
            const isFocusCurrentUser = currentUser ? focus.strId === currentUser.strId : false;
            const focusObj = { type: 'FOCUS', user: focus };
            return (
              <div key={focus._id} className="well following">
                <div className="row">
                  <div className="col-xs-1 following-image">
                    <img alt="following-image" src={focus.image_url} />
                  </div>
                  <div className="col-xs-8 following-info">
                    <h4>{focus.username}</h4>
                    <p>{focus.profession}</p>
                  </div>
                  <div className="col-xs-3 following-btn">
                    {currentUser && isFollowed &&
                      <button className="cancel-follow-btn" onClick={this.props.onCancelFollowThisUser.bind(null, focusObj)}>
                        <i className="fa fa-heart" /> Following
                      </button>
                    }
                    {currentUser && !isFollowed && !isFocusCurrentUser &&
                      <button className="follow-btn" onClick={this.props.onFollowThisUser.bind(null, focusObj)}>
                        <i className="fa fa-heart" /> Follow
                      </button>
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  },

  _renderUserFans(currentUser, user) {
    if (user.fans.length > 0) {
      return(
        <div className="">
          {user.fans.map(fan => {
            const isFollowed = this.isFollowedThisUser(currentUser, fan);
            const isFanCurrentUser = currentUser ? fan.strId === currentUser.strId : false;
            const fanObj = { type: 'FAN', user: fan}
            return (
              <div key={fan._id} className="well following">
                <div className="row">
                  <div className="col-xs-1 following-image">
                    <img alt="following-image" src={fan.image_url} />
                  </div>
                  <div className="col-xs-8 following-info">
                    <h4>{fan.username}</h4>
                    <p>{fan.profession}</p>
                  </div>
                  <div className="col-xs-3 following-btn">
                    {currentUser && isFollowed &&
                      <button className="cancel-follow-btn" onClick={this.props.onCancelFollowThisUser.bind(null, fanObj)}>
                        <i className="fa fa-heart"/> Following
                      </button>
                    }
                    {currentUser && !isFollowed && !isFanCurrentUser &&
                      <button className="follow-btn" onClick={this.props.onFollowThisUser.bind(null, fanObj)}>
                        <i className="fa fa-heart"/> Follow
                      </button>
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  },

  render(){
    const {currentUser, user} = this.props;
    return (
      <div className="user-follows-tabs">
        {this._renderUserFollowing(currentUser, user)}
      </div>
    )
  }
})

export default UserFollowsTabs;
