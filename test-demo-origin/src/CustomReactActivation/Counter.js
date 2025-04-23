import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="counter">
      count: {count}
      <button onClick={() => setCount((count) => count + 1)}>add</button>
    </div>
  )
}

export default Counter;
