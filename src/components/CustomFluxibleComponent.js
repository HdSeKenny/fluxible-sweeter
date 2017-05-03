import React from 'react';

/**
 * adding child context to react component
 */
const CustomFluxibleComponent = React.createClass({
  displayName: 'CustomFluxibleComponent',

  propTypes: {
    context: React.PropTypes.object.isRequired,
    children: React.PropTypes.object
  },

  childContextTypes: {
    executeAction: React.PropTypes.func.isRequired,
    getStore: React.PropTypes.func.isRequired,
    config: React.PropTypes.object
  },

  /**
     * Provides the current context as a child context
     * @method getChildContext
     */
  getChildContext() {
    return { getStore: this.props.context.getStore, executeAction: this.props.context.executeAction, config: this.props.context.config };
  },

  render() {
    return React.cloneElement(this.props.children, { context: this.props.context });
  }
});

export default CustomFluxibleComponent;
