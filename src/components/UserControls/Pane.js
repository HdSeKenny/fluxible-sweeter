import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import {History, IndexLink, Link} from 'react-router';
import {Button, Glyphicon} from 'react-bootstrap';

const Pane = React.createClass({

    displayName: 'Pane',

    render() {
        return (
          <div className="user-pane">
              {this.props.children}
          </div>
        );
    }
});

export default Pane;
