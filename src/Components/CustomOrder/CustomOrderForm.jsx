import { useState } from "react";
import api from "../../lib/api";
import "./CustomOrder.css";

const initial = { name: "", phone: "", product_type: "sticker", width_cm: "", height_cm: "", quantity: "1", notes: "" };
const types = { sticker: "Stickers", laptop_skin: "Laptop skin", keyboard_skin: "Keyboard skin", poster: "Poster", other: "Something else" };

export default function CustomOrderForm() {
  const [form, setForm] = useState(initial);
  const [artwork, setArtwork] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSending(true);
    setErrors({});
    setMessage("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => { if (value !== "") data.append(key, value); });
    if (artwork) data.append("artwork", artwork);
    try {
      const response = await api.post("/custom-orders", data);
      setMessage(`Thanks! Your request #${response.data.id} is in. We will contact you to discuss the details.`);
      setForm(initial);
      setArtwork(null);
      formElement.reset();
    } catch (error) {
      if (error.response?.status === 422) setErrors(error.response.data.errors || {});
      else setMessage("We could not send your request. Please try again shortly.");
    } finally {
      setSending(false);
    }
  };

  const field = (name, label, input) => <label className="custom-field" key={name}><span>{label}</span>{input}{errors[name] && <small role="alert">{errors[name][0]}</small>}</label>;

  return <section className="custom-order-page">
    <div className="custom-order-intro"><span className="eyebrow">Made for you</span><h1>Let&apos;s make your idea real.</h1><p>Tell us what you have in mind. Share a design if you have one, and we&apos;ll get in touch about the details and price.</p><div className="custom-steps"><span>01 &nbsp; Share your idea</span><span>02 &nbsp; We review it</span><span>03 &nbsp; We get in touch</span></div></div>
    <form className="custom-order-form" onSubmit={submit} encType="multipart/form-data">
      <h2>Your request</h2><p>Fields marked * are required.</p>
      <div className="custom-grid">
        {field("name", "Your name *", <input name="name" value={form.name} onChange={change} required maxLength="255" autoComplete="name" />)}
        {field("phone", "Phone number *", <input name="phone" value={form.phone} onChange={change} required type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" />)}
        {field("product_type", "What are we making? *", <select name="product_type" value={form.product_type} onChange={change}>{Object.entries(types).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>)}
        {field("quantity", "Quantity *", <input name="quantity" value={form.quantity} onChange={change} required type="number" min="1" max="10000" />)}
        {field("width_cm", "Width (cm)", <input name="width_cm" value={form.width_cm} onChange={change} type="number" min="0.1" max="9999" step="0.1" />)}
        {field("height_cm", "Height (cm)", <input name="height_cm" value={form.height_cm} onChange={change} type="number" min="0.1" max="9999" step="0.1" />)}
      </div>
      {field("notes", "Tell us more", <textarea name="notes" value={form.notes} onChange={change} rows="5" maxLength="2000" placeholder="Colors, finish, deadline, or anything else we should know" />)}
      {field("artwork", "Upload your design (optional)", <input name="artwork" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={(event) => setArtwork(event.target.files?.[0] || null)} />)}
      <p className="custom-file-hint">JPG, PNG, WebP or PDF. Up to 10 MB.</p>
      {message && <p className="custom-form-message" role="status">{message}</p>}
      <button className="button-primary" type="submit" disabled={sending}>{sending ? "Sending…" : "Send my request"} <span aria-hidden="true">↗</span></button>
    </form>
  </section>;
}
