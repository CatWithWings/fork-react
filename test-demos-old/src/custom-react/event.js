import { updaterQueue, flushUpdateQueue } from './Component';

function createSyntheticEvent(nativeEvent) {
  let nativeEventKeyValues = {};
  for (let key in nativeEvent) {
    nativeEventKeyValues[key] = 
      typeof nativeEvent[key] === 'function' 
        ? nativeEvent[key].bind(nativeEvent)
        : nativeEvent[key];
  }
  let syntheticEvent = Object.assign(nativeEventKeyValues, {
    nativeEvent,
    isDefaultPrevented: false,
    isPropagationStopped: false,
    preventDefault: function() {
      this.isDefaultPrevented = true;
      if (this.nativeEvent.preventDefault) {
        this.nativeEvent.preventDefault();
      } else {
        this.nativeEvent.returnValue = false;
      }
    },
    stopPropagation: function() {
      this.isPropagationStopped = true;
      if (this.nativeEvent.isPropagationStopped) {
        this.nativeEvent.isPropagationStopped();
      } else {
        this.nativeEvent.cancelBubble = false;
      }
    }
  });
  return syntheticEvent;
}

function dispatchEvent(nativeEvent) {
  // 由于事件冒泡机制 nativeEvent 为真实的事件源的event对象
  updaterQueue.isBatch = true;

  // 事件合成机制的核心点二：屏蔽浏览器之间的差异
  let syntheticEvent =  createSyntheticEvent(nativeEvent);
  // 原生触发事件的事件源
  let target = nativeEvent.target;
  while(target) {
    // nativeEvent.target是触发事件的事件源，是始终不变的
    // syntheticEvent.currentTarget是当前事件绑定的元素，是会变化的，也就是当前wahile循环中的target
    syntheticEvent.currentTarget = target;
    let eventName = `on${nativeEvent.type}`;
    let bindFunction = target.attch && target.attch[eventName];
    bindFunction && bindFunction(syntheticEvent);
    // 如果当前节点阻止冒泡，则停止向上遍历target链路
    if (syntheticEvent.isPropagationStopped) break;
    target = target.parentNode;
  }
  flushUpdateQueue();
}

export function addEvent(dom, eventName, bindFunction) {
  dom.attch = dom.attch || {};
  dom.attch[eventName] = bindFunction;
  if (document[eventName]) return;

  // 事件合成机制的核心点一：老版本的React是直接将事件绑定到document上
  // 所以合成事件内部的阻止冒泡函数是无法阻止原生事件的，此时它的触发是冒泡至document元素后派发事件
  // 它只能阻止自己事件源链路上其他的合成事件
  document[eventName] = dispatchEvent;
}