import React from 'react';
import CreateReactClass from 'create-react-class';

/**
 * not found page
 */
const NotFound = CreateReactClass({
  render() {
    const { classes } = this.props;
    const classNames = `not-found ${classes}`;
    return (
      <div className={classNames}>
        <h1>! NotFound</h1>
      </div>
    );
  }
});

export default NotFound;
