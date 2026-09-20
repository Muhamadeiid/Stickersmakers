import { useEffect, useState } from "react";
import api from "../../lib/api";
import "./CustomOrdersList.css";

const types = { sticker: "Stickers", laptop_skin: "Laptop skin", keyboard_skin: "Keyboard skin", poster: "Poster", other: "Other" };
const statuses = { new: "New", in_progress: "In progress", completed: "Completed" };

export default function CustomOrdersList() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get(`/custom-orders?page=${page}`).then(({ data }) => {
      if (active) { setOrders(data.data); setLastPage(data.last_page); }
    }).catch(() => { if (active) setError("Could not load custom orders."); });
    return () => { active = false; };
  }, [page]);

  const updateStatus = async (id, status) => {
    setBusy(true); setError("");
    try {
      await api.patch(`/custom-orders/${id}/status`, { status });
      setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));
    } catch { setError("Could not update the order status."); }
    finally { setBusy(false); }
  };

  const download = async (order) => {
    setError("");
    try {
      const response = await api.get(`/custom-orders/${order.id}/artwork`, { responseType: "blob" });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = order.artwork_name || `order-${order.id}-design`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { setError("Could not download the design file."); }
  };

  return <section className="custom-admin"><div className="custom-admin-heading"><span className="eyebrow">Admin</span><h1>Custom requests</h1><p>Review new ideas and keep each request moving.</p></div>
    {error && <p role="alert" className="custom-admin-error">{error}</p>}
    {orders.length === 0 && !error && <p className="custom-admin-empty">No custom requests yet.</p>}
    <div className="custom-admin-grid">{orders.map((order) => <article className="custom-admin-card" key={order.id}>
      <div className="custom-card-top"><strong>Request #{order.id}</strong><time>{new Date(order.created_at).toLocaleDateString()}</time></div>
      <h2>{order.name}</h2><a href={`tel:${order.phone}`}>{order.phone}</a>
      <dl><div><dt>Product</dt><dd>{types[order.product_type] || order.product_type}</dd></div><div><dt>Quantity</dt><dd>{order.quantity}</dd></div>{(order.width_cm || order.height_cm) && <div><dt>Size</dt><dd>{order.width_cm || "?"} × {order.height_cm || "?"} cm</dd></div>}</dl>
      {order.notes && <p className="custom-card-notes">{order.notes}</p>}
      <div className="custom-card-bottom">{order.artwork_name ? <button type="button" onClick={() => download(order)}>Download design</button> : <span>No design file</span>}
        <label>Status <select aria-label={`Status for request ${order.id}`} value={order.status} onChange={(event) => updateStatus(order.id, event.target.value)} disabled={busy}>{Object.entries(statuses).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label></div>
    </article>)}</div>
    {lastPage > 1 && <div className="custom-pagination"><button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} of {lastPage}</span><button disabled={page === lastPage} onClick={() => setPage(page + 1)}>Next</button></div>}
  </section>;
}
