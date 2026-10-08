import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import Footer from "../Footer/Footer";
import api from "../../lib/api";
import { getProductImageUrl } from "../../lib/products";
import "./Admin.css";

const emptyForm = { name: "", category: "", description: "", price: "" };
const categories = ["Sticker", "Laptop Skin", "Keyboard Skin", "Poster"];

export default function AddProductPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;
  const [form, setForm] = useState(() => product ? {
    name: product.name || "", category: product.category || "",
    description: product.description || "", price: product.price ?? "",
  } : emptyForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!image) return;
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true); setError(""); setFieldErrors({});
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => { if (value !== "") data.append(key, value); });
    if (image) data.append("image", image);
    try {
      await api.post(product ? `/update/${product.id}` : "/addproduct", data);
      navigate("/dashboard");
    } catch (requestError) {
      if (requestError.response?.status === 422) setFieldErrors(requestError.response.data.errors || {});
      else setError("Could not save this product. Please try again.");
    } finally { setSubmitting(false); }
  };

  const field = (name, label, input) => <label className="admin-field"><span>{label}</span>{input}{fieldErrors[name] && <small role="alert">{fieldErrors[name][0]}</small>}</label>;
  const imageUrl = preview || (product && getProductImageUrl(product));

  return <div className="site-page admin-page"><Navbar /><main className="site-main admin-main">
    <div className="admin-heading"><div><span className="eyebrow">Store manager</span><h1>{product ? "Edit product" : "Add a product"}</h1><p>{product ? "Update the details customers see in the shop." : "Add a design to your storefront."}</p></div><Link className="admin-back" to="/dashboard">← Back to dashboard</Link></div>
    <form className="admin-product-form" onSubmit={submit} encType="multipart/form-data">
      <div className="admin-form-fields"><h2>Product details</h2>
        {field("name", "Product name *", <input name="name" value={form.name} onChange={change} maxLength="255" required />)}
        {field("category", "Category *", <select name="category" value={form.category} onChange={change} required><option value="">Choose a category</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select>)}
        {field("description", "Description *", <textarea name="description" value={form.description} onChange={change} rows="5" maxLength="2000" required />)}
        {field("price", "Price in EGP (optional)", <input name="price" value={form.price} onChange={change} type="number" min="0" max="999999" step="0.01" placeholder="Leave empty for price on request" />)}
        {field("image", `Product image ${product ? "" : "*"}`, <input name="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setImage(event.target.files?.[0] || null)} required={!product} />)}
        <p className="admin-field-hint">JPG, PNG or WebP, up to 2 MB. Leave empty when editing to keep the current image.</p>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <div className="admin-form-actions"><button className="button-primary" type="submit" disabled={submitting}>{submitting ? "Saving…" : product ? "Save changes" : "Add product"}</button><Link to="/dashboard">Cancel</Link></div>
      </div>
      <aside className="admin-image-preview"><h2>Image preview</h2>{imageUrl ? <img src={imageUrl} alt="Product preview" /> : <div className="admin-image-placeholder"><span aria-hidden="true">✳</span><p>Your product image will appear here.</p></div>}</aside>
    </form>
  </main><Footer /></div>;
}
