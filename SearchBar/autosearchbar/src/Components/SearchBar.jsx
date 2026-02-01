import React, { useEffect, useState } from 'react'

const SearchBar = () => {

  const[input, setInput]=useState("");
  const[results, setResults]=useState([]);
  const[showResults, setShowResults]=useState(false);
  const [cache, setCache]=useState({})

const fetchData=async()=>{
  if(cache[input]){
    console.log("CACHE RETURNED" , input);
    setResults(cache[input])
    return ;
  }
  console.log("API CALL",input);
  const data=await fetch("https://dummyjson.com/recipes/search?q=" + input);
  const json= await data.json();
  setResults(json?.recipes)
  setCache((prev)=>({...prev, [input]:json?.recipes}))
};
useEffect(()=>{
  // DEBOUNCING (KEYSTROKE ) CONCEPT
 const Timer=setTimeout(fetchData,300);
 return()=>{
  clearTimeout(Timer);
 }
},[input])
  return (
    <div>
        <div>
        <input type="text"  className="search-input"
        value={input} 
        onChange={(e)=>setInput(e.target.value)}
        onFocus={()=>setShowResults(true)}
        onBlur={()=>setShowResults(false)}
/>

        {showResults && (
          <div className="results-container">
          {results.map((r)=>(
            <span  className="result" key={r.id}>{r.name}</span>
          ))}
        </div>
        )}
        </div>
    </div>
  )
}

export default SearchBar;