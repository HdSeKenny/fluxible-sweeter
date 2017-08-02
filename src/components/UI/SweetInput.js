/**
 * Copyright 2017 - developed by Kenny
 * ui - Input
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class SweetInput extends React.Component {

  static propTypes = {
    icon: PropTypes.string,
    format: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    valid: PropTypes.bool
  };

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    const { icon, format, errorMessage } = this.props;
    return (
      <div className={`${icon ? 'iconic-input' : ''}`}>
        {icon ? <i className={icon}></i> : null}
        <input type={format} autoComplete="off" className="form-control" onChange={(e) => this.handleChange(e)} />
        {!errorMessage ? null : <p className="help-block text-left">{errorMessage}</p>}
      </div>
    );
  }
}
