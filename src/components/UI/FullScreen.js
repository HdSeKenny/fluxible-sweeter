import React from 'react';
import classSet from 'classnames';
import PropTypes from 'prop-types';


export default class FullScreen extends React.Component {

  static displayName = 'FullScreen';

  static propTypes = {
    className: PropTypes.string,
    scroll: PropTypes.bool,
    children: PropTypes.array
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
      </div>
    );
  }
}

