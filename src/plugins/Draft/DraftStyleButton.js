import React from 'react';
import PropTypes from 'prop-types';

export default class DraftStyleButton extends React.Component {

  static propTypes = {
    onToggle: PropTypes.func,
    style: PropTypes.string,
    active: PropTypes.bool,
    label: PropTypes.string
  };

  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}