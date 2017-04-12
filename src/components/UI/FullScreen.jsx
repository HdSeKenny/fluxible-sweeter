import React, { Component } from 'react';
import classSet from 'classnames';
import { Modals } from '../UI';

export default class FullScreen extends Component {

  static displayName = 'FullScreen';

  static propTypes = {
    className: React.PropTypes.string,
    scroll: React.PropTypes.bool,
    children: React.PropTypes.array
  };

  getClassName() {
    return classSet({
      'fullscreen': true,
      'fullscreen-scroll': this.props.scroll
    }, this.props.className);
  }

  render () {
    const className = this.getClassName();
    return (
      <div {...this.props} className={className}>
        {this.props.children}
        <Modals />
      </div>
    );
  }
}

