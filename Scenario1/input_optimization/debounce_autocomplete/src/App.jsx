import React from 'react'
import './App.css'
import SearchAutocomplete from './Components/SearchAutocomplete'
const fakeSearchApi = async (q) => {
  await new Promise((r) => setTimeout(r, 500));

  return [
    { id: 1, name: q + " Apple" },
    { id: 2, name: q + " Banana" },
    { id: 3, name: q + " Mango" },
  ];
};
function App() {


  return (
    <>
      
      <div className="p-10 max-w-md mx-auto">
      <SearchAutocomplete searchApi={fakeSearchApi} />
    </div>
      
      
      
    </>
  )
}

export default App
