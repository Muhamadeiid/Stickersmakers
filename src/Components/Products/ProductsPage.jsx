import { useEffect, useMemo, useState, useContext } from "react";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import api from "../../lib/api";
import { getProductImageUrl, normalizeProduct } from "../../lib/products";
import "./products.css";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both outline and filled heart icons
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/wishlist-context";

const ProductsPage = () => {
  const categories = [
    { value: "All", label: "Everything", symbol: "✳" },
    { value: "Sticker", label: "Stickers", symbol: "✦" },
    { value: "Laptop Skin", label: "Laptop skins", symbol: "▣" },
    { value: "Keyboard Skin", label: "Keyboard skins", symbol: "⌘" },
    { value: "Poster", label: "Posters", symbol: "▧" },
  ];
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const itemsPerPage = 8;

  const { addToWishlist, removeFromWishlist, isProductInWishlist } =
    useContext(WishlistContext);

    useEffect(() => {
      const controller = new AbortController();
      api
        .get("/showproducts", { signal: controller.signal })
        .then((res) => {
          const productsWithParsedImage = (res.data.Products || [])
            .map(normalizeProduct)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
          setProducts(productsWithParsedImage);
          setFilteredProducts(productsWithParsedImage);
        })
        .catch((requestError) => {
          if (requestError.code !== "ERR_CANCELED") {
            setError("Products are temporarily unavailable. Please try again later.");
          }
        })
        .finally(() => setLoading(false));

      return () => controller.abort();
    }, []);

  useEffect(() => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((item) => item.category === category));
    }
    setCurrentPage(1);
  }, [category, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(
    () => filteredProducts.slice(indexOfFirstItem, indexOfLastItem),
    [filteredProducts, indexOfFirstItem, indexOfLastItem],
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleWishlistClick = (product) => {
    if (isProductInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product); 
    }
  };

  return (
    <div className="products-page dark:bg-darkColor ">
      <Navbar />
      <main className="products-main">
        <div className="w-full flex flex-col justify-center items-center gap-10">
          <div className="text-center">
            <span className="text-[#c95947] text-xs font-extrabold uppercase tracking-[.15em]">Made for you</span>
            <h1 className="text-fontColor font-extrabold md:text-4xl text-2xl dark:text-white mt-2">Explore the collection</h1>
            <p className="text-slate-500 dark:text-slate-300 mt-3">Find stickers, skins, and prints that feel like yours.</p>
          </div>

          <section className="category-section" aria-label="Filter products by category">
            <div className="category-heading"><span>Browse by category</span><span>{filteredProducts.length} {filteredProducts.length === 1 ? "design" : "designs"}</span></div>
            <div className="category-options">{categories.map((option) => {
              const count = option.value === "All" ? products.length : products.filter((item) => item.category === option.value).length;
              return <button key={option.value} type="button" className={`category-chip ${category === option.value ? "is-selected" : ""}`} aria-pressed={category === option.value} onClick={() => setCategory(option.value)}><span className="category-symbol" aria-hidden="true">{option.symbol}</span><span>{option.label}</span><span className="category-count">{count}</span></button>;
            })}</div>
          </section>

          {loading && <p role="status">Loading products…</p>}
          {error && <p className="text-red-600" role="alert">{error}</p>}
          {!loading && !error && currentItems.length === 0 && (
            <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 px-8 py-14 text-center">
              <p className="text-4xl" aria-hidden="true">✳</p>
              <h2 className="text-2xl font-bold text-fontColor dark:text-white mt-4">Nothing here just yet</h2>
              <p className="text-slate-500 dark:text-slate-300 mt-3">New designs are on their way. Have an idea in mind? Tell us about it.</p>
              <Link to="/custom-order" className="inline-flex mt-6 rounded-xl bg-fontColor px-5 py-3 font-semibold text-white">Start a custom order</Link>
            </div>
          )}

          <div className="products w-full flex flex-wrap gap-4 mx-auto justify-center text-center">
            {currentItems.map((item) => (
              <div
                className="card dark:bg-darkColor dark:border dark:border-gray-700 dark:rounded group w-[280px] h-[420px] sm:w-[234px] sm:h-[320px] gap-4 p-4 shadow rounded-sm flex flex-col items-center"
                key={item.id}
              >
                <div className="w-full h-[200px] relative overflow-hidden">
                  <div className="onhover translate-y-full group-hover:translate-y-0  bg-opacity-70 bg-black  transition-all duration-500  absolute w-full h-full flex gap-2 justify-center items-center">
                    <button onClick={() => handleWishlistClick(item)}>
                      {isProductInWishlist(item.id) ? (
                        <FaHeart size={22} className="text-red-500" />
                      ) : (
                        <FaRegHeart size={22} /> 
                      )}
                    </button>
                    <button>
                      <Link to={`/products/${item.id}`}>
                        <FiEye size={22}  />
                      </Link>
                    </button>
                  </div>
                  <img
                    className="w-full h-full object-contain"
                    src={getProductImageUrl(item)}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width="202"
                    height="200"
                  />
                </div>
                <h1 className="text-fontColor h-6 dark:text-white font-bold text-sm">
                  {item.name}
                </h1>
                <h1 className="text-fontColor dark:text-white font-normal text-sm">
                  {item.category}
                </h1>
                <h1 className="text-fontColor dark:text-white font-bold text-xs line-clamp-2 overflow-clip">
                  {item.description}
                </h1>
                {/* <h2 className="text-[#2DA5F3] font-bold text-sm self-start">
                  {item.price}
                </h2> */}
              </div>
            ))}
          </div>

          {totalPages > 1 && <div className="pagination flex gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                } rounded`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>}
        </div>
      </main>

      <Footer />
    </ div>
  );
};

export default ProductsPage;
