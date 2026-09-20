import { useEffect, useState } from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import "./Homepage.css";
import { motion } from "framer-motion";
import cat from "../../Images/cat.png";
import onepiece from "../../Images/one-piece.png";
import godfather from "../../Images/the-godfather.png";
import pizza from "../../Images/pizza.png";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import { getProductImageUrl, normalizeProduct } from "../../lib/products";

const selectProductsByCategory = (products, limit = 4) => {
  const productsByCategory = new Map();
  products.forEach((product) => {
    if (!productsByCategory.has(product.category)) {
      productsByCategory.set(product.category, product);
    }
  });
  return Array.from(productsByCategory.values()).slice(0, limit);
};

const Homepage = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    api
      .get("/showproducts", { signal: controller.signal })
      .then((res) => {
        const products = (res.data.Products || []).map(normalizeProduct);
        const selectedProducts = selectProductsByCategory(products);
        setRandomProducts(selectedProducts);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

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

        <img src={cat} alt="" aria-hidden="true" className="w-60 absolute right-8 top-16" fetchPriority="high" />
        <img
          src={onepiece}
          alt=""
          aria-hidden="true"
          className="w-60 absolute right-4 bottom-20"
        />
        <img
          src={pizza}
          alt=""
          aria-hidden="true"
          className="w-60 absolute right-[630px] top-4 z-10"
        />
        <img
          src={godfather}
          alt=""
          aria-hidden="true"
          className="w-60 absolute right-[220px] -top-10"
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
                src={getProductImageUrl(product)}
                alt={product.name}
                className="w-full h-48 object-contain"
                loading="lazy"
                decoding="async"
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
            <h3 className="dark:text-white text-fontColor md:text-white font-bold text-lg md:text-2xl ">DON&apos;T MISS OUT!</h3>
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
          {randomProducts.map((product) => (
            <motion.article key={product.id} whileHover={{ scale: 1.05 }} className="card cursor-pointer">
              <img src={getProductImageUrl(product)} alt={product.name} loading="lazy" decoding="async" />
              <h3 className="category">{product.category}</h3>
              <h2 className="product-name">{product.name}</h2>
              <Link to={`/products/${product.id}`} className="font-semibold text-mainColor">View product</Link>
            </motion.article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
