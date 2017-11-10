import React from 'react';

export default class AppTools extends React.Component {

  static displayName = "AppTools";

  render() {
    return (
      <div className="app-tools">
        <span id="return-to-top"><i className="fa fa-arrow-up"></i></span>
      </div>
    );
  }
}
