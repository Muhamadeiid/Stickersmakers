import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import hero from "../../Images/Hero Section.jpg";
import laptop from "../../Images/harry potter 2.jpg";
import "./Homepage.css";
import { motion } from "framer-motion";
import Loki from "../../Images/loki.jpg";
import Sliding from "./Sliding";

const Homepage = () => {
  const scrollRef = useRef(null);
  
  return (
    
    <div className=" dark:bg-darkColor -z-20">
      <Navbar />
      <Sliding />
      <section className="features dark:bg-darkColor flex flex-col items-center gap-20 justify-center mb-20 ">
        <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl dark:text-white font-bold mb-8 text-fontColor">
        Our Featured Products
        </h1>
        <div className="border-2 rounded-full dark:border-mainColor border-mainColor w-40"></div>
        </div>
        <div className="cards grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:w-4/5">
          <motion.div
            ref={scrollRef}
            whileHover={{ scale: 1.1 }}
            className="card cursor-pointer"
          >
            <img src={laptop} alt="product" />
            <h3 className="category">Laptop skin</h3>
            <h2 className="product-name">Harry Potter Laptop skin</h2>
            <h4 className="price">20$</h4>
          </motion.div>
          <motion.div
            ref={scrollRef}
            whileHover={{ scale: 1.1 }}
            className="card cursor-pointer"
          >
            <img src={laptop} alt="product" />
            <h3 className="category">Laptop skin</h3>
            <h2 className="product-name">Harry Potter Laptop skin</h2>
            <h4 className="price">20$</h4>
          </motion.div>
          <motion.div
            ref={scrollRef}
            whileHover={{ scale: 1.1 }}
            className="card cursor-pointer"
          >
            <img src={laptop} alt="product" />
            <h3 className="category">Laptop skin</h3>
            <h2 className="product-name">Harry Potter Laptop skin</h2>
            <h4 className="price">20$</h4>
          </motion.div>
          <motion.div
            ref={scrollRef}
            whileHover={{ scale: 1.1 }}
            className="card cursor-pointer"
          >
            <img src={laptop} alt="product" />
            <h3 className="category">Laptop skin</h3>
            <h2 className="product-name">Harry Potter Laptop skin</h2>
            <h4 className="price">20$</h4>
          </motion.div>
        </div>
      </section>
      <section className="relative h-[50vh] w-full bg-[#ededed] mb-24 dark:bg-[#2e2e2e]">
        <div className="absolute trying w-full h-full">  
        </div>
            <div className="absolute  py-[160px] px-[100px] h-full w-full flex justify-center items-center ">
              <div className="sm:w-1/2 pl-2 flex flex-col gap-4 text-white dark:text-white">
                <h3 className=" font-bold text-lg sm:text-2xl ">HURRY UP!</h3>
                <h1 className=" font-bold text-2xl sm:text-4xl ">Deal of the Day!</h1>
                <p className=" font-bold ">But This T-shirt At 20% Discount, Use Code Off20</p>
                <button type="submit" className="bg-mainColor mt-4 w-44 h-12 text-white rounded-lg">
                  Shop Now
                </button>
              </div>
              <div className="sm:w-1/2 hidden sm:block h-full"></div>
            </div>
      </section>
      <section className="features dark:bg-darkColor flex flex-col items-center gap-20 justify-center mb-20">
        <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl dark:text-white font-bold mb-8 text-fontColor">
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
