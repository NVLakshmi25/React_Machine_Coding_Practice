import React from 'react'
import './App.css'
import TestApi from './components/TestApi'

function App() {
  

  return (
    <>
       <div className="p-6">
      <TestApi url="https://jsonplaceholder.typicode.com/posts" />
    </div>
      
    </>
  )
}

export default App
