import React from 'react'

import { memo } from "react";

const Child = memo(function Child({ onClick, value }) {
  console.log("Child re-rendered");
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 bg-green-500 text-white rounded"
    >
      Child: {value}
    </button>
  );
});

export default Child