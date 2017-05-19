/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule PinItemModal
 */

import React, { Component } from 'react';
import { PinItem } from '../UI';
import { Comments } from '../Pages';

export default class PinItemModal extends Component {

  static propTypes = {
    pin: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    showModal: React.PropTypes.bool
  };

  render() {
    const { pin, currentUser, showModal } = this.props;
    console.log('PinItemModal render...');
    if (pin.author && showModal) {
      return (
        <section className="pin-item-modal mt-15 mb-20">
          <PinItem pin={pin} disabledClick={true} currentUser={currentUser} />
          <Comments blog={pin} isBlogsWell={true} currentUser={currentUser} />
        </section>
      );
    }
    else {
      return null;
    }
  }
}
