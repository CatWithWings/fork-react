import { REACT_ELEMENT } from './utils';
import { Component } from './Component';

function createElement(type, properties, children) {
  const props = properties || {};
  const ref = properties.ref || null;
  const key = properties.key || null;

  ['ref', 'key', '__self', '__source'].forEach((key) => {
    delete properties[key];
  });

  if (arguments.length > 3) {
    props.children = [...arguments].slice(2);
  } else {
    props.children = children;
  }

  return {
    $$typeof: REACT_ELEMENT,
    type,
    key,
    ref,
    props,
  }
}

function createRef() {
  return {
    current: null,
  };
}

const React = {
  createElement,
  Component,
  createRef,
}
export default React;
