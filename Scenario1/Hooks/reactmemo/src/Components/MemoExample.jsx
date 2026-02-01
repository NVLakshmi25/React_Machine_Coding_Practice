import React, { useCallback, useMemo } from 'react'
import { useState } from 'react';
import Child from './Child';

const MemoExample = () => {
 const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

const expensiveCalculation = (count) => {
  const n = 100000;
  return (n * (n - 1)) / 2 + count;
};


 // Memoized expensive value
  const expensive = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);


  return (
    <div className="space-y-3">
      <div>Expensive value: {expensive}</div>

      {/* Child gets stable props */}
      <Child onClick={handleClick} value={count} />

      <button
        onClick={() => setOther((o) => o + 1)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        Change other ({other})
      </button>
    </div>
  );
}

export default MemoExample ;