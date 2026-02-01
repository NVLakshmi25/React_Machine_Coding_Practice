import React from 'react'

const Settings = ({data, setData}) => {
    const {theme}=data ;

    const handleDataChange=(e)=>{
        setData((prevState)=>({
            ...prevState,
            theme:e.target.value,
        }

        )
    )
    }
  return (
    <div> 
    <div>
        <label>
            <input type="radio"
            name="theme"
            value="dark"
            checked={theme ==="dark"}
            onChange={handleDataChange}
            />
            Dark
        </label>
    </div>
    <div>
        <label>
            <input type="radio"
            name="theme"
            value="light"
            checked={theme ==="light"}
            onChange={handleDataChange}
            />
            light
        </label>
    </div>
    </div>
  )
}

export default Settings