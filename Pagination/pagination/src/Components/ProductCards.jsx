import React from 'react'

const ProductCards = ({title, image}) => {
  return (
    <div className="product-card flex flex-col items-center border border-black p-2 w-[300px] m-4">
  <img
    src={image}
    alt={title}
    className="product-img w-[220px] h-[220px] object-cover"
  />
  <span className="title text-center text-gray-900 mt-2">
    {title}
  </span>
</div>

  )
}

export default ProductCards