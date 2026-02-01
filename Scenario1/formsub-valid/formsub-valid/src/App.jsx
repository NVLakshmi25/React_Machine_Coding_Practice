import React from 'react'
import './App.css'
import MultiForm from './Components/MultiForm'

function App() {
   const handleFormSubmit = async (formData) => {
    console.log("Submitted:", formData);

    // simulate API call
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  return (
    <>
       <div className="max-w-md mx-auto mt-10">
      <MultiForm onSubmit={handleFormSubmit} />
    </div>

     
    </>
  )
}

export default App
