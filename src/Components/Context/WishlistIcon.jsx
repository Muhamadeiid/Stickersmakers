import { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "./wishlist-context";

const WishlistIcon = () => {
  const { wishlist } = useContext(WishlistContext); 

  return (
    <div className="relative w-fit">
      <FaRegHeart fill="#ff5151" size={32} />
      <sup className="absolute rounded font-bold text-fontColor dark:text-white bg-mainColor flex justify-center items-center w-4 h-4 p-0 -top-4 -right-4">
        {wishlist.length} 
      </sup>
    </div>
  );
};

export default WishlistIcon;
