import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import api from "../../lib/api";
import { getProductImageUrl, normalizeProduct } from "../../lib/products";
import "./Admin.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

  useEffect(() => {
    const controller = new AbortController();
    api.get("/showproducts", { signal: controller.signal })
      .then(({ data }) => setProducts((data.Products || []).map(normalizeProduct).reverse()))
      .catch((requestError) => { if (requestError.code !== "ERR_CANCELED") setError("Could not load products. Refresh the page to try again."); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const remove = async (product) => {
    if (!window.confirm(`Delete “${product.name}” permanently?`)) return;
    setError("");
    try {
      await api.delete(`/deleteproduct/${product.id}`);
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setPage((current) => Math.min(current, Math.max(1, Math.ceil((products.length - 1) / pageSize))));
    } catch { setError("Could not delete this product. Please try again."); }
  };

  return <div className="site-page admin-page"><Navbar /><main className="site-main admin-main">
    <div className="admin-heading"><div><span className="eyebrow">Store manager</span><h1>Product dashboard</h1><p>Manage the designs your customers see in the shop.</p></div><Link className="button-primary" to="/addproduct">Add product <span aria-hidden="true">↗</span></Link></div>
    <div className="admin-stats"><div><strong>{products.length}</strong><span>Products</span></div><div><strong>{new Set(products.map((item) => item.category)).size}</strong><span>Categories</span></div><div><strong>{products.filter((item) => item.name.startsWith("Demo ·")).length}</strong><span>Demo products</span></div></div>
    <div className="admin-shortcuts"><Link to="/custom-orders">Custom requests →</Link><Link to="/inquiries">Customer inquiries →</Link><Link to="/products">View storefront →</Link></div>
    <div className="admin-list-title"><h2>All products</h2><span>{products.length} total</span></div>
    {loading && <p role="status">Loading products…</p>}
    {error && <p className="admin-error" role="alert">{error}</p>}
    {!loading && !error && products.length === 0 && <div className="admin-empty"><p>No products yet.</p><Link to="/addproduct">Add your first product</Link></div>}
    <div className="admin-product-grid">{products.slice((page - 1) * pageSize, page * pageSize).map((product) => <article className="admin-product-card" key={product.id}>
      <img src={getProductImageUrl(product)} alt="" loading="lazy" />
      <div className="admin-product-details"><div className="admin-product-tags"><span>{product.category}</span>{product.name.startsWith("Demo ·") && <span className="admin-demo-tag">Demo</span>}</div><h3>{product.name}</h3><p>{product.description}</p><strong>{product.price ? `${Number(product.price).toLocaleString()} EGP` : "Price on request"}</strong></div>
      <div className="admin-card-actions"><button type="button" onClick={() => navigate("/addproduct", { state: { product } })}>Edit</button><button type="button" onClick={() => remove(product)} className="danger">Delete</button></div>
    </article>)}</div>
    {totalPages > 1 && <div className="admin-pagination"><button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {totalPages}</span><button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button></div>}
  </main><Footer /></div>;
}
