import React, { useState } from 'react'
import Profile from './Profile';
import  Interest from './interest';

import Settings from './Settings';

const TabForm = () => {
    const [data, setData]=useState({
        name:"Venky",
        age:21,
        email: "abc@gmail.com",
        interests :["coding", "music", "travelling"],
        theme:"light"

    })
    const[ errors, setErrors]=useState({});
    const [activeTab, setActiveTab]=useState(0);
    const Tabs=[
        {
        name: "profile",
        component :Profile ,
        validate: ()=>{
          const err={};
          if(!data.name || data.name.length < 2){
            err.name="Name is not valid";
          }
          if(!data.age || data.age < 18){
            err.age="age is not valid"
          }
          if(!data.email || data.email.length <2){
            err.email="Email is not valid"
          }
   setErrors(err);
   return  err.name || err.age || err.email ? false :true 
        }
    },
    {
        name:"Interest",
        component :Interest,
        validate: ()=>{
          const err={};
          if( data.interests.length <1 ){
            err.interests = "Select alteast one interest";
          }
          setErrors(err);
          return err.interests? false :true ;
        }

    },
    {
        name:"Settings",
        component :Settings ,
        validate:()=>{
          return true;
        }

    },
    ];

    const  ActiveTabComponent=Tabs[activeTab].component;
const handleNextClick = () => {
  if(Tabs[activeTab].validate()){
    setActiveTab((prev) => Math.min(prev + 1, Tabs.length - 1));
  }
  
};
    const handlePrevClick = () => {
       setActiveTab((prev) => Math.max(prev - 1, 0));
      
};


    const handleSubmitClick=()=>{
        // make an API call
         console.log(data)

    }
  return (
    <div>
        <div className='heading-container  flex gap-2 justify-center'>
            {Tabs.map((t, index)=>(
                <div  key={index}  className='heading  p-2 border-2  border-black cursor-pointer '
                onClick={() => {
  if (index <= activeTab) {
    // backward or same tab → allow
    setActiveTab(index);
  } else {
    // forward → validate current tab
    if (Tabs[activeTab].validate()) {
      setActiveTab(index);
    }
  }
}}
>{t.name}</div>

            ))}
        </div>
        <div className='tab-body flex  border border-black h-[200px] p-1.5'>
            <ActiveTabComponent  data={data} setData={setData} errors={errors} />
        </div>
<div className="flex gap-4 mt-4 justify-center">
  {activeTab > 0 && (
    <button
      type="button"
      onClick={handlePrevClick}
      className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
    >
      Prev
    </button>
  )}

  {activeTab < Tabs.length - 1 && (
    <button
      type="button"
      onClick={handleNextClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Next
    </button>
  )}

  {activeTab === Tabs.length - 1 && (
    <button
      type="button"
      onClick={handleSubmitClick}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
    >
      Submit
    </button>
  )}
</div>
    </div>
  )
}

export default TabForm;