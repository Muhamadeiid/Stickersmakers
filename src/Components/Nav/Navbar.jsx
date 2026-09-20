import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Darkmode from "./Darkmode";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import logo from "../../Images/logo.png";
import { motion } from "framer-motion";
import { useContext } from "react";
import { WishlistContext } from "../Context/wishlist-context";
import { IoMdMail } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";



const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { wishlist } = useContext(WishlistContext); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); 
  }, []);

  const showingMenu = () => {
    if (window.innerWidth > 768) {
      setMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", showingMenu);
    return () => window.removeEventListener("resize", showingMenu);
  }, []);

  return (
    <>
      <header
        className={
          menu
            ? "z-50 w-full h-[15vh] shadow-lg bg-white dark:bg-[#1f2937] dark:text-white flex justify-center items-center gap-8"
            : "shadow-lg bg-white dark:bg-[#1f2937] dark:text-white h-[15vh] flex justify-center items-center gap-8"
        }
      >
        <div>
          <Link to="/">
            <img src={logo} className="w-48 h-44 object-contain" alt="Stickers Makers" width="192" height="176" />
          </Link>
        </div>

        <nav className="flex items-center justify-end gap-10 w-11/12 md:w-4/5">
          <div className="flex gap-8 justify-center items-center text-fontColor dark:text-white">
            <ul
              className={
                menu
                  ? "absolute z-50 bg-white dark:bg-[#1f2937] dark:text-white flex flex-col items-start pl-4 left-0 top-[15vh] h-[300px] w-full gap-4"
                  : "md:flex items-center gap-8 hidden"
              }
            >
              <motion.li whileHover={{ scale: 1.2 }}>
                <NavLink to="/">Home</NavLink>
              </motion.li>
              <motion.li whileHover={{ scale: 1.2 }}>
                <NavLink to="/products">All Products</NavLink>
              </motion.li>
              <motion.li whileHover={{ scale: 1.2 }}>
                <NavLink to="/about">About</NavLink>
              </motion.li>
              <motion.li whileHover={{ scale: 1.2 }}>
                <NavLink to="/contact">Contact</NavLink>
              </motion.li>

              {!isAuthenticated && (
                <motion.li className="py-4" whileHover={{ scale: 1.2 }}>
                  <NavLink className="flex justify-center" to="/wishlist">
                    <div className="relative w-fit">
                      <FaRegHeart size={22} />
                      {wishlist.length > 0 && (
                        <sup className="absolute rounded font-bold text-fontColor bg-mainColor flex justify-center items-center w-4 h-4 p-0 -top-4 -right-4">
                          {wishlist.length}
                        </sup>
                      )}
                    </div>
                  </NavLink>
                </motion.li>
              )}

              {isAuthenticated && (
                <motion.li whileHover={{ scale: 1.2 }}>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </motion.li>
              )}
              {isAuthenticated && (
                <motion.li whileHover={{ scale: 1.2 }}>
                  <NavLink to="/inquiries" aria-label="Customer inquiries"><IoMdMail size={28} className="dark:fill-white fill-fontColor" /></NavLink>
                </motion.li>
              )}

              {isAuthenticated && (
                <motion.li whileHover={{ scale: 1.2 }}>
                  <button className="flex justify-center items-center" onClick={()=>{
                    localStorage.removeItem("token");
                    localStorage.removeItem("name");
                    localStorage.removeItem("isAuthenticated");
                    setIsAuthenticated(false);
                  }} aria-label="Log out"><IoIosLogOut size={28} className="dark:fill-white fill-fontColor" /></button>
                </motion.li>
              )}
            </ul>

            <Darkmode />

            {menu ? (
              <IoMdCloseCircle
                className="block hover:cursor-pointer mr-4"
                onClick={() => setMenu(false)}
                role="button"
                aria-label="Close navigation menu"
                size={32}
              />
            ) : (
              <RxHamburgerMenu
                className="md:hidden block hover:cursor-pointer mr-4"
                onClick={() => setMenu(true)}
                role="button"
                aria-label="Open navigation menu"
                size={32}
              />
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
