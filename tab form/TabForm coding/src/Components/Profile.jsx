 import React from 'react'
 
 const Profile = ({data, setData, errors}) => {
    const {name, age, email}= data;

    const  handleDataChange=(e, item) =>{
        setData((prevState)=>({
            ...prevState,
            [item]: e.target.value,

        }))
    };
   return (
     <div>
        <div>
            <label>Name : </label>
            <input type='text' onChange={(e)=>handleDataChange(e,"name")}
             className="border border-black p-1 m-1 rounded-md"  value={name} />
             {errors.name && <span className='text-red-500  block text-sm text-center'>{errors.name}</span>}
        </div>
        <div>
            <label>Age : </label>
            <input type="number"
             className="border border-black p-1 m-1 rounded-md"  onChange={(e)=>handleDataChange(e,"age")} value={age} />
             {errors.age && <span className='text-red-500  block text-sm text-center'>{errors.age}</span>}
        </div>
        <div>
            <label>Email: </label>
            <input type="Email"
             className="border border-black  p-1 m-1 rounded-md"  onChange={(e)=>handleDataChange(e,"email")} value={email} />
              {errors.email && <span className='text-red-500  block text-sm text-center'>{errors.email}</span>}
        </div>
     </div>
   )
 }
 
 export default Profile