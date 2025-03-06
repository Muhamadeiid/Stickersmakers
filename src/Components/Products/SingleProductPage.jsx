import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import "./products.css";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { WishlistContext } from "../Context/WishlistContext";

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToWishlist, removeFromWishlist, isProductInWishlist } =
  useContext(WishlistContext);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/singleproduct/${id}`)
      .then((res) => {
        if (res.data && res.data.message) {
          const productData = res.data.message;
          setProduct({
            ...productData,
            image: JSON.parse(productData.image), // Parse the image string
          });
        } else {
          setError("Product not found"); // Handle case where product is not found
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setError("Failed to fetch product details"); // Handle API errors
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request completes
      });
  }, [id]);
  const handleWishlistClick = () => {
    if (isProductInWishlist(product.id)) {
      removeFromWishlist(product.id); // Remove from wishlist
    } else {
      addToWishlist(product); // Add to wishlist
    }
  };

  if (loading) {
    return (
      <div className="container-loading flex h-screen w-full justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-error flex h-screen w-full justify-center items-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-error flex h-screen w-full justify-center items-center">
        <p className="text-red-500 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="dark:bg-darkColor ">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10 w-11/12 mx-auto ">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <img
            className="w-[300px] md:w-[500px] h-auto object-cover rounded-lg"
            src={`http://127.0.0.1:8000${product.image.url}`}
            alt={product.name}
          />
          <div className="flex flex-col gap-4 max-w-md ">
            <h1 className="text-fontColor font-bold text-3xl dark:text-white ">
              {product.name}
            </h1>
            <h2 className="text-fontColor font-medium text-xl dark:text-white">
              {product.category}
            </h2>
            <p className="text-fontColor text-sm leading-relaxed dark:text-white ">
              {product.description}
            </p>
           
            <div className="flex gap-4 mt-4">
              {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                <AiOutlineShoppingCart
                  size={22}
                  className="inline-block mr-2"
                />{" "}
                Add to Cart
              </button> */}
              <button
                className={`${
                  isProductInWishlist(product.id)
                    ? "bg-red-500 hover:bg-red-600 dark:text-white"
                    : "bg-gray-200 hover:bg-gray-300 dark:text-white"
                } text-fontColor font-semibold py-2 px-4 rounded-lg transition-all duration-300`}
                onClick={handleWishlistClick}
              > <FaRegHeart size={22} className="inline-block mr-2 dark:text-white"  />
                {isProductInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </ div>
  );
};

export default SingleProductPage;
