import React, { useRef, useContext, useEffect } from 'react';
import { KeepContext } from './MyAliveScope';

function MyKeepAlive(props) {
  const { children, id } = props;
  const placeholder = useRef(null);
  const { keep } = useContext(KeepContext);
  
  useEffect(() => {
    keep({ id, children }).then((realContentDom) => {
      const dom = placeholder.current;
      if (dom && realContentDom) {
        dom.appendChild(realContentDom);
      }
    })
  }, []);
  
  return <div className={`cat-keep-alive-${id}`} ref={placeholder} />;
}

export default MyKeepAlive;
