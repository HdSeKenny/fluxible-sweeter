import React from 'react';
import classSet from 'classnames';
import CreateReactClass from 'create-react-class';

const BgIcon = CreateReactClass({

  getClassName() {
    return classSet({
      'bg-icon': true,
    }, this.props.iconClassName, this.props.className);
  },

  render() {
    const className = this.getClassName();
    return (
      <span {...this.props} className={className} > { this.props.children } </span>
    );
  }
});

export default BgIcon;
