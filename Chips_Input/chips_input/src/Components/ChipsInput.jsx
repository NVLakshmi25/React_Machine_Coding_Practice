import React, { useState } from 'react'

const ChipsInput = () => {
    const [inputText, setInputText] =useState( " ");
    const [chips, setChips]=useState([]);


    const handleKeyDown =(e)=>{
        if(e.key=== "Enter" && inputText.trim()!==""){
            // logic  to add  chips
            setChips(prev => [...prev, inputText]);
            setInputText("");
        }
    }

    const handleDeleteChip=(index)=>{
        //remove  value on  index  from chips array 
        const copyChips =[...chips];
        copyChips.splice(index,1)
        setChips(copyChips);
    }
  return (
    <div className="chip-container">
  <h1 className="chip-header">CHIPS INPUT</h1>

  <input
    type="text"
    placeholder="type a chip and press tag"
    className="chip-input"
    value={inputText}
    onChange={(e)=>setInputText(e.target.value)}
    onKeyDown={(e)=>handleKeyDown(e)}
  />

  {/* {inputText} */}
  <div className="flex flex-wrap gap-3 mt-6">
  {chips.map((chip, index) => (
    <div key={index} className="chipinput-visible">
      {chip}

      <button
        type="button"
        className="chip-remove"
        onClick={() => handleDeleteChip(index)}
      >
        ✕
      </button>
    </div>
  ))}
</div>
  
</div>

  )
};
export default ChipsInput