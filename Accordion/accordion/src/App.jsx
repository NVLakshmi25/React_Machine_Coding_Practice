import React from 'react'
import './App.css'
import Accordion from './Components/Accordion'

function App() {

 const accordionItems = [
  {
    id: 1,
    title: "What is React?",
    content:
      "React is a JavaScript library used for building fast and interactive user interfaces using components.",
  },
  {
    id: 2,
    title: "What is useState?",
    content:
      "useState is a React Hook that lets you add state to functional components.",
  },
  {
    id: 3,
    title: "What is useEffect?",
    content:
      "useEffect lets you perform side effects like API calls, subscriptions, or DOM updates after rendering.",
  },
  {
    id: 4,
    title: "Difference between props and state?",
    content:
      "Props are passed from parent to child components, while state is managed inside the component.",
  },
  {
    id: 5,
    title: "What is Virtual DOM?",
    content:
      "The Virtual DOM is a lightweight copy of the real DOM that React uses to optimize updates efficiently.",
  },
  
];



  return (
    <>
      <div>
       <Accordion  Items={accordionItems} />
      </div>
      
    </>
  )
}

export default App
