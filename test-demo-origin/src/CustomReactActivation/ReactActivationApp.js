import React, { useRef, useState } from 'react';
// import KeepAlive, { AliveScope } from 'react-activation';
import MyAliveScope from './MyAliveScope';
import MyKeepAlive from './MyKeepAlive';
import Counter from './Counter';

function ReactActivationApp() {
  const [show, setShow] = useState(true);
  const changeRef = useRef(Date.now());
  
  function handleClick() {
    changeRef.current = Date.now();
    setShow((show) => !show);
  }
  
  return (
    <MyAliveScope>
      <div>
        <button onClick={() => handleClick()}>Toggle</button>
        {/* id缓存结果的demo */}
        {show && (
          <MyKeepAlive id="Test">
            <Counter />
          </MyKeepAlive>
        )}
        {/* id变化不缓存结果的demo */}
        {show && (
          <MyKeepAlive id={changeRef.current}>
            <Counter />
          </MyKeepAlive>
        )}
      </div>
    </MyAliveScope>
  );
}

export default ReactActivationApp;
