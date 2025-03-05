import { findDomByVNode, updateDomTree } from './react-dom';

export let updateQueue = {
  isBatch: false,
  // 存储各个组件实例的更新器实例
  updaters: new Set(),
};

// 清空更新队列
export function flushUpdateQueue() {
  updateQueue.isBatch  = false;
  updateQueue.updaters.forEach((updater) => {
    updater.launchUpdate();
  });
  updateQueue.updaters.clear();
}

// 更新器
class Updater {
  constructor(ClassComponentInstance) {
    this.ClassComponentInstance = ClassComponentInstance;
    // 合并state
    this.pendingStates = [];
  }

  addState(partialState) {
    this.pendingStates.push(partialState);
    this.preHandleUpdate();
  }

  // 预处理更新
  preHandleUpdate() {
    if (updateQueue.isBatch) {
      // 批量更新
      updateQueue.updaters.add(this);
    } else {
      // 立即更新
      this.launchUpdate();
    }
  }

  launchUpdate() {
    if (this.pendingStates.length === 0) return;

    // 合并组件实例的state
    this.ClassComponentInstance.state = this.pendingStates.reduce((pre, cur) => {
     return { ...pre, ...cur };
    }, this.ClassComponentInstance.state);

    this.pendingStates.length = 0;

    // 执行件实例的视图更新
    this.ClassComponentInstance.update();
  }
}

export class Component {
  static IS_CLASS_COMPONENT = true
  constructor(props) {
    this.updater = new Updater(this);
    this.state = {};
    this.props = props;
  }

  setState(partialState, callback) {
    if (!partialState) return;
    // 合并属性
    if (typeof partialState === 'function') {
      // 传入的回调
    } else {
      // 传入的是对象
      this.updater.addState(partialState);
    }

    // 渲染更新
    this.update();
  }


  update() {
    // 1. 获取重新执行render后的VNode
    // 2. 根据新VNode生成真实DOM
    // 3. 真实DOM挂载至页面

    // 获取旧的VNode
    let oldVNode = this.oldVNode; // TODO：组件实例保存oldVNode
    // 获取旧的真实DOM（根据虚拟DOM拿到真实DOM）
    let oldDOM = findDomByVNode(oldVNode); // TODO：实现findDomByVNode
    let newVNode = this.render();
    updateDomTree(oldDOM, newVNode);
    this.oldVNode = newVNode;
  }
}
