import Navbar from "../Components/Nav/Navbar";
import Footer from "../Components/Footer/Footer";
import CustomOrdersList from "../Components/Admin/CustomOrdersList";

export default function CustomOrders() {
  return <div className="site-page"><Navbar /><main className="site-main"><CustomOrdersList /></main><Footer /></div>;
}
