import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { WishlistContext } from "../Context/wishlist-context";
import Darkmode from "./Darkmode";
import logo from "../../Images/logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("token")));
  const { wishlist } = useContext(WishlistContext);
  const closeMenu = () => setMenuOpen(false);
  const navClass = ({ isActive }) => isActive ? "nav-link is-active" : "nav-link";

  const logout = () => {
    ["token", "name", "isAuthenticated"].forEach((key) => localStorage.removeItem(key));
    setIsAuthenticated(false);
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="site-logo" to="/" onClick={closeMenu}><img src={logo} alt="Stickers Makers" /></Link>
        <nav id="main-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <NavLink className={navClass} to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink className={navClass} to="/products" onClick={closeMenu}>Products</NavLink>
          <NavLink className={navClass} to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink className={navClass} to="/contact" onClick={closeMenu}>Contact</NavLink>
          {isAuthenticated && <NavLink className={navClass} to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>}
          {isAuthenticated && <NavLink className="nav-icon" to="/inquiries" onClick={closeMenu} aria-label="Customer inquiries"><IoMdMail /></NavLink>}
          {isAuthenticated && <button className="nav-icon" onClick={logout} aria-label="Log out"><IoIosLogOut /></button>}
        </nav>
        <div className="header-actions">
          {!isAuthenticated && <Link className="wishlist-link" to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`}><FaRegHeart />{wishlist.length > 0 && <span>{wishlist.length}</span>}</Link>}
          <Darkmode />
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <IoClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
