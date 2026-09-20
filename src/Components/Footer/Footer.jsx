import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link className="footer-wordmark" to="/" aria-label="Stickers Makers home">STICKERS<br />MAKERS<span>✳</span></Link>
          <p>Little details. Big personality. Made to make your everyday feel more like you.</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/stickersmakers1" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://www.instagram.com/stickersmakers1/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
        <div className="footer-group">
          <h2>Explore</h2>
          <Link to="/products">All products</Link>
          <Link to="/about">Our story</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div className="footer-group">
          <h2>Need a hand?</h2>
          <Link to="/contact">Contact us</Link>
          <a href="tel:+201155180024">+20 115 518 0024</a>
          <a href="mailto:makersstickers@gmail.com">makersstickers@gmail.com</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Stickers Makers</span><span>Made with care, made for you.</span></div>
    </footer>
  );
}
