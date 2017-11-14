import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { FluxibleMixin } from 'fluxible-addons-react';
import configs from '../../configs';
import { UserStore } from '../../stores';
import { Row, Col } from '../UI/Layout';

const Footer = CreateReactClass({

  displayName: 'Footer',

  mixins: [FluxibleMixin],

  contextTypes: {
    config: PropTypes.object
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
    const { project } = configs;
    return (
      <div className="footer-wrapper">
        <Row className="footer-content">
          <Col size="8 p-0 tal">
            <h5>Copyright © 2017 <span>{kenny.firstName} {kenny.lastName}</span></h5>
            <h6 className="references">{project.references}</h6>
          </Col>
          <Col size="4 tar p-0"></Col>
        </Row>
      </div>
    );
  }
});

export default Footer;
