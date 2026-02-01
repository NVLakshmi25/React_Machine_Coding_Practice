import React from "react";
import "./App.css";
import ParallelFetches from "./Components/ParallelFetches";

function App() {
  return (
    <ParallelFetches
      urls={[
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/users/1",
      ]}
    />
  );
}


export default App;
