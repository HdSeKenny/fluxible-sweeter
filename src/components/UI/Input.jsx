/**
 * Copyright 2017 - developed by Kenny
 * ui - Input
 */

import React, { Component } from 'react';
import { Validations } from '../../utils';

export default class Input extends Component {

  static propTypes = {
    icon: React.PropTypes.string,
    format: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
    onFieldChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    classes: React.PropTypes.string,
    rounded: React.PropTypes.bool,
    valid: React.PropTypes.bool
  };

  static defaultProps = {
    rounded: false
  };

  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  handleChange(e) {
    this.validate(e);
    this.props.onFieldChange(e);
  }

  isValid() {
    return this.state.valid;
  }


  validate(e) {
    const val = e.currentTarget.value;
    if (this.props.required) {
      if (!val) {
        this.setState({ valid: false });
        return;
      }
      this.setState({ valid: this.validateFormat(this.props.format, val) });
    } else {
      this.setState({ valid: this.validateFormat(this.props.format, val) });
    }
  }

  validateLength(val, minLength, maxLength) {
    return true;
  }

  validateFormat(format, val) {
    switch (format) {
      case 'email' : return Validations.isEmail('', val);
      default : return true;
    }
  }

  render() {
    const { icon, format, errorMessage, rounded, classes } = this.props;
    const { valid } = this.state;
    const iconComponent = icon ? <i className={icon}></i> : null;
    const errorMsg = errorMessage || 'required';
    const error = valid ? null : <p className="help-block text-left">{errorMsg}</p>;
    return (
      <div className={`${classes}`}>
        <div className={`${icon ? 'iconic-input' : ''}`}>
          {iconComponent}
          <input
            type={format}
            autoComplete="off"
            className={`form-control ${rounded ? 'rounded' : ''}`}
            onChange={(e) => this.handleChange(e)} {...this.props}
          />
          {error}
        </div>
      </div>
    );
  }
}
