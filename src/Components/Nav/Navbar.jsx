import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import Darkmode from "./Darkmode";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../Images/logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const showingMenu = () => {
    if (window.innerWidth > 768) {
      setMenu(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", showingMenu);
    return () => window.removeEventListener("resize", showingMenu);
  });
  return (
    <>
      <header
        className={menu?" z-50 w-full h-[15vh] shadow-lg   bg-white dark:bg-[#2e2e2e] dark:text-white flex justify-center items-center gap-8":" shadow-lg  bg-white dark:bg-[#2e2e2e] dark:text-white h-[15vh]  flex justify-center items-center gap-8"}

      >
        <div>
            <Link to="/">
              <img src={logo} className="w-48 h-44" alt="Logo" />
            </Link>
          </div>
        <nav className="flex  items-center justify-end gap-10 w-11/12 md:w-4/5">
          
          <div className="flex gap-8 justify-center items-center text-fontColor dark:text-white">
            <ul
              className={
                menu
                  ? "absolute z-50 bg-white dark:bg-[#2e2e2e] dark:text-white flex flex-col items-start pl-4 left-0 top-[15vh] h-[300px] w-full  gap-4"
                  : " md:flex items-center gap-8 hidden"
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
              <motion.li className="py-4" whileHover={{ scale: 1.2 }}>
                <NavLink className="flex justify-center" to="/cart">
                  <div className="relative w-fit ">
                    <FaShoppingCart  fill="#ff5151" size={32} />
                    <sup className="absolute rounded font-bold text-fontColor bg-mainColor flex justify-center items-center w-4 h-4 p-0 -top-4 -right-4">
                      0
                    </sup>
                  </div>
                </NavLink>
              </motion.li>
            </ul>

            <Darkmode />
            {menu ? (
              <IoMdCloseCircle
                className="block hover:cursor-pointer mr-4"
                onClick={() => setMenu(false)}
                size={32}
              />
            ) : (
              <RxHamburgerMenu
                className="md:hidden block hover:cursor-pointer mr-4"
                onClick={() => setMenu(true)}
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
