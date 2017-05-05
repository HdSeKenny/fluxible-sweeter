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
import moment from 'moment';
import { PinItem } from '../UI';

export default class PinItemModal extends Component {
  static propTypes = {
    pin: React.PropTypes.object
  };
  render() {
    const { pin } = this.props;
    if (pin.author) {
      const isMoment = pin.type === 'moment';
      return (
        <section className="pin-item-modal">
          <PinItem onSelect={(id) => this.onViewPinItem(id)} pin={pin} type={pin.type} />
        </section>
      );
    }
    else {
      return null;
    }
  }
}
