import React, { useState } from 'react'
import { FiChevronDown } from "react-icons/fi";

const Accordion = ({Items}) => {
    const [openIndex,  setOpenIndex] =useState(null);

    const handleToggle =(index)=>{
        setOpenIndex(openIndex == index ? null :index);
    }
  return !Items || (Items.length ===0) ? "No items available" : 
  (
    <div className='accordion-container'>
        {Items.map((item, index)=>{
            return <div className='accordion-item' key={index}>
                <button className='accordion-title' onClick={()=>handleToggle(index)}>
                    {item.title}
                 <FiChevronDown
              className={`accordion-icon ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
                </button>
                {openIndex ===index && <div className='accordion-content'>
                    {item.content}
                </div> }

            </div>
        })}
    </div>
  )
}

export default Accordion