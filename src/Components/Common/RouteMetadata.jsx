import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePageMetadata from "../../hooks/usePageMetadata";

const metadata = {
  "/": ["Custom Stickers and Skins", "Personalize your world with custom stickers, laptop skins, keyboard skins, and posters."],
  "/products": ["Products", "Browse custom stickers, skins, and posters from Stickers Makers."],
  "/about": ["About Us", "Learn about Stickers Makers and our custom design and printing service."],
  "/contact": ["Contact Us", "Contact Stickers Makers to discuss your custom sticker or skin design."],
  "/wishlist": ["Wishlist", "View the products saved to your Stickers Makers wishlist."],
  "/login": ["Admin Login", "Secure administration login for Stickers Makers."],
};

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const key = pathname.startsWith("/products/") ? "/products" : pathname;
  const [title, description] = metadata[key] || ["Page Not Found", "The requested Stickers Makers page could not be found."];
  usePageMetadata(title, description);
  const privatePage = ["/login", "/wishlist", "/dashboard", "/addproduct", "/inquiries", "/inquires"].includes(pathname);
  useEffect(() => {
    const robots = document.head.querySelector('meta[name="robots"]');
    if (robots) robots.content = privatePage || !metadata[key] ? "noindex, nofollow" : "index, follow";
  }, [key, privatePage]);
  return null;
}
