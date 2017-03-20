/* eslint-disable react/prop-types */
import React from 'react';

const Layout = {};

Layout.Row = ({ children, classes, mason }) => (
  <div className={`row ${classes} ${mason ? 'mason_row_3' : ''}`}>
    {children}
  </div>
);


Layout.Col = ({ children, size, offset, classes }) => {
  let colSize = '';
  if (typeof size === 'object') {
    colSize = Object.keys(size).map(k => {
      return `col-${k}-${size[k]} `;
    }).join(' ');
  } else {
    colSize = `col-md-${size}`;
  }

  let offsetSize = '';
  if (typeof offset === 'object') {
    offsetSize = Object.keys(offset).map(k => {
      return `col-${k}-offset-${offset[k]} `;
    }).join(' ');
  } else {
    offsetSize = `col-md-offset-${offset}`;
  }


  return (
    <div className={`${colSize} ${classes} ${offset ? `${offsetSize}` : ''}`}>
      {children}
    </div>
  );
};


Layout.Page = ({ children, height }) => (
  <section className="vbox" style={height ? { height } : {}}>
    <section className="scrollable">
      <div className="container full content-body">
        {children}
      </div>
    </section>
  </section>
);

Layout.Scroller = ({ children, height }) => (
  <div className="scrollable" style={{ height }}>
    {children}
  </div>
);

export default Layout;
