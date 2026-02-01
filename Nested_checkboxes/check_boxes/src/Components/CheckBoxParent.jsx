
import React, { useState } from 'react'
import CheckBoxes from './CheckBoxes';

const checkboxesData = [
  {
    id: "1",
    name: "fruits",
    children: [
      {
        id: "2",
        name: "Apple",
        children: [
          {
            id: "3",
            name: "Apricot",
          },
          {
            id: "4",
            name: "Avocado",
          },
          {
            id: "5",
            name: "Bilberry",
          },
          {
            id: "6",
            name: "Blackcurrant",
           
          },
       
        ],
      },
   {
            id: "7",
            name: "Papayacurrant",
           children: [
              {
                id: "8",
                name: "Date",
              },
              {
                id: "9",
                name: "Durian",
              },
              {
                id: "10",
                name: "Gooseberry",
              },
            ],
   }
    ],
    
  },
 

  {
    id: "11",
    name: "Currant",
  },

  {
    id: "12",
    name: "Guava",
  },

  {
    id: "13",
    name: "Elderberry",
    children: [
      {
        id: "14",
        name: "Damson",
      },
    ],
  },

  {
    id: "15",
    name: "Cherimoya",
  },

  {
    id: "16",
    name: "Fig",
  },
];



const CheckBoxParent = () => {
    const [checked,setChecked]=useState({});
  return (
    <div className=''>
        <CheckBoxes  data={checkboxesData } checked={checked}  setChecked={setChecked}   rootData={checkboxesData} />
    </div>
  )
}

export default CheckBoxParent



