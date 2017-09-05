/* eslint-disable all, no-param-reassign */
function isDescendant(parent, child) {
  let node = child.parentNode;

  while (node !== null) {
    if (node === parent) return true;
    node = node.parentNode;
  }

  return false;
}

function offset(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  };
}

function getStyleAttributeAsNumber(el, attr) {
  const attrStyle = el.style[attr];
  let attrNum = 0;
  if (attrStyle && attrStyle.length) {
    attrNum = parseInt(attrStyle, 10);
  }

  return attrNum;
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ` ${className}`;
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
  }
}

function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
  }
}

function toggleClass(el, className) {
  if (this.hasClass(el, className)) {
    this.removeClass(el, className);
  } else {
    this.addClass(el, className);
  }
}

export default {
  isDescendant,
  offset,
  getStyleAttributeAsNumber,
  addClass,
  removeClass,
  hasClass,
  toggleClass
};
