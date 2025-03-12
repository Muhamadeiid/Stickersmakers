import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Nav/Navbar";
import Contact from "../Contact/ContactPage";
import Footer from "../Footer/Footer";
import hero from "../../Images/Hero Section.jpg";
import laptop from "../../Images/harry potter 2.jpg";
import "./Homepage.css";
import { motion } from "framer-motion";
import Loki from "../../Images/Loki.jpg";
import Sliding from "./Sliding";
import cat from "../../Images/cat.png";
import logo from "../../Images/logo.png";
import onepiece from "../../Images/one piece.png";
import stickers from "../../Images/second Background Image.jpg";
import leon from "../../Images/leon poster.png";
import stich from "../../Images/stich.png";
import simpson from "../../Images/the simpson.png";
import godfather from "../../Images/the godfather.png";
import rick from "../../Images/rick&morty.png";
import pizza from "../../Images/pizza.png";
import boom from "../../Images/boom.png";
import hp from "../../Images/Harry potter.png";
import captain from "../../Images/captain america.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Homepage = () => {
  const scrollRef = useRef(null);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/showproducts")
      .then((res) => {
        console.log("API Response:", res.data.Products); // Debugging
        const productsWithParsedImage = res.data.Products.map((product) => ({
          ...product,
          image: JSON.parse(product.image),
        }));
        const selectedProducts = getRandomProductsByCategory(
          productsWithParsedImage
        );
        setRandomProducts(selectedProducts);
      })
      .catch((error) => console.error("API Error:", error));
  }, []);

  const groupProductsByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  const getRandomProductsByCategory = (products) => {
    const groupedProducts = groupProductsByCategory(products);
    const selectedProducts = [];

    for (const category in groupedProducts) {
      const productsInCategory = groupedProducts[category];
      const randomIndex = Math.floor(Math.random() * productsInCategory.length);
      selectedProducts.push(productsInCategory[randomIndex]);
    }

    return selectedProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
  };

  return (
    <div className=" dark:bg-darkColor -z-20">
      <Navbar />
      <section className="hero w-full h-[80vh] mb-20 bg-gradient-to-l from-slate-400 to-slate-200 dark:from-slate-700 dark:to-slate-900 relative">
        <div className="px-6 sm:px-10 md:px-20 py-20 sm:py-30 md:py-40">
          <h1 className="text-fontColor text-3xl md:text-4xl lg:text-5xl font-bold max-w-[300px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[900px] leading-tight tracking-tighter animate-fadeIn">
            Turn Your Passion into Art
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Personalize Your World with Us
            </span>
          </h1>
        </div>

        <img src={cat} alt="" className="w-60 absolute right-8 top-16" />
        <img
          src={onepiece}
          alt=""
          className="w-60 absolute right-4 bottom-20"
        />
        <img
          src={pizza}
          alt=""
          className="w-60 absolute right-[630px] top-4 z-10"
        />
        <img
          src={rick}
          alt=""
          className="w-60 absolute right-[450px] top-[20px]"
        />
        <img
          src={godfather}
          alt=""
          className="w-60 absolute right-[220px] -top-10"
        />
        <img
          src={simpson}
          alt=""
          className="w-60 absolute right-2/3 bottom-20"
        />
        <img
          src={stich}
          alt=""
          className="w-60 absolute right-[450px] bottom-8 z-10"
        />
        <img
          src={leon}
          alt=""
          className="w-60 absolute right-[610px] bottom-4"
        />
        <img
          src={hp}
          alt=""
          className="w-60 absolute right-[250px] bottom-[230px]"
        />
        <img
          src={boom}
          alt=""
          className="w-60 absolute right-[250px] bottom-[70px]"
        />
        <img
          src={captain}
          alt=""
          className="w-60 absolute right-[160px] bottom-[10px]"
        />
      </section>
      <section className="features dark:bg-darkColor flex flex-col items-center gap-20 justify-center mb-10 md:mb-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="sm:text-4xl text-2xl dark:text-white font-bold mb-8 text-fontColor">
            Our Featured Products
          </h1>
          <div className="border-2 rounded-full dark:border-mainColor border-mainColor w-40"></div>
        </div>

        <div className="cards grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:w-4/5">
          {randomProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.1 }}
              className="card cursor-pointer bg-white dark:bg-gray-800  rounded-lg shadow-lg overflow-hidden transition-all duration-300"
            >
              <img
                src={`http://127.0.0.1:8000${product.image.url}`}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4 flex flex-col gap-4 items-center">
                <h2 className="product-name text-lg font-semibold text-fontColor dark:text-white mt-2">
                  {product.name}
                </h2>
                <h3 className="category text-sm text-gray-500 dark:text-gray-400">
                  {product.category}
                </h3>

                {/* <h4 className="price text-mainColor font-bold mt-2">
                  {product.price}
                </h4> */}
                <h4 className=" text-fontColor text-sm font-normal mt-2 line-clamp-2 overflow-clip">
                  {product.description}
                </h4>
                <button className="bg-fontColor text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300">
                  <Link to={`/products/${product.id}`}>Show More</Link>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="relative h-[40vh] w-full md:bg-[#ededed] mb-12 md:mb-24 dark:bg-slate-800 ">
        <div className="absolute trying w-full h-full"></div>
        <div className="absolute py-[60px] md:py-[20px] px-[50px] md:px-[100px] h-full w-full flex justify-center items-center ">
          <div className="md:w-1/2 pl-2 flex flex-col gap-4 text-white dark:text-white">
            <h3 className="dark:text-white text-fontColor md:text-white font-bold text-lg md:text-2xl ">DON'T MISS OUT!</h3>
            <h1 className="dark:text-white text-fontColor md:text-white font-bold text-2xl md:text-4xl ">
              Crafted for You
            </h1>
            <p className="dark:text-white text-fontColor md:text-white font-bold ">
              Join Thousands of Happy Customers. Find Your Favorite Today!
            </p>
            <button
              type="submit"
              className="bg-fontColor mt-4 w-44 h-12 text-white rounded-lg"
            >
              <Link to="/products">Shop Now</Link>
            </button>
          </div>
          <div className="sm:w-1/2 hidden sm:block h-full"></div>
        </div>
      </section>
      <section className="features dark:bg-darkColor flex flex-col items-center gap-20 justify-center mb-20">
        <div className="flex flex-col justify-center items-center">
          <h1 className="md:text-4xl text-2xl dark:text-white font-bold mb-8 text-fontColor">
            Most Loved Products
          </h1>
          <div className="border-2 rounded-full border-mainColor w-40"></div>
        </div>
        <div className="cards grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:w-4/5">
          <motion.div
            ref={scrollRef}
            whileHover={{ scale: 1.1 }}
            className="card cursor-pointer"
          >
            <img src={Loki} alt="product" />
            <h3 className="category">Poster</h3>
            <h2 className="product-name">Loki Poster</h2>
            <h4 className="price">20$</h4>
          </motion.div>
          <motion.div
            ref={scrollRef}
            whileHover={{ scale: 1.1 }}
            className="card cursor-pointer"
          >
            <img src={Loki} alt="product" />
            <h3 className="category">Poster</h3>
            <h2 className="product-name">Loki Poster</h2>
            <h4 className="price">20$</h4>
          </motion.div>
          <motion.div
            ref={scrollRef}
            whileHover={{ scale: 1.1 }}
            className="card cursor-pointer"
          >
            <img src={Loki} alt="product" />
            <h3 className="category">Poster</h3>
            <h2 className="product-name">Loki Poster</h2>
            <h4 className="price">20$</h4>
          </motion.div>
          <motion.div
            ref={scrollRef}
            whileHover={{ scale: 1.1 }}
            className="card cursor-pointer"
          >
            <img src={Loki} alt="product" />
            <h3 className="category">Poster</h3>
            <h2 className="product-name">Loki Poster</h2>
            <h4 className="price">20$</h4>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
