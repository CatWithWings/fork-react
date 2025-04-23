import { React_ELEMEMT_TYPE } from 'shared/ReactSymbols';

function ReactElement(type, key, ref, props) {
  return {
    $$typeof: React_ELEMEMT_TYPE,
    type,
    key,
    ref,
    props,
  }
}

export function jsxDev(type, config, maybekey) {
  const props = {};
  let key = null;
  let ref = null;

  if (typeof maybekey !== undefined) {
    // 开发者定义的key
    key = maybekey;
  }
  if(hasValidKey(config)) {
    // 是一种容错处理
    key = `${config.value}`;
  }

  return ReactElement(type, key, ref, props);
}
