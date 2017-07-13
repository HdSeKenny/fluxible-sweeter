import React from 'react';
import CreateReactClass from 'create-react-class';
import PropTypes from 'prop-types';

/**
 * adding child context to react component
 */
export default CreateReactClass({

  displayName: 'Custom',

  propTypes: {
    context: PropTypes.object,
    children: PropTypes.object
  },

  childContextTypes: {
    executeAction: PropTypes.func,
    getStore: PropTypes.func,
    config: PropTypes.object
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
