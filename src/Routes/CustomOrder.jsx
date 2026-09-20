import Navbar from "../Components/Nav/Navbar";
import Footer from "../Components/Footer/Footer";
import CustomOrderForm from "../Components/CustomOrder/CustomOrderForm";

export default function CustomOrder() {
  return <div className="site-page custom-order-shell"><Navbar /><main className="site-main"><CustomOrderForm /></main><Footer /></div>;
}
