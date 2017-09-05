/**
 * Copyright 2017 - developed by Kenny
 * All rights reserved.
 *
 * ui - Switch
 */

import React from 'react';
import Update from 'react-addons-update';
import PropTypes from 'prop-types';

class Switch extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    rememberMe: PropTypes.func,
    on: PropTypes.bool,
    className: PropTypes.string,
    before: PropTypes.string,
    after: PropTypes.string
  };

  static defaultProps = {
    on: false
  };


  constructor(props) {
    super(props);
    this.state = {
      on: false
    };
  }

  onSwitchCheckBox() {
    this.setState({ on: !this.state.on }, () => {
      // this.props.rememberMe();
    });
  }

  render() {
    const switchStyleOn = {
      borderColor: 'rgb(0,169,218)',
      boxShadow: 'rgb(0,169,218) 0px 0px 0px 0px inset',
      transition: 'border 0.4s, box-shadow 0.4s, background-color 1.2s',
      WebkitTransition: 'border 0.4s, box-shadow 0.4s, background-color 1.2s',
      backgroundColor: 'rgb(0,169,218)'
    };

    const switchStyleOff = {
      borderColor: 'rgb(232, 232, 232)',
      boxShadow: 'rgb(232, 232, 232) 0px 0px 0px 0px inset',
      backgroundColor: 'rgb(232, 232, 232)'
    };

    const buttonStyleOn = {
      left: 13,
      transition: 'left 0.2s',
      WebkitTransition: 'left 0.2s',
      backgroundColor: 'rgb(255, 255, 255)'
    };

    const buttonStyleOff = {
      left: 0
    };
    const {/* before,*/ after } = this.props;
    const spanMergeParam = !this.state.on ? switchStyleOff : {};
    const btnMergeParam = !this.state.on ? buttonStyleOff : {};
    const switchSpan = Update(switchStyleOn, { $merge: spanMergeParam });
    const switchBtn = Update(buttonStyleOn, { $merge: btnMergeParam });

    return (
      <div className="switch-checkbox">
        <input type="checkbox" className="js-switch-small" style={{ display: 'none' }} />
        <span className="switchery switchery-small" style={switchSpan} onClick={() => this.onSwitchCheckBox()}>
          <small style={switchBtn}></small>
        </span> {after ? (<span className="pl-5">{after}</span>) : ''}
      </div>
    );
  }
}

export default Switch;