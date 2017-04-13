/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule viewPin
 */

import React, {Component} from 'react';
import moment from 'moment';

export default class ViewPin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errormessage: ''
    };
  }

  render() {
    let {pin} = this.props;

    if (pin.author) {
      return (
        <section style={{marginBottom:0}}>
          <div className="panel-body m-b-none text-center">
            <a href={pin.web_url} target="_blank">
              <img style={{width:'100%', height:'100%'}} src={pin.image_url} />
            </a>
          </div>
          <footer className="panel-footer" style={{backgroundColor:'#ffffff', borderTop:'none'}}>
            <span className="thumb-sm avatar pull-left m-r-xs">
              <img src={pin.author.avatar ? pin.author.avatar : ''} />
            </span>
            <strong className="d-b">{pin.author.name}</strong>
            <span className="text-muted text-xs">{moment(pin.dateCreated).fromNow()}</span>
          </footer>
        </section>
      );
    } else {
      return null;
    }
  }
}
