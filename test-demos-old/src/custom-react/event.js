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
  flushUpdateQueue();
}

export function addEvent(dom, eventName, bindFunction) {
  dom.attch = dom.addEvent || {};
  dom.attch[eventName] = bindFunction;
  if (dom[eventName]) return;

  // 事件合成机制的核心点一：老版本的React是直接将事件绑定到document上
  document[eventName] = dispatchEvent;
}