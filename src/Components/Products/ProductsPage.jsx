import React, { useEffect, useState } from 'react'
import Navbar from '../Nav/Navbar'
import Footer from '../Footer/Footer'
import axios from 'axios'

const ProductsPage = () => {
  const [products, setProducts] =useState();
  useEffect(()=>{
    axios
    .get("http://127.0.0.1:8000/api/showproducts")
    .then(res=>setProducts(res.data.Products))
    .catch(error=>console.log(error))
  },[])
  return (
    <>
      <Navbar />
      <div className='products w-4/5 flex flex-wrap gap-4 mx-auto justify-center'>
      {products?.map((item)=>(
        <div className='card w-[300px] h-[400px] bg-red-600' key={item.id}>
          <img className='w-100% h-[100px]' src="" alt={item.pname} />
          <h1>{item.pname}</h1>
        </div>
      ))}
      </div>
      <Footer />
    </>
  )
}

export default ProductsPage
