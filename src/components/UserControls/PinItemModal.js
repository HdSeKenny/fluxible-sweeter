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
    pin: React.PropTypes.object
  };

  render() {
    const { pin } = this.props;
    if (pin.author) {
      return (
        <section className="pin-item-modal">
          <PinItem onSelect={(id) => this.onViewPinItem(id)} pin={pin} type={pin.type} />
          <Comments blog={pin} isBlogsWell={true} />
        </section>
      );
    }
    else {
      return null;
    }
  }
}
