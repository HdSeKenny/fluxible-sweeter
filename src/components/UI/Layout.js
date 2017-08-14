/* eslint-disable react/prop-types */
import React from 'react';

const Layout = {};

/**
 * [getColSizeClassName description]
 * @param  {string || object} size
 * @return {string}
 * example col-xs-1, col-md-1...
 */
function getColSizeClassName(size) {
  let colSize = '';
  if (size) {
    if (typeof size === 'object') {
      colSize = Object.keys(size).map(k => {
        return `col-${k}-${size[k]} `;
      }).join(' ');
    } else {
      colSize = `col-xs-${size}`;
    }
  }

  return colSize;
}

/**
 * [getOffsetSizeClassName description]
 * @param  {object || string} offset
 * @return {string}
 * example col-xs-offset-1, col-md-offset-1...
 */
function getOffsetSizeClassName(offset) {
  let offsetSize = '';
  if (offset) {
    if (typeof offset === 'object') {
      offsetSize = Object.keys(offset).map(k => {
        return `col-${k}-offset-${offset[k]} `;
      }).join(' ');
    } else {
      offsetSize = `col-xs-offset-${offset}`;
    }
  }

  return offsetSize;
}

Layout.Row = ({ children, className, mason, onClick }) => {
  let classesString = 'row';
  if (className) {
    classesString = `${classesString} ${className}`;
    if (mason) {
      classesString = `${classesString} ${mason}`;
    }
  }
  return (
    <div className={classesString} onClick={onClick}>
      {children}
    </div>
  );
};

Layout.Col = ({ children, size, offset, className, style, onClick }) => {
  const colSize = getColSizeClassName(size);
  const offsetSize = getOffsetSizeClassName(offset);
  let classesString = '';
  if (colSize) {
    classesString = colSize;

    if (offsetSize) {
      classesString = `${classesString} ${offsetSize}`;
    }

    if (className) {
      classesString = `${classesString} ${offsetSize} ${className}`;
    }
  }
  return (
    <div className={classesString} style={style} onClick={onClick}>
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

export const Row = Layout.Row;
export const Col = Layout.Col;
export const Page = Layout.Page;

export default Layout;
