import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import { UserStore } from '../../stores';

const Footer = React.createClass({

  displayName: 'Footer',

  mixins: [FluxibleMixin],

  contextTypes: {
    config: React.PropTypes.object
  },

  statics: {
    storeListeners: [UserStore]
  },

  getInitialState() {
    return this.getStatesFromStores();
  },

  getStatesFromStores() {
    return {
      kenny: this.getStore(UserStore).getKennyUser()
    };
  },

  onChange() {
    this.setState(this.getStatesFromStores());
  },

  render() {
    const { kenny } = this.state;
    return (
      <div className="footer">
        <div className="row">
          <div className="col-xs-8">
          </div>
          <div className="col-xs-4">
            <h5>.</h5>
            <h5>© 2016 <span>{kenny.firstName} {kenny.lastName}</span></h5>
          </div>
        </div>
      </div>
    );
  }
});

export default Footer;
