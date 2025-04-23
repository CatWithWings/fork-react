import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import hasOwnProperty from 'shared/hasOwnProperty';

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

function hasValidKey(config) {
  return config.key !== undefined;
}

function hasValidRef(config) {
  return config.ref !== undefined;
}

function ReactElement(type, key, ref, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  }
}

export function jsxDEV(type, config, maybekey) {
  const props = {};
  let key = null;
  let ref = null;

  if (typeof maybekey !== undefined) {
    // 开发者定义的key
    key = maybekey;
  }
  if(hasValidKey(config)) {
    // 是一种容错处理
    // 一般设置key都是由babel在maybekey中传递的
    // 但在React内部，也有可能直接在config.key中定义
    key = `${config.key}`;
  }
  
  if(hasValidRef(config)) {
    // 是一种容错处理
    ref = config.ref;
  }
  
  for(let propName in config) {
    // 过滤掉保留属性
    if(hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }

  return ReactElement(type, key, ref, props);
}
