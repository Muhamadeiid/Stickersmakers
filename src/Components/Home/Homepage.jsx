import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import api from "../../lib/api";
import { getProductImageUrl, normalizeProduct } from "../../lib/products";
import cat from "../../Images/cat.png";
import onepiece from "../../Images/one-piece.png";
import godfather from "../../Images/the-godfather.png";
import pizza from "../../Images/pizza.png";
import "./Homepage.css";

const collections = [
  { title: "Stickers", description: "Small details, big personality.", image: cat },
  { title: "Laptop skins", description: "Make your everyday setup yours.", image: onepiece },
  { title: "Posters", description: "Art that deserves a wall.", image: godfather },
];

export default function Homepage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    api.get("/showproducts", { signal: controller.signal })
      .then((response) => setProducts((response.data.Products || []).map(normalizeProduct).slice(0, 4)))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <div className="site-page dark:bg-darkColor">
      <Navbar />
      <main className="site-main">
        <section className="home-hero" aria-labelledby="hero-title">
          <div className="home-container hero-layout">
            <div className="hero-copy">
              <span className="eyebrow">Made to make it yours</span>
              <h1 id="hero-title">Your ideas deserve to <span>stick around.</span></h1>
              <p>Stickers, skins, and prints with a little more personality. Find the piece that feels like you.</p>
              <div className="hero-actions">
                <Link className="button-primary" to="/products">Explore products <span aria-hidden="true">↗</span></Link>
                <Link className="button-text" to="/custom-order">Make your own</Link>
              </div>
              <div className="hero-note"><span className="hero-note-dot" /> Designed for your everyday</div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit art-orbit-one" />
              <div className="art-orbit art-orbit-two" />
              <div className="art-tile art-tile-main"><img src={cat} alt="" loading="eager" /></div>
              <div className="art-tile art-tile-side"><img src={onepiece} alt="" /></div>
              <div className="art-tile art-tile-small"><img src={pizza} alt="" /></div>
              <span className="art-spark art-spark-one">✳</span>
              <span className="art-spark art-spark-two">✦</span>
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="collections-title">
          <div className="home-container">
            <div className="section-heading">
              <div><span className="eyebrow">Find your thing</span><h2 id="collections-title">A little something for every surface.</h2></div>
              <Link className="section-link" to="/products">Browse everything <span aria-hidden="true">→</span></Link>
            </div>
            <div className="collection-grid">
              {collections.map((collection) => (
                <Link className="collection-card" to="/products" key={collection.title}>
                  <div className="collection-image"><img src={collection.image} alt="" loading="lazy" decoding="async" /></div>
                  <div className="collection-copy"><h3>{collection.title}</h3><p>{collection.description}</p></div>
                  <span className="collection-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {products.length > 0 && (
          <section className="home-section featured-section" aria-labelledby="featured-title">
            <div className="home-container">
              <div className="section-heading">
                <div><span className="eyebrow">Fresh picks</span><h2 id="featured-title">Made to stand out.</h2></div>
                <Link className="section-link" to="/products">View all products <span aria-hidden="true">→</span></Link>
              </div>
              <div className="featured-grid">
                {products.map((product) => (
                  <Link className="featured-card" to={`/products/${product.id}`} key={product.id}>
                    <div className="featured-image"><img src={getProductImageUrl(product)} alt={product.name} loading="lazy" decoding="async" /></div>
                    <span>{product.category}</span><h3>{product.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="home-cta" aria-labelledby="cta-title">
          <div className="home-container cta-layout">
            <div>
              <span className="eyebrow">Bring your idea to life</span>
              <h2 id="cta-title">Got something in mind?</h2>
              <p>Tell us what you are imagining. We would love to help make it real.</p>
              <Link className="button-primary" to="/custom-order">Start a custom order <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="cta-sticker" aria-hidden="true"><span>YOUR IDEA</span><strong>HERE</strong><i>✳</i></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
