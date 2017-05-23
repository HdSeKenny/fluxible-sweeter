import React from 'react';

export default class Pane extends React.Component {

  static displayName = 'Pane';

  render() {
    return <div className="user-pane">{this.props.children}</div>;
  }
}

