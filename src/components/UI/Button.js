/* eslint-disable react/prop-types */
import React from 'react';

export default ({ icon, label, size, color, classes, onClick, style, tooltip, rounded = false }) => {
  const buttonIcon = icon ? <i className={`${label ? 'm-r-xs' : ''} fa ${icon}`} /> : null;
  const buttonLabel = label ? <span className="text">{label}</span> : null;
  const btnClassName = `btn ${color} ${size} ${classes} ${rounded ? 'btn-rounded' : ''}`;
  return (<button style={style} data-balloon={tooltip} onClick={onClick} className={btnClassName}>{buttonIcon}{buttonLabel}</button>);
};