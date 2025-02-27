import { REACT_ELEMENT } from './utils';

function createElement(type, properties, children) {
  ['ref', 'key', '__self', '__source'].forEach((key) => {
    delete properties[key];
  });
  const props = properties || {};
  const ref = properties.ref || null;
  const key = properties.key || null;

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

const React = {
  createElement,
}
export default React;
