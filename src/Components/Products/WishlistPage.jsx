import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import the filled heart icon
import { Link } from "react-router-dom"; // Import Link for navigation

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="dark:bg-darkColor dark:text-white">
      <Navbar />
      <div className="flex gap-6 py-10 mx-auto w-11/12 justify-center">
        <div className="w-9/12 flex flex-col justify-center items-center gap-10">
          <h1 className="text-fontColor font-bold text-2xl dark:text-white">Your Wishlist</h1>

          <div className="products w-full flex flex-wrap gap-4 mx-auto justify-center text-center">
            {wishlist.length === 0 ? (
              <p className="text-gray-600 text-lg">Your wishlist is empty.</p>
            ) : (
              wishlist.map((item) => (
                <div
                  className="card dark:border dark:border-gray-700 dark:rounded group w-[260px] h-[420px] gap-4 p-4 shadow rounded-sm flex flex-col items-center"
                  key={item.id}
                >
                  <div className="w-full h-[180px] relative overflow-hidden">
                    <img
                      className="w-full h-[180px] object-cover"
                      src={`http://127.0.0.1:8000${item.image.url}`}
                      alt={item.name}
                    />
                  </div>
                  <h1 className="text-fontColor font-bold text-sm dark:text-white">
                    {item.name}
                  </h1>
                  <h1 className="text-fontColor font-normal text-sm dark:text-white">
                    {item.category}
                  </h1>
                  <h1 className="text-fontColor font-bold text-xs dark:text-white">
                    {item.description}
                  </h1>

                  {/* Go to Single Product Page Button */}
                  <Link
                    to={`/products/${item.id}`} // Link to the single product page
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm text-center transition-colors"
                  >
                    View Product
                  </Link>

                  {/* Remove from Wishlist Button */}
                  <button
                    className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm text-white mt-2 transition-colors"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove From Wishlist <FaRegHeart size={22} className="inline-block mr-2" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;