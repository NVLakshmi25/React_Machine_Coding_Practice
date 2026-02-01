 import React from 'react';
 const Interest=({data, setData, errors})=>{
    const {interests}=data;
    const handleDataChange=(e)=>{
        const value=e.target.value;
        setData((prevState)=>({
            ...prevState,
            interests:e.target.checked?
            [...prevState.interests,value]:  // add
            prevState.interests.filter((i)=>i!==value), // remove
        }));

    };
    console.log(interests);
    return(
        <div>
            <div>
                <label>
                    <input  type="checkbox"
                    value="coding"
                     name="interests"
                    checked={interests.includes("coding")}
                    onChange={handleDataChange}
                    /> coding
                </label>
            </div>
           <div>
                <label>
                    <input  type="checkbox"
                    value="music"
                     name="interests"
                    checked={interests.includes("music")}
                      onChange={handleDataChange}
                    /> Music
                </label>
            </div>
             <div>
                <label>
                    <input  type="checkbox"
                    value="travelling"
                     name="interests"
                    checked={interests.includes("travelling")}
                      onChange={handleDataChange}
                    /> Travelling
                </label>
            </div>
            {errors.interests && (
        <span className="text-red-500 block text-sm text-center">
          {errors.interests}
        </span>
      )}
        </div>

    )
 };
 export default Interest ;