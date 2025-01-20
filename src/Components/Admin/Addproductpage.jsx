import React, { useRef, useState } from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { MdOutlineImageSearch } from "react-icons/md";


const Addproductpage = () => {
  const [imagePreview, setImagePreview] = useState(null); // To store the preview URL
  let image = useRef()

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); 
      console.log(imagePreview)
    }
  };

  return (
    <div className="dark:bg-darkColor dark:text-white">
      <Navbar />
      <div className="lg:w-4/5 md:w-9/10 w-4/5 py-10 mx-auto flex flex-col md:justify-center md:items-start items-center gap-4 dark:bg-darkColor">
        <p className="text-3xl dark:text-white text-fontColor font-bold">Add Product</p>
      <form action="" method="post" className="addproduct-form  w-full flex flex-col mx-auto p-8  gap-10 items-start justify-center dark:shadow-darkShadow dark:border-[#2e2e2e] rounded-2xl shadow-md ">
        <div className="w-full  flex flex-col-reverse md:flex-row justify-start items-start md:gap-0 gap-8">
        <div className="image w-full md:w-1/2 flex flex-col items-start md:justify-start ">
          <h1 className="text-fontColor dark:text-white text-start font-bold  mb-10 md:mb-1">Main Image</h1>
         {imagePreview ? <div className="w-[450px] h-[450px]	rounded-md shadow-2xl">
          <img src={imagePreview} alt="Product" className="w-full h-full object-cover	rounded-md shadow-2xl" />
        </div> :  <div className="	rounded-md "><MdOutlineImageSearch size={450} className="fill-fontColor dark:fill-white" /></div>  }

        </div>
        <div className=" inputs w-full md:w-1/2 flex flex-col justify-start items-start  px-4 gap-4">
        <div className="form-div ">
          <label htmlFor="pname">Product Name</label>
          <input type="text" name="pname" required autoComplete="off"/>
        </div>
        <div className="form-div">
          <label htmlFor="pdesc">Product Description</label>
          <textarea  name="pdesc" id="" required autoComplete="off" rows={4}/>
        </div>
        <div className="form-div">
          <label htmlFor="pcat">Product Category</label>
          <select name="pcat" className="text-fontColor w-full border border-[#ddd] rounded-md px-4 py-2 dark:shadow-[#2e2e2e] shadow focus:border-none">
          <option  value="Sticker">Sticker</option>
            <option  value="Sticker">Laptop Skin</option>
            <option  value="Sticker">Keyboard Skin</option>
            <option  value="Sticker">Poster</option>

          </select>
        </div>
        
        <div className="form-div">
          <label htmlFor="pprice">Product Price</label>
          <input type="text" name="pprice" autoComplete="off" required/>
        </div>
        <div className="form-div">
          <label htmlFor="image">Product Image</label>
          <input ref={image} className="w-full h-10" type="file" name="image" placeholder="n" onChange={handleImageChange} required/>
          
         
        </div>
        </div>
        </div>
        <div className="w-full buttons flex justify-center gap-4 mt-6">
        <button className="w-40 h-10 bg-orange-600 text-white font-bold  py-1 rounded-md"><Link to="/showproducts">Cancel</Link></button>
        <input type="submit" className=" w-40 h-10 bg-fontColor text-white px-3 py-1  font-bold rounded-md" value="Add Product" />
        </div>
      </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default Addproductpage;
