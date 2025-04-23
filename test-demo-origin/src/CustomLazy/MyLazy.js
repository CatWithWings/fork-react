import { useState, useEffect } from 'react';

const STATUS = {
  pending: 'pending',
  fulfilled: 'fulfilled',
}

function MyLazy(Component) {
  let resolved = false;
  let ComponentRes = null;
  const MyComponent = () => {
    const [promise] = useState(Component());
    const [status, setStatus] = useState(STATUS.pending);
    const [result, setResult] = useState(null);
    
    function init() {
      promise.then((module) => {
        const _module = module.default;
        resolved = true;
        ComponentRes = _module;
        setStatus(STATUS.fulfilled);
        setResult(_module);
      }).catch((err) => {
        console.log('err -->', err)
      });
    }
    
    useEffect(() => {
      init();
      const handle = () => {};
      document.addEventListener("unhandledrejection", handle);
      return () => {
        document.removeEventListener("unhandledrejection", handle);
      }
    }, []);
    
    useEffect(() => {
      if (!resolved) {
        throw promise;
      }
    }, [status]);
    
    return result || null;
  }
  
  return MyComponent;
}

export default MyLazy;
