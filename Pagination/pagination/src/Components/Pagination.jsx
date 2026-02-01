import React from 'react'

const Pagination = ({handlePageChange, goToPrevPage, goToNextPage,  currentPage ,noOfPages}) => {
     
  return (
     <div className='pagination-container p-5 flex justify-center '>
                <button type='button'  disabled={currentPage===0} onClick={()=>goToPrevPage()} className='page-number  p-3 m-2 border-2 border-black cursor-pointer text-xl'>⏮️</button>
            {[...Array(noOfPages).keys()].map((n)=>(<button type='button'
              key={n} onClick={()=>handlePageChange(n)}
              className={`page-number p-3 m-2 border-2 cursor-pointer
        ${
          currentPage === n
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-black border-black"
        }
      `}
                >{n+1}</button>))}
            <button type='button'  disabled={currentPage===noOfPages-1} onClick={()=>goToNextPage()} className='page-number  p-3 m-2 border-2 border-black cursor-pointer text-xl'>⏭️</button>
        </div>
  )
}

export default Pagination ;