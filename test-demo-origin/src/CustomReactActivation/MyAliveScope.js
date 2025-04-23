import React, { useEffect, useRef, useState, createContext } from 'react';

export const KeepContext = createContext(null);

function MyAliveScope(props) {
  const [state, setState] = useState({});
  const firstRender = useRef(true);
  const nodes = useRef({});
  
  function keep({ id, children }) {
    const p = new Promise((resolve) => {
      if (state[id] && nodes?.current?.[id]) {
        // 如果id值未变化，则返回之前的缓存结果
        resolve(nodes.current[id]);
        return;
      }
      // 每次初始化一个KeepAlive组件，都将id/children/resolve回调保存在MyAliveScope的state中
      setState((prevState) => {
        return { ...prevState, [id]: { id, children, _resolve: () => resolve(nodes?.current?.[id]) } };
      });
    });
    return p;
  }
  
  useEffect(() => {
    // init时state为null，跳过执行
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    
    setTimeout(() => {
      Object.values(state).forEach((ele) => {
        // 确保state变化时，node已经挂载，执行对应resolve以返回当前节点DOM
        ele?._resolve();
      });
    });
  }, [state]);
  
  return (
    <KeepContext.Provider value={{ keep }}>
      {props.children}
      <div className="cat-alive-scope-novisible" style={{ display: 'none' }}>
        {Object.values(state).map((node) => (
          <div
            className="cat-alive-scope-novisible-wrap"
            key={node.id}
            id={node.id}
            ref={(dom) => {
              // 把传入的节点渲染为真实dom，但不展示，并将真实dom存入nodes
              nodes.current[node.id] = dom;
            }}
          >
            {node.children}
          </div>
        ))}
      </div>
    </KeepContext.Provider>
  )
}

export default MyAliveScope;
