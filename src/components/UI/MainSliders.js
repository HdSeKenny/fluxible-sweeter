/* eslint-disable all, max-len*/

import React from 'react';
import PropTypes from 'prop-types';

export default class MainSliders extends React.Component {

  static propTypes = {
    show: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      sliders: [
        '/images/sliders/font-end.png',
        '/images/sliders/reactjs.png',
        '/images/sliders/great-frontend.png',
        '/images/sliders/life.png'
      ]
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    const { show } = this.props;
    if (!show) return;

    return (
      <div className="main-sliders">

      </div>
    );
  }
}
