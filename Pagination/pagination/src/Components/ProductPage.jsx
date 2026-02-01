import React from 'react'
import  { useEffect, useState } from 'react'
import ProductCards from './ProductCards';
import Pagination from './Pagination';
import { PAGE_SIZE, PRODUCTS_APT } from '../assets/constants';


const ProductPage = () => {
    const[products, setProducts]=useState([]);
    const [currentPage, setCurrentPage]=useState(0);
    
        const fetchData=async()=>{
            const data=await fetch(PRODUCTS_APT);
            const json= await data.json();
            setProducts(json.products);
            
        }
        useEffect(()=>{
           fetchData()
    
        },[]);

        const totalProducts=products.length;
        const noOfPages=Math.ceil(totalProducts  / PAGE_SIZE);
        const start=currentPage *PAGE_SIZE  // 1*10 ; 2*20
        const end=start +PAGE_SIZE  //  10+10=20 ; 20+10=30 ;

        const handlePageChange=(n)=>{
            setCurrentPage(n);
        }
        const goToNextPage=()=>{
            setCurrentPage((prev)=>prev+1)
        }
        const goToPrevPage=()=>{
            setCurrentPage((prev)=>prev-1)
        }

       
  return (
   !products.length?(
    <h1>No products Found</h1>):(
        <div className='main-container'>
            <h1 className='text-black text-2xl font-bold text-center mt-5'>Pagination</h1>  
        <div className='page-container flex  flex-wrap'>
        {products. slice( start, end) .map((p)=>(
            <ProductCards  key={p.id} image={p.thumbnail} title={p.title} />
          ))}
        </div>
        <Pagination 
            handlePageChange={handlePageChange}
             goToPrevPage={ goToPrevPage}
             goToNextPage={goToNextPage}
             currentPage={currentPage}
             noOfPages={noOfPages}
             />
        
        </div>
    )
   )
  
}

export default ProductPage