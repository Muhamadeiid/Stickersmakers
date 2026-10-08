import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import { WishlistContext } from "../Context/wishlist-context";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import { getProductImageUrl } from "../../lib/products";
import "./wishlist.css";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="site-page wishlist-page">
      <Navbar />
      <main className="site-main wishlist-main">
        <header className="wishlist-heading">
          <div>
            <span className="eyebrow">Saved for later</span>
            <h1>Your wishlist</h1>
            <p>Keep your favorite designs together until you are ready.</p>
          </div>
          <span className="wishlist-total">
            <FaHeart aria-hidden="true" /> {wishlist.length}{" "}
            {wishlist.length === 1 ? "favorite" : "favorites"}
          </span>
        </header>

        {wishlist.length === 0 ? (
          <section className="wishlist-empty">
            <span aria-hidden="true">♡</span>
            <h2>Nothing saved yet.</h2>
            <p>Tap the heart on any product and it will appear here.</p>
            <Link className="button-primary" to="/products">
              Explore products <span aria-hidden="true">↗</span>
            </Link>
          </section>
        ) : (
          <section className="wishlist-grid" aria-label="Saved products">
            {wishlist.map((item) => (
              <article className="wishlist-card" key={item.id}>
                <Link className="wishlist-image" to={`/products/${item.id}`}>
                  <img
                    src={getProductImageUrl(item)}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>

                <div className="wishlist-card-body">
                  <div className="wishlist-card-meta">
                    <span>{item.category}</span>
                    {item.price != null && (
                      <strong>{Number(item.price).toLocaleString()} EGP</strong>
                    )}
                  </div>
                  <Link to={`/products/${item.id}`}>
                    <h2>{item.name}</h2>
                  </Link>
                  <p>{item.description}</p>

                  <div className="wishlist-actions">
                    <Link to={`/products/${item.id}`}>
                      View product <span aria-hidden="true">→</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <FaTrashAlt aria-hidden="true" /> Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
