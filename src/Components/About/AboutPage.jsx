import { Link } from "react-router-dom";
import { TbSticker2 } from "react-icons/tb";
import { IoLaptop } from "react-icons/io5";
import { FaRegKeyboard } from "react-icons/fa6";
import { GiTargetPoster } from "react-icons/gi";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import "./AboutPage.css";

const products = [
  { icon: TbSticker2, title: "Stickers", copy: "Small details that give your everyday things a little more character." },
  { icon: IoLaptop, title: "Laptop skins", copy: "A fresh look for the device you use every day." },
  { icon: FaRegKeyboard, title: "Keyboard skins", copy: "Personalize your setup down to the keys." },
  { icon: GiTargetPoster, title: "Posters", copy: "Designs that make your space feel like yours." },
];

export default function AboutPage() {
  return <div className="site-page dark:bg-darkColor"><Navbar /><main className="site-main">
    <section className="about-hero"><div className="about-container"><span className="eyebrow">Our story</span><h1>Little details.<br /><em>Big personality.</em></h1><p>We make stickers, skins, and prints that help you put your own stamp on the things around you.</p><Link className="button-primary" to="/custom-order">Make something yours <span aria-hidden="true">↗</span></Link></div></section>
    <section className="about-products"><div className="about-container"><div className="about-section-heading"><span className="eyebrow">What we make</span><h2>For your desk, your walls, and everything in between.</h2><p>Choose a design you love, or tell us about an idea you want to create.</p></div><div className="about-product-grid">{products.map(({ icon: Icon, title, copy }) => <article className="about-product" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="about-cta"><div className="about-container"><div><span className="eyebrow">Your idea, your way</span><h2>Have a design in mind?</h2><p>Send us the details and your artwork, and we&apos;ll get in touch to discuss the next steps.</p></div><Link className="button-primary" to="/custom-order">Start a custom order <span aria-hidden="true">↗</span></Link></div></section>
  </main><Footer /></div>;
}
