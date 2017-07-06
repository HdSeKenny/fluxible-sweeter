/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule PinItemModal
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PinItem } from '../UI';
import { Comments } from '../Pages';

export default class PinItemModal extends React.Component {

  static propTypes = {
    pin: PropTypes.object,
    currentUser: PropTypes.object,
    showModal: PropTypes.bool
  };

  render() {
    const { pin, currentUser, showModal } = this.props;
    if (pin.author && showModal) {
      return (
        <section className="pin-item-modal mt-20 mb-30 ml-10 mr-10">
          <PinItem pin={pin} disabledClick={true} currentUser={currentUser} />
          <Comments blog={pin} isSweet={true} currentUser={currentUser} isModal={true} />
        </section>
      );
    }
    else {
      return null;
    }
  }
}
