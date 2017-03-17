import React from 'react';
import classSet from 'classnames';

const FullScreen = React.createClass({

  displayName: 'FullScreen',

  getDefaultProps() {
    return {
      scroll: false
    };
  },

  getClassName() {
    return classSet({
      'fullscreen': true,
      'fullscreen-scroll': this.props.scroll
    }, this.props.className)
  },

  render () {
    var className = this.getClassName();
    return (
      <div {...this.props} className={className} >
        {this.props.children}
      </div>
    );
  }
});

export default FullScreen

