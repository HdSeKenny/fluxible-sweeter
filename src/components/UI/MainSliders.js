import React, { Component, PropTypes } from 'react';

export default class MainSliders extends Component {

  static propTypes = {
    show: PropTypes.bool
  };

  render() {
    const { show } = this.props;
    if (!show) { return null; }
    return (
      <section className="main-sliders tac">
        <p className="welcome"></p>
        <div className="sliders-btns mt-15">

        </div>

      </section>
    );
  }
}
