import { REACT_ELEMENT } from './utils';
import { addEvent } from './event';

// 设置属性值
function setPropsForDOM(dom, VNodeProps = {}) {
  if (!dom) return;
  for (let key in VNodeProps) {
    if (key === 'children') continue;
    console.log('key --->', key);
    console.log('key01 --->', /^on[A_Z].*/.test(key));
    if (/^on[A-Z].*/.test(key)) {
      // 件处理
      addEvent(dom, key.toLowerCase(), VNodeProps[key])
    } else if (key === 'style') {
      // style样式
      Object.keys(VNodeProps[key]).forEach((styleName) => {
        dom.style[styleName] = VNodeProps[key][styleName];
      });
    } else {
      // 其余属性
      dom[key] = VNodeProps[key];
      // TODO: 对于 data-*类型的属性，react应该也有特殊的处理逻辑
    }
  }
}

// 处理函数型组件
function getDomByFunctionComponent(VNode) {
  const { type, props } = VNode;
  const renderVNode = type(props);
  if(!renderVNode) return null;
  return createDOM(renderVNode);
}

function getDomByClassComponent(VNode) {
  const { type, props } = VNode;
  const instance = new type(props);
  let renderVNode = instance.render();

  // 组件实例保存老的虚拟DOM(初始化时就是renderVNode)
  instance.oldVNode = renderVNode;
  if(!renderVNode) return null;
  return createDOM(renderVNode);
}

// 创建真实DOM
function createDOM(VNode) {
  const { type, props } = VNode;
  // 创建元素
  let dom;

  // 处理类组件
  if(typeof type === 'function' && VNode.$$typeof === REACT_ELEMENT && type.IS_CLASS_COMPONENT) {
    return getDomByClassComponent(VNode);
  }

  // 处理函数型组件
  if(VNode.$$typeof === REACT_ELEMENT && typeof type === 'function') {
    return getDomByFunctionComponent(VNode);
  }

  // React Element
  if (type && VNode.$$typeof === REACT_ELEMENT) {
    dom = document.createElement(type);
  }
  // 处理子元素
  if (props) {
    if(Object.prototype.toString.call(props.children) === '[object Object]' && props.children.type) {
      // 对象
      mount(props.children, dom);
    } else if (Array.isArray(props.children)) {
      // 数组
      mountArray(props.children, dom);
    } else {
      // 数字/布尔值都会转换为字符串
      const _children = typeof props.children !== 'string' ? String(props.children) : props.children;
      // 字符串
      dom.appendChild(document.createTextNode(_children));
    }
  }

  // 处理属性值
  setPropsForDOM(dom, props);

  // 保存真实dom对象
  VNode.dom = dom;
  return dom;
}

// 挂载
function mount(VNode, containerDom) {
  let newDOM = createDOM(VNode);
  newDOM && containerDom.appendChild(newDOM);
}

// 挂载
function mountArray(children, parent) {
  if (!Array.isArray(children)) return;
  children.forEach(child => {
    if (typeof child === 'string' || typeof child === 'number' ||  typeof child === 'boolean') {
      // 数字/布尔值都会转换为字符串
      const _child = typeof child !== 'string' ? String(child) : child;
      parent.appendChild(document.createTextNode(_child));
    } else {
      mount(child, parent);
    }
  });
}

function render(VNode, containerDom) {
  // 1. 虚拟DOM转化为真实DOM
  // 2. 真实DOM挂载到containerDom
  mount(VNode, containerDom);
}

export function findDomByVNode(VNode) {
  if (!VNode) return;
  if(VNode.dom) return VNode.dom;
}

export function updateDomTree(oldDom, newVNode) {
  let parentNode = oldDom.parentNode;
  parentNode.removeChild(oldDom);
  parentNode.appendChild(createDOM(newVNode));
}

const ReactDom = {
  render,
};

export default ReactDom;
