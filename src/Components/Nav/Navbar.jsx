import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Darkmode from "./Darkmode";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
  const [menu, setMenu] = useState(false);

  console.log(menu);
  return (
    <>
      <header className="dark:bg-black dark:text-white h-20 flex justify-center items-center gap-8 selection:bg-mainColor">
        <nav className="flex justify-between w-11/12 md:w-4/5">
          <div>
            <img src="" alt="Logo" />
          </div>
          <div className="flex gap-8 items-center">
          <ul className={menu ? " dark:bg-white dark:text-black flex flex-col items-center absolute top-24 right-0 h-4/5 w-1/2 gap-4" :"md:flex items-center gap-8 hidden" } >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">All Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
            
              <NavLink  to="/cart">
              <div className="relative w-fit">
              <FaShoppingCart cla fill="#ff5151" size={32} />
              <sup className="absolute rounded font-bold text-black bg-mainColor flex justify-center items-center w-4 h-4 p-0 -top-4 -right-4">0</sup>
                </div>
              </NavLink>

            </li>
          </ul>
          
          </div>
        </nav>
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
      </header>
    </>
  );
};

export default Navbar;
