import { REACT_ELEMENT } from './utils';

function render(VNode, containerDom) {
  // 1. 虚拟DOM转化为真实DOM
  // 2. 真实DOM挂载到containerDom
  mount(VNode, containerDom);
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
    if (typeof child === 'string') {
      parent.appendChild(document.createTextNode(child));
    } else {
      mount(child, parent);
    }
  });
}

// 设置属性值
function setPropsForDOM(dom, VNodeProps = {}) {
  if (!dom) return;
  for (let key in VNodeProps) {
    if (key === 'children') continue;

    if (/^on[A_Z].*/.test(key)) {
      // TODO：事件处理
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

// 创建真实DOM
function createDOM(VNode) {
  const { $$typeof, type, props } = VNode;
  // 创建元素
  let dom;
  if (type && $$typeof === REACT_ELEMENT) {
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
      // 字符串
      dom.appendChild(document.createTextNode(props.children));
    }
  }

  // 处理属性值
  setPropsForDOM(dom, props);
  return dom;
}

const ReactDom = {
  render,
};

export default ReactDom;
