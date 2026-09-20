import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { WishlistContext } from "./wishlist-context";

// Load wishlist from local storage
const loadWishlistFromLocalStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem("wishlist");
    if (serializedWishlist === null) {
      return []; // Return an empty array if no wishlist is found
    }
    return JSON.parse(serializedWishlist);
  } catch (error) {
    console.error("Error loading wishlist from local storage:", error);
    return [];
  }
};

// Save wishlist to local storage
const saveWishlistToLocalStorage = (wishlist) => {
  try {
    const serializedWishlist = JSON.stringify(wishlist);
    localStorage.setItem("wishlist", serializedWishlist);
  } catch (error) {
    console.error("Error saving wishlist to local storage:", error);
  }
};

// Create the Wishlist Context
// Create the Wishlist Provider
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(loadWishlistFromLocalStorage());

  // Save wishlist to local storage whenever it changes
  useEffect(() => {
    saveWishlistToLocalStorage(wishlist);
  }, [wishlist]);

  // Add a product to the wishlist
  const addToWishlist = useCallback((product) => {
    setWishlist((prevWishlist) => {
      const existingItem = prevWishlist.find((item) => item.id === product.id);
      if (!existingItem) {
        return [...prevWishlist, product]; 
      }
      return prevWishlist; 
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  }, []);

  const isProductInWishlist = useCallback((productId) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  const value = useMemo(
    () => ({ wishlist, addToWishlist, removeFromWishlist, isProductInWishlist }),
    [wishlist, addToWishlist, removeFromWishlist, isProductInWishlist],
  );

  return (
    <WishlistContext.Provider
      value={value}
    >
      {children}
    </WishlistContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
